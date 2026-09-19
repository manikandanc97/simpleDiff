const sharp = require('sharp');

async function buildDynamicShirtAssets() {
  const src = 'C:/Users/Hp/.gemini/antigravity-ide/brain/c5e764a9-554e-4c1d-9e99-ac59647c3105/hero_3d_coder_1789840235851.jpg';
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;

  // 1. Flood fill background to transparent
  const baseData = Buffer.from(data);
  const visitedBg = new Uint8Array(width * height);
  const queueBg = [];

  function isBg(idx) {
    const r = baseData[idx * 4];
    const g = baseData[idx * 4 + 1];
    const b = baseData[idx * 4 + 2];
    return r > 240 && g > 240 && b > 240;
  }

  for (let x = 0; x < width; x++) {
    queueBg.push(x, (height - 1) * width + x);
    visitedBg[x] = 1;
    visitedBg[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    const idx1 = y * width;
    const idx2 = y * width + (width - 1);
    if (!visitedBg[idx1]) { visitedBg[idx1] = 1; queueBg.push(idx1); }
    if (!visitedBg[idx2]) { visitedBg[idx2] = 1; queueBg.push(idx2); }
  }

  let headBg = 0;
  while(headBg < queueBg.length) {
    const curr = queueBg[headBg++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    if (isBg(curr)) {
      baseData[curr * 4 + 3] = 0;

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < width - 1 ? curr + 1 : -1,
        cy > 0 ? curr - width : -1,
        cy < height - 1 ? curr + width : -1
      ];

      for (const n of neighbors) {
        if (n !== -1 && !visitedBg[n]) {
          visitedBg[n] = 1;
          if (isBg(n)) {
            queueBg.push(n);
          } else {
            const r = baseData[n * 4], g = baseData[n * 4 + 1], b = baseData[n * 4 + 2];
            const lightness = (r + g + b) / 3;
            if (lightness > 225) {
              const factor = (255 - lightness) / 30;
              baseData[n * 4 + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
            }
          }
        }
      }
    }
  }

  // 2. Identify all shirt pixels in the torso/arms region
  const maskBuffer = Buffer.alloc(width * height * 4, 0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const a = baseData[idx * 4 + 3];
      if (a === 0) continue;

      const r = baseData[idx * 4];
      const g = baseData[idx * 4 + 1];
      const b = baseData[idx * 4 + 2];

      // Torso & sleeves bounding box:
      // x: 470 to 775, y: 310 to 625
      if (x >= 470 && x <= 775 && y >= 310 && y <= 625) {
        // Not skin (skin has strong red dominance: r - b > 25)
        const isSkin = (r - b > 25);
        // Not wood/chair armrest (wood has r > 130 and r - b > 35)
        const isWood = (r > 130 && r - b > 35);
        // Blue shirt condition: blue is higher than red and green
        const isBlueShirt = (b > r + 3) && (b > g * 0.85) && (b >= 25);

        if (isBlueShirt && !isSkin && !isWood) {
          const lum = r * 0.299 + g * 0.587 + b * 0.114;
          const baseGray = Math.min(245, Math.round(150 + (lum / 200) * 95));

          baseData[idx * 4] = baseGray;
          baseData[idx * 4 + 1] = baseGray;
          baseData[idx * 4 + 2] = baseGray;

          maskBuffer[idx * 4] = 255;
          maskBuffer[idx * 4 + 1] = 255;
          maskBuffer[idx * 4 + 2] = 255;
          maskBuffer[idx * 4 + 3] = a;
        }
      }
    }
  }

  await sharp(baseData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-3d-coder-base.png');

  await sharp(baseData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-3d-coder.png');

  await sharp(maskBuffer, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile('public/images/hero-3d-coder-shirt-mask.png');

  console.log('Complete conversion to neutral base done!');
}

buildDynamicShirtAssets().catch(console.error);
