"use client";

import React from "react";
import { type LucideIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImagePlaceholderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  dimensionsText?: string;
  icon?: LucideIcon;
  aspectRatio?: "square" | "video" | "4/3" | "3/4" | "16/9" | "auto";
  className?: string;
  children?: React.ReactNode;
}

export function ImagePlaceholder({
  title = "Image Placeholder",
  subtitle = "Visual Asset Area",
  badge,
  dimensionsText,
  icon: Icon = ImageIcon,
  aspectRatio = "4/3",
  className,
  children,
}: ImagePlaceholderProps) {
  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-[16/9]",
    auto: "",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center select-none group",
        aspectClass,
        className
      )}
    >
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial Gradient Ambient Glow matching Primary */}
      <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent pointer-events-none transition-colors duration-500" />

      {/* Diagonal Technical Corner Accents */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-primary/50 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-primary/50 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-primary/50 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/50 pointer-events-none" />

      {/* Optional Top Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-mono font-medium text-foreground shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* Optional Dimension Tag */}
      {dimensionsText && (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-muted/80 backdrop-blur-md border border-border/60 text-[10px] font-mono text-muted-foreground">
          {dimensionsText}
        </div>
      )}

      {/* Central Icon Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 max-w-[85%]">
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/25 shadow-lg shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary relative z-10 transition-colors" />
        </div>

        <div className="space-y-1">
          <h5 className="text-xs sm:text-sm font-bold tracking-tight text-foreground line-clamp-1">
            {title}
          </h5>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-muted-foreground/70 pointer-events-none border-t border-border/40 pt-1.5">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-primary/80" />
          IMAGE_PLACEHOLDER
        </span>
        <span>STATUS: READY</span>
      </div>
    </div>
  );
}
