const fs = require('fs');
const path = require('path');
if (!process.env) process.env = {};
const sharp = require('sharp');

const src = 'C:/Users/Hp/.gemini/antigravity-ide/brain/c5e764a9-554e-4c1d-9e99-ac59647c3105/user_coder_white_shirt_1789841031048.jpg';

async function run() {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // 1. Transparent background cutout
  const baseData = Buffer.from(data);
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(idx) {
    const r = baseData[idx * 4];
    const g = baseData[idx * 4 + 1];
    const b = baseData[idx * 4 + 2];
    return r > 218 && g > 218 && b > 218;
  }

  for (let x = 0; x < width; x++) {
    queue.push(x, (height - 1) * width + x);
    visited[x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    const idx1 = y * width;
    const idx2 = y * width + (width - 1);
    if (!visited[idx1]) { visited[idx1] = 1; queue.push(idx1); }
    if (!visited[idx2]) { visited[idx2] = 1; queue.push(idx2); }
  }

  let head = 0;
  while(head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    if (isBackground(curr)) {
      baseData[curr * 4 + 3] = 0;

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < width - 1 ? curr + 1 : -1,
        cy > 0 ? curr - width : -1,
        cy < height - 1 ? curr + width : -1
      ];

      for (const n of neighbors) {
        if (n !== -1 && !visited[n]) {
          visited[n] = 1;
          if (isBackground(n)) {
            queue.push(n);
          } else {
            const r = baseData[n * 4], g = baseData[n * 4 + 1], b = baseData[n * 4 + 2];
            const lightness = (r + g + b) / 3;
            if (lightness > 195) {
              const factor = (220 - lightness) / 25;
              baseData[n * 4 + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
            }
          }
        }
      }
    }
  }

  // Save the full transparent base avatar
  await sharp(baseData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-user-avatar.png');

  // Also replace hero-3d-coder.png directly so standard views use this avatar
  await sharp(baseData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-3d-coder.png');

  console.log('Saved hero-user-avatar.png and updated hero-3d-coder.png');

  // 2. Extract Shirt Mask and Shading
  // The shirt is in the region:
  // x: 0.26 * width to 0.82 * width
  // y: 0.36 * height to 0.88 * height
  // Color of shirt: light grey with R, G, B roughly equal, low saturation (max(r,g,b) - min(r,g,b) < 25)
  // Skin has high red/warmth (r - b > 35)
  // Hair/beard has low lightness (< 85)
  // Laptop is dark (lightness < 65)
  const shirtMask = Buffer.alloc(width * height * 4, 0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const alpha = baseData[idx * 4 + 3];
      if (alpha === 0) continue;

      const r = baseData[idx * 4];
      const g = baseData[idx * 4 + 1];
      const b = baseData[idx * 4 + 2];
      const lightness = (r + g + b) / 3;
      const saturation = Math.max(r, g, b) - Math.min(r, g, b);
      const isSkin = (r - b > 30) && (r > 120);
      const isHairOrDark = lightness < 75;

      const ny = y / height;
      const nx = x / width;

      // Shirt bounding area
      if (ny >= 0.36 && ny <= 0.86 && nx >= 0.25 && nx <= 0.82) {
        // Exclude face/neck skin and hands
        // Neck is around center x: 0.44-0.56, y: 0.36-0.45
        if (isSkin) continue;
        if (isHairOrDark) continue;

        // Hands are near laptop around y > 0.76 and x: 0.40 - 0.70
        if (ny > 0.78 && nx > 0.40 && nx < 0.72 && isSkin) continue;

        // Shirt condition: lightness between 110 and 235, low saturation
        if (lightness >= 110 && lightness <= 238 && saturation < 38) {
          // It's part of the shirt!
          // We preserve the shading/luminosity:
          shirtMask[idx * 4] = lightness;
          shirtMask[idx * 4 + 1] = lightness;
          shirtMask[idx * 4 + 2] = lightness;
          shirtMask[idx * 4 + 3] = alpha;
        }
      }
    }
  }

  await sharp(shirtMask, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-user-shirt-mask.png');

  console.log('Saved hero-user-shirt-mask.png successfully!');
}

run().catch(console.error);
