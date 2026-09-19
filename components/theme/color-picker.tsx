"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { COLOR_THEMES } from "@/lib/colors";
import { useThemeColor } from "@/components/theme/color-provider";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ColorPickerProps {
  compact?: boolean;
}

export function ColorPicker({ compact = false }: ColorPickerProps) {
  const { theme, setTheme, setCustomColor, customColor } = useThemeColor();
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {!compact && (
        <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
          Choose brand accent
        </span>
      )}

      <div className="flex items-center gap-2 p-1.5 bg-muted/50 rounded-full border border-border shadow-xs">
        {COLOR_THEMES.map((t) => {
          const isActive = theme.id === t.id && !theme.isCustom;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
                isActive ? "scale-110" : "hover:scale-105 opacity-90 hover:opacity-100"
              )}
              aria-label={`Select ${t.name} accent`}
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
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                />
              )}
            </button>
          );
        })}

        {/* Plus Icon Button for Custom Color Wheel */}
        <div className="relative flex items-center justify-center">
          <input
            ref={colorInputRef}
            type="color"
            value={theme.isCustom ? theme.primary : customColor}
            onChange={handleCustomColorChange}
            className="sr-only"
            id="custom-color-wheel"
            aria-label="Pick custom accent color"
          />
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            className={cn(
              "relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-dashed border-border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              theme.isCustom
                ? "scale-110 border-solid shadow-xs"
                : "hover:scale-105 hover:border-primary/60 bg-background/50"
            )}
            style={
              theme.isCustom
                ? { backgroundColor: theme.primary, borderColor: theme.primary }
                : undefined
            }
            title="Pick custom color from color wheel"
            aria-label="Custom color wheel"
          >
            {theme.isCustom && (
              <motion.div
                layoutId="active-color-ring"
                className="absolute -inset-1 rounded-full border-2"
                style={{ borderColor: theme.primary }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              />
            )}
            <Plus
              className={cn(
                "h-4 w-4 transition-colors",
                theme.isCustom ? "text-white" : "text-muted-foreground hover:text-foreground"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
