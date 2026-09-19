"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Package2,
  Palette,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    id: "01",
    icon: Globe,
    title: "Websites",
    tagline: "Convert visitors into customers",
    description:
      "Fast, clear websites designed to turn visitors into customers. Custom-built, not templated — because your brand deserves better than a drag-and-drop theme.",
    highlights: ["Custom design systems", "Sub-second load times", "SEO-first architecture"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    id: "02",
    icon: LayoutDashboard,
    title: "Web apps",
    tagline: "Tools your users will actually use",
    description:
      "Interactive tools and applications that feel fast and work reliably. We focus on the 20% of features that deliver 80% of the value.",
    highlights: ["React & Next.js", "Real-time features", "Role-based access"],
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    id: "03",
    icon: Smartphone,
    title: "Mobile apps",
    tagline: "Smooth iOS & Android experiences",
    description:
      "Smooth iOS and Android apps built for everyday use. React Native means one codebase, two platforms, and a native feel on both.",
    highlights: ["React Native", "App Store ready", "Offline support"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    id: "04",
    icon: Package2,
    title: "SaaS products",
    tagline: "Ship. Iterate. Grow.",
    description:
      "Complete software platforms with user accounts, billing, and workflows. We strip the complexity so you can go to market faster.",
    highlights: ["Stripe billing", "Auth & multi-tenancy", "Analytics built-in"],
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    id: "05",
    icon: Palette,
    title: "Branding",
    tagline: "Identity that earns attention",
    description:
      "Logos, visual identity, typography, and design systems that stand out. Great branding isn't just how you look — it's how you make people feel.",
    highlights: ["Logo design", "Design tokens", "Brand guidelines"],
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    id: "06",
    icon: Sparkles,
    title: "AI automation",
    tagline: "Work smarter, not harder",
    description:
      "Practical AI workflows and smart automations that save real hours. We build with LLMs, vector search, and agents that actually work in production.",
    highlights: ["LLM integrations", "Document pipelines", "Workflow automation"],
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
];

const FLAGSHIP = SERVICES[0];
const GRID_SERVICES = SERVICES.slice(1);

function FlagshipCard({ service }: { service: (typeof SERVICES)[0] }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-2xl border border-border bg-card overflow-hidden mb-4 card-hover",
        service.border
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-30 pointer-events-none",
          "bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,var(--tw-gradient-from),transparent)]"
        )}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left: Visual */}
        <div className={cn("lg:col-span-5 p-8 sm:p-10 flex items-center justify-center min-h-[200px]", service.bg)}>
          <div className="relative flex items-center justify-center">
            <div className={cn("absolute w-32 h-32 rounded-full blur-2xl opacity-40", service.bg)} />
            <div
              className={cn(
                "relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg",
                service.bg
              )}
            >
              <Icon className={cn("h-10 w-10", service.color)} />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("text-xs font-mono font-bold uppercase tracking-widest", service.color)}>
                Flagship Service
              </span>
              <span className="text-xs font-mono text-muted-foreground">— {service.id}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">
              {service.title}
            </h3>
            <p className={cn("text-sm font-semibold mb-4", service.color)}>{service.tagline}</p>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-border">
              {service.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", service.bg.replace("bg-", "bg-").replace("/10", ""))} />
                  {h}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs hover:shadow-sm text-white",
                  service.bg.replace("bg-", "bg-").replace("/10", ""),
                  service.color.replace("text-", "bg-").replace("-500", "-500")
                )}
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">Full lifecycle from design to launch</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative p-6 rounded-xl border border-border bg-card flex flex-col gap-4 card-hover",
        service.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:scale-110", service.bg)}>
          <Icon className={cn("h-5 w-5", service.color)} />
        </div>
        <span className="text-xs font-mono font-bold text-muted-foreground">{service.id}</span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1 group-hover:text-primary-text transition-colors">
          {service.title}
        </h3>
        <p className={cn("text-xs font-semibold mb-3", service.color)}>{service.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary-text transition-colors">
        <span>Learn more</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

export function WhatWeBuild() {
  return (
    <section className="py-24 px-6 bg-muted/20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
              Our Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            What we build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            We turn ideas into clear, useful digital products for businesses and founders.
          </motion.p>
        </div>

        {/* Flagship featured card */}
        <FlagshipCard service={FLAGSHIP} />

        {/* 3-column service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRID_SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
