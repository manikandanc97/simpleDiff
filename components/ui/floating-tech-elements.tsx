"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FloatingTechItem {
  slug: string;
  label?: string; // Used only for HTML title tooltip on hover, NO visible text
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  rotateOffset?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  invertInDark?: boolean;
}

interface FloatingTechBadgeProps {
  item: FloatingTechItem;
}

/**
 * Enterprise Minimalist Floating Tech Icon Tile
 * Pure SVG icon inside a refined frosted glass squircle — zero bulky text.
 */
export function FloatingTechBadge({ item }: FloatingTechBadgeProps) {
  const {
    slug,
    label,
    top,
    bottom,
    left,
    right,
    duration = 8,
    delay = 0,
    yOffset = 10,
    rotateOffset = 3,
    size = "md",
    className,
    invertInDark = false,
  } = item;

  const sizeStyles = {
    sm: "w-9 h-9 p-2 rounded-xl",
    md: "w-11 h-11 sm:w-12 sm:h-12 p-2.5 rounded-2xl",
    lg: "w-14 h-14 p-3 rounded-2xl",
  }[size];

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [-yOffset, yOffset, -yOffset],
        rotate: [-rotateOffset, rotateOffset, -rotateOffset],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: duration * 1.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        opacity: { duration: 0.7, delay: Math.min(delay, 0.4) },
        scale: { duration: 0.7, delay: Math.min(delay, 0.4) },
      }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
      }}
      title={label || slug}
      className={cn(
        // Responsive visibility: shown on xl screens where gutter space is ample
        "z-20 hidden xl:flex items-center justify-center",
        // Enterprise frosted glass aesthetic
        "bg-background/80 dark:bg-card/45 backdrop-blur-md",
        "border border-border/60 hover:border-primary/50",
        "shadow-xs hover:shadow-xl hover:shadow-primary/10",
        "transition-all duration-300 select-none cursor-default group",
        sizeStyles,
        className
      )}
    >
      {/* Subtle ambient glow behind the icon */}
      <div className="absolute inset-0 rounded-[inherit] bg-primary/[0.03] group-hover:bg-primary/[0.08] transition-colors pointer-events-none" />

      {/* Pure SVG Icon */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={`/images/tech-stack/${slug}.svg`}
          alt={label || `${slug} icon`}
          width={iconSizes}
          height={iconSizes}
          className={cn(
            "w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-xs",
            invertInDark && "dark:invert dark:brightness-125"
          )}
        />
      </div>

      {/* Hairline corner highlight for enterprise precision */}
      <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-border/40 group-hover:bg-primary/50 transition-colors pointer-events-none" />
    </motion.div>
  );
}

/**
 * Ambient Container for Floating Tech Icons
 */
export function FloatingTechGroup({ items }: { items: FloatingTechItem[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <div className="relative w-full h-full pointer-events-auto">
        {items.map((item, idx) => (
          <FloatingTechBadge key={`${item.slug}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}
