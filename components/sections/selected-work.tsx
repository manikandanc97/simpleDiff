"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

const WORKS = [
  {
    id: "01",
    title: "FinTrack Pro",
    category: "FinTech · SaaS Platform",
    result: "3× faster reconciliation",
    description:
      "A multi-tenant financial dashboard for SMEs — real-time P&L tracking, automated reconciliation, and Stripe-native billing. Built with Next.js, Supabase, and a custom chart engine.",
    tags: ["Next.js", "Supabase", "Stripe", "TypeScript"],
    accent: "from-blue-500/20 to-indigo-500/10",
    featured: true,
  },
  {
    id: "02",
    title: "CareConnect",
    category: "HealthTech · Mobile App",
    result: "4.8★ App Store Rating",
    description:
      "Cross-platform patient-doctor scheduling and teleconsultation app with HIPAA-grade data handling, push notifications, and offline mode.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    accent: "from-emerald-500/20 to-teal-500/10",
    featured: false,
  },
  {
    id: "03",
    title: "Shopflow",
    category: "E-Commerce · Web App",
    result: "2.1× conversion uplift",
    description:
      "A headless e-commerce storefront for a fashion brand — sub-1s load times, custom CMS, and an AI-powered product recommendation engine.",
    tags: ["Next.js", "Sanity", "Shopify", "AI"],
    accent: "from-orange-500/20 to-rose-500/10",
    featured: false,
  },
  {
    id: "04",
    title: "LogiDesk",
    category: "Logistics · Enterprise Dashboard",
    result: "60% ops cost reduction",
    description:
      "An end-to-end shipment tracking and dispatch management system for a regional logistics company with real-time GPS, role-based access, and automated reporting.",
    tags: ["React", "Node.js", "Redis", "Docker"],
    accent: "from-purple-500/20 to-violet-500/10",
    featured: false,
  },
];

const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };

function WorkCard({
  work,
  index,
}: {
  work: (typeof WORKS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (work.featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING, delay: index * 0.07 }}
        className="group relative col-span-1 md:col-span-2 rounded-3xl border border-border/70 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${work.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[320px]">
          {/* Left: content */}
          <div className="flex flex-col justify-between p-7 sm:p-9 md:w-[55%]">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-7xl font-black tracking-tighter text-muted-foreground/10 group-hover:text-primary/15 transition-colors font-mono select-none leading-none">
                  {work.id}
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary border border-primary/30 bg-primary/10 px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>

              <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                {work.category}
              </p>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-sm">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {work.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold border border-border/60 bg-muted/30 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-5 border-t border-border/40">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                <span>View case study</span>
                <AnimatedArrowRight size={13} />
              </Link>
              <span className="text-xs font-mono text-emerald-500 font-semibold">
                ↑ {work.result}
              </span>
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative md:w-[45%] min-h-[200px] flex items-center justify-center p-8 border-t md:border-t-0 md:border-l border-border/40 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${work.accent} opacity-40`} />
            <div className="relative z-10 text-center">
              <div className="text-8xl font-black font-mono text-foreground/5 group-hover:text-foreground/8 transition-colors select-none leading-none">
                {work.result.split(" ")[0]}
              </div>
              <div className="text-sm font-mono text-muted-foreground/60 uppercase tracking-widest mt-2">
                {work.result.split(" ").slice(1).join(" ")}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className="group relative rounded-3xl border border-border/70 bg-card overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />
      <div className={`absolute inset-0 bg-gradient-to-br ${work.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-5">
          <span className="text-5xl font-black tracking-tighter text-muted-foreground/10 group-hover:text-primary/15 transition-colors font-mono select-none leading-none">
            {work.id}
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {work.category}
          </span>
        </div>

        <h3 className="text-xl font-black tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {work.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {work.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {work.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-border/60 bg-muted/30 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <Link
            href="/work"
            className="text-xs font-semibold text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>View case</span>
            <AnimatedArrowRight size={11} />
          </Link>
          <span className="text-xs font-mono text-emerald-500 font-semibold">
            ↑ {work.result}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const [featured, ...rest] = WORKS;

  return (
    <section
      id="selected-work"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-12 left-1/3 w-96 h-96 rounded-full bg-primary/8 blur-3xl opacity-60" />

      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 relative z-10">
        <div ref={headerRef} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
              Portfolio · Case Studies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Selected <span className="text-primary">Work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Real products, shipped. Each project is a focused engagement where we own the problem end-to-end — from architecture to launch.
          </motion.p>
        </div>

        <div className="shrink-0">
          <SectionDockSlot sectionId="selected-work" label="Selected Work" />
        </div>
      </div>

      {/* Bento Grid */}
      {/* Row 1: Featured (col-span-2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
        <WorkCard work={featured} index={0} />
        <WorkCard work={rest[0]} index={1} />
      </div>

      {/* Row 2: Two equal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <WorkCard work={rest[1]} index={2} />
        <WorkCard work={rest[2]} index={3} />
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <span>See all case studies and project breakdowns</span>
          <AnimatedArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
