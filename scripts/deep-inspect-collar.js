const sharp = require('sharp');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
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

async function deepInspectCollar() {
  const img = await sharp('public/images/process/engineer-3d.jpg').raw().toBuffer({ resolveWithObject: true });
  console.log(`=== DEEP INSPECT ENGINEER COLLAR (x: 620..800, y: 380..470) ===`);
  console.log(`Image: ${img.info.width}x${img.info.height}`);
  
  // Sample every 5px to see exactly what's at the collar area
  for (let y = 380; y <= 470; y += 8) {
    let row = `y=${y}: `;
    for (let x = 620; x <= 800; x += 12) {
      const idx = (y * img.info.width + x) * 3;
      const r = img.data[idx], g = img.data[idx+1], b = img.data[idx+2];
      const [h, s, l] = rgbToHsl(r, g, b);
      // Classify: BL=blue collar, MN=monitor, SK=skin/beard, DK=dark neutral
      let tag = 'OT';
      if (h >= 195 && h <= 265 && s >= 0.08) tag = 'BL';
      else if (r > b + 10 && r > 80 && h < 40) tag = 'SK';
      else if (l < 0.15) tag = 'DK';
      else if (l > 0.55 && s < 0.15) tag = 'WH';
      row += `[${x}:${tag}(${r},${g},${b})] `;
    }
    console.log(row);
  }
  
  // Count blue pixels in collar zone (x: 620..780, y: 390..460)
  let blueCollarCount = 0;
  for (let y = 390; y <= 460; y++) {
    for (let x = 620; x <= 780; x++) {
      const idx = (y * img.info.width + x) * 3;
      const r = img.data[idx], g = img.data[idx+1], b = img.data[idx+2];
      const [h, s, l] = rgbToHsl(r, g, b);
      if (h >= 195 && h <= 265 && s >= 0.08 && l <= 0.70) {
        if (!(r > b && r > 105)) blueCollarCount++;
      }
    }
  }
  console.log(`\nBlue collar pixels in x:620-780, y:390-460: ${blueCollarCount}`);
}
deepInspectCollar();
