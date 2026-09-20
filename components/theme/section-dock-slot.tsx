"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useDock } from "@/components/theme/dock-context";
import { ThemeDockContent } from "@/components/theme/floating-color-dock";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface SectionDockSlotProps {
  sectionId: string;
  label: string;
  className?: string;
}

export function SectionDockSlot({
  sectionId,
  label,
  className,
}: SectionDockSlotProps) {
  const { activeSlot, registerSlot, unregisterSlot, scrollToSlot } = useDock();
  const slotRef = useRef<HTMLDivElement>(null);
  const isDocked = activeSlot === sectionId;

  useEffect(() => {
    if (slotRef.current) {
      registerSlot(sectionId, label, slotRef.current);
    }
    return () => {
      unregisterSlot(sectionId);
    };
  }, [sectionId, label, registerSlot, unregisterSlot]);

  return (
    <div
      ref={slotRef}
      id={`dock-slot-${sectionId}`}
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-300",
        className
      )}
    >
      {isDocked ? (
        <div className="relative p-0.5 sm:p-1 rounded-full border border-primary/30 bg-primary/5 shadow-sm shadow-primary/10 transition-colors duration-500">
          <motion.div
            layoutId="unified-theme-dock"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10"
          >
            <ThemeDockContent label={label} />
          </motion.div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => scrollToSlot(sectionId)}
          title={`Click to snap theme dock to ${label}`}
          className="group relative flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full border border-dashed border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40 backdrop-blur-xs transition-all duration-300 cursor-pointer select-none"
        >
          {/* Ghost section badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/40 text-[10px] sm:text-[10.5px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <span>{label}</span>
            <span className="text-border">&bull;</span>
            <span className="text-muted-foreground/70">Theme Slot</span>
          </div>

          {/* 3 ghost dots + ghost plus */}
          <div className="flex items-center gap-1.5 px-0.5 opacity-50 group-hover:opacity-85 transition-opacity">
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-dashed border-border/80 bg-muted/40" />
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-dashed border-border/80 bg-muted/40" />
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-dashed border-border/80 bg-muted/40" />
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-dashed border-border/80 bg-muted/40 flex items-center justify-center text-muted-foreground">
              <Plus className="w-2.5 h-2.5 text-muted-foreground/60" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
