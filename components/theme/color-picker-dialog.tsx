"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLOR_THEMES } from "@/lib/colors";
import { useThemeColor } from "@/components/theme/color-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, RotateCcw, Plus, ChevronDown, Pipette } from "lucide-react";
import {
  AnimatedPalette,
  AnimatedCheck,
  AnimatedSparkles,
  AnimatedArrowRight,
} from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

interface ColorPickerDialogProps {
  trigger?: React.ReactNode;
}

export function ColorPickerDialog({ trigger }: ColorPickerDialogProps) {
  const { theme, setTheme, setCustomColor, customColor } = useThemeColor();
  const [open, setOpen] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [hexInput, setHexInput] = useState(theme.isCustom ? theme.primary : "#2563EB");
  const [showCustom, setShowCustom] = useState(Boolean(theme.isCustom));

  React.useEffect(() => {
    if (open) {
      // eslint-disable-next-line
      setHexInput(theme.isCustom ? theme.primary : (theme.primary || "#2563EB"));
      if (theme.isCustom) {
        setShowCustom(true);
      }
    }
  }, [open, theme]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    setCustomColor(val);
  };

  const handleHexSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hexInput.trim())) {
      setCustomColor(hexInput.trim());
    }
  };

  const handleReset = () => {
    setTheme("blue");
    setHexInput("#2563EB");
    setShowCustom(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              className="group rounded-full text-muted-foreground hover:text-foreground cursor-pointer relative active:scale-90 transition-all"
              title={`Change color theme (current: ${theme.name})`}
              aria-label={`Change accent color (current: ${theme.name})`}
            >
              <AnimatedPalette size={16} />
              <span
                className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ring-2 ring-background shadow-xs transition-transform"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="sr-only">Change accent color</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-hidden flex flex-col p-6">
        <DialogHeader className="pb-2 border-b border-border/70">
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <AnimatedPalette size={18} className="text-primary" />
              Brand Accent Colors
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Choose a curated accent color or define a custom shade. All buttons, highlights,
            and interactive glow elements update instantly with high contrast.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pt-4 pr-1 space-y-5">
          {/* Active Color Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/70 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl shadow-xs ring-2 ring-background border border-black/10 flex items-center justify-center shrink-0"
                style={{ backgroundColor: theme.primary }}
              >
                <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Active Color
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-xs">
                    {theme.name}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  {theme.isCustom ? theme.primary : "Preset Accent"}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="group text-xs h-8 rounded-full gap-1.5 cursor-pointer hover:bg-muted active:scale-95 transition-all"
              title="Reset accent color to default blue"
            >
              <RotateCcw className="w-3.5 h-3.5 text-muted-foreground group-hover:-rotate-90 group-active:-rotate-180 transition-transform duration-200" />
              <span>Reset</span>
            </Button>
          </div>

          {/* Curated Color Themes Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Curated Palettes
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {COLOR_THEMES.length} Presets
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {COLOR_THEMES.map((t) => {
                const isActive = theme.id === t.id && !theme.isCustom;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "group relative flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary bg-primary/8 shadow-xs ring-1 ring-primary/40"
                        : "border-border/70 hover:border-border hover:bg-muted/40"
                    )}
                  >
                    <span
                      className="relative w-7 h-7 rounded-full shrink-0 shadow-xs ring-1 ring-black/10 dark:ring-white/20 flex items-center justify-center"
                      style={{ backgroundColor: t.primary }}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white"
                        >
                          <Check className="w-3.5 h-3.5 drop-shadow-xs" />
                        </motion.div>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {isActive ? "Active" : "Select"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Option / Collapsible Trigger */}
          <div className="rounded-xl border border-border/70 bg-muted/20 overflow-hidden transition-all">
            <button
              type="button"
              id="dialog-custom-color-trigger"
              onClick={() => setShowCustom((prev) => !prev)}
              className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer hover:bg-muted/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={showCustom}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
                  <Pipette className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    Custom Color
                    {theme.isCustom && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-primary text-primary-foreground font-medium">
                        Active
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    {showCustom
                      ? "Enter HEX code or pick from color wheel"
                      : "Click to enter HEX or choose from color wheel"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary">
                  {showCustom ? "Close" : "+ Custom Color"}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    showCustom && "rotate-180"
                  )}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {showCustom && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 pt-1 border-t border-border/60 space-y-3">
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Type HEX Code or Pick Color Wheel
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">Any HEX color</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Color Wheel Trigger */}
                      <div className="relative shrink-0">
                        <input
                          ref={colorInputRef}
                          type="color"
                          value={theme.isCustom ? theme.primary : customColor}
                          onChange={handleCustomColorChange}
                          className="sr-only"
                          id="dialog-custom-color-wheel"
                          aria-label="Pick custom color from palette"
                        />
                        <button
                          type="button"
                          onClick={() => colorInputRef.current?.click()}
                          className="w-10 h-10 rounded-xl border-2 border-border/80 shadow-xs transition-transform hover:scale-105 cursor-pointer relative overflow-hidden flex items-center justify-center group"
                          style={{
                            backgroundColor: theme.isCustom ? theme.primary : hexInput,
                          }}
                          title="Click to open system color wheel"
                        >
                          <Plus className="w-4 h-4 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                        </button>
                      </div>

                      {/* Hex Code Input Form */}
                      <form onSubmit={handleHexSubmit} className="flex items-center gap-2 flex-1">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground">
                            #
                          </span>
                          <input
                            type="text"
                            value={hexInput.replace(/^#/, "")}
                            onChange={(e) => setHexInput(`#${e.target.value}`)}
                            placeholder="2563EB"
                            maxLength={7}
                            autoFocus
                            className="w-full h-9 pl-7 pr-3 rounded-lg border border-border/80 bg-background text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          className="group/button h-9 px-3.5 rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                          disabled={!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hexInput.trim())}
                        >
                          <AnimatedCheck size={14} />
                          <span>Apply</span>
                        </Button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Live Preview */}
          <div className="p-3.5 rounded-xl border border-border/60 bg-muted/10 space-y-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Live Preview
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button size="sm" className="rounded-full text-xs h-8 cursor-default pointer-events-none flex items-center gap-1.5">
                <AnimatedSparkles size={13} />
                <span>Primary Button</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 border-primary/50 text-primary cursor-default pointer-events-none flex items-center gap-1.5"
              >
                <span>Outlined</span>
                <AnimatedArrowRight size={12} />
              </Button>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/25">
                <AnimatedSparkles size={12} /> Badge
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
