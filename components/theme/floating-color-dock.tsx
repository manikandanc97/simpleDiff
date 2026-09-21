"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLOR_THEMES } from "@/lib/colors";
import { useThemeColor } from "@/components/theme/color-provider";
import { useDock } from "@/components/theme/dock-context";
import { cn } from "@/lib/utils";
import { Plus, Sparkles, Check } from "lucide-react";
import { ColorPickerDialog } from "@/components/theme/color-picker-dialog";

// RGB Trio: Red, Green, Blue
const DOCK_PRESET_IDS = ["red", "green", "blue"];
const DOCK_THEMES = DOCK_PRESET_IDS
  .map((id) => COLOR_THEMES.find((t) => t.id === id))
  .filter((t): t is (typeof COLOR_THEMES)[number] => Boolean(t));

export function ThemeDockContent({ label }: { label?: string }) {
  const { theme, setTheme } = useThemeColor();

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
                "relative flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-xs",
                isActive ? "scale-105" : "hover:scale-105 opacity-90 hover:opacity-100"
              )}
              aria-label={`Switch to ${t.name} color`}
              title={`${t.name} accent`}
              style={{ backgroundColor: t.primary }}
            >
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className="text-white flex items-center justify-center pointer-events-none"
                >
                  <Check className="w-3 h-3 stroke-[2.8] drop-shadow-xs" />
                </motion.div>
              )}
            </button>
          );
        })}

        {/* Plus button to open Brand Accent Colors popup dialog */}
        <div className="relative flex items-center justify-center ml-0.5 shrink-0">
          <ColorPickerDialog
            trigger={
              <button
                type="button"
                className={cn(
                  "relative flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  theme.isCustom
                    ? "scale-105 border-transparent shadow-xs"
                    : "border-dashed border-border hover:scale-105 hover:border-primary/60 bg-muted/40"
                )}
                style={
                  theme.isCustom
                    ? { backgroundColor: theme.primary }
                    : undefined
                }
                title="Brand accent colors & custom palette (+)"
                aria-label="Open brand accent colors dialog"
              >
                {theme.isCustom ? (
                  <Check className="h-3 w-3 text-white stroke-[2.8] drop-shadow-xs" />
                ) : (
                  <Plus className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                )}
              </button>
            }
          />
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
