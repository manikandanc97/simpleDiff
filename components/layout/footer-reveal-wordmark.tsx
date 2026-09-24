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
      aria-label="SimpleThink Brand Finale"
      className="relative w-full overflow-hidden select-none pointer-events-none bg-background border-t border-border/40 pt-6 sm:pt-10 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-2"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full flex items-end justify-center leading-none"
      >
        <div className="w-full flex items-end justify-center leading-none">
          <svg
            viewBox="0 0 1000 170"
            className="w-full h-auto block select-none"
            aria-hidden="true"
          >
            <text
              x="0"
              y="142"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontSize="200"
              fontWeight="900"
              letterSpacing="-0.04em"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
              className="select-none font-black"
            >
              <tspan className="fill-foreground/25 dark:fill-foreground/30 transition-colors">
                SIMPLE
              </tspan>
              <tspan className="fill-primary transition-colors">
                THINK
              </tspan>
            </text>
          </svg>
          <span className="sr-only">SimpleThink</span>
        </div>
      </motion.div>
    </section>
  );
}
