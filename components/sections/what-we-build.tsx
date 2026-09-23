"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { useLead } from "@/components/leads/lead-provider";
import { SectionHeader } from "@/components/ui/section-header";
import {
  WebsitesIllustration,
  WebAppsIllustration,
  MobileAppsIllustration,
  SaaSProductsIllustration,
} from "@/components/ui/clay-3d/clay-illustrations";

const SERVICES = [
  {
    id: "01",
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

function ServiceItem({
  service,
  isActive,
  onToggle,
  onInquire,
}: {
  service: Service;
  isActive: boolean;
  onToggle: () => void;
  onInquire: (name: string) => void;
}) {
  const Illustration = service.Illustration;

  return (
    <div className="border-t border-border group">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-baseline gap-6 py-8 text-left transition-colors cursor-pointer"
      >
        <span
          className={cn(
            "text-lg md:text-xl font-bold font-mono transition-colors duration-300",
            isActive ? "text-primary" : "text-muted-foreground/40 group-hover:text-foreground/60"
          )}
        >
          {service.id}
        </span>
        <div className="flex-1">
          <h3
            className={cn(
              "text-2xl md:text-4xl font-extrabold tracking-tight transition-colors duration-300",
              isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
            )}
          >
            {service.title}
          </h3>
        </div>
        <div
          className={cn(
            "shrink-0 transition-transform duration-300",
            isActive ? "text-primary rotate-90" : "text-muted-foreground/40 group-hover:text-foreground/60"
          )}
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 md:pl-16 pr-4">
              {/* Active Indicator Line */}
              <div className="w-12 h-[2px] bg-primary mb-6" />

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-8 font-medium">
                {service.tagline}
              </p>

              <div className="flex flex-col gap-3 mb-10">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-sm font-semibold text-foreground/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Visual (hidden on md+) */}
              <div className="md:hidden w-full max-w-sm mx-auto mb-10 p-6 flex justify-center">
                <Illustration />
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <span>Explore service</span>
                  <AnimatedArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInquire(service.title);
                  }}
                  className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Request scope →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WhatWeBuild() {
  const { openLead } = useLead();
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleInquire = (serviceName: string) => {
    openLead({
      source: "what-we-build",
      description: `Interested in: ${serviceName}.`,
    });
  };

  const ActiveIllustration = SERVICES[activeIndex].Illustration;

  return (
    <section
      id="capabilities"
      ref={headerRef}
      className="relative w-full py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:mb-24">
          <SectionHeader
            sectionId="capabilities"
            dockLabel="Capabilities & Focus"
            title={
              <>
                WHAT WE <span className="text-primary">BUILD.</span>
              </>
            }
            description="We engineer custom software, scalable web applications, and digital platforms — with enterprise-grade reliability and zero unnecessary complexity."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Accordion List */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col">
            <div className="border-b border-border">
              {SERVICES.map((service, i) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isActive={activeIndex === i}
                  onToggle={() => setActiveIndex(i)}
                  onInquire={handleInquire}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-12"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-all duration-300 uppercase tracking-widest"
              >
                <span>View all 6 services</span>
                <AnimatedArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Sticky Visual (Desktop Only) */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6 relative">
            <div className="sticky top-32 w-full aspect-square flex items-center justify-center p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[380px] origin-center"
                >
                  <ActiveIllustration />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
