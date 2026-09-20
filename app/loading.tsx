"use client";

import { motion } from "motion/react";

/* ─────────────────────────────────────────────
   Shimmer skeleton atom
   ───────────────────────────────────────────── */
function SkeletonLine({
  width = "100%",
  height = "1rem",
  delay = 0,
  rounded = "rounded-full",
}: {
  width?: string;
  height?: string;
  delay?: number;
  rounded?: string;
}) {
  return (
    <motion.div
      className={`${rounded} overflow-hidden bg-primary/6`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="h-full w-[55%] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 10%, var(--background)) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "280%"] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.2,
          repeatDelay: 0.3,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main loading screen
   ───────────────────────────────────────────── */
export default function Loading() {
  return (
    <div
      className="w-full flex flex-col"
      aria-label="Loading page content"
      aria-live="polite"
      role="status"
    >
      {/* ── Hero skeleton ── */}
      <section className="w-full min-h-[60vh] flex flex-col items-start justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 gap-6">
        {/* Badge pill */}
        <SkeletonLine width="120px" height="28px" delay={0} rounded="rounded-full" />

        {/* H1 lines */}
        <div className="w-full max-w-2xl flex flex-col gap-3">
          <SkeletonLine width="92%" height="52px" delay={0.05} rounded="rounded-xl" />
          <SkeletonLine width="78%" height="52px" delay={0.1} rounded="rounded-xl" />
          <SkeletonLine width="60%" height="52px" delay={0.15} rounded="rounded-xl" />
        </div>

        {/* Sub text lines */}
        <div className="w-full max-w-lg flex flex-col gap-2 mt-2">
          <SkeletonLine width="100%" height="18px" delay={0.2} />
          <SkeletonLine width="88%" height="18px" delay={0.25} />
          <SkeletonLine width="72%" height="18px" delay={0.3} />
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mt-4">
          <SkeletonLine width="140px" height="44px" delay={0.35} rounded="rounded-full" />
          <SkeletonLine width="110px" height="44px" delay={0.4} rounded="rounded-full" />
        </div>
      </section>

      {/* ── Divider ── */}
      <motion.div
        className="h-px w-full bg-border/40"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ transformOrigin: "left" }}
      />

      {/* ── Content cards grid skeleton ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <SkeletonLine width="160px" height="14px" delay={0.45} />
          <motion.div
            className="flex-1 h-px bg-border/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-border/50 bg-card/40 p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon placeholder */}
              <SkeletonLine width="44px" height="44px" delay={0.55 + i * 0.07} rounded="rounded-xl" />
              {/* Title */}
              <SkeletonLine width="70%" height="20px" delay={0.6 + i * 0.07} rounded="rounded-lg" />
              {/* Body lines */}
              <div className="flex flex-col gap-2">
                <SkeletonLine width="100%" height="14px" delay={0.65 + i * 0.07} />
                <SkeletonLine width="90%" height="14px" delay={0.68 + i * 0.07} />
                <SkeletonLine width="75%" height="14px" delay={0.71 + i * 0.07} />
              </div>
              {/* Link */}
              <SkeletonLine width="90px" height="14px" delay={0.74 + i * 0.07} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Branded loading pip at bottom ── */}
      <div className="flex items-center justify-center pb-12 gap-3">
        {/* Pulsing dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
