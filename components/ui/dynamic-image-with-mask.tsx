"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeColor } from "@/components/theme/color-provider";

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

interface DynamicImageWithMaskProps {
  src: string;
  maskSrc: string;
  alt?: string;
  className?: string;
}

export function DynamicImageWithMask({ src, maskSrc, alt = "Dynamic Image", className }: DynamicImageWithMaskProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeColor();

  // Cached pixel structures for <1ms tinting
  const cacheRef = useRef<{
    width: number;
    height: number;
    baseData: Uint8ClampedArray;
    maskIndices: Uint32Array;
    maskLums: Float32Array;
  } | null>(null);

  const [isReady, setIsReady] = useState(false);

  // Keep track of the latest primary color for async callbacks
  const latestPrimaryRef = useRef(theme.primary || "#2563EB");
  useEffect(() => {
    latestPrimaryRef.current = theme.primary || "#2563EB";
  }, [theme.primary]);

  // Recolor function
  const applyThemeColor = useCallback((color: string) => {
    const canvas = canvasRef.current;
    const cache = cacheRef.current;
    if (!canvas || !cache) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const [tR, tG, tB] = parseCssColorToRgb(color);
    const { width, height, baseData, maskIndices, maskLums } = cache;

    // Fast clone of base image data
    const outputData = ctx.createImageData(width, height);
    outputData.data.set(baseData);
    const data = outputData.data;

    // Tint only masked pixels using pre-indexed luminance map
    const len = maskIndices.length;
    for (let i = 0; i < len; i++) {
      const idx = maskIndices[i];
      const lum = maskLums[i];
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
        const baseImg = new Image();
        baseImg.src = src;

        const maskImg = new Image();
        maskImg.src = maskSrc;

        await Promise.all([
          new Promise((resolve, reject) => {
            if (baseImg.complete && baseImg.naturalWidth > 0) resolve(true);
            else {
              baseImg.onload = () => resolve(true);
              baseImg.onerror = reject;
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

        const width = baseImg.naturalWidth;
        const height = baseImg.naturalHeight;

        if (!width || !height) return;

        // Read base pixels
        const baseCanvas = document.createElement("canvas");
        baseCanvas.width = width;
        baseCanvas.height = height;
        const baseCtx = baseCanvas.getContext("2d", { willReadFrequently: true });
        if (!baseCtx) return;
        baseCtx.drawImage(baseImg, 0, 0);
        const baseImageData = baseCtx.getImageData(0, 0, width, height);

        // Read mask pixels
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
        if (!maskCtx) return;
        maskCtx.drawImage(maskImg, 0, 0);
        const maskImageData = maskCtx.getImageData(0, 0, width, height);

        // Extract mask indices and precompute luminance
        const hData = baseImageData.data;
        const mData = maskImageData.data;
        const indices: number[] = [];
        const lums: number[] = [];

        for (let i = 0; i < mData.length; i += 4) {
          if (mData[i] > 128) {
            indices.push(i);
            const r = hData[i];
            const g = hData[i + 1];
            const b = hData[i + 2];
            // Perceived luminance normalized to midtone
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 140.0;
            lums.push(lum);
          }
        }

        cacheRef.current = {
          width,
          height,
          baseData: new Uint8ClampedArray(hData),
          maskIndices: new Uint32Array(indices),
          maskLums: new Float32Array(lums),
        };

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = width;
          canvas.height = height;
          applyThemeColor(latestPrimaryRef.current);
        }
      } catch (err) {
        console.error("Failed to initialize dynamic image with mask:", err);
      }
    }

    loadAssets();

    return () => {
      isCancelled = true;
    };
  }, [src, maskSrc, applyThemeColor]);

  // Re-apply whenever theme.primary changes
  useEffect(() => {
    if (cacheRef.current && theme?.primary) {
      applyThemeColor(theme.primary);
    }
  }, [theme.primary, applyThemeColor]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className || ''}`}>
      {/* Dynamic Recolor Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isReady ? 1 : 0 }}
      />
    </div>
  );
}
