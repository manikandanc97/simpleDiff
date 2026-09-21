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

  const displayLabel = label || "Theme";

  return (
    <div className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full bg-background/95 backdrop-blur-xl border border-border/90 shadow-xl shadow-primary/10 transition-all hover:border-primary/50">
      {/* Section indicator badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/60 text-[10px] sm:text-[10.5px] font-mono font-medium text-muted-foreground select-none">
        <Sparkles className="w-2.5 h-2.5 text-primary shrink-0 animate-pulse" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={displayLabel}
            initial={{ opacity: 0, y: -5, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 5, filter: "blur(2px)" }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="text-foreground font-semibold inline-block max-w-[170px] sm:max-w-[280px] truncate"
            title={displayLabel}
          >
            {displayLabel}
          </motion.span>
        </AnimatePresence>
        <span className="text-border shrink-0">&bull;</span>
        <span className="text-muted-foreground shrink-0">Theme</span>
      </div>

      {/* 3 High-Contrast Color Palette Dots */}
      <div className="flex items-center gap-1.5 px-0.5 shrink-0">
        {DOCK_THEMES.map((t) => {
          const isActive = theme.id === t.id && !theme.isCustom;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-xs ring-1 ring-black/20 dark:ring-white/25",
                isActive ? "scale-110" : "hover:scale-105 opacity-95 hover:opacity-100"
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
        <div className="relative flex items-center justify-center ml-0.5 shrink-0">
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
              "relative flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full border border-dashed border-border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              theme.isCustom
                ? "scale-110 border-solid shadow-xs"
                : "hover:scale-105 hover:border-primary/60 bg-muted/40"
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
                "h-3 w-3 transition-colors",
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
      // Hide dock when user has scrolled near the bottom reveal wordmark/footer
      const scrollBottom = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 250;
      setIsNearBottom(scrollBottom >= threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = activeSlot === "floating" && !isNearBottom;

  if (!isVisible) {
    return null;
  }

  return (
    <motion.aside
      layoutId="unified-theme-dock"
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
        mass: 0.8,
      }}
      aria-label="Interactive color theme dock"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-[95vw] sm:max-w-max pointer-events-auto"
    >
      <ThemeDockContent label={activeLabel} />
    </motion.aside>
  );
}
