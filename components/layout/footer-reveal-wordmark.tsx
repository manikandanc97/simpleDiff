"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function FooterRevealWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the bottom reveal container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Reveal effect: As user scrolls to the absolute end, wordmark emerges upward
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.35, 0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      ref={containerRef}
      aria-label="SimpleDiff Brand Finale"
      className="relative w-full overflow-hidden select-none pointer-events-none bg-background border-t border-border/40 pt-8 sm:pt-12 pb-0"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full flex items-end justify-center leading-none"
      >
        <h2 className="text-[18.3vw] font-black tracking-tighter leading-[0.74] text-center whitespace-nowrap block w-full select-none -mb-1 sm:-mb-2 transition-colors">
          <span className="text-foreground/10 dark:text-foreground/15 transition-colors">
            Simple
          </span>
          <span className="text-primary transition-colors">
            Diff
          </span>
        </h2>
      </motion.div>
    </section>
  );
}
