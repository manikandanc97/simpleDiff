"use client";

import React, { useRef } from "react";
import Image from "next/image";
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
      className="relative w-full overflow-hidden select-none pointer-events-none bg-background flex items-center justify-center"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full flex items-end justify-center leading-none"
      >
        <div className="w-full flex items-end justify-center leading-none -my-[6%] sm:-my-[8%] md:-my-[10%]">
          <Image
            src="/logo.png"
            alt="SimpleThink Logo"
            width={1200}
            height={240}
            className="w-full h-auto object-contain opacity-90"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
