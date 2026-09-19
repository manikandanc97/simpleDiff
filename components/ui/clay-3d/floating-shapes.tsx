"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Floating3DSphereProps {
  size?: number;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "diagonal";
  blur?: boolean;
}

/**
 * Realistic 3D Claymorphic Sphere with specular highlight and ambient depth shadow.
 * Dynamically adapts lighting and colors to the active theme's `var(--primary)`.
 */
export function Floating3DSphere({
  size = 64,
  className,
  delay = 0,
  duration = 6,
  direction = "up",
  blur = false,
}: Floating3DSphereProps) {
  const yOffset = direction === "up" ? -18 : direction === "down" ? 18 : -14;
  const xOffset = direction === "diagonal" ? 12 : 0;

  return (
    <motion.div
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, yOffset, 0],
        x: [0, xOffset, 0],
        rotate: [0, 4, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={cn("pointer-events-none select-none relative", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className={cn(
          "drop-shadow-[0_16px_28px_rgba(0,0,0,0.25)] transition-all duration-500",
          blur && "filter blur-sm opacity-60"
        )}
      >
        <defs>
          {/* Radial 3D Sphere Lighting using dynamic CSS theme variables */}
          <radialGradient id={`sphere-grad-${size}-${delay}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="25%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.98" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.45) c h)" />
          </radialGradient>

          {/* Deep ambient shadow ring */}
          <radialGradient id={`sphere-rim-${size}-${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.4)" />
          </radialGradient>

          {/* Glaze specular shine */}
          <linearGradient id={`sphere-glaze-${size}-${delay}`} x1="0%" y1="0%" x2="50%" y2="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer sphere body */}
        <circle cx="50" cy="50" r="46" fill={`url(#sphere-grad-${size}-${delay})`} />

        {/* Ambient shadow gradient */}
        <circle cx="50" cy="50" r="46" fill={`url(#sphere-rim-${size}-${delay})`} />

        {/* 3D Specular Highlight Oval */}
        <ellipse
          cx="38"
          cy="32"
          rx="18"
          ry="12"
          transform="rotate(-20 38 32)"
          fill={`url(#sphere-glaze-${size}-${delay})`}
        />

        {/* Secondary micro light reflection */}
        <circle cx="68" cy="72" r="10" fill="#ffffff" fillOpacity="0.18" />
      </svg>
    </motion.div>
  );
}

/**
 * 3D Torus Ring shape floating in 3D space with dynamic theme lighting
 */
export function Floating3DTorus({
  size = 72,
  className,
  delay = 0,
  duration = 7,
}: {
  size?: number;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ y: 0, rotate: -15 }}
      animate={{
        y: [0, -20, 0],
        rotate: [-15, 5, -15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={cn("pointer-events-none select-none relative", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        className="drop-shadow-[0_18px_32px_rgba(0,0,0,0.3)]"
      >
        <defs>
          <linearGradient id={`torus-grad-${size}-${delay}`} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="30%" stopColor="var(--primary)" />
            <stop offset="75%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.4) c h)" />
          </linearGradient>
          <radialGradient id={`torus-inner-${size}-${delay}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>
        </defs>

        {/* Torus body */}
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke={`url(#torus-grad-${size}-${delay})`}
          strokeWidth="24"
        />
        {/* Inner shadow overlay */}
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke={`url(#torus-inner-${size}-${delay})`}
          strokeWidth="24"
        />
        {/* Specular highlight arc */}
        <path
          d="M 32 40 A 40 40 0 0 1 70 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />
      </svg>
    </motion.div>
  );
}
