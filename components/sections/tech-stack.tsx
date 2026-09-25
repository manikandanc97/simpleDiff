"use client";

import { CATEGORIES, CATEGORY_ICONS, TECH_STACK, type Category } from "@/lib/data/tech-stack";
import {
  BarChart2,
  Infinity as InfinityIcon,
  ShieldCheck,
  Zap
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { TechCard } from "./tech-stack-card";

// ─── Categories ───────────────────────────────────────────────────────────────



// ─── Single Tech Card ────────────────────────────────────────────────────────

const SPRING = { type: "spring" as const, stiffness: 340, damping: 28 };

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend & Web");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tech of TECH_STACK) {
      counts[tech.category] = (counts[tech.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered list by active category
  const filtered = useMemo(() => {
    return TECH_STACK.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="tech-stack"
      className="relative w-full py-16 sm:py-24 bg-[#FAF9F7] dark:bg-background border-t border-slate-200/60 dark:border-border overflow-hidden"
    >
      {/* ── Background Atmosphere & Ambient Glows ────────────────────────────── */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-pink-200/50 via-rose-200/40 to-purple-200/30 dark:bg-pink-900/10 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-12 -left-12 w-[380px] h-[380px] rounded-full bg-purple-200/40 dark:bg-purple-900/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-12 -right-12 w-[420px] h-[420px] rounded-full bg-fuchsia-200/35 dark:bg-fuchsia-900/10 blur-3xl opacity-60" />

      {/* Decorative dot matrix in corners */}
      <div className="pointer-events-none absolute top-8 left-8 w-32 h-32 hero-dots opacity-40 dark:opacity-20" />
      <div className="pointer-events-none absolute bottom-8 left-8 w-36 h-36 hero-dots opacity-40 dark:opacity-20" />
      <div className="pointer-events-none absolute bottom-8 right-8 w-36 h-36 hero-dots opacity-40 dark:opacity-20" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Top Header with Floating Performance Pill ──────────────────────── */}
        <div className="relative mb-14 text-center">

          {/* Floating "Fast Performant" Pill (Top Right, aligned near subtitle) */}
          <div className="hidden lg:flex absolute top-10 right-2 xl:right-8 z-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center gap-3 bg-white/95 dark:bg-card/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/70 dark:border-border/60 shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
            >
              {/* Radiating Accent Sparks on Top-Left */}
              <div className="absolute -top-3.5 -left-3 pointer-events-none text-rose-400">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <line x1="7" y1="17" x2="3" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="13" y1="17" x2="11" y2="9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="19" y1="17" x2="21" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Lightning Icon */}
              <div className="text-amber-500">
                <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>

              {/* Two Lines of Text */}
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
                  Fast
                </span>
                <span className="text-[11px] font-medium text-slate-400 dark:text-muted-foreground">
                  Performant
                </span>
              </div>
            </motion.div>
          </div>

          {/* Top Pill Badge: ● OUR TECH STACK */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE8EC] dark:bg-rose-950/40 border border-[#FECDD3] dark:border-rose-900/40 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#BE123C] dark:text-rose-400 uppercase">
              OUR TECH STACK
            </span>
          </motion.div>

          {/* Main Title: Modern tools. Real results. */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 dark:text-white"
          >
            Modern tools.{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#DB2777] via-[#E11D48] to-[#7C3AED] bg-clip-text text-transparent font-black">
                Real results.
              </span>
              {/* Playful Marker/Brush Underline Stroke */}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-3.5 text-[#FB7185] pointer-events-none -z-10"
                viewBox="0 0 250 16"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 2 11 C 60 5, 150 5, 246 8"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 dark:text-muted-foreground max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed font-normal"
          >
            Battle-tested tools chosen for reliability, performance, and long-term maintainability —
            <br className="hidden sm:inline" /> not just trends.
          </motion.p>
        </div>

        {/* ── Category Pill Tabs with "Tools we love" Handwritten Annotation ──── */}
        <div className="relative mb-10 pt-10 sm:pt-12">

          {/* Playful Handwritten Annotation: "Tools we love" + Curved Arrow pointing right to the tab */}
          <div className="absolute top-0 sm:top-1 left-2 sm:left-4 md:left-8 lg:left-14 z-20 pointer-events-none select-none flex items-end gap-3">
            <span
              className="font-handwriting text-lg sm:text-[21px] font-bold text-slate-800 dark:text-slate-200 -rotate-10 leading-[1.1] tracking-wide"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Tools<br />we love
            </span>
            <div className="mb-1 ml-1 text-[#9F1239] dark:text-rose-400">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path
                  d="M 4 4 C 15 4, 28 12, 24 28"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 16 22 L 24 28 L 26 19"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Tabs Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Technology categories"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              const Icon = CATEGORY_ICONS[cat];

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  id={`tech-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className={`relative px-4 sm:px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex items-center gap-2.5 ${
                    isActive
                      ? "text-white shadow-lg shadow-[#881337]/25"
                      : "border border-slate-200/80 dark:border-border/70 text-slate-600 dark:text-muted-foreground bg-white dark:bg-card/80 hover:text-slate-900 dark:hover:text-foreground hover:border-slate-300 dark:hover:border-border"
                  }`}
                >
                  {/* Active tab pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="tech-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4C0519] via-[#6D0E31] to-[#881337]"
                      style={{ zIndex: -1 }}
                      transition={SPRING}
                    />
                  )}

                  {/* Category Icon */}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${
                      isActive ? "text-white" : "text-slate-500 dark:text-muted-foreground"
                    }`}
                  />

                  {/* Category Name */}
                  <span className="relative z-10">{cat}</span>

                  {/* Count Pill */}
                  <span
                    className={`relative z-10 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-muted/60 text-slate-500 dark:text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Tech Cards Grid ─────────────────────────────────────────────────── */}
        <div
          role="tabpanel"
          aria-label={`${activeCategory} technologies`}
          className="relative min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                filtered.length <= 5
                  ? "lg:grid-cols-5"
                  : filtered.length === 6
                  ? "lg:grid-cols-6"
                  : "lg:grid-cols-6"
              } gap-3.5 sm:gap-4`}
            >
              {filtered.map((tech, i) => (
                <TechCard key={tech.slug} tech={tech} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Value Proposition Strip (White Floating Island) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 sm:mt-10 max-w-5xl mx-auto bg-white/95 dark:bg-card/90 backdrop-blur-md border border-slate-200/80 dark:border-border/70 rounded-2xl sm:rounded-full py-4 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Reliable */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-rose-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
                  Reliable
                </span>
                <span className="text-[11px] text-slate-500 dark:text-muted-foreground leading-tight">
                  Battle-tested in real projects
                </span>
              </div>
            </div>

            {/* 2. Performant */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-purple-600 fill-purple-600/20" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
                  Performant
                </span>
                <span className="text-[11px] text-slate-500 dark:text-muted-foreground leading-tight">
                  Optimized for speed
                </span>
              </div>
            </div>

            {/* 3. Scalable */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
                <BarChart2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
                  Scalable
                </span>
                <span className="text-[11px] text-slate-500 dark:text-muted-foreground leading-tight">
                  Grows with your business
                </span>
              </div>
            </div>

            {/* 4. Future-ready */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/40 flex items-center justify-center shrink-0">
                <InfinityIcon className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
                  Future-ready
                </span>
                <span className="text-[11px] text-slate-500 dark:text-muted-foreground leading-tight">
                  Always evolving with the best tools
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom Divider & Editorial Note ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4 max-w-4xl mx-auto"
        >
          <div className="h-px bg-slate-200/80 dark:bg-border/60 flex-1" />
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-muted-foreground/60 whitespace-nowrap">
            We choose tools that fit your project — not the other way around.
          </p>
          <div className="h-px bg-slate-200/80 dark:bg-border/60 flex-1" />
        </motion.div>

      </div>
    </section>
  );
}
