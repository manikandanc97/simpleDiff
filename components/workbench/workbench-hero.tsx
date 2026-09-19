"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Input } from "@/components/ui/input";
import { generateBlueprint } from "@/lib/idea-engine";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { BlueprintCard } from "./blueprint-card";
import { BuildYourIdea } from "@/components/sections/build-your-idea/build-your-idea";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroGridAccents } from "./hero-grid-accents";
import { Hero3DCoder } from "./hero-3d-coder";

const EXAMPLES = [
  "A modern e-commerce store with headless Shopify",
  "A SaaS dashboard for managing subscription billing",
  "A booking system for a multi-location services business",
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
  "TypeScript",
  "React Native",
  "Supabase",
  "Stripe Payments",
  "AI / LLM Integration",
  "Tailwind CSS",
  "Vercel Edge",
  "PostgreSQL",
  "REST & GraphQL APIs",
  "CI/CD Pipelines",
  "App Store Launch",
];

interface WorkbenchHeroProps {
  onStartProject?: (prefill?: { description: string; blueprintSummary?: string }) => void;
}

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

// Marquee strip — pauses on hover via .marquee-track CSS class
function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-3 border-y border-border/50 bg-muted/20">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />
      <div
        className="marquee-track flex gap-10 whitespace-nowrap animate-marquee"
        style={{ "--duration": "32s" } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2.5"
          >
            <span className="w-1 h-1 rounded-full bg-primary/70 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Magnetic tilt button wrapper
function MagneticButton({
  children,
  className,
  onClick,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), {
    stiffness: 400,
    damping: 30,
  });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function WorkbenchHero({ onStartProject }: WorkbenchHeroProps) {
  const [activeTab, setActiveTab] = useState<"quick" | "guided">("quick");
  const [idea, setIdea] = useState("");
  const { openLead } = useLead();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for glow orbs
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -50]);
  const orbY3 = useTransform(scrollY, [0, 600], [0, -30]);

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

  return (
    <>
      <section
        id="hero"
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

        {/* ── Parallax glowing orbs ── */}
        <motion.div
          style={{ y: orbY1 }}
          className="pointer-events-none absolute top-1/4 -left-32 w-72 h-72 rounded-full bg-primary/25 blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="pointer-events-none absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl"
        />
        <motion.div
          style={{ y: orbY3 }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full bg-primary/8 blur-3xl"
        />

        {/* ── Studio Architectural Grid Accents & Precision Coordinates (Unique, handcrafted) ── */}
        <HeroGridAccents />

        <div className="relative z-10 flex flex-col items-center pt-8 pb-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
          {/* Top Hero: 2-Column Split with Cloudi5-inspired 3D Animated Coder */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full mb-14 pt-2 sm:pt-4">
            {/* Left Column: Headlines, Pitch, Chips, and CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* 1. Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-5"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Digital Product Studio
                </span>
              </motion.div>

              {/* 2. h1 — refined typography */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 leading-[1.1]">
                <AnimatedWord word="Keep" delay={0.05} />
                <AnimatedWord word="It" delay={0.12} />
                <AnimatedWord word="Simple." delay={0.19} />
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 leading-[1.1]">
                <AnimatedWord word="Make" delay={0.28} />
                <AnimatedWord word="It" delay={0.33} />
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  <span className="text-gradient">Different.</span>
                </motion.span>
              </h1>

              {/* 3. Sub-line */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed font-normal"
              >
                We design and build websites, web apps, mobile apps, SaaS products and digital experiences for businesses and founders.
              </motion.p>

              {/* 4. Service chips */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 max-w-xl"
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

              {/* 5. CTA buttons — primary uses magnetic tilt */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-3 mb-7"
              >
                <MagneticButton
                  id="hero-start-project"
                  onClick={() => openLead({ source: "cta" })}
                  className="group relative inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:shadow-primary/30 active:translate-y-0 transition-shadow duration-200 cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 animate-shimmer pointer-events-none" />
                  Start a project
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-xl border border-border bg-background/60 backdrop-blur-sm text-sm font-semibold text-foreground hover:bg-muted/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  See our work
                </Link>
              </motion.div>

              {/* Dedicated Section Theme Dock Slot for Hero */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-2"
              >
                <SectionDockSlot sectionId="hero" label="Hero" />
              </motion.div>
            </div>

            {/* Right Column: 3D Coder Showcase with GIF-like float animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center items-center w-full"
            >
              <Hero3DCoder />
            </motion.div>
          </div>

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

                <div className="flex flex-wrap gap-2 justify-center mb-10">
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                  >
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
