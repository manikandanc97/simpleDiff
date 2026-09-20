"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Loading
 * ─────────────────────────────────────────────────────────────────
 * Branded full-viewport Suspense fallback for SimpleThink.
 *
 * Slot: replaces only <main> children while a page streams in.
 * TopBar / SiteNavbar / MobileBottomNav remain mounted above/around.
 *
 * Anatomy
 * 1. Two blurred ambient glow discs (max 2, lightweight)
 * 2. Animated SVG logomark — "SD" monogram + "+" glyph, stroke-draw
 *    via pathLength / strokeDashoffset, ~1.1 s draw → pulse hold
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
export default function Loading() {
  // Shared stroke-draw transition factory
  const drawTransition = (delay = 0, duration = 1.1) => ({
    pathLength: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    opacity: { duration: 0.25, delay },
  });

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
      <span className="sr-only">Loading SimpleThink…</span>

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

      {/* ── Logomark SVG ────────────────────────────────────────── */}
      {/*
        Coordinate system:
          viewBox="0 0 120 72"
          S glyph: left half, ~0–52 wide, centered vertically
          D glyph: right half, ~56–108 wide
          + glyph: small, top-right of the S, or centered above
      */}
      <motion.svg
        viewBox="0 0 120 72"
        aria-hidden="true"
        className="relative z-10 mb-7"
        style={{ width: 112, height: 67 }}
        initial="hidden"
        animate="visible"
      >
        {/* ── "S" stroke ── */}
        <motion.path
          d={
            // S: starts top-right, curves to bottom-left
            // Scaled into the left ~52px of the 120-wide canvas, vertically centered
            "M40 8 C40 8 28 4 18 8 C8 12 6 20 14 26 L34 40 C42 46 40 54 30 58 C20 62 8 58 8 58"
          }
          fill="none"
          stroke="var(--primary)"
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawTransition(0, 1.1)}
        />

        {/* ── "D" stroke ── */}
        <motion.path
          d={
            // D: vertical stem + arc
            // Positioned in the right half: x from ~64 to ~112
            "M64 8 L64 58 M64 8 C64 8 88 8 96 22 C104 36 104 42 96 50 C88 58 64 58 64 58"
          }
          fill="none"
          stroke="var(--primary)"
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawTransition(0.18, 1.05)}
        />

        {/* ── "+" glyph — small, sits above-right of the gap ── */}
        {/* Horizontal bar */}
        <motion.line
          x1="51"
          y1="26"
          x2="61"
          y2="26"
          stroke="var(--primary)"
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={drawTransition(0.95, 0.35)}
        />
        {/* Vertical bar */}
        <motion.line
          x1="56"
          y1="21"
          x2="56"
          y2="31"
          stroke="var(--primary)"
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={drawTransition(1.05, 0.32)}
        />

      </motion.svg>

      {/* Pulse wrapper — activates after draw finishes (delay=1.4s) */}
      {/* We use a separate wrapper motion.div since SVG animate scoping is awkward */}
      {/* It wraps the whole logomark+text block with a gentle opacity pulse */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0.55, 1] }}
        transition={{
          duration: 4,
          times: [0, 0.28, 0.32, 0.55, 1],
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: "easeInOut",
        }}
      />

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
