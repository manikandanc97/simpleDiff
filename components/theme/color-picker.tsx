"use client";

import { motion } from "motion/react";
import { COLOR_THEMES } from "@/lib/colors";
import { useThemeColor } from "@/components/theme/color-provider";
import { cn } from "@/lib/utils";

export function ColorPicker() {
  const { theme, setTheme } = useThemeColor();

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
        Choose your color
      </span>
      <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {COLOR_THEMES.map((t) => {
          const isActive = theme.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive ? "scale-110" : "hover:scale-105"
              )}
              aria-label={`Select ${t.name} theme`}
              title={t.name}
              style={{
                backgroundColor: t.primary,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-color-ring"
                  className="absolute -inset-1 rounded-full border-2"
                  style={{ borderColor: t.primary }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
