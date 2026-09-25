"use client";


import { type TechItem } from "@/types/tech";
import { motion } from "motion/react";
import Image from "next/image";

const SPRING = { type: "spring" as const, stiffness: 340, damping: 28 };

export function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.94 }}
      transition={{ ...SPRING, delay: Math.min(index * 0.03, 0.25) }}
      className="group relative flex flex-col items-center text-center gap-4 p-5 rounded-3xl border border-slate-200/70 dark:border-border/60 bg-white/95 dark:bg-card/90 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden h-full"
    >
      {/* Official Brand Logo Squircle Container */}
      <div className="relative w-15 h-15 rounded-2xl bg-[#F8FAFC] dark:bg-muted/40 border border-slate-100 dark:border-border/60 flex items-center justify-center p-3 shadow-2xs group-hover:scale-105 transition-transform duration-300">
        <Image
          src={`/images/tech-stack/${tech.slug}.svg`}
          alt={`${tech.name} logo`}
          width={38}
          height={38}
          className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${
            tech.invertInDark ? "dark:invert dark:brightness-125" : ""
          }`}
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
        {/* Tech Name */}
        <h3 className="text-base font-bold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors">
          {tech.name}
        </h3>

        {/* 2-line Description */}
        <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed text-center min-h-9 flex items-center justify-center">
          {tech.description}
        </p>
      </div>

      {/* Badge */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto">
        <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100/90 dark:bg-muted/50 text-slate-500 dark:text-muted-foreground border border-slate-200/50 dark:border-border/50">
          {tech.badge}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────


