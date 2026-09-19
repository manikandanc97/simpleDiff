"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Input } from "@/components/ui/input";
import { generateBlueprint } from "@/lib/idea-engine";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { BlueprintCard } from "./blueprint-card";
import { BuildYourIdea } from "@/components/sections/build-your-idea/build-your-idea";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const EXAMPLES = [
  "A modern e-commerce store with headless Shopify",
  "A bold brand identity and portfolio site for an agency",
  "A SaaS dashboard for managing subscription billing",
];

const SERVICE_CHIPS = [
  "Websites",
  "Web apps",
  "Mobile apps",
  "SaaS products",
  "Branding",
  "AI automation",
];

const MARQUEE_ITEMS = [
  "React & Next.js",
  "Motion Design",
  "Brand Identity",
  "SaaS Products",
  "Mobile Apps",
  "Supabase",
  "Stripe Payments",
  "AI Automation",
  "Tailwind CSS",
  "TypeScript",
  "Vercel Edge",
  "Framer Motion",
];

interface WorkbenchHeroProps {
  onStartProject?: (prefill?: { description: string; blueprintSummary?: string }) => void;
}

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-3 border-y border-border/50 bg-muted/20">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex gap-8 whitespace-nowrap animate-marquee"
        style={{ "--duration": "28s" } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-primary inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WorkbenchHero({ onStartProject }: WorkbenchHeroProps) {
  const [activeTab, setActiveTab] = useState<"quick" | "guided">("quick");
  const [idea, setIdea] = useState("");
  const { openLead } = useLead();
  const heroRef = useRef<HTMLElement>(null);

  const debouncedIdea = useDebouncedValue(idea, 400);

  const blueprint = useMemo(() => {
    return debouncedIdea.trim() ? generateBlueprint(debouncedIdea) : null;
  }, [debouncedIdea]);

  const handleContact = () => {
    const summary = blueprint
      ? `Category: ${blueprint.type}. Cuts: ${blueprint.complexityCut.join("; ")}. MVP: ${blueprint.mvpScope.join("; ")}.`
      : undefined;

    if (onStartProject) {
      onStartProject({ description: idea, blueprintSummary: summary });
    } else {
      openLead({ description: idea, blueprintSummary: summary, source: "quick" });
    }
  };

  const words = ["Keep It Simple."].flatMap((s) => s.split(" "));

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[calc(100svh-3.5rem)] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* ── Animated mesh background ── */}
        <div className="pointer-events-none absolute inset-0 mesh-bg transition-colors duration-700" />

        {/* ── Subtle grid overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 60px,currentColor 60px,currentColor 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,currentColor 60px,currentColor 61px)",
          }}
        />

        {/* ── Glowing orbs ── */}
        <div className="pointer-events-none absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center pt-12 pb-8 px-4 md:px-8 w-full max-w-6xl mx-auto">
          {/* 1. Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.15em]">
              <Sparkles className="h-3 w-3" />
              Digital product studio
            </span>
          </motion.div>

          {/* 2. h1 — staggered words */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-3 flex flex-wrap items-center justify-center gap-x-4 leading-[1.05]">
            <AnimatedWord word="Keep" delay={0.05} />
            <AnimatedWord word="It" delay={0.12} />
            <AnimatedWord word="Simple." delay={0.19} />
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 flex flex-wrap items-center justify-center gap-x-4 leading-[1.05]">
            <AnimatedWord
              word="Make"
              delay={0.28}
            />
            <motion.span
              initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-gradient"
            >
              It Different.
            </motion.span>
          </h1>

          {/* 3. Sub-line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            We design and build websites, web apps, mobile apps, SaaS products
            and brands for businesses and founders.
          </motion.p>

          {/* 4. Service chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            {SERVICE_CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                className="px-3 py-1 rounded-full text-xs sm:text-sm bg-muted/40 border border-border text-foreground font-medium select-none hover:bg-primary/10 hover:border-primary/40 hover:text-primary-text transition-colors duration-200 cursor-default"
              >
                {chip}
              </motion.span>
            ))}
            <Link
              href="/services"
              className="text-xs sm:text-sm text-primary hover:underline font-medium ml-1 transition-colors flex items-center gap-1"
            >
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>

          {/* 5. CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-12"
          >
            <button
              onClick={() => openLead({ source: "cta" })}
              className="group relative inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 animate-shimmer pointer-events-none" />
              Start a project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-xl border border-border bg-background/60 backdrop-blur-sm text-sm font-semibold text-foreground hover:bg-muted/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              See our work
            </Link>
          </motion.div>

          {/* 6. Divider label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="text-sm text-muted-foreground text-center mb-6 font-medium"
          >
            Try it &mdash; describe your idea and see how we&apos;d simplify it.
          </motion.div>

          {/* 7. Glass Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.92 }}
            role="tablist"
            aria-label="Idea input mode"
            className="flex glass p-1 rounded-xl mb-10"
          >
            <button
              role="tab"
              id="tab-describe"
              aria-controls="panel-describe"
              aria-selected={activeTab === "quick"}
              onClick={() => setActiveTab("quick")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTab === "quick"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Describe it
            </button>
            <button
              role="tab"
              id="tab-guided"
              aria-controls="panel-guided"
              aria-selected={activeTab === "guided"}
              onClick={() => setActiveTab("guided")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTab === "guided"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Answer a few questions
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "quick" ? (
              <motion.div
                key="quick"
                id="panel-describe"
                role="tabpanel"
                aria-labelledby="tab-describe"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-5xl flex flex-col items-center"
              >
                <div className="w-full max-w-3xl relative mb-5">
                  <label htmlFor="idea-input" className="sr-only">
                    Describe your idea
                  </label>
                  <Input
                    id="idea-input"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g. A marketplace for vintage synthesizers..."
                    className={cn(
                      "h-16 px-6 text-lg rounded-xl bg-background border-2 shadow-xs transition-all duration-200 outline-none",
                      "border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
                      idea.trim() ? "border-primary shadow-primary/10 shadow-lg" : ""
                    )}
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-12">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setIdea(ex)}
                      className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border bg-muted/10 hover:bg-primary/10 hover:border-primary/40 hover:text-primary-text transition-all duration-200 text-muted-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-ring outline-none"
                    >
                      {ex}
                    </button>
                  ))}
                </div>

                {blueprint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden mb-8 border border-border shadow-lg">
                      {/* Left: Typical Build (Red) */}
                      <div className="bg-background flex flex-col h-full">
                        <div className="bg-muted/20 border-b border-border px-4 py-2 flex justify-between items-center text-xs font-mono">
                          <span className="text-muted-foreground font-semibold">A typical build</span>
                          <span className="text-diff-remove bg-diff-remove-bg px-2 py-0.5 rounded-sm font-medium">
                            {blueprint.complexityCut.length} things cut
                          </span>
                        </div>
                        <div className="p-4 font-mono text-sm space-y-2 flex-1">
                          {blueprint.complexityCut.map((item, i) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={i}
                              className="bg-diff-remove-bg/50 px-2 py-1 rounded-sm text-diff-remove flex gap-3 line-through"
                            >
                              <span className="select-none font-bold">-</span>
                              <span>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Right: How we'd start (Green) */}
                      <div className="bg-background flex flex-col h-full">
                        <div className="bg-muted/20 border-b border-border px-4 py-2 flex justify-between items-center text-xs font-mono">
                          <span className="text-muted-foreground font-semibold">How we&apos;d start</span>
                          <span className="text-diff-add bg-diff-add-bg px-2 py-0.5 rounded-sm font-medium">
                            {blueprint.mvpScope.length} things kept
                          </span>
                        </div>
                        <div className="p-4 font-mono text-sm space-y-2 flex-1">
                          {blueprint.mvpScope.map((item, i) => (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 + 0.1 }}
                              key={i}
                              className="bg-diff-add-bg/50 px-2 py-1 rounded-sm text-diff-add flex gap-3"
                            >
                              <span className="select-none font-bold">+</span>
                              <span>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <BlueprintCard blueprint={blueprint} onContact={handleContact} />
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="guided"
                id="panel-guided"
                role="tabpanel"
                aria-labelledby="tab-guided"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-5xl"
              >
                <div className="border border-border rounded-2xl overflow-hidden bg-muted/5 shadow-sm p-6 sm:p-8">
                  <BuildYourIdea initialDescription={idea} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Marquee strip ── */}
      <MarqueeStrip />
    </>
  );
}
