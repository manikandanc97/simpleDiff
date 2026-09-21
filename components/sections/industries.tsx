"use client";

import { motion } from "motion/react";
import {
  Landmark,
  Heart,
  BookOpen,
  ShoppingCart,
  Truck,
  Home,
  Scale,
  Package,
  Tv,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const INDUSTRIES = [
  {
    id: "fintech",
    label: "FinTech",
    icon: Landmark,
    description: "Payments, dashboards, lending",
  },
  {
    id: "healthtech",
    label: "HealthTech",
    icon: Heart,
    description: "Telehealth, EHR, patient apps",
  },
  {
    id: "edtech",
    label: "EdTech",
    icon: BookOpen,
    description: "LMS platforms, learning tools",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    description: "Storefronts, headless, OMS",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    description: "Fleet tracking, dispatch ops",
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Home,
    description: "Listing platforms, CRM tools",
  },
  {
    id: "legaltech",
    label: "Legal Tech",
    icon: Scale,
    description: "Document automation, portals",
  },
  {
    id: "saas",
    label: "B2B SaaS",
    icon: Package,
    description: "Multi-tenant, billing, APIs",
  },
  {
    id: "media",
    label: "Media & Content",
    icon: Tv,
    description: "Streaming, CMS, newsletters",
  },
  {
    id: "startups",
    label: "Startups",
    icon: Zap,
    description: "MVPs, 0→1, investor-ready builds",
  },
];

export function Industries() {

  return (
    <section
      id="industries"
      className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background border-t border-border overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-25" />
      <div className="pointer-events-none absolute -bottom-8 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <SectionHeader
            sectionId="industries"
            dockLabel="Verticals · Domains"
            title={
              <>
                Industries We <span className="text-primary">Serve.</span>
              </>
            }
            description="We bring domain literacy to every engagement. Whether your product is regulated, high-growth, or consumer-facing — we understand the context, not just the code."
          />
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  delay: index * 0.05,
                }}
                className="group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-border/60 bg-card/60 cursor-default transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 rounded-full" />

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </div>

                {/* Label */}
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-1">
                    {industry.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
                    {industry.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-12 pt-8 border-t border-border/60 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            Don&apos;t see your industry? We adapt. Brief us and we&apos;ll tell you if we&apos;re the right fit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
