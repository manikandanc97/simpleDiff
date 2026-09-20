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

const THEME_VARIANTS = [
  { id: 'amber',   hue: 36,  satMin: 0.60, satMult: 1.70, lightMult: 1.35, lightAdd: 0.08 },
  { id: 'cyan',    hue: 185, satMin: 0.50, satMult: 1.45, lightMult: 1.25, lightAdd: 0.05 },
  { id: 'emerald', hue: 148, satMin: 0.52, satMult: 1.55, lightMult: 1.30, lightAdd: 0.06 },
  { id: 'fuchsia', hue: 295, satMin: 0.55, satMult: 1.65, lightMult: 1.35, lightAdd: 0.07 },
  { id: 'green',   hue: 145, satMin: 0.52, satMult: 1.55, lightMult: 1.30, lightAdd: 0.06 },
  { id: 'red',     hue: 356, satMin: 0.58, satMult: 1.60, lightMult: 1.30, lightAdd: 0.07 },
  { id: 'rose',    hue: 345, satMin: 0.58, satMult: 1.60, lightMult: 1.30, lightAdd: 0.07 },
  { id: 'violet',  hue: 280, satMin: 0.55, satMult: 1.65, lightMult: 1.35, lightAdd: 0.07 },
];

const STEPS = [
  {
    name: 'discovery-3d',
    src: 'public/images/process/discovery-3d.jpg',
    isShirt: (x, y, r, g, b, h, s, l) => {
      // Man: x: 645..860, y: 320..580
      // Woman: x: 740..1020, y: 345..580
      if (x >= 645 && x <= 1020 && y >= 320 && y <= 580) {
        if (x < 670 && y > 450) return false;
        if (r > b + 10 && r > 70 && (h < 45 || h > 340)) return false;
        if (y < 330 && r > b && l < 0.22) return false;
        if (y > 565 && s < 0.15 && l > 0.20) return false;

        const isBlueFabric = (h >= 180 && h <= 340 && s >= 0.04 && l >= 0.02 && l <= 0.72);
        const hasBlueDom = (b >= r && b >= g * 0.82 && l <= 0.72);

        return isBlueFabric || hasBlueDom;
      }
      return false;
    }
  },
  {
    name: 'design-3d',
    src: 'public/images/process/design-3d.jpg',
    isShirt: (x, y, r, g, b, h, s, l) => {
      if (x >= 570 && x <= 925 && y >= 350 && y <= 570) {
        if (r > b + 10 && r > 70 && (h < 45 || h > 340)) return false;
        if (y < 380 && (x < 650 || x > 780) && r > b && l < 0.25) return false;
        if (y > 550 && s < 0.08 && l < 0.25) return false;
        if (r > 160 && g > 130 && r > b + 25) return false;

        const isBlueFabric = (h >= 180 && h <= 340 && s >= 0.04 && l >= 0.02 && l <= 0.75);
        const hasBlueDom = (b >= r && b >= g * 0.82 && l <= 0.75);

        return isBlueFabric || hasBlueDom;
      }
      return false;
    }
  },
  {
    name: 'engineer-3d',
    src: 'public/images/process/engineer-3d.jpg',
    isShirt: (x, y, r, g, b, h, s, l) => {
      if (x >= 780 && x <= 1025 && y >= 350 && y <= 800) {
        if (r > b + 10 && r > 70 && (h < 45 || h > 340)) return false;
        if (y < 425 && x < 860 && r > b) return false;
        if (x > 940 && y > 710 && s < 0.05 && l < 0.10) return false;
        if (y > 780 && x < 890 && s < 0.06) return false;

        const isBlueFabric = (h >= 180 && h <= 345 && s >= 0.04 && l >= 0.03 && l <= 0.70);
        const hasBlueDom = (b >= r && b >= g * 0.82 && l <= 0.70);

        return isBlueFabric || hasBlueDom;
      }
      return false;
    }
  },
  {
    name: 'launch-3d',
    src: 'public/images/process/launch-3d.jpg',
    isShirt: (x, y, r, g, b, h, s, l) => {
      const isCapGuy = (x >= 230 && x <= 395 && y >= 440 && y <= 675);
      const isGirl = (x >= 360 && x <= 565 && y >= 460 && y <= 620);
      const isGuy = (x >= 645 && x <= 820 && y >= 460 && y <= 615);
      const isDeskDev = (x >= 920 && x <= 1040 && y >= 690 && y <= 860);

      if (isCapGuy || isGirl || isGuy || isDeskDev) {
        if (r > b + 10 && r > 70 && (h < 45 || h > 340)) return false;
        if (isCapGuy && x >= 325 && x <= 365 && l > 0.65 && s < 0.12) return false;
        if (y > 635 && isCapGuy && s < 0.10) return false;
        if (y > 615 && isGirl && s < 0.10) return false;
        if (y > 610 && isGuy && s < 0.10) return false;

        const isBlueFabric = (h >= 180 && h <= 340 && s >= 0.04 && l >= 0.02 && l <= 0.75);
        const hasBlueDom = (b >= r && b >= g * 0.82 && l <= 0.75);

        return isBlueFabric || hasBlueDom;
      }
      return false;
    }
  }
];

async function generateAll() {
  for (const step of STEPS) {
    console.log('Processing ' + step.name + '...');
    const { data, info } = await sharp(step.src).raw().toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height;

    // Ensure blue file is exact pristine copy of original
    fs.copyFileSync(step.src, 'public/images/process/' + step.name + '-blue.jpg');

    for (const v of THEME_VARIANTS) {
      const out = Buffer.from(data);
      let count = 0;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 3;
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          const [hueP, satP, lightP] = rgbToHsl(r, g, b);

          if (step.isShirt(x, y, r, g, b, hueP, satP, lightP)) {
            const targetSat = Math.min(0.92, Math.max(v.satMin, satP * v.satMult));
            const targetLight = Math.min(0.72, Math.max(0.18, lightP * v.lightMult + v.lightAdd));
            const [nr, ng, nb] = hslToRgb(v.hue, targetSat, targetLight);

            out[idx] = nr;
            out[idx+1] = ng;
            out[idx+2] = nb;
            count++;
          }
        }
      }

      const outPath = 'public/images/process/' + step.name + '-' + v.id + '.jpg';
      await sharp(out, { raw: { width: w, height: h, channels: 3 } })
        .jpeg({ quality: 98 })
        .toFile(outPath);
      console.log('  Saved ' + outPath + ' (' + count + ' pixels)');
    }
  }
  console.log('All process image variants generated successfully with pixel perfection!');
}

generateAll();
