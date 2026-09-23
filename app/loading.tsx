"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Loading
 * ─────────────────────────────────────────────────────────────────
 * Branded full-viewport Suspense fallback for SimplePrime.
 *
 * Slot: replaces only <main> children while a page streams in.
 * TopBar / SiteNavbar / MobileBottomNav remain mounted above/around.
 *
 * Anatomy
 * 1. Two blurred ambient glow discs (max 2, lightweight)
 * 2. CENTRAL PIECE: Animated "Live Diff" card cycling through snippets
 * 3. Wordmark text "Simple" + "Diff" beneath the mark, stagger-fade
 * 4. Three micro-dot "thinking" indicator, staggered opacity/scale
 * 5. Visually-hidden accessible label
 *
 * Motion contract
 * - All looping animations use motion `animate` with `repeat: Infinity`
 * - MotionConfig reducedMotion="user" (set in MotionProvider) automatically
 *   collapses them to their `animate` end-state — no extra branching needed.
 * - Color: CSS vars only — never hardcoded hex.
 */

const DIFF_PAIRS = [
  { before: "12 dependencies", after: "1 clean API" },
  { before: "complex_setup()", after: "simple_diff()" },
  { before: "hours of work", after: "seconds of joy" },
];

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "relative flex min-h-[60vh] w-full flex-col items-center justify-center",
        "bg-background overflow-hidden"
      )}
    >
      {/* ── Accessible hidden label ─────────────────────────────── */}
      <span className="sr-only">Loading SimplePrime…</span>

      {/* ── Ambient glow discs (max 2, pointer-events-none) ─────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: 320,
          height: 320,
          top: "calc(50% - 220px)",
          left: "calc(50% - 160px)",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: 200,
          height: 200,
          top: "calc(50% + 40px)",
          left: "calc(50% - 40px)",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      />

      {/* ── Live Diff Card ──────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-[260px] rounded-xl border border-border/70 bg-card/90 backdrop-blur-md shadow-sm overflow-hidden flex flex-col mb-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50 bg-muted/20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono ml-1 select-none">
            app.tsx
          </div>
        </div>

        {/* Body */}
        <div className="relative h-[78px] w-full p-3 font-mono text-xs">
          {DIFF_PAIRS.map((pair, i) => {
            const cycle = 3.2;
            const total = DIFF_PAIRS.length;
            const transition = {
              duration: cycle,
              repeat: Infinity,
              repeatDelay: (total - 1) * cycle,
              delay: i * cycle,
              ease: "easeInOut" as const,
            };

            return (
              <motion.div
                key={i}
                className="absolute inset-x-3 top-3 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ ...transition, times: [0, 0.05, 0.9, 1] }}
              >
                {/* Before Line */}
                <motion.div
                  className="flex items-center text-[var(--diff-remove)] bg-[var(--diff-remove-bg)] rounded-md px-2 py-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 0.5] }}
                  transition={{ ...transition, times: [0, 0.05, 0.2, 1] }}
                >
                  <span className="opacity-70 select-none mr-2">-</span>
                  <div className="relative">
                    <span>{pair.before}</span>
                    {/* Live strike-through animation */}
                    <motion.div
                      className="absolute top-1/2 left-0 h-[1.5px] bg-current"
                      initial={{ width: "0%" }}
                      animate={{ width: ["0%", "0%", "100%", "100%"] }}
                      transition={{ ...transition, times: [0, 0.15, 0.2, 1] }}
                    />
                  </div>
                </motion.div>

                {/* After Line */}
                <motion.div
                  className="flex items-center overflow-hidden text-[var(--diff-add)] bg-[var(--diff-add-bg)] rounded-md px-2"
                  initial={{
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  animate={{
                    height: [0, 0, 24, 24],
                    opacity: [0, 0, 1, 1],
                    marginTop: [0, 0, 4, 4],
                    paddingTop: [0, 0, 4, 4],
                    paddingBottom: [0, 0, 4, 4],
                  }}
                  transition={{ ...transition, times: [0, 0.2, 0.25, 1] }}
                >
                  <span className="opacity-70 select-none mr-2">+</span>
                  <motion.div
                    className="overflow-hidden whitespace-nowrap"
                    initial={{ width: "0ch" }}
                    animate={{
                      width: [
                        "0ch",
                        "0ch",
                        `${pair.after.length}ch`,
                        `${pair.after.length}ch`,
                      ],
                    }}
                    transition={{ ...transition, times: [0, 0.25, 0.45, 1] }}
                  >
                    {pair.after}
                  </motion.div>
                  {/* Blinking typing cursor */}
                  <motion.span
                    className="inline-block w-[2px] h-[12px] bg-[var(--primary)] ml-[1px]"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Wordmark text ────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex items-baseline gap-0 select-none mb-8"
        initial="hidden"
        animate="visible"
      >
        {/* "Simple" — foreground */}
        <motion.span
          className="text-[1.35rem] font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Simple
        </motion.span>

        {/* "+" diff glyph accent — matches topbar.tsx pattern */}
        <motion.span
          className="font-mono text-[0.6rem] font-bold select-none leading-none"
          style={{ color: "var(--primary)", opacity: 0.75, margin: "0 1px" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 0.35, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          +
        </motion.span>

        {/* "Diff" — primary */}
        <motion.span
          className="text-[1.35rem] font-bold tracking-tight"
          style={{ color: "var(--primary)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Diff
        </motion.span>
      </motion.div>

      {/* ── Thinking dots ─────────────────────────────────────────── */}
      <motion.div
        role="presentation"
        className="relative z-10 flex items-center gap-[7px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full bg-primary"
            style={{ width: 5, height: 5 }}
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.75, 1.15, 0.75],
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2 + i * 0.2,
              repeatDelay: 0.15,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
