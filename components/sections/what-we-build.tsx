"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Package2,
  Palette,
  Sparkles,
} from "lucide-react";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { useLead } from "@/components/leads/lead-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

import {
  WebsitesIllustration,
  WebAppsIllustration,
  MobileAppsIllustration,
  SaaSProductsIllustration,
  BrandingIllustration,
  AIAutomationIllustration,
} from "@/components/ui/clay-3d/clay-illustrations";

const SERVICES = [
  {
    id: "01",
    icon: Globe,
    title: "Websites",
    tagline: "Digital experiences that make your business clear, credible and memorable.",
    deliverables: ["Custom Design Systems", "High Conversion UX", "SEO & Sub-second Speed"],
    Illustration: WebsitesIllustration,
  },
  {
    id: "02",
    icon: LayoutDashboard,
    title: "Web applications",
    tagline: "Focused software built around how your business actually works.",
    deliverables: ["Next.js & React", "Real-time Workflows", "Secure Role-based Auth"],
    Illustration: WebAppsIllustration,
  },
  {
    id: "03",
    icon: Smartphone,
    title: "Mobile apps",
    tagline: "Useful mobile experiences built for real-world customers.",
    deliverables: ["React Native Cross-Platform", "Offline Functionality", "App Store Release"],
    Illustration: MobileAppsIllustration,
  },
  {
    id: "04",
    icon: Package2,
    title: "SaaS products",
    tagline: "From first release to scalable product systems.",
    deliverables: ["Stripe Subscriptions & Billing", "Multi-tenant Architecture", "Product Telemetry"],
    Illustration: SaaSProductsIllustration,
  },
  {
    id: "05",
    icon: Palette,
    title: "Branding & identity",
    tagline: "A visual identity that makes the business recognizable.",
    deliverables: ["Logo & Typography Systems", "Visual Identity Guidelines", "Digital Asset Kits"],
    Illustration: BrandingIllustration,
  },
  {
    id: "06",
    icon: Sparkles,
    title: "AI automation",
    tagline: "Practical automation that removes repetitive work.",
    deliverables: ["Custom LLM Workflows", "Intelligent Document Pipelines", "Automated Agents"],
    Illustration: AIAutomationIllustration,
  },
];

const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };

