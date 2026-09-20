'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ─── Color helpers ─────────────────────────────────────────────────────── */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  return [Math.round((h / 6) * 360), s, l];
}

function hslToRgb(hDeg: number, s: number, l: number): [number, number, number] {
  const h = (((hDeg % 360) + 360) % 360) / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number): number => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 0.5) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(h + 1 / 3) * 255),
    Math.round(hue2rgb(h) * 255),
    Math.round(hue2rgb(h - 1 / 3) * 255),
  ];
}

/* ─── Per-image shirt pixel detectors ───────────────────────────────────
   Ported from scripts/generate-process-variants.js (same logic, same zones)
   Runs client-side in the browser canvas instead of server-side with sharp.
──────────────────────────────────────────────────────────────────────────── */
type PixelFn = (x: number, y: number, r: number, g: number, b: number, h: number, s: number, l: number) => boolean;

const DETECTORS: Record<string, PixelFn> = {
  /* Discovery: man + woman standing at whiteboard */
  'discovery-3d': (x, y, r, g, b, _h, s, l) => {
    if (x >= 635 && x <= 1040 && y >= 340 && y <= 585) {
      if (b > r + 6 && b >= g * 0.88 && s >= 0.07 && l <= 0.72) {
        if (!(r > b && r > 105)) return true;
      }
    }
    return false;
  },

  /* Design: woman designer at workstation */
  'design-3d': (x, y, r, g, b, _h, s, l) => {
    if (x >= 560 && x <= 960 && y >= 360 && y <= 600) {
      if (b > r + 6 && b >= g * 0.88 && s >= 0.07 && l <= 0.75) {
        if (!(r > b && r > 110)) return true;
      }
    }
    return false;
  },

  /* Engineer: bearded dev at dual monitors
     Two separate zones confirmed by pixel inspection:
       – Collar at x:620..720, y:388..424 (was missed by old x≥780 gate)
       – Body/arm at x:780..1015, y:390..760                               */
  'engineer-3d': (x, y, r, g, b, h, s, l) => {
    // === COLLAR ZONE (neck-level, x:620..720 y:388..424) ===
    if (x >= 620 && x <= 720 && y >= 388 && y <= 424) {
      if (h >= 190 && h <= 270 && s >= 0.08 && l <= 0.72) {
        if (!(r > b && r > 105)) return true;
      }
    }
    // Body gate: right of monitor bezel
    if (x < 780 || x > 1015 || y < 390 || y > 760) return false;
    // Protect warm skin
    if (r > b + 10 && r > 100 && (h < 42 || h > 340)) return false;
    // Protect beard/hair under chin
    if (y < 440 && x < 840) return false;
    // Chest collar zone (where polo collar meets torso)
    if (x >= 835 && x <= 920 && y >= 395 && y <= 460) {
      if ((h >= 200 && h <= 300) && s >= 0.04 && l <= 0.55) return true;
      if (b > r && b >= g * 0.85 && s >= 0.04 && l <= 0.55) return true;
    }
    // Standard blue shirt body
    if (b > r + 2 && b >= g * 0.85 && s >= 0.04 && l >= 0.02 && l <= 0.70) return true;
    // Back/spine/shoulder under ambient lighting
    if (x >= 900 && x <= 1015 && y >= 400 && y <= 600) {
      if ((h >= 200 && h <= 340) && s >= 0.05 && l >= 0.02 && l <= 0.40) {
        if (!(r > 120 && g > 80)) return true;
      }
    }
    return false;
  },

  /* Launch: team high-five celebration */
  'launch-3d': (x, y, r, g, b, h, s, l) => {
    if (r > b + 10 && r > 100 && (h < 42 || h > 335)) return false;
    if (l > 0.72 || (s < 0.05 && l > 0.50)) return false;
    // Guy with cap (left)
    if (x >= 210 && x <= 370 && y >= 430 && y <= 660) {
      if (b > r + 2 && b >= g * 0.82 && s >= 0.05) return true;
    }
    // Girl in middle
    if (x >= 360 && x <= 500 && y >= 450 && y <= 635) {
      if (b > r + 2 && b >= g * 0.82 && s >= 0.05) return true;
    }
    // Guy with glasses — main torso + right sleeve
    if (x >= 500 && x <= 680 && y >= 460 && y <= 650) {
      if (b > r + 2 && b >= g * 0.85 && s >= 0.05) return true;
      if (y >= 460 && y <= 500 && (h >= 200 && h <= 280) && s >= 0.08) return true;
    }
    // Left chest, shoulder & waist
    if (x > 680 && x <= 765 && y >= 460 && y <= 610) {
      if (b > r + 2 && b >= g * 0.85 && s >= 0.05) return true;
      if ((h >= 200 && h <= 280) && s >= 0.08 && l <= 0.50) return true;
    }
    // Left sleeve & cuff
    if (x > 765 && x <= 790 && y >= 470 && y <= 545) {
      if (b > r + 2 && b >= g * 0.85 && s >= 0.05) return true;
      if ((h >= 200 && h <= 280) && s >= 0.08 && l <= 0.45) return true;
    }
    return false;
  },
};

