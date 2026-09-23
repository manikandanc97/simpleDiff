"use client";

import { useState, useRef } from "react";
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
} from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { FloatingTechGroup, type FloatingTechItem } from "@/components/ui/floating-tech-elements";
import { DynamicImageWithMask } from "@/components/ui/dynamic-image-with-mask";
import { useLead } from "@/components/leads/lead-provider";
import { cn } from "@/lib/utils";

const FLOATING_PROCESS_TECHS: FloatingTechItem[] = [
  {
    slug: "figma",
    label: "Figma",
    top: "6%",
    right: "4%",
    duration: 8.5,
    delay: 0.3,
    size: "md",
  },
  {
    slug: "react",
    label: "React",
    top: "38%",
    left: "2.5%",
    duration: 9,
    delay: 0.9,
    size: "md",
  },
  {
    slug: "githubactions",
    label: "GitHub Actions",
    bottom: "8%",
    right: "3%",
    duration: 8,
    delay: 0.4,
    size: "md",
  },
];

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
  statusBadge: string;
  ctaText: string;
  icon: typeof Search;
  imageSrc: string;
  maskSrc: string;
}

const PHASES: Phase[] = [
  {
    id: "01",
    step: "01",
    title: "Discovery",
    subtitle: "Architecture & Scope",
    timeframe: "Phase 1",
    kicker: "Phase 01 · 3D Blueprint",
    headline: "Blueprint before",
    headlineAccent: "building.",
    summary:
      "We map your user journeys, bench-test technical feasibility, and define the project scope to align with your business goals.",
    deliverables: [
      "Architecture & DB Schema Map",
      "User Journey & Scope Specs",
      "Defined Project Roadmap",
    ],
    metric: {
      value: "Aligned",
      label: "Scope & Objectives",
    },
    statusBadge: "Sprint 01 Handover",
    ctaText: "Start with Discovery",
    icon: Search,
    imageSrc: "/how we work/discovery.png",
    maskSrc: "/how we work/discovery-mask.png",
  },
  {
    id: "02",
    step: "02",
    title: "Design",
    subtitle: "Tokens & Prototypes",
    timeframe: "Phase 2",
    kicker: "Phase 02 · 3D Design System",
    headline: "Clarity before a single line",
    headlineAccent: "of code.",
    summary:
      "Interactive Figma prototypes and a production token library. You test and validate the screens and interactions before development begins.",
    deliverables: [
      "Clickable High-Fidelity Flows",
      "Scalable Design Token System",
      "WCAG Accessibility Compliance",
    ],
    metric: {
      value: "Valid",
      label: "Interactive Prototyping",
    },
    statusBadge: "Design Sign-Off",
    ctaText: "Explore Design Phase",
    icon: Palette,
    imageSrc: "/how we work/design.png",
    maskSrc: "/how we work/design-mask.png",
  },
  {
    id: "03",
    step: "03",
    title: "Engineer",
    subtitle: "Full-Stack Development",
    timeframe: "Phase 3",
    kicker: "Phase 03 · 3D Production Build",
    headline: "Production code, built",
    headlineAccent: "to scale.",
    summary:
      "Next.js App Router, TailwindCSS, TypeScript, and serverless backend architecture. Demo deployments let you watch the product come alive.",
    deliverables: [
      "Staging URL Deployments",
      "End-to-End API Integration",
      "Automated CI/CD Pipeline & Tests",
    ],
    metric: {
      value: "Optimized",
      label: "Performance Benchmarks",
    },
    statusBadge: "Code Review Pass",
    ctaText: "See Tech Stack",
    icon: Code2,
    imageSrc: "/how we work/engineer.png",
    maskSrc: "/how we work/engineer-mask.png",
  },
  {
    id: "04",
    step: "04",
    title: "Launch & Scale",
    subtitle: "Production Deployment",
    timeframe: "Phase 4",
    kicker: "Phase 04 · 3D Release",
    headline: "Launch day is step one,",
    headlineAccent: "not the finish line.",
    summary:
      "DNS cutover, SEO indexing check, telemetry dashboards, and post-launch support to ensure a smooth transition to production.",
    deliverables: [
      "Production Cutover",
      "Error & Analytics Setup",
      "Post-Launch Handoff & Support",
    ],
    metric: {
      value: "Stable",
      label: "Production Deployment",
    },
    statusBadge: "Production Ready",
    ctaText: "Schedule Launch",
    icon: Rocket,
    imageSrc: "/how we work/launch.png",
    maskSrc: "/how we work/launch-mask.png",
  },
];

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const { openLead } = useLead();

  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = PHASES[activeIndex];

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
      className="relative py-8 sm:py-12 bg-background border-t border-border overflow-hidden select-none"
    >
      {/* Subtle Background Ambience */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-10 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Floating Animated Badges */}
      <FloatingTechGroup items={FLOATING_PROCESS_TECHS} />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <SectionHeader
            sectionId="how-we-work"
            dockLabel="Process · Methodology"
            title={
              <>
                How We <span className="text-primary transition-colors duration-500">Work.</span>
              </>
            }
            description="A focused 4-step delivery pipeline. Clean communication, weekly staging builds, and guaranteed milestones."
            maxWidth="max-w-2xl"
          />
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
                                Milestone Review & Handoff
                              </span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            onClick={() => openLead({ source: "how-we-work" })}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm shadow-primary/20 cursor-pointer w-full sm:w-auto"
                          >
                            <span>{activePhase.ctaText}</span>
                            <AnimatedArrowRight size={13} />
                          </button>
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

                    <motion.div
                      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                      className="relative rounded-xl sm:rounded-2xl shadow-xl border border-border/80 aspect-[4/3] group bg-card select-none flex items-center justify-center"
                    >
                      {PHASES.map((phase) => {
                        const isActive = phase.id === activePhase.id;
                        return (
                          <motion.div
                            key={`phase-3d-showcase-${phase.id}`}
                            initial={false}
                            animate={{ 
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1 : 0.96,
                              pointerEvents: isActive ? "auto" : "none"
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center bg-card"
                          >
                            <DynamicImageWithMask
                              src={phase.imageSrc}
                              maskSrc={phase.maskSrc}
                              alt={`Phase ${phase.step} · ${phase.title}`}
                              className="w-full h-full scale-[1.02]"
                            />
                            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-mono text-primary font-semibold shadow-sm">
                              <span>Focus: {phase.metric.label} ({phase.metric.value})</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
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
            <span>Dedicated engineering · Live staging builds · Transparent process.</span>
          </div>

          <span className="text-[11px] text-muted-foreground/50 tracking-wider uppercase">
            SimpleThink · Delivery Framework
          </span>
        </motion.div>

      </div>
    </section>
  );
}
