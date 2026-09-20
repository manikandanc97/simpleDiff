"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useThemeColor } from "@/components/theme/color-provider";
import { cn } from "@/lib/utils";
import { Terminal, Layers, ShieldCheck } from "lucide-react";

const CODE_SNIPPETS = [
  "const app = SimpleDiff.create();",
  "await app.deploy({ speed: 'instant' });",
  "// 🚀 MVP launched in 48 hours",
  "export default function Product() {}",
];

// Helper: Parse any color format (hex, oklch, hsl, rgb) to HSL
function parseColorToHsl(colorStr: string): [number, number, number] {
  if (!colorStr) return [218, 0.7, 0.45];

  // Hex format #RRGGBB
  if (colorStr.startsWith("#")) {
    const hex = colorStr.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
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

  // OKLCH format oklch(L C H)
  const oklch = colorStr.match(/oklch\s*\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (oklch) {
    return [Math.round(parseFloat(oklch[3])), Math.min(1, parseFloat(oklch[2]) * 4), parseFloat(oklch[1])];
  }

  // HSL format
  const hsl = colorStr.match(/hsl\s*\(\s*([\d.]+)/);
  if (hsl) {
    return [Math.round(parseFloat(hsl[1])), 0.8, 0.5];
  }

  return [218, 0.7, 0.45];
}

// Map any hue angle (0-360) to the best matching raytraced 3D polo image
function getVariantByHue(hue: number): string {
  const normHue = ((hue % 360) + 360) % 360;

  if (normHue >= 340 || normHue < 18) {
    return "/images/hero-3d-coder-red.png"; // Red / Crimson / Coral
  }
  if (normHue >= 18 && normHue < 60) {
    return "/images/hero-3d-coder-amber.png"; // Orange / Amber / Yellow
  }
  if (normHue >= 60 && normHue < 165) {
    return "/images/hero-3d-coder-green.png"; // Lime / Emerald / Green
  }
  if (normHue >= 165 && normHue < 205) {
    return "/images/hero-3d-coder-cyan.png"; // Teal / Cyan
  }
  if (normHue >= 205 && normHue < 250) {
    return "/images/hero-3d-coder-blue.png"; // Blue / Electric Blue
  }
  return "/images/hero-3d-coder-violet.png"; // Violet / Purple / Magenta
}

export function Hero3DCoder({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeColor();

  // Dynamic image selection for ANY color in the world
  const shirtImage = useMemo(() => {
    // 1. Direct ID matches for presets
    if (theme.id === "emerald") return "/images/hero-3d-coder-green.png";
    if (theme.id === "violet") return "/images/hero-3d-coder-violet.png";
    if (theme.id === "blue") return "/images/hero-3d-coder-blue.png";
    if (theme.id === "amber") return "/images/hero-3d-coder-amber.png";
    if (theme.id === "cyan") return "/images/hero-3d-coder-cyan.png";
    if (theme.id === "rose") return "/images/hero-3d-coder-red.png";

    // 2. For ANY custom color picked via color wheel/picker:
    const [h] = parseColorToHsl(theme.primary);
    return getVariantByHue(h);
  }, [theme.id, theme.primary]);

  // Mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typing code animation
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = CODE_SNIPPETS[snippetIndex];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < current.length) {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(current.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, snippetIndex]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-[480px] sm:max-w-[540px] aspect-square flex items-center justify-center select-none perspective-[1200px]",
        className
      )}
    >
      {/* Dynamic Ambient Background Glow matching active theme color */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-primary/15 to-transparent blur-3xl opacity-80 pointer-events-none animate-pulse-glow transition-colors duration-500" />
      <div className="absolute -inset-4 rounded-full bg-gradient-to-bl from-primary/20 via-transparent to-primary/10 blur-2xl pointer-events-none transition-colors duration-500" />

      {/* 3D Parallax Canvas */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Central 3D Coder Character with authentic raytraced 3D polo t-shirt */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 w-[85%] sm:w-[92%] h-[85%] sm:h-[92%] drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
        >
          {/* Authentic 3D Polo Coder with smooth cross-fade for all colors */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={shirtImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={shirtImage}
                alt="3D Developer Coding - SimpleDiff"
                width={600}
                height={600}
                priority
                className="w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Code Typing Window (Simulated IDE snippet) */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            x: [-4, 4, -4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(70px)" }}
          className="absolute -top-2 -left-2 sm:top-4 sm:-left-6 z-20 glass rounded-xl p-3 sm:p-3.5 border border-primary/30 shadow-xl shadow-primary/10 backdrop-blur-md max-w-[220px] sm:max-w-[250px]"
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-border/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 text-primary" /> main.tsx
            </span>
          </div>
          <div className="font-mono text-[11px] sm:text-xs text-foreground/90 leading-snug min-h-[34px] flex items-center">
            <span className="text-primary font-semibold mr-1">&gt;</span>
            <span className="text-foreground">{displayedText}</span>
            <span className="w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse inline-block" />
          </div>
        </motion.div>

        {/* Floating Tech Pill 1: Modern Tech Stacks (Generic, studio-grade) */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [1.5, -2, 1.5],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          style={{ transform: "translateZ(85px)" }}
          className="absolute top-10 -right-2 sm:top-14 sm:-right-4 z-20 glass px-3.5 py-1.5 rounded-full border border-border/80 shadow-lg flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <Layers className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold text-foreground tracking-tight">
            Modern Tech Stacks
          </span>
        </motion.div>

        {/* Floating Tech Pill 2: Shipped Live Status */}
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -bottom-2 -right-2 sm:bottom-6 sm:-right-4 z-20 glass px-3.5 py-2 rounded-xl border border-primary/25 shadow-lg flex items-center gap-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Production
            </div>
            <div className="text-xs font-bold text-foreground">
              100% Optimized
            </div>
          </div>
        </motion.div>

        {/* Floating Tech Pill 3: Clean Architecture */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            x: [3, -3, 3],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-6 -left-2 sm:bottom-12 sm:-left-4 z-20 glass px-3.5 py-1.5 rounded-full border border-border/80 shadow-md flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-3 h-3" />
          </div>
          <span className="text-xs font-medium text-foreground">
            Type-Safe Architecture
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
