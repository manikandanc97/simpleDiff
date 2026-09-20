"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLOR_THEMES } from "@/lib/colors";
import { useThemeColor } from "@/components/theme/color-provider";
import { useDock } from "@/components/theme/dock-context";
import { cn } from "@/lib/utils";
import { Plus, Sparkles } from "lucide-react";

// RGB Trio: Red, Green, Blue
const DOCK_PRESET_IDS = ["red", "green", "blue"];
const DOCK_THEMES = DOCK_PRESET_IDS
  .map((id) => COLOR_THEMES.find((t) => t.id === id))
  .filter((t): t is (typeof COLOR_THEMES)[number] => Boolean(t));

export function ThemeDockContent({ label }: { label?: string }) {
  const { theme, setTheme, setCustomColor, customColor } = useThemeColor();
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-background/95 backdrop-blur-xl border border-border/90 shadow-xl shadow-primary/10 transition-all hover:border-primary/50">
      {/* Section indicator badge */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-[11px] font-mono font-medium text-muted-foreground select-none">
        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.span
            key={label || "Theme"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-foreground font-semibold"
          >
            {label || "Theme"}
          </motion.span>
        </AnimatePresence>
        <span className="text-border">&bull;</span>
        <span className="text-muted-foreground">Theme</span>
      </div>

      {/* 3 High-Contrast Color Palette Dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-1">
        {DOCK_THEMES.map((t) => {
          const isActive = theme.id === t.id && !theme.isCustom;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-xs ring-1 ring-black/20 dark:ring-white/25",
                isActive ? "scale-115" : "hover:scale-110 opacity-95 hover:opacity-100"
              )}
              aria-label={`Switch to ${t.name} color`}
              title={`${t.name} accent`}
              style={{ backgroundColor: t.primary }}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active-ring"
                  className="absolute -inset-1 rounded-full border-2 shadow-xs"
                  style={{ borderColor: t.primary }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                />
              )}
            </button>
          );
        })}

        {/* Plus button for Custom Color Wheel */}
        <div className="relative flex items-center justify-center ml-0.5">
          <input
            ref={colorInputRef}
            type="color"
            value={theme.isCustom ? theme.primary : customColor}
            onChange={handleCustomColorChange}
            className="sr-only"
            id="dock-color-wheel"
            aria-label="Pick any custom color"
          />
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            className={cn(
              "relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-dashed border-border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              theme.isCustom
                ? "scale-115 border-solid shadow-xs"
                : "hover:scale-110 hover:border-primary/60 bg-muted/40"
            )}
            style={
              theme.isCustom
                ? { backgroundColor: theme.primary, borderColor: theme.primary }
                : undefined
            }
            title="Custom color wheel (+ any color)"
            aria-label="Custom color wheel"
          >
            {theme.isCustom && (
              <motion.div
                layoutId="dock-active-ring"
                className="absolute -inset-1 rounded-full border-2"
                style={{ borderColor: theme.primary }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
              />
            )}
            <Plus
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                theme.isCustom ? "text-white" : "text-muted-foreground hover:text-foreground"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FloatingColorDock() {
  const { activeSlot, activeLabel } = useDock();
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide dock when user has scrolled near the bottom reveal wordmark
      const scrollBottom = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 320;
      setIsNearBottom(scrollBottom >= threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only render the fixed floating dock when the dock is NOT docked in any section slot and NOT near the bottom wordmark
  if (activeSlot !== "floating" || isNearBottom) {
    return null;
  }

  return (
    <motion.aside
      layoutId="unified-theme-dock"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      aria-label="Interactive color theme dock"
      className="fixed bottom-20 md:bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-[95vw] sm:max-w-max pointer-events-auto"
    >
      <ThemeDockContent label={activeLabel} />
    </motion.aside>
  );
}
