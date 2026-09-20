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
  ArrowRight,
} from "lucide-react";
import { AnimatedArrowRight, AnimatedSend } from "@/components/ui/animated-icon";
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

function ServiceCard({
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className="group relative rounded-3xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Dynamic top accent highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

      {/* Top row: Number and Icon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-muted-foreground/30 group-hover:text-primary transition-colors font-mono select-none">
            {service.id}
          </span>
          <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* 3D Claymorphic Illustration Display (Cloudi5 style, reactive to theme color) */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-muted/30 to-muted/10 border border-border/60 group-hover:border-primary/30 p-2 sm:p-3 mb-6 transition-all duration-500 overflow-hidden">
          {/* Subtle dynamic glow puddle */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
          <div className="relative z-10 transform group-hover:scale-[1.03] transition-transform duration-500 ease-out">
            <Illustration />
          </div>
        </div>

        {/* Title and Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
          {service.tagline}
        </p>

        {/* Deliverables list */}
        <div className="space-y-2 pt-3 border-t border-border/50">
          {service.deliverables.map((item, i) => (
            <div
              key={i}
              className="text-xs text-muted-foreground/90 flex items-center gap-2 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
        <Link
          href="/services"
          className="text-xs font-semibold text-foreground/80 hover:text-primary flex items-center gap-1.5 transition-colors group/link"
        >
          <span>Explore service</span>
          <AnimatedArrowRight size={12} />
        </Link>
        <button
          type="button"
          onClick={() => onInquire(service.title)}
          className="group text-[11px] font-mono text-muted-foreground hover:text-primary cursor-pointer transition-colors flex items-center gap-1"
        >
          <span>Request scope</span>
          <AnimatedSend size={11} className="opacity-70 group-hover:opacity-100" />
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

  return (
    <section id="capabilities" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Subtle ambient lighting */}
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
              Capabilities & Focus
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

        {/* Dedicated Section Theme Dock Slot for Capabilities */}
        <div className="shrink-0">
          <SectionDockSlot sectionId="capabilities" label="Capabilities" />
        </div>
      </div>

      {/* 6-Card Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onInquire={handleInquire}
          />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center">
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
