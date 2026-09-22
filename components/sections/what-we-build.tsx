"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedArrowRight, AnimatedIcon, type AnimatedIconName } from "@/components/ui/animated-icon";
import { useLead } from "@/components/leads/lead-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { FloatingTechGroup, type FloatingTechItem } from "@/components/ui/floating-tech-elements";
import {
  WebsitesIllustration,
  WebAppsIllustration,
  MobileAppsIllustration,
  SaaSProductsIllustration,
} from "@/components/ui/clay-3d/clay-illustrations";

const FLOATING_BUILD_TECHS: FloatingTechItem[] = [
  {
    slug: "swift",
    label: "Swift",
    top: "6%",
    right: "3.5%",
    duration: 8.5,
    delay: 0.3,
    size: "md",
  },
  {
    slug: "aws",
    label: "AWS",
    bottom: "16%",
    left: "2.5%",
    duration: 9,
    delay: 0.7,
    size: "md",
  },
];

// ── Only the first 4 services are shown here. See /services for all 6. ────────
const SERVICES = [
  {
    id: "01",
    iconName: "globe" as AnimatedIconName,
    title: "Websites",
    tagline:
      "Digital experiences that make your business clear, credible and memorable.",
    deliverables: [
      "Custom Design Systems",
      "High Conversion UX",
      "SEO & Sub-second Speed",
    ],
    Illustration: WebsitesIllustration,
  },
  {
    id: "02",
    iconName: "grid" as AnimatedIconName,
    title: "Web Applications",
    tagline:
      "Focused software built around how your business actually works.",
    deliverables: [
      "Next.js & React",
      "Real-time Workflows",
      "Secure Role-based Auth",
    ],
    Illustration: WebAppsIllustration,
  },
  {
    id: "03",
    iconName: "smartphone" as AnimatedIconName,
    title: "Mobile Apps",
    tagline:
      "Useful mobile experiences built for real-world customers.",
    deliverables: [
      "React Native Cross-Platform",
      "Offline Functionality",
      "App Store Release",
    ],
    Illustration: MobileAppsIllustration,
  },
  {
    id: "04",
    iconName: "layers" as AnimatedIconName,
    title: "SaaS Products",
    tagline:
      "From first release to scalable, multi-tenant product systems.",
    deliverables: [
      "Stripe Subscriptions & Billing",
      "Multi-tenant Architecture",
      "Product Telemetry",
    ],
    Illustration: SaaSProductsIllustration,
  },
] as const;

type Service = (typeof SERVICES)[number];

const LAYOUT_SPRING = { type: "spring" as const, stiffness: 340, damping: 36 };

