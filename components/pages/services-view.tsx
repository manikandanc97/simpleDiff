"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Package2,
  Palette,
  Sparkles,
  Layers,
  Cpu,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  number: string;
  name: string;
  icon: typeof Globe;
  outcome: string;
  pillars: [string, string, string, string];
  includes: [string, string, string];
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: "websites",
    number: "01",
    name: "Websites",
    icon: Globe,
    outcome: "Clear digital experiences built to turn visitors into customers.",
    pillars: ["Strategy", "Design", "Development", "Performance"],
    includes: [
      "Custom responsive design & design systems",
      "Conversion-optimized content architecture",
      "SEO, Core Web Vitals & accessibility tuning",
    ],
  },
  {
    id: "web-apps",
    number: "02",
    name: "Web applications",
    icon: LayoutDashboard,
    outcome: "Focused software built around how your business actually works.",
    pillars: ["Architecture", "Product UX", "Fullstack", "Real-time"],
    includes: [
      "Modern React & Next.js application architecture",
      "Secure authentication & database integration",
      "Interactive dashboards & business automations",
    ],
  },
  {
    id: "mobile-apps",
    number: "03",
    name: "Mobile apps",
    icon: Smartphone,
    outcome: "Useful mobile experiences built for real-world customers.",
    pillars: ["Cross-Platform", "Native Feel", "Offline First", "App Store"],
    includes: [
      "Cross-platform iOS & Android development (React Native)",
      "Offline-ready data synchronization & push notifications",
      "App Store & Google Play submission and launch",
    ],
  },
  {
    id: "saas",
    number: "04",
    name: "SaaS products",
    icon: Package2,
    outcome: "From first release to scalable product systems.",
    pillars: ["Monetization", "Multi-Tenancy", "Onboarding", "Scalability"],
    includes: [
      "Frictionless self-serve customer onboarding",
      "Stripe subscriptions, metered billing & customer portals",
      "Workspaces, role-based access control & audits",
    ],
  },
  {
    id: "branding",
    number: "05",
    name: "Branding & identity",
    icon: Palette,
    outcome: "A visual identity that makes the business recognizable.",
    pillars: ["Brand Voice", "Typography", "Color Systems", "Guidelines"],
    includes: [
      "Primary, secondary & responsive logo systems",
      "Curated color palettes & typography standards",
      "Comprehensive digital asset kit & brand guidelines",
    ],
  },
  {
    id: "ui-ux",
    number: "06",
    name: "UI/UX design",
    icon: Layers,
    outcome: "Intuitive product design that eliminates user friction and confusion.",
    pillars: ["User Journeys", "Wireframes", "Prototypes", "Design Tokens"],
    includes: [
      "User research, mental models & journey mapping",
      "High-fidelity interactive prototypes in Figma",
      "Production-ready design component tokens",
    ],
  },
  {
    id: "automation",
    number: "07",
    name: "AI automation",
    icon: Sparkles,
    outcome: "Practical automation that removes repetitive work.",
    pillars: ["Workflows", "LLM Agents", "Pipelines", "Integrations"],
    includes: [
      "Production-ready LLM assistants & custom agents",
      "Automated document processing, categorization & triage",
      "Deep integrations with everyday tools (Slack, CRMs, APIs)",
    ],
  },
  {
    id: "custom-software",
    number: "08",
    name: "Custom software",
    icon: Cpu,
    outcome: "Tailored software solutions engineered for specific business operations.",
    pillars: ["Discovery", "API Bridges", "Databases", "Legacy Modernization"],
    includes: [
      "Internal operational tools & admin management portals",
      "Custom REST/GraphQL APIs & third-party system bridges",
      "Robust relational database design & performance tuning",
    ],
  },
];

export function ServicesView() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { openLead } = useLead();

  const toggleService = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const selectedServices = SERVICES_LIST.filter((s) => selected.has(s.id));
  const selectedNames = selectedServices.map((s) => s.name);

  const handleStartProject = () => {
    if (selected.size === 0) return;
    openLead({
      source: "services",
      description: `Interested in: ${selectedNames.join(", ")}.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Header */}
      <div className="max-w-4xl mb-16 sm:mb-20">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Studio Services
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          Services.
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          We design and build digital products that solve real business problems. Select the capabilities you need to configure your project scope.
        </p>
      </div>

      {/* Editorial 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-24">
        {SERVICES_LIST.map((service) => {
          const isSelected = selected.has(service.id);
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => toggleService(service.id)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  toggleService(service.id);
                }
              }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "group relative p-8 sm:p-10 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isSelected
                  ? "bg-card border-primary ring-1 ring-primary/40 shadow-xl shadow-primary/10"
                  : "bg-card/70 border-border/80 hover:border-primary/40 hover:bg-card hover:shadow-lg"
              )}
            >
              {/* Top Accent Stripe */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
                  isSelected
                    ? "bg-primary"
                    : "bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50"
                )}
              />

              <div>
                {/* Header: Index number, Icon, and Selection Checkbox */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-muted-foreground/40 group-hover:text-primary transition-colors">
                      {service.number}
                    </span>
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Configurator Check Indicator */}
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </div>
                </div>

                {/* Service Title & Outcome */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {service.outcome}
                </p>

                {/* 4 Pillars Strip */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-muted/60 text-muted-foreground"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              {/* What is typically included */}
              <div className="pt-6 border-t border-border/50">
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-3 font-semibold">
                  Typically Includes
                </span>
                <ul className="space-y-2">
                  {service.includes.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Project Builder Bar (Slides up when 1+ services selected) */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-xl z-50"
          >
            <div className="bg-background/95 backdrop-blur-xl border-2 border-primary/50 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-primary/20 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-bold text-sm text-foreground">
                    {selected.size} {selected.size === 1 ? "service" : "services"} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="text-xs text-muted-foreground hover:text-foreground underline ml-2 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {selectedNames.join(", ")}
                </p>
              </div>

              <Button
                onClick={handleStartProject}
                className="font-semibold text-xs sm:text-sm h-11 px-5 rounded-xl shrink-0 cursor-pointer shadow-md hover:shadow-primary/30"
              >
                Start your project &rarr;
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
