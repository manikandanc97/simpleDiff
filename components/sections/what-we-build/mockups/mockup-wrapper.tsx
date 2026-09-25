"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface MockupWrapperProps {
  isActive?: boolean;
  gradientClass: string;
  children: ReactNode;
  innerClassName?: string;
  floatDuration?: number;
  floatY?: number;
  outerChildren?: ReactNode;
}

export function MockupWrapper({
  isActive,
  gradientClass,
  children,
  innerClassName = "max-w-72 p-3.5 gap-3",
  floatDuration = 4.5,
  floatY = 3,
  outerChildren,
}: MockupWrapperProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Background ambient glow */}
      <div className={`absolute inset-0 rounded-3xl blur-[30px] pointer-events-none -z-10 ${gradientClass}`} />

      {/* Floating Mockup Card */}
      <motion.div
        animate={isActive ? { y: [-floatY, floatY, -floatY] } : { y: 0 }}
        transition={{ duration: floatDuration, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className={`relative w-full bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)] flex flex-col ${innerClassName}`}
      >
        {children}
      </motion.div>

      {outerChildren}
    </div>
  );
}
