"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Users,
  Target,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingTechGroup, type FloatingTechItem } from "@/components/ui/floating-tech-elements";

const FLOATING_WHY_TECHS: FloatingTechItem[] = [
  {
    slug: "postgresql",
    label: "PostgreSQL",
    top: "8%",
    right: "3.5%",
    duration: 8.5,
    delay: 0.2,
    size: "md",
  },
  {
    slug: "docker",
    label: "Docker",
    top: "35%",
    left: "2.5%",
    duration: 9,
    delay: 0.7,
    size: "md",
  },
  {
    slug: "python",
    label: "Python",
    bottom: "14%",
    left: "3%",
    duration: 8,
    delay: 0.4,
    size: "md",
  },
  {
    slug: "fastapi",
    label: "FastAPI",
    bottom: "10%",
    right: "3.5%",
    duration: 9.5,
    delay: 1.1,
    size: "md",
  },
];

interface Pillar {
  id: string;
  step: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  deliverables: string[];
  metric: {
    value: string;
    label: string;
  };
  icon: typeof Users;
}

const PILLARS: Pillar[] = [
  {
    id: "01",
    step: "01",
    badge: "Elite Squad",
    headline: "Senior builders.",
    headlineAccent: "Zero middlemen.",
    description:
      "Work directly with the elite engineers and designers actually crafting your product. No account managers, no translation lag, no juniors learning on your dime.",
    deliverables: [
      "Direct technical leadership",
      "Real-time Slack collaboration",
      "Rapid async execution",
    ],
    metric: {
      value: "0 Layers",
      label: "Bureaucracy",
    },
    icon: Users,
  },
  {
    id: "02",
    step: "02",
    badge: "Velocity",
    headline: "Ship in weeks.",
    headlineAccent: "Not months.",
    description:
      "We operate at startup speed with enterprise precision. Strict milestone-driven delivery means you know exactly what ships and when, with zero billing surprises.",
    deliverables: [
      "Fixed-scope sprint roadmaps",
      "Weekly staging deployments",
      "Transparent milestone delivery",
    ],
    metric: {
      value: "100%",
      label: "On-Time Shipping",
    },
    icon: Target,
  },
  {
    id: "03",
    step: "03",
    badge: "Craftsmanship",
    headline: "Pixel perfect.",
    headlineAccent: "Edge performance.",
    description:
      "Design and engineering collaborate in lockstep. We translate stunning Figma designs into blazing fast Next.js applications with sub-second performance.",
    deliverables: [
      "Fluid, micro-animated interfaces",
      "Modern Next.js & TypeScript stack",
      "Zero design-to-code loss",
    ],
    metric: {
      value: "<500ms",
      label: "Core Web Vitals Target",
    },
    icon: Layers,
  },
];

interface StatItem {
  value: number;
  valuePrefix?: string;
  valueSuffix?: string;
  label: string;
  detail: string;
  duration?: number;
}

const STATS: StatItem[] = [
  {
    value: 5,
    valueSuffix: "+",
    label: "Client Projects Shipped",
    detail: "Production web applications deployed",
    duration: 1.2,
  },
  {
    value: 3,
    valueSuffix: "x",
    label: "Average Lead Increase",
    detail: "Measured conversion uplift across redesigns",
    duration: 1.0,
  },
  {
    value: 100,
    valueSuffix: "%",
    label: "On-Time Milestone Delivery",
    detail: "Zero missed deadline commitments",
    duration: 1.6,
  },
  {
    value: 500,
    valuePrefix: "<",
    valueSuffix: "ms",
    label: "Core Web Vitals Target",
    detail: "Blazing fast edge performance",
    duration: 1.8,
  },
];

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="why-simplethink"
      className="relative w-full py-12 sm:py-16 bg-zinc-100/75 dark:bg-zinc-900/45 border-y border-zinc-200/80 dark:border-white/10 overflow-hidden"
    >
      {/* Subtle Background Pattern & Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-70" />

      <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Floating Animated Tech Badges */}
      <FloatingTechGroup items={FLOATING_WHY_TECHS} />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Section Theme Dock */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            sectionId="why-simplethink"
            dockLabel="Why SimpleThink"
            title={
              <>
                The unfair advantage{" "}
                <span className="text-primary transition-colors duration-500">for modern teams.</span>
              </>
            }
            description="No middle management, no billing surprises, and no handoff friction. Just direct access to senior builders who ship."
          />
        </div>

        {/* 3 Pillars Grid - Direct, Simple, No Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-6 sm:mb-8">
          {PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              >
                {/* Top Subtle Hover Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

                <div>
                  {/* Card Header: Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold text-primary">
                      <span>{pillar.step}</span>
                      <span className="text-primary/40">·</span>
                      <span>{pillar.badge}</span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground leading-snug">
                    {pillar.headline}{" "}
                    <span className="text-primary block sm:inline">{pillar.headlineAccent}</span>
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-5 pt-4 border-t border-border/60 space-y-2.5">
                    {pillar.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metric Pill */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    Key Metric
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border/70 text-xs font-mono font-bold text-foreground">
                    <span className="text-primary font-black">{pillar.metric.value}</span>
                    <span className="text-muted-foreground font-normal">· {pillar.metric.label}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Elevated Editorial Stats Strip */}
        <div className="pt-6 sm:pt-8 border-t border-border">
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
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono flex items-baseline">
                    <span className="text-primary mr-1 text-2xl sm:text-3xl">+</span>
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.valuePrefix}
                      suffix={stat.valueSuffix}
                      duration={stat.duration}
                      delay={i * 0.1}
                    />
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
