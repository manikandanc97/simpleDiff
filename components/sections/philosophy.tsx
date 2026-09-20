"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Users,
  Target,
  Layers,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  Palette,
  Clock,
  Sliders,
  ChevronRight,
} from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

// Helper: Calculate hue from any color format (OKLCH, Hex, HSL) or theme ID
function parseColorToHue(colorStr: string, themeId?: string): number {
  if (themeId === "red") return 25;
  if (themeId === "green") return 145;
  if (themeId === "blue") return 250;
  if (themeId === "violet") return 285;
  if (themeId === "amber") return 65;
  if (themeId === "emerald") return 155;
  if (themeId === "cyan") return 215;
  if (themeId === "rose") return 20;

  if (!colorStr) return 215;

  // OKLCH: oklch(L C H)
  const oklch = colorStr.match(/oklch\s*\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)/);
  if (oklch) {
    return Math.round(parseFloat(oklch[1]));
  }

  // HSL: hsl(H S L)
  const hsl = colorStr.match(/hsl\s*\(\s*([\d.]+)/);
  if (hsl) {
    return Math.round(parseFloat(hsl[1]));
  }

  // Hex: #RRGGBB
  if (colorStr.startsWith("#")) {
    const cleanHex = colorStr.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return Math.round(h * 360);
  }

  return 215;
}

interface Principle {
  id: string;
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  kicker: string;
  headline: string;
  headlineAccent: string;
  description: string;
  deliverables: string[];
  metric: {
    value: string;
    label: string;
    sublabel: string;
  };
  imageSrc: string;
  imageAlt: string;
  statusBadge: string;
  ctaText: string;
  icon: typeof Users;
}

const PRINCIPLES: Principle[] = [
  {
    id: "01",
    step: "01",
    badge: "Senior Studio",
    title: "Not an agency. Not a freelancer.",
    subtitle: "Direct Senior Engineering & Design",
    kicker: "Pillar 01 · Studio Model",
    headline: "Senior creators only.",
    headlineAccent: "Zero account managers.",
    description:
      "Agencies layer on project managers, account reps, and juniors — then charge you for all of it. Freelancers disappear when things get hard. We're a focused studio: senior engineers and designers who own your project end-to-end, every sprint.",
    deliverables: [
      "100% Senior Hands-On Execution",
      "Direct Async Slack Channel with Creators",
      "Zero Middleman Overhead or Hand-Off Lag",
      "Rapid Sprint Cycles with Working Software",
    ],
    metric: {
      value: "0 layers",
      label: "Middlemen Bloat",
      sublabel: "Direct maker access",
    },
    imageSrc: "/images/why/studio-3d.jpg",
    imageAlt: "3D Senior Tech Duo Collaborating at Sleek Glass Holographic Workstation",
    statusBadge: "Direct Maker Access",
    ctaText: "Work With Senior Creators",
    icon: Users,
  },
  {
    id: "02",
    step: "02",
    badge: "Outcome-Based",
    title: "Scope that earns trust, not hours.",
    subtitle: "Milestone-Gated Deliverables",
    kicker: "Pillar 02 · Pricing Integrity",
    headline: "Clear milestones.",
    headlineAccent: "Zero surprise invoices.",
    description:
      "We don't bill by the hour. We scope per outcome — so our incentive is to build efficiently, not inflate timelines. Clear milestones, predictable costs, and 100% transparent delivery with zero retrospective invoice surprises.",
    deliverables: [
      "Fixed-Investment Sprint Roadmaps",
      "Weekly Staging Environment Verification",
      "Milestone-Gated Sign-Off Guarantees",
      "Zero Retrospective Invoice Markup",
    ],
    metric: {
      value: "100%",
      label: "Milestone Predictability",
      sublabel: "Zero billing creep",
    },
    imageSrc: "/images/why/milestone-3d.jpg",
    imageAlt: "3D Product Blueprint & Milestone Roadmap Planning Board",
    statusBadge: "Fixed Scope Guarantee",
    ctaText: "Review Milestone Model",
    icon: Target,
  },
  {
    id: "03",
    step: "03",
    badge: "Dual Discipline",
    title: "One studio. Both disciplines.",
    subtitle: "Unified Design & Code Synergy",
    kicker: "Pillar 03 · Dual Craft",
    headline: "Design & engineering",
    headlineAccent: "in the same room.",
    description:
      "Design and engineering work in the same room from day one. No handoff documents, no translation loss, no 'the designer would have done it differently' moments. What ships is what was intended.",
    deliverables: [
      "Figma Design Tokens to Tailwind System",
      "High-Fidelity Interactive Prototypes",
      "Production-Grade Next.js & TypeScript",
      "Sub-500ms Core Web Vitals Optimization",
    ],
    metric: {
      value: "<500ms",
      label: "Core Web Vitals Target",
      sublabel: "Zero translation loss",
    },
    imageSrc: "/images/why/disciplines-3d.jpg",
    imageAlt: "3D UI UX Designer and Frontend Engineer Crafting Unified Interface",
    statusBadge: "Zero Handoff Loss",
    ctaText: "Explore Dual Discipline",
    icon: Layers,
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Core Team Model",
    agency: "Junior developers with account managers",
    freelancer: "Solo individual, limited multidisciplinary breadth",
    simplethink: "100% Senior engineers and designers",
    highlight: true,
  },
  {
    feature: "Billing & Scoping",
    agency: "Hourly billing with inflated retainers",
    freelancer: "Unpredictable hourly or scope creep",
    simplethink: "Milestone-gated outcome scope & fixed cost",
    highlight: true,
  },
  {
    feature: "Communication Channel",
    agency: "Filtered through client account representatives",
    freelancer: "Fragmented or unverified availability",
    simplethink: "Direct Slack channel with the actual builders",
    highlight: false,
  },
  {
    feature: "Design & Code Alignment",
    agency: "Siloed design and development handoffs",
    freelancer: "Often strong in code or design, rarely both",
    simplethink: "Design tokens synced directly to Next.js",
    highlight: false,
  },
  {
    feature: "Delivery Accountability",
    agency: "Complex contracts with change order penalties",
    freelancer: "Single point of failure and ghosting risk",
    simplethink: "Weekly staging demos & 30-day hypercare",
    highlight: true,
  },
];

