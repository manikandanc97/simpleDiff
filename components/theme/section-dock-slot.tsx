"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useDock } from "@/components/theme/dock-context";
import { ThemeDockContent } from "@/components/theme/floating-color-dock";
import { cn } from "@/lib/utils";

interface SectionDockSlotProps {
  sectionId?: string;
  label?: string;
  className?: string;
}

export const DOCK_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
  mass: 0.8,
};

export function SectionDockSlot({
  sectionId = "hero",
  label = "Hero",
  className,
}: SectionDockSlotProps) {
  const { activeSlot, registerSlot, unregisterSlot } = useDock();
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
        "relative inline-flex items-center min-h-[36px]",
        className
      )}
    >
      {isDocked ? (
        <motion.div
          layoutId="unified-theme-dock"
          transition={DOCK_SPRING}
          className="relative z-10"
        >
          <ThemeDockContent label={label} />
        </motion.div>
      ) : (
        <div
          className="h-8 sm:h-9 w-44 opacity-0 pointer-events-none select-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