/* ─── Recolor parameters tuned per hue range ──────────────────────────── */
interface Params { satMin: number; satMult: number; lightMult: number; lightAdd: number; }

function getParams(hue: number): Params {
  const h = ((hue % 360) + 360) % 360;
  if ((h >= 340) || h < 18)  return { satMin: 0.58, satMult: 1.60, lightMult: 1.30, lightAdd: 0.08 }; // red
  if (h < 60)                return { satMin: 0.60, satMult: 1.70, lightMult: 1.38, lightAdd: 0.09 }; // amber
  if (h < 165)               return { satMin: 0.52, satMult: 1.55, lightMult: 1.30, lightAdd: 0.08 }; // green
  if (h < 210)               return { satMin: 0.50, satMult: 1.45, lightMult: 1.25, lightAdd: 0.06 }; // cyan
  if (h < 250)               return { satMin: 0.50, satMult: 1.40, lightMult: 1.20, lightAdd: 0.04 }; // blue (original)
  return                            { satMin: 0.55, satMult: 1.65, lightMult: 1.35, lightAdd: 0.08 }; // violet
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export interface DynamicColorImageProps {
  /** Original image base name without extension, e.g. 'discovery-3d' */
  baseName: string;
  alt: string;
  /** Target shirt hue (0–359). Computed from current theme primary color. */
  targetHue: number;
  className?: string;
}

/**
 * Loads the original 3-D render image onto a <canvas>, then re-colours only
 * the shirt/t-shirt pixels to `targetHue` in real-time – no pre-generated
 * image variants required.  When `targetHue` changes the canvas is repainted
 * from the cached original pixel data instantly.
 */
export function DynamicColorImage({ baseName, alt, targetHue, className }: DynamicColorImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Store original (blue-shirt) raw pixel data so we can re-apply any hue */
  const origRef = useRef<Uint8ClampedArray | null>(null);
  const dimRef  = useRef<{ w: number; h: number } | null>(null);
  const detector = DETECTORS[baseName];

  /* Paint recoloured pixels onto canvas from cached origRef */
  const paint = useCallback(
    (orig: Uint8ClampedArray, w: number, h: number, hue: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !detector) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const p   = getParams(hue);
      const out = new Uint8ClampedArray(orig);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = orig[i], g = orig[i + 1], b = orig[i + 2];
          const [ph, ps, pl] = rgbToHsl(r, g, b);

          if (detector(x, y, r, g, b, ph, ps, pl)) {
            const ns = Math.min(0.92, Math.max(p.satMin, ps * p.satMult));
            const nl = Math.min(0.72, Math.max(0.18, pl * p.lightMult + p.lightAdd));
            const [nr, ng, nb] = hslToRgb(hue, ns, nl);
            out[i] = nr; out[i + 1] = ng; out[i + 2] = nb;
          }
        }
      }
      ctx.putImageData(new ImageData(out, w, h), 0, 0);
    },
    [detector],
  );

  /* Load original image once; cache raw pixels */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const imageData   = ctx.getImageData(0, 0, canvas.width, canvas.height);
      origRef.current   = new Uint8ClampedArray(imageData.data); // deep copy
      dimRef.current    = { w: canvas.width, h: canvas.height };
      paint(origRef.current, canvas.width, canvas.height, targetHue);
    };
    // Use original blue-shirt image as base (not a pre-generated variant)
    img.src = `/images/process/${baseName}.jpg`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseName]); // only reload when image changes

  /* Re-paint whenever hue changes (no network request – uses cached origRef) */
  useEffect(() => {
    if (!origRef.current || !dimRef.current) return;
    paint(origRef.current, dimRef.current.w, dimRef.current.h, targetHue);
  }, [targetHue, paint]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
