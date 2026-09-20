const fs = require('fs');
const sharp = require('sharp');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const VARIANTS = [
  { id: 'violet', hue: 280, satMin: 0.55, satMult: 1.65, lightMult: 1.35, lightAdd: 0.07 },
  { id: 'red',    hue: 356, satMin: 0.58, satMult: 1.60, lightMult: 1.30, lightAdd: 0.07 },
  { id: 'rose',   hue: 345, satMin: 0.58, satMult: 1.60, lightMult: 1.30, lightAdd: 0.07 },
  { id: 'green',  hue: 145, satMin: 0.52, satMult: 1.55, lightMult: 1.30, lightAdd: 0.06 },
  { id: 'amber',  hue: 36,  satMin: 0.60, satMult: 1.70, lightMult: 1.38, lightAdd: 0.08 },
  { id: 'cyan',   hue: 185, satMin: 0.50, satMult: 1.45, lightMult: 1.25, lightAdd: 0.05 },
];

async function generateHeroVariants() {
  console.log('Reading public/images/hero-3d-coder-blue.png...');
  const { data, info } = await sharp('public/images/hero-3d-coder-blue.png').raw().toBuffer({ resolveWithObject: true });

  for (const variant of VARIANTS) {
    const out = Buffer.from(data);
    let changed = 0;

    for (let y = 310; y <= 650; y++) {
      for (let x = 460; x <= 780; x++) {
        const idx = (y * info.width + x) * 4;
        const r = out[idx], g = out[idx+1], b = out[idx+2], a = out[idx+3];
        if (a > 30) {
          const [h, s, l] = rgbToHsl(r, g, b);
          // Shirt pixel detection
          if (b > r + 6 && b >= g * 0.88 && s >= 0.08 && l <= 0.72) {
            // Exclude skin
            if (!(r > b && r > 105)) {
              const targetSat = Math.min(0.92, Math.max(variant.satMin, s * variant.satMult));
              const targetLight = Math.min(0.72, l * variant.lightMult + variant.lightAdd);
              const [nr, ng, nb] = hslToRgb(variant.hue, targetSat, targetLight);

              out[idx] = nr;
              out[idx+1] = ng;
              out[idx+2] = nb;
              changed++;
            }
          }
        }
      }
    }

    const dest = `public/images/hero-3d-coder-${variant.id}.png`;
    await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(dest);
    console.log(`Saved ${dest} (${changed} shirt pixels modified)`);
  }
  console.log('All hero 3D coder variants successfully regenerated!');
}

generateHeroVariants();
