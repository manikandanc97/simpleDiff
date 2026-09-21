"use client";

import React, { useRef, useEffect, useState } from "react";
import { SiteLogo } from "@/components/ui/site-logo";
import { useThemeColor } from "@/components/theme/color-provider";

export function DynamicTShirtCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { theme } = useThemeColor();
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to parse hex color to RGB
  const hexToRgb = (hex: string) => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    }
    return [37, 99, 235]; // Default fallback (blue)
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !isLoaded) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions to match image natural dimensions
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw the original image
    ctx.drawImage(img, 0, 0, width, height);
    
    // Get image data for pixel manipulation
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    const [targetR, targetG, targetB] = hexToRgb(theme.primary || "#2563EB");

    // Loop through every pixel
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a === 0) continue; // Skip transparent pixels

      // Detect Magenta/Pink t-shirt
      // The generated shirt is magenta (#FF00FF). We look for high red and blue, low green.
      const isMagenta = r > 120 && b > 120 && g < r - 40 && g < b - 40;

      if (isMagenta) {
        // Calculate luminosity of the original pixel
        // Using average of R and B since they are the dominant channels in magenta
        const brightness = ((r + b) / 2) / 255;
        
        // Enhance brightness factor slightly for a vivid look
        const lum = Math.min(1.2, Math.max(0.3, brightness));

        // Tint the pixel with the target color multiplied by original luminosity
        data[i] = Math.min(255, targetR * lum);
        data[i + 1] = Math.min(255, targetG * lum);
        data[i + 2] = Math.min(255, targetB * lum);
      }
    }

    // Put modified data back
    ctx.putImageData(imageData, 0, 0);
  }, [theme.primary, isLoaded]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      {/* Hidden original image for source data */}
      <img
        ref={imageRef}
        src="/hero-coder.png"
        alt="Developer"
        className="hidden"
        crossOrigin="anonymous"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Processed Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[120%] h-[120%] max-w-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* 3D Transform Logo Overlay */}
      <div 
        className="absolute transition-colors duration-500 flex items-center justify-center z-20"
        style={{
          // Relative to container, position it over the chest area
          top: "45%",
          left: "40%",
          transform: "translate(-50%, -50%) perspective(400px) rotateY(10deg) rotateX(5deg) rotateZ(-2deg)",
          opacity: isLoaded ? 0.95 : 0
        }}
      >
        <SiteLogo className="text-xl sm:text-2xl mix-blend-overlay opacity-90 drop-shadow-md text-white/90" />
      </div>
    </div>
  );
}
