"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Search,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  timeframe: string;
  kicker: string;
  headline: string;
  headlineAccent: string;
  summary: string;
  deliverables: string[];
  metric: {
    value: string;
    label: string;
  };
  baseName: string;
  imageSrc: string;
  imageAlt: string;
  statusBadge: string;
  ctaText: string;
  icon: typeof Search;
}


const PHASES: Phase[] = [
  {
    id: "01",
    step: "01",
    title: "Discovery",
    subtitle: "Architecture & Scope",
    timeframe: "Week 1",
    kicker: "Phase 01 · 3D Blueprint",
    headline: "Blueprint before",
    headlineAccent: "building.",
    summary:
      "Zero guesswork. We map your user journeys, bench-test technical feasibility, and lock scope so there are never retrospective budget surprises.",
    deliverables: [
      "Architecture & DB Schema Map",
      "User Journey & Scope Specs",
      "Fixed Milestone Roadmap",
    ],
    metric: {
      value: "100%",
      label: "Scope & Timeline Lock",
    },
    baseName: "discovery-3d",
    imageSrc: "/images/process/discovery-3d-blue.jpg",
    imageAlt: "3D Product Discovery & Architecture Blueprint Whiteboard Session",
    statusBadge: "Sprint 01 Handover",
    ctaText: "Start with Discovery",
    icon: Search,
  },
  {
    id: "02",
    step: "02",
    title: "Design",
    subtitle: "Tokens & Prototypes",
    timeframe: "Weeks 2–3",
    kicker: "Phase 02 · 3D Design System",
    headline: "Clarity before a single line",
    headlineAccent: "of code.",
    summary:
      "Interactive Figma prototypes and a production token library. You test and validate every screen and interaction before developers touch a key.",
    deliverables: [
      "Clickable High-Fidelity Flows",
      "Scalable Design Token System",
      "WCAG Accessibility Compliance",
    ],
    metric: {
      value: "100%",
      label: "Interactive Prototype Fidelity",
    },
    baseName: "design-3d",
    imageSrc: "/images/process/design-3d-blue.jpg",
    imageAlt: "3D UI UX Product Designer working on Design Tokens and Wireframes",
    statusBadge: "Design Sign-Off",
    ctaText: "Explore Design Phase",
    icon: Palette,
  },
  {
    id: "03",
    step: "03",
    title: "Engineer",
    subtitle: "Full-Stack Development",
    timeframe: "Weeks 4–7",
    kicker: "Phase 03 · 3D Production Build",
    headline: "Production code, built",
    headlineAccent: "to scale.",
    summary:
      "Next.js App Router, TailwindCSS, TypeScript, and serverless backend architecture. Weekly demo deployments so you watch the product come alive in real time.",
    deliverables: [
      "Weekly Staging URL Deployments",
      "End-to-End API Integration",
      "Automated CI/CD Pipeline & Tests",
    ],
    metric: {
      value: "<500ms",
      label: "LCP Performance Benchmark",
    },
    baseName: "engineer-3d",
    imageSrc: "/images/process/engineer-3d-blue.jpg",
    imageAlt: "3D Senior Software Engineer Coding High-Performance Cloud Architecture",
    statusBadge: "Code Review Pass",
    ctaText: "See Tech Stack",
    icon: Code2,
  },
  {
    id: "04",
    step: "04",
    title: "Launch & Scale",
    subtitle: "Production Deployment",
    timeframe: "Week 8+",
    kicker: "Phase 04 · 3D Release",
    headline: "Launch day is step one,",
    headlineAccent: "not the finish line.",
    summary:
      "Zero-downtime DNS cutover, SEO indexing check, telemetry dashboards, and 30-day post-launch warranty with dedicated founder support.",
    deliverables: [
      "Zero-Downtime Production Cutover",
      "Real-Time Error & Analytics Setup",
      "30-Day Founder Warranty & Handoff",
    ],
    metric: {
      value: "99.99%",
      label: "Production Uptime Guarantee",
    },
    baseName: "launch-3d",
    imageSrc: "/images/process/launch-3d-blue.jpg",
    imageAlt: "3D Startup Team Celebrating Successful High-Performance Product Launch",
    statusBadge: "Production Ready",
    ctaText: "Schedule Launch",
    icon: Rocket,
  },
];

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const { theme } = useThemeColor();

  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = PHASES[activeIndex];

  // Map theme ID to pre-rendered image variant (custom falls back to blue)
  const themeVariant = theme.id === 'custom' ? 'blue' : theme.id;

  // Interactive 3D tilt parallax on mouse move
  const showcaseRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [7, -7]), {
    stiffness: 280,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-7, 7]), {
    stiffness: 280,
    damping: 26,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };



  return (
    <section
      id="how-we-work"
      className="relative py-14 sm:py-16 bg-background border-t border-border overflow-hidden select-none"
    >
      {/* Subtle Background Ambience */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-10 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Process · Methodology
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground"
            >
              How We <span className="text-primary transition-colors duration-500">Work.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed"
            >
              A focused 4-step delivery pipeline. Clean communication, weekly staging builds, and guaranteed milestones.
            </motion.p>
          </div>

          <SectionDockSlot sectionId="how-we-work" label="Process" />
        </div>

        {/* ========================================================================= */}
        {/* COMPACT VERTICAL TABS (LEFT) + SHOWCASE BENTO CARD (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">

          {/* Left Column: Slim Vertical Tabs (lg:col-span-3) */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 h-full">
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = activeIndex === idx;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative group text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border flex flex-col justify-between",
                    isActive
                      ? "bg-card/95 border-primary/50 shadow-md shadow-primary/10 ring-1 ring-primary/25"
                      : "bg-card/40 hover:bg-card/75 border-border/60 hover:border-border/90"
                  )}
                >
                  {/* Left Active Vertical Indicator Rail */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVerticalRail"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full shadow-xs shadow-primary"
                    />
                  )}

                  {/* Active Glowing Highlight Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVerticalGlow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/[0.04] to-transparent pointer-events-none"
                    />
                  )}

                  {/* Top Row: Step Number, Icon & Timeframe Badge */}
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 relative z-10 pl-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-md transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs shadow-primary/30"
                            : "bg-muted text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {phase.step}
                      </span>
                      <Icon
                        className={cn(
                          "w-3.5 h-3.5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground/80 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-muted-foreground/60" />
                      <span>{phase.timeframe}</span>
                    </span>
                  </div>

                  {/* Phase Title & Subtitle */}
                  <div className="relative z-10 pl-1">
                    <div
                      className={cn(
                        "text-xs sm:text-sm font-bold tracking-tight transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {phase.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground/70 line-clamp-1 mt-0.5 font-sans">
                      {phase.subtitle}
                    </div>
                  </div>

                  {/* Bottom Active Progress Line for Mobile */}
                  <div className="mt-2 w-full h-0.5 rounded-full bg-muted/40 overflow-hidden relative z-10 lg:hidden">
                    {isActive && (
                      <motion.div
                        layoutId="activeRailBarMobile"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="h-full bg-primary rounded-full w-full"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Showcase Bento Card (lg:col-span-9) */}
          <div className="lg:col-span-9 flex">
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-xl overflow-hidden w-full flex flex-col justify-center">
              {/* Subtle Top Ambient Border Glow */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

              <div className="p-4 sm:p-6 lg:p-7 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-center">

                  {/* Left Sub-Column: Focused Narrative, Key Deliverables & Metric */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`phase-content-${activePhase.id}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-3.5 sm:space-y-4"
                      >
                        {/* Kicker Pill */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-mono font-semibold text-primary">
                            <Sparkles className="w-3 h-3" />
                            <span>{activePhase.kicker}</span>
                          </div>
                          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{activePhase.timeframe}</span>
                          </div>
                        </div>

                        {/* Bold Punchy Headline */}
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-foreground leading-[1.18]">
                            {activePhase.headline}{" "}
                            <span className="text-primary">{activePhase.headlineAccent}</span>
                          </h3>
                          {/* Short 1-2 sentence description */}
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-xl">
                            {activePhase.summary}
                          </p>
                        </div>

                        {/* Key Deliverable Badges (Clean & Compact) */}
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 mb-1.5">
                            Key Outputs
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {activePhase.deliverables.map((item, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/60 border border-border/80 text-foreground"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Compact Metric & Action Bar */}
                        <div className="pt-2.5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Metric Chip */}
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl sm:text-2xl font-black font-mono text-foreground tracking-tight">
                              {activePhase.metric.value}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                                {activePhase.metric.label}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                Verified Milestone Sign-Off
                              </span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm shadow-primary/20 cursor-pointer w-full sm:w-auto"
                          >
                            <span>{activePhase.ctaText}</span>
                            <AnimatedArrowRight size={13} />
                          </a>
                        </div>

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right Sub-Column: Dynamic 3D Studio Showcase with Parallax Tilt */}
                  <div
                    ref={showcaseRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="md:col-span-5 relative perspective-[1200px]"
                  >
                    {/* Dynamic Ambient Background Glow matching active theme color */}
                    <div className="absolute -inset-3 rounded-2xl bg-primary/20 blur-xl opacity-70 pointer-events-none transition-colors duration-500" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`phase-3d-showcase-${activePhase.id}`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-border/80 aspect-[4/3] group bg-card select-none"
                      >
                        {/* Pre-rendered 3D image with pixel-perfect shirt colour per theme */}
                        <div className="absolute inset-0 w-full h-full">
                          <Image
                            key={`${activePhase.baseName}-${themeVariant}`}
                            src={`/images/process/${activePhase.baseName}-${themeVariant}.jpg`}
                            alt={activePhase.imageAlt}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority={activeIndex === 0}
                          />
                        </div>

                        {/* Top Floating Glass 3D HUD Badge */}
                        <div
                          style={{ transform: "translateZ(25px)" }}
                          className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none"
                        >
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-mono font-medium text-foreground shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span>{activePhase.statusBadge}</span>
                          </div>

                          <div className="px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-mono text-muted-foreground shadow-xs">
                            {activePhase.timeframe}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Crisp Guarantee Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 pt-3.5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left text-xs font-mono text-muted-foreground/80"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Dedicated senior engineering · Weekly live staging · Zero surprise invoices.</span>
          </div>

          <span className="text-[11px] text-muted-foreground/50 tracking-wider uppercase">
            SimpleThink · Delivery Framework
          </span>
        </motion.div>

      </div>
    </section>
  );
}