// ─── Featured card (large, col-span-2) ──────────────────────────────────────
function FeaturedCard({
  service,
  index,
  onInquire,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  onInquire: (name: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;
  const Illustration = service.Illustration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className="group relative col-span-1 md:col-span-2 rounded-3xl border border-border/70 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left: content */}
        <div className="flex flex-col justify-between p-7 sm:p-9 md:w-1/2">
          <div>
            {/* Number + Icon */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-7xl font-black tracking-tighter text-muted-foreground/10 group-hover:text-primary/15 transition-colors font-mono select-none leading-none">
                {service.id}
              </span>
              <div className="w-11 h-11 rounded-2xl border border-border/60 bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
              {service.tagline}
            </p>

            {/* Pill deliverables */}
            <div className="flex flex-wrap gap-2">
              {service.deliverables.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-border/60 bg-muted/30 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/40">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              <span>Explore service</span>
              <AnimatedArrowRight size={13} />
            </Link>
            <button
              type="button"
              onClick={() => onInquire(service.title)}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Request scope →
            </button>
          </div>
        </div>

        {/* Right: illustration */}
        <div className="relative md:w-1/2 min-h-[220px] bg-gradient-to-br from-muted/20 via-muted/10 to-transparent flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border/40">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-500" />
          <div className="relative z-10 w-full max-w-xs transform group-hover:scale-[1.04] transition-transform duration-500 ease-out">
            <Illustration />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tall card ───────────────────────────────────────────────────────────────
function TallCard({
  service,
  index,
  onInquire,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  onInquire: (name: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;
  const Illustration = service.Illustration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className="group relative rounded-3xl border border-border/70 bg-card overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

      {/* Illustration panel */}
      <div className="relative bg-gradient-to-b from-muted/25 to-transparent flex items-center justify-center p-6 border-b border-border/40 min-h-[180px]">
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-500" />
        {/* Giant ghost number */}
        <span className="absolute bottom-2 right-4 text-8xl font-black tracking-tighter text-muted-foreground/8 group-hover:text-primary/10 transition-colors font-mono select-none leading-none">
          {service.id}
        </span>
        <div className="relative z-10 w-full max-w-[180px] transform group-hover:scale-[1.04] transition-transform duration-500 ease-out">
          <Illustration />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl border border-border/60 bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {service.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.deliverables.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-border/60 bg-muted/30 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
          <Link
            href="/services"
            className="text-xs font-semibold text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>Explore</span>
            <AnimatedArrowRight size={11} />
          </Link>
          <button
            type="button"
            onClick={() => onInquire(service.title)}
            className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Request →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Compact horizontal strip card ───────────────────────────────────────────
function StripCard({
  service,
  index,
  onInquire,
  isLast,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  onInquire: (name: string) => void;
  isLast?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className={`group flex items-center gap-6 py-6 ${!isLast ? "border-b border-border/40" : ""} transition-all duration-200 cursor-default`}
    >
      {/* Number */}
      <span className="text-4xl font-black font-mono text-muted-foreground/20 group-hover:text-primary/30 transition-colors select-none w-12 shrink-0 leading-none">
        {service.id}
      </span>

      {/* Icon */}
      <div className="w-10 h-10 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300 shrink-0">
        <Icon className="h-4 w-4" />
      </div>

      {/* Title + tagline */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-0.5">
          {service.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
          {service.tagline}
        </p>
      </div>

      {/* Pills — hidden on small screens */}
      <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[340px]">
        {service.deliverables.map((item, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-border/50 bg-muted/20 text-muted-foreground group-hover:border-primary/25 group-hover:text-foreground transition-all duration-300"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Action */}
      <div className="shrink-0 flex items-center gap-3">
        <Link
          href="/services"
          className="text-xs font-semibold text-foreground/60 hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <AnimatedArrowRight size={12} />
        </Link>
        <button
          type="button"
          onClick={() => onInquire(service.title)}
          className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer hidden sm:block"
        >
          Scope →
        </button>
      </div>
    </motion.div>
  );
}

export function WhatWeBuild() {
  const { openLead } = useLead();
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const handleInquire = (serviceName: string) => {
    openLead({
      source: "what-we-build",
      description: `Interested in: ${serviceName}.`,
    });
  };

  const [featured, ...rest] = SERVICES;
  const tallCards = rest.slice(0, 3); // 02, 03, 04
  const stripCards = rest.slice(3);   // 05, 06

  return (
    <section id="capabilities" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-12 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-60" />

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
              Capabilities &amp; Focus
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            What We <span className="text-primary">Build.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            We engineer custom software, scalable web applications, and mobile platforms with enterprise-grade reliability and zero unnecessary overhead.
          </motion.p>
        </div>

        <div className="shrink-0">
          <SectionDockSlot sectionId="capabilities" label="Capabilities" />
        </div>
      </div>

      {/* ── Bento Grid ── */}
      {/* Row 1: Featured (col-span-2) + Tall card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
        <FeaturedCard service={featured} index={0} onInquire={handleInquire} />
        <TallCard service={tallCards[0]} index={1} onInquire={handleInquire} />
      </div>

      {/* Row 2: Two equal tall cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
        <TallCard service={tallCards[1]} index={2} onInquire={handleInquire} />
        <TallCard service={tallCards[2]} index={3} onInquire={handleInquire} />
      </div>

      {/* Row 3: Horizontal strip */}
      <div className="rounded-3xl border border-border/70 bg-card px-6 sm:px-8">
        {stripCards.map((service, i) => (
          <StripCard
            key={service.id}
            service={service}
            index={4 + i}
            onInquire={handleInquire}
            isLast={i === stripCards.length - 1}
          />
        ))}
      </div>

      {/* Bottom link */}
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <span>Need custom scope or a multi-platform rollout? See all services</span>
          <AnimatedArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
