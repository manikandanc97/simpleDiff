"use client";

import React from "react";
import { motion } from "motion/react";

export function HeroGridAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* Architectural Corner & Grid Crosshairs */}
      <div className="absolute top-5 left-6 md:left-10 hidden sm:flex items-center gap-2 opacity-35">
        <span className="font-mono text-primary text-xs font-semibold select-none">+</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          SYS // 01.ENGINEERING
        </span>
      </div>

      <div className="absolute top-5 right-6 md:right-10 hidden lg:flex items-center gap-2.5 opacity-35">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          LATENCY // &lt;40MS
        </span>
        <span className="font-mono text-primary text-xs font-semibold select-none">+</span>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-6 md:left-10 hidden lg:flex items-center gap-2 opacity-40 z-10">
        <span className="font-mono text-primary text-xs font-semibold select-none">+</span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/70">
          COORDINATES // 13.0827°N 80.2707°E
        </span>
      </div>

      {/* Subtle Precision Grid Intersection Crosshairs */}
      <div className="absolute top-1/3 left-1/4 hidden md:block text-primary/30 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-2/3 right-1/4 hidden md:block text-primary/30 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-1/4 right-1/3 hidden lg:block text-primary/25 font-mono text-xs select-none">
        +
      </div>

      {/* Delicate Architectural Blueprint Corner Brackets */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] pointer-events-none hidden xl:block">
        {/* Top-Left Bracket */}
        <svg
          className="absolute top-0 left-0 w-8 h-8 text-border/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 16 L 0 0 L 16 0" />
        </svg>

        {/* Top-Right Bracket */}
        <svg
          className="absolute top-0 right-0 w-8 h-8 text-border/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 16 0 L 32 0 L 32 16" />
        </svg>

        {/* Bottom-Left Bracket */}
        <svg
          className="absolute bottom-0 left-0 w-8 h-8 text-border/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 16 L 0 32 L 16 32" />
        </svg>

        {/* Bottom-Right Bracket */}
        <svg
          className="absolute bottom-0 right-0 w-8 h-8 text-border/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 16 32 L 32 32 L 32 16" />
        </svg>
      </div>

      {/* Soft Luminous Background Glow Ray behind center */}
      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-3xl pointer-events-none"
      />
    </div>
  );
}