const STATS = [
  {
    value: "5+",
    label: "Client Projects Shipped",
    detail: "Production web applications deployed",
  },
  {
    value: "3×",
    label: "Average Lead Increase",
    detail: "Measured conversion uplift across redesigns",
  },
  {
    value: "100%",
    label: "On-Time Milestone Delivery",
    detail: "Zero missed deadline commitments",
  },
  {
    value: "<500ms",
    label: "Core Web Vitals Target",
    detail: "Blazing fast global edge performance",
  },
];

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const { theme } = useThemeColor();

  const [activeIndex, setActiveIndex] = useState(0);
  const [modelTab, setModelTab] = useState<"agency" | "freelancer" | "simplethink">("simplethink");
  const [showMatrix, setShowMatrix] = useState(false);

  const activePrinciple = PRINCIPLES[activeIndex];

  // Dynamic hue calculation matching theme primary
  const primaryHue = useMemo(() => parseColorToHue(theme.primary, theme.id), [theme.primary, theme.id]);
  const hueShift = useMemo(() => {
    let shift = (primaryHue - 215) % 360;
    if (shift > 180) shift -= 360;
    if (shift < -180) shift += 360;
    return shift;
  }, [primaryHue]);

  // Interactive 3D tilt parallax on mouse move
  const showcaseRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [6, -6]), {
    stiffness: 280,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-6, 6]), {
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
      id="why-simplethink"
      className="relative py-20 sm:py-28 bg-background border-t border-border overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-35" />
      <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-3xl" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Section Theme Dock */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Why SimpleThink
              </span>
              <span className="text-muted-foreground/50 text-xs">/</span>
              <span className="text-xs font-mono text-muted-foreground">The Studio Manifesto</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl font-medium tracking-tight text-muted-foreground mb-2"
            >
              Built to eradicate middle-management overhead and friction.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08]"
            >
              Three structural reasons{" "}
              <span className="text-primary transition-colors duration-500">clients choose us.</span>
            </motion.h2>
          </div>

          {/* Section Dock Slot */}
          <div className="shrink-0 flex items-center gap-3">
            <SectionDockSlot sectionId="why-simplethink" label="Why SimpleThink" />
          </div>
        </div>

        {/* 3-Pillar Interactive Selector Rail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {PRINCIPLES.map((principle, index) => {
            const isActive = index === activeIndex;
            const IconComponent = principle.icon;

            return (
              <button
                key={principle.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border flex flex-col justify-between",
                  isActive
                    ? "bg-card/95 border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/25"
                    : "bg-card/40 hover:bg-card/70 border-border/70 hover:border-border/90"
                )}
              >
                {/* Active Indicator Top Rail */}
                {isActive && (
                  <motion.div
                    layoutId="activeWhyRail"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute top-0 left-3 right-3 h-[2px] bg-primary rounded-full shadow-xs shadow-primary"
                  />
                )}

                {/* Active Glow Backdrop */}
                {isActive && (
                  <motion.div
                    layoutId="activeWhyGlow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/[0.02] to-transparent pointer-events-none"
                  />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-md transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs shadow-primary/30"
                            : "bg-muted text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {principle.step}
                      </span>
                      <span className="text-xs font-mono text-primary font-semibold">
                        {principle.badge}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
                        isActive
                          ? "bg-primary/10 border-primary/40 text-primary"
                          : "bg-muted/40 border-border text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className={cn(
                      "text-base sm:text-lg font-bold tracking-tight transition-colors line-clamp-1",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {principle.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-1 font-sans">
                    {principle.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground">Key Advantage</span>
                  <span className={cn("font-bold transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                    {principle.metric.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Flagship Interactive 3D Bento Showcase */}
        <div className="relative rounded-3xl border border-border/80 bg-card/85 backdrop-blur-xl shadow-2xl overflow-hidden mb-12">
          {/* Subtle Top Accent Glow Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Interactive Narrative & Dynamic Deep Dive */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`principle-content-${activePrinciple.id}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Kicker & Headline */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{activePrinciple.kicker}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                        {activePrinciple.headline}{" "}
                        <span className="text-primary transition-colors duration-500">
                          {activePrinciple.headlineAccent}
                        </span>
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {activePrinciple.description}
                      </p>
                    </div>

                    {/* Interactive Sub-Widget Based on Active Pillar */}
                    {activePrinciple.id === "01" && (
                      <div className="p-4 rounded-2xl bg-muted/40 border border-border/70">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                            Interactive Team Model Comparison
                          </span>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            Select Model
                          </span>
                        </div>

                        {/* Model Tabs */}
                        <div className="grid grid-cols-3 gap-1.5 p-1 bg-background/80 rounded-xl border border-border/60 mb-3">
                          <button
                            onClick={() => setModelTab("agency")}
                            className={cn(
                              "py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center",
                              modelTab === "agency"
                                ? "bg-muted text-foreground font-semibold shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Agency
                          </button>
                          <button
                            onClick={() => setModelTab("freelancer")}
                            className={cn(
                              "py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center",
                              modelTab === "freelancer"
                                ? "bg-muted text-foreground font-semibold shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Freelancer
                          </button>
                          <button
                            onClick={() => setModelTab("simplethink")}
                            className={cn(
                              "py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center",
                              modelTab === "simplethink"
                                ? "bg-primary text-primary-foreground shadow-xs shadow-primary/30"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            SimpleThink
                          </button>
                        </div>

                        {/* Model Breakdown */}
                        <div className="text-xs sm:text-sm">
                          {modelTab === "agency" && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-foreground">Layered Middle Management:</strong> You speak to an account manager who briefs a project manager who assigns a junior. 40%+ overhead markup with translation delays.
                              </div>
                            </div>
                          )}
                          {modelTab === "freelancer" && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-foreground">Single Point of Failure:</strong> Individual bandwidth limits, context-switching across multiple gigs, and the risk of disappearing when production complexity escalates.
                              </div>
                            </div>
                          )}
                          {modelTab === "simplethink" && (
                            <div className="flex items-start gap-2.5 text-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-primary font-bold">100% Senior Hands-On:</strong> Direct asynchronous Slack channel with the creators. Zero intermediaries, zero junior delegate handoffs, rapid sprint cadence.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activePrinciple.id === "02" && (
                      <div className="p-4 rounded-2xl bg-muted/40 border border-border/70">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                            Transparent Outcome Milestone Roadmap
                          </span>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            Zero Hourly Traps
                          </span>
                        </div>

                        {/* Visual Milestone Steps */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-xl bg-background/80 border border-border/60 flex flex-col justify-between">
                            <span className="text-[10px] font-mono font-bold text-primary">MS 01</span>
                            <span className="text-xs font-semibold text-foreground mt-1">Scope Lock</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">100% Fixed Cost</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-background/80 border border-border/60 flex flex-col justify-between">
                            <span className="text-[10px] font-mono font-bold text-primary">MS 02</span>
                            <span className="text-xs font-semibold text-foreground mt-1">Weekly Staging</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">Test Real Code</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-background/80 border border-border/60 flex flex-col justify-between">
                            <span className="text-[10px] font-mono font-bold text-primary">MS 03</span>
                            <span className="text-xs font-semibold text-foreground mt-1">Edge Deploy</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">30-Day Support</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePrinciple.id === "03" && (
                      <div className="p-4 rounded-2xl bg-muted/40 border border-border/70">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                            Design ⇄ Engineering Unified Pipeline
                          </span>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            Zero Translation Loss
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-xl bg-background/80 border border-border/60 flex items-start gap-2">
                            <Palette className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-foreground">Figma Design System</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">Auto-synced token libraries</div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-background/80 border border-border/60 flex items-start gap-2">
                            <Code2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-foreground">Next.js & TypeScript</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">Production-ready edge code</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Deliverable Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activePrinciple.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-background/50 border border-border/60 text-xs text-foreground font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric & Direct Action Strip */}
                    <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl sm:text-3xl font-black font-mono text-foreground tracking-tight">
                          {activePrinciple.metric.value}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                            {activePrinciple.metric.label}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {activePrinciple.metric.sublabel}
                          </span>
                        </div>
                      </div>

                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20 cursor-pointer w-full sm:w-auto"
                      >
                        <span>{activePrinciple.ctaText}</span>
                        <AnimatedArrowRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: 3D Studio Showcase with Parallax Tilt */}
              <div
                ref={showcaseRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="lg:col-span-5 relative perspective-[1200px]"
              >
                {/* Dynamic Ambient Background Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-primary/25 blur-2xl opacity-75 pointer-events-none transition-colors duration-500" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`why-3d-card-${activePrinciple.id}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border/90 aspect-[4/3] group bg-card select-none"
                  >
                    {/* 3D Image Canvas with Dynamic Hue Shift */}
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-500"
                      style={{
                        filter: `hue-rotate(${hueShift}deg) saturate(1.1) contrast(1.02)`,
                      }}
                    >
                      <Image
                        src={activePrinciple.imageSrc}
                        alt={activePrinciple.imageAlt}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>

                    {/* Gradient Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

                    {/* Top Floating Glass Badge */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
                      <div className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/80 text-[11px] font-mono font-semibold text-foreground flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        <span>{activePrinciple.statusBadge}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-mono font-bold text-primary">
                        {activePrinciple.step} / 03
                      </div>
                    </div>

                    {/* Bottom Floating Title */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/80">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                        {activePrinciple.kicker}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5 line-clamp-1">
                        {activePrinciple.title}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Comparison Matrix Accordion / Drawer */}
        <div className="mb-14 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xs overflow-hidden">
          <button
            onClick={() => setShowMatrix((prev) => !prev)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  How SimpleThink Compares Side-by-Side
                </h4>
                <p className="text-xs text-muted-foreground">
                  Agency vs. Freelancer vs. SimpleThink Studio Architectural Breakdown
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
              <span>{showMatrix ? "Hide Matrix" : "View Full Comparison"}</span>
              <ChevronRight
                className={cn("w-4 h-4 transition-transform duration-300", showMatrix && "rotate-90")}
              />
            </div>
          </button>

          <AnimatePresence>
            {showMatrix && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden border-t border-border/70"
              >
                <div className="p-4 sm:p-6 overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                    <thead>
                      <tr className="border-b border-border text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        <th className="pb-3 pl-3 font-semibold w-1/4">Evaluation Vector</th>
                        <th className="pb-3 px-3 font-semibold w-1/4 text-muted-foreground">
                          Traditional Agency
                        </th>
                        <th className="pb-3 px-3 font-semibold w-1/4 text-muted-foreground">
                          Solo Freelancer
                        </th>
                        <th className="pb-3 pr-3 font-bold w-1/4 text-primary bg-primary/[0.04] rounded-t-lg">
                          SimpleThink Studio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {COMPARISON_ROWS.map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="py-3.5 pl-3 font-semibold text-foreground">
                            {row.feature}
                          </td>
                          <td className="py-3.5 px-3 text-muted-foreground text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <XCircle className="w-3.5 h-3.5 text-rose-500/80 shrink-0" />
                              <span>{row.agency}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-muted-foreground text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                              <span>{row.freelancer}</span>
                            </span>
                          </td>
                          <td className="py-3.5 pr-3 font-medium text-foreground bg-primary/[0.04] text-xs">
                            <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span>{row.simplethink}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Elevated Editorial Stats Strip */}
        <div className="pt-8 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top hover line */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono flex items-baseline">
                    <span className="text-primary mr-1 text-2xl sm:text-3xl">+</span>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-foreground mt-1">
                    {stat.label}
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/50 line-clamp-2">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