// ── Desktop: Expanding Accordion Panel ────────────────────────────────────────
function DesktopPanel({
  service,
  isActive,
  onActivate,
  onInquire,
}: {
  service: Service;
  isActive: boolean;
  onActivate: () => void;
  onInquire: (name: string) => void;
}) {
  const Illustration = service.Illustration;

  return (
    <motion.div
      layout
      transition={LAYOUT_SPRING}
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={cn(
        "relative rounded-3xl border overflow-hidden select-none transition-colors duration-300 h-full",
        isActive
          ? "flex-[3.8] border-primary/45 shadow-2xl shadow-primary/8 bg-card cursor-default"
          : "flex-[0.75] border-border/60 bg-card/40 hover:border-primary/40 hover:bg-card/70 cursor-pointer group/collapsed"
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Primary blue ambient tint — always consistent across all active cards */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          "bg-gradient-to-br from-primary/18 via-primary/8 to-primary/4",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      <AnimatePresence mode="wait" initial={false}>
        {/* ── EXPANDED STATE ── */}
        {isActive ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 h-full flex"
          >
            {/* Content side */}
            <div className="flex flex-col justify-between p-5 xl:p-6 flex-1 min-w-0">
              <div>
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[44px] leading-none font-black font-mono text-primary/10 select-none tracking-tighter">
                    {service.id}
                  </span>
                  <div className="w-9 h-9 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <AnimatedIcon name={service.iconName} size={16} />
                  </div>
                </div>

                {/* Title (H3: 32px) */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-1.5 leading-tight">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 max-w-xs">
                  {service.tagline}
                </p>

                {/* Deliverable pills — compact to prevent wrapping overflow */}
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-primary/30 bg-primary/8 text-foreground whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action row — sits neatly with reduced gap */}
              <div className="flex items-center gap-5 pt-3 border-t border-border/40">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
                >
                  <span>Explore service</span>
                  <AnimatedArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInquire(service.title);
                  }}
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  Request scope →
                </button>
              </div>
            </div>

            {/* Illustration side */}
            <div className="hidden xl:flex w-[35%] shrink-0 items-center justify-center p-4 border-l border-primary/20 bg-gradient-to-br from-primary/12 to-primary/4 relative">
              <div className="w-full max-w-[280px] transform transition-transform duration-500">
                <Illustration />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── COLLAPSED STATE ── */
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 h-full flex flex-col justify-between p-3.5"
          >
            {/* Top row: Number on left, Arrow button on top right */}
            <div className="w-full flex items-center justify-between">
              <span className="text-base font-black font-mono text-muted-foreground/30 select-none leading-none">
                {service.id}
              </span>
              <div className="w-6 h-6 rounded-full border border-border/70 bg-card/90 flex items-center justify-center text-muted-foreground group-hover/collapsed:text-primary group-hover/collapsed:border-primary/50 group-hover/collapsed:bg-primary/10 transition-all duration-300 shadow-xs">
                <AnimatedIcon name="chevron-right" size={12} className="group-hover/collapsed:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Middle: Icon + vertical label */}
            <div className="flex flex-col items-center gap-4 my-auto">
              <div className="w-9 h-9 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground group-hover/collapsed:text-primary group-hover/collapsed:border-primary/40 group-hover/collapsed:bg-primary/10 transition-all duration-300">
                <AnimatedIcon name={service.iconName} size={16} />
              </div>
              {/* Vertical text */}
              <span
                className="text-[11px] font-semibold text-muted-foreground/60 group-hover/collapsed:text-foreground tracking-[0.08em] uppercase select-none whitespace-nowrap transition-colors"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {service.title}
              </span>
            </div>

            {/* Bottom subtle dot indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-border/60 group-hover/collapsed:bg-primary/60 transition-colors mx-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mobile: Click-to-expand vertical cards ─────────────────────────────────────
function MobileCard({
  service,
  isActive,
  onToggle,
  onInquire,
  index,
}: {
  service: Service;
  isActive: boolean;
  onToggle: () => void;
  onInquire: (name: string) => void;
  index: number;
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...LAYOUT_SPRING, delay: index * 0.06 }}
      className={cn(
        "relative rounded-2xl border overflow-hidden",
        "transition-colors duration-300",
        isActive
          ? "border-primary/40 bg-card shadow-xl shadow-primary/8"
          : "border-border/60 bg-card/50"
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-400",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Primary blue ambient tint */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-400",
          "bg-gradient-to-br from-primary/18 via-primary/8 to-primary/4",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Header row — always visible, clickable */}
      <button
        type="button"
        onClick={onToggle}
        className="relative z-10 w-full flex items-center gap-4 p-5 cursor-pointer text-left"
      >
        {/* Number */}
        <span className="text-3xl font-black font-mono text-muted-foreground/20 select-none leading-none w-10 shrink-0">
          {service.id}
        </span>

        {/* Icon */}
        <div
          className={cn(
            "w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300",
            isActive
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border/60 bg-muted/30 text-muted-foreground"
          )}
        >
          <AnimatedIcon name={service.iconName} size={16} />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "flex-1 text-base font-bold tracking-tight transition-colors duration-300",
            isActive ? "text-primary" : "text-foreground"
          )}
        >
          {service.title}
        </h3>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            isActive && "rotate-180"
          )}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="relative z-10 px-5 pb-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.tagline}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {service.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 bg-primary/8 text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 pt-4 border-t border-border/40">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
                >
                  <span>Explore service</span>
                  <AnimatedArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onInquire(service.title); }}
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Request scope →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export function WhatWeBuild() {
  const { openLead } = useLead();
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  // Desktop: default first card active, resets to 0 on mouse leave
  const [desktopActive, setDesktopActive] = useState(0);
  // Mobile: click-to-toggle, default first open
  const [mobileActive, setMobileActive] = useState(0);

  const handleInquire = (serviceName: string) => {
    openLead({
      source: "what-we-build",
      description: `Interested in: ${serviceName}.`,
    });
  };

  return (
    <section
      id="capabilities"
      ref={headerRef}
      className="relative w-full py-12 sm:py-16 bg-background overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-12 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-60" />

      {/* Floating Animated Badges */}
      <FloatingTechGroup items={FLOATING_BUILD_TECHS} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Editorial Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 relative z-10">
        <SectionHeader
          sectionId="capabilities"
          dockLabel="Capabilities & Focus"
          title={
            <>
              What We <span className="text-primary">Build.</span>
            </>
          }
          description="We engineer custom software, scalable web applications, and mobile platforms — with enterprise-grade reliability and zero unnecessary overhead."
        />
      </div>


      {/* ── Desktop: Horizontal expanding panels ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden md:flex gap-3 h-[335px]"
      >
        {SERVICES.map((service, i) => (
          <DesktopPanel
            key={service.id}
            service={service}
            isActive={desktopActive === i}
            onActivate={() => setDesktopActive(i)}
            onInquire={handleInquire}
          />
        ))}
      </motion.div>

      {/* ── Mobile: Click-to-expand vertical cards ── */}
      <div className="md:hidden flex flex-col gap-3">
        {SERVICES.map((service, i) => (
          <MobileCard
            key={service.id}
            service={service}
            index={i}
            isActive={mobileActive === i}
            onToggle={() => setMobileActive((cur) => (cur === i ? -1 : i))}
            onInquire={handleInquire}
          />
        ))}
      </div>

      {/* ── See All Services button ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/services"
          id="what-we-build-see-all"
          className="group inline-flex items-center gap-2.5 h-11 px-7 rounded-full border border-border/80 bg-card hover:border-primary/50 hover:bg-primary/5 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300"
        >
          <span>See all 6 services</span>
          <AnimatedArrowRight size={14} />
        </Link>
        <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-[0.15em]">
          Branding · AI Automation · and more
        </span>
      </motion.div>
      </div>
    </section>
  );
}
