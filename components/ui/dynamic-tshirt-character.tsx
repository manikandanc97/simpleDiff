"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";


// Converts any CSS color (OKLCH, Hex, RGB, HSL) into exact RGB numbers
function parseCssColorToRgb(colorStr: string): [number, number, number] {
  if (typeof window === "undefined" || !colorStr) return [37, 99, 235];

  try {
    const scratch = document.createElement("canvas");
    scratch.width = 1;
    scratch.height = 1;
    const ctx = scratch.getContext("2d", { willReadFrequently: true });
    if (!ctx) return [37, 99, 235];

    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);
    const pixel = ctx.getImageData(0, 0, 1, 1).data;
    // If successfully rendered
    if (pixel[3] > 0) {
      return [pixel[0], pixel[1], pixel[2]];
    }
  } catch (e) {
    console.warn("Scratch canvas parse failed, falling back to computed style", e);
  }

  // Fallback via computed style
  try {
    const temp = document.createElement("div");
    temp.style.color = colorStr;
    document.body.appendChild(temp);
    const comp = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    const m = comp.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) {
      return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    }
  } catch (err) {
    console.error("Color parse error:", err);
  }

  return [37, 99, 235];
}

interface DynamicTShirtCharacterProps {
  className?: string;
}

export function DynamicTShirtCharacter({ className }: DynamicTShirtCharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached pixel structures for <1ms tinting
  const cacheRef = useRef<{
    width: number;
    height: number;
    baseData: Uint8ClampedArray;
    shirtIndices: Uint32Array;
    shirtLums: Float32Array;
  } | null>(null);

  const [isReady, setIsReady] = useState(false);

  // Keep track of the latest primary color for async callbacks
  const latestPrimaryRef = useRef("#7C2D4A");

  // Recolor function
  const applyThemeColor = useCallback((color: string) => {
    const canvas = canvasRef.current;
    const cache = cacheRef.current;
    if (!canvas || !cache) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const [tR, tG, tB] = parseCssColorToRgb(color);
    const { width, height, baseData, shirtIndices, shirtLums } = cache;

    // Fast clone of base image data
    const outputData = ctx.createImageData(width, height);
    outputData.data.set(baseData);
    const data = outputData.data;

    // Tint only shirt pixels using pre-indexed luminance map
    const len = shirtIndices.length;
    for (let i = 0; i < len; i++) {
      const idx = shirtIndices[i];
      const lum = shirtLums[i];
      data[idx] = Math.min(255, Math.round(tR * lum));
      data[idx + 1] = Math.min(255, Math.round(tG * lum));
      data[idx + 2] = Math.min(255, Math.round(tB * lum));
    }

    ctx.putImageData(outputData, 0, 0);
    setIsReady(true);
  }, []);

  // Initial load
  useEffect(() => {
    let isCancelled = false;

    async function loadAssets() {
      try {
        const heroImg = new Image();
        heroImg.src = "/assets/simplehero.png";

        const maskImg = new Image();
        maskImg.src = "/hero-mask.png";

        await Promise.all([
          new Promise((resolve, reject) => {
            if (heroImg.complete && heroImg.naturalWidth > 0) resolve(true);
            else {
              heroImg.onload = () => resolve(true);
              heroImg.onerror = reject;
            }
          }),
          new Promise((resolve, reject) => {
            if (maskImg.complete && maskImg.naturalWidth > 0) resolve(true);
            else {
              maskImg.onload = () => resolve(true);
              maskImg.onerror = reject;
            }
          }),
        ]);

        if (isCancelled) return;

        const width = heroImg.naturalWidth;
        const height = heroImg.naturalHeight;

        if (!width || !height) return;

        // Read hero pixels
        const heroCanvas = document.createElement("canvas");
        heroCanvas.width = width;
        heroCanvas.height = height;
        const heroCtx = heroCanvas.getContext("2d", { willReadFrequently: true });
        if (!heroCtx) return;
        heroCtx.drawImage(heroImg, 0, 0);
        const heroImageData = heroCtx.getImageData(0, 0, width, height);

        // Read mask pixels
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
        if (!maskCtx) return;
        maskCtx.drawImage(maskImg, 0, 0);
        const maskImageData = maskCtx.getImageData(0, 0, width, height);

        // Extract shirt indices and precompute luminance
        const hData = heroImageData.data;
        const mData = maskImageData.data;
        const indices: number[] = [];
        const lums: number[] = [];

        for (let i = 0; i < mData.length; i += 4) {
          if (mData[i] > 128) {
            indices.push(i);
            const r = hData[i];
            const g = hData[i + 1];
            const b = hData[i + 2];
            // Perceived luminance normalized to shirt midtone
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 140.0;
            lums.push(lum);
          }
        }

        cacheRef.current = {
          width,
          height,
          baseData: new Uint8ClampedArray(hData),
          shirtIndices: new Uint32Array(indices),
          shirtLums: new Float32Array(lums),
        };

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = width;
          canvas.height = height;
          applyThemeColor(latestPrimaryRef.current);
        }
      } catch (err) {
        console.error("Failed to initialize dynamic t-shirt character:", err);
      }
    }

    loadAssets();

    return () => {
      isCancelled = true;
    };
  }, [applyThemeColor]);

  // Re-apply whenever theme.primary changes
  // Re-apply once ready
  useEffect(() => {
    if (cacheRef.current) {
      applyThemeColor("#7C2D4A");
    }
  }, [applyThemeColor]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Dynamic Recolor Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] transition-opacity duration-500"
        style={{ opacity: isReady ? 1 : 0 }}
      />
    </div>
  );
}
