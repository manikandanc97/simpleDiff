"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { useThemeColor } from "@/components/theme/color-provider";
import { useFont } from "@/components/theme/font-provider";
import { FontPickerDialog } from "@/components/theme/font-picker";
import { ColorPickerDialog } from "@/components/theme/color-picker-dialog";
import { COLOR_THEMES } from "@/lib/colors";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import {
  X,
  ChevronRight,
  Sun,
  Moon,
  Type,
  Palette,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  AnimatedIcon,
  AnimatedArrowRight,
  AnimatedX,
  AnimatedSparkles,
  AnimatedPalette,
  AnimatedType,
  AnimatedMoon,
  AnimatedSun,
  AnimatedChevronRight,
  AnimatedMail,
  type AnimatedIconName,
} from "@/components/ui/animated-icon";

const ROUTE_ICON_NAMES: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/lab": "lightbulb",
  "/about": "info",
};

interface MobileAppMenuProps {
  open: boolean;
  onClose: () => void;
}

const NAV_SUBTITLES: Record<string, string> = {
  "/": "Software development company home",
  "/work": "Selected enterprise systems & apps",
  "/services": "Custom software, web & mobile engineering",
  "/lab": "Prototypes, concepts & interactive tools",
  "/about": "Company ethos, team & capabilities",
};

export function MobileAppMenu({ open, onClose }: MobileAppMenuProps) {
  const pathname = usePathname();
  const { openLead } = useLead();
  const { theme, setTheme, mode, setMode } = useThemeColor();
  const { font } = useFont();

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleStartProject = () => {
    onClose();
    openLead({ source: "mobile-app-menu" });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Native Mobile App Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Sheet"
            className="relative z-10 w-full max-h-[90vh] bg-background/95 backdrop-blur-2xl border-t border-border/80 rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Sheet Notch Drag Handle */}
            <div className="pt-3 pb-1.5 flex justify-center shrink-0 cursor-grab">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>

            {/* App Header */}
            <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center font-bold text-sm">
                  S<span className="text-primary font-black">D</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-tight text-foreground">
                      Simple<span className="text-primary">Diff</span>
                    </span>
                    <span className="inline-flex items-center text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                      Available
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Software Development Company</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="group w-8 h-8 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
              >
                <AnimatedX size={16} />
              </button>
            </div>

            {/* Scrollable Sheet Content */}
            <div className="overflow-y-auto px-5 py-4 space-y-5 overscroll-contain">
              {/* Quick Customization Hub */}
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <AnimatedSparkles size={14} className="text-primary" />
                    Quick Controls
                  </span>
                  <span className="text-[10px] text-muted-foreground">Tap to switch</span>
                </div>

                {/* Color Swatches Strip */}
                <div className="flex items-center justify-between gap-1.5 pt-0.5">
                  <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                    {COLOR_THEMES.slice(0, 6).map((t) => {
                      const isActive = theme.id === t.id && !theme.isCustom;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTheme(t.id)}
                          className={cn(
                            "relative w-7 h-7 rounded-full shrink-0 transition-transform cursor-pointer ring-1 ring-black/15 dark:ring-white/20",
                            isActive ? "scale-115 ring-2 ring-primary" : "hover:scale-105 opacity-90"
                          )}
                          style={{ backgroundColor: t.primary }}
                          aria-label={`Select ${t.name} color`}
                          title={t.name}
                        />
                      );
                    })}
                  </div>

                  <ColorPickerDialog
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="group rounded-full text-xs h-7 px-2.5 gap-1.5 cursor-pointer shrink-0 border-border"
                      >
                        <AnimatedPalette size={12} className="text-primary" />
                        <span>All</span>
                      </Button>
                    }
                  />
                </div>

                {/* Font & Theme Switchers Row */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/50">
                  <FontPickerDialog
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="group w-full justify-between rounded-xl text-xs h-9 px-3 cursor-pointer bg-background/50 border-border/80"
                      >
                        <span className="flex items-center gap-1.5 truncate text-muted-foreground">
                          <AnimatedType size={14} className="text-primary shrink-0" />
                          <span className="truncate">{font}</span>
                        </span>
                        <AnimatedChevronRight size={14} className="opacity-60 shrink-0" />
                      </Button>
                    }
                  />

                  {/* Dark / Light Toggle */}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                    className="group flex items-center justify-between px-3 h-9 rounded-xl border border-border/80 bg-background/50 text-xs text-foreground cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      {mode === "dark" ? (
                        <AnimatedMoon size={14} className="text-primary" />
                      ) : (
                        <AnimatedSun size={14} className="text-amber-500" />
                      )}
                      <span className="capitalize">{mode} mode</span>
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {mode === "dark" ? "Dark" : "Light"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Native App Navigation List */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  Navigation
                </span>

                <div className="space-y-1.5">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.route;
                    const iconName = ROUTE_ICON_NAMES[item.route] || "sparkles";
                    const subtitle = NAV_SUBTITLES[item.route] || "Explore this page";

                    return (
                      <Link
                        key={item.route}
                        href={item.route}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.98]",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "bg-muted/30 hover:bg-muted/60 text-foreground border border-border/60"
                        )}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary border border-primary/20"
                            )}
                          >
                            <AnimatedIcon
                              name={iconName}
                              size={20}
                              className={isActive ? "text-white" : "text-primary"}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm tracking-tight leading-tight truncate">
                              {item.label}
                            </p>
                            <p
                              className={cn(
                                "text-[11px] truncate mt-0.5",
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                              )}
                            >
                              {subtitle}
                            </p>
                          </div>
                        </div>

                        <AnimatedChevronRight
                          size={16}
                          className={cn(
                            "shrink-0 opacity-70 ml-2",
                            isActive ? "text-primary-foreground" : "text-muted-foreground"
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  onClick={handleStartProject}
                  className="w-full h-12 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/25 cursor-pointer flex items-center justify-center gap-2 group/button active:scale-[0.98] transition-transform"
                >
                  <span>Start a project</span>
                  <AnimatedArrowRight size={16} />
                </Button>

                <div className="flex items-center justify-between px-2 text-[11px] text-muted-foreground">
                  <a
                    href="mailto:hello@simplediff.design"
                    className="group inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <AnimatedMail size={13} className="text-primary" />
                    <span>hello@simplediff.design</span>
                  </a>
                  <span className="font-mono text-[10px]">SimpleDiff Software v2.4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
