"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ArrowUpRight,
  Globe,
  LayoutDashboard,
  Smartphone,
  Layers,
} from "lucide-react";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { FloatingTechGroup, type FloatingTechItem } from "@/components/ui/floating-tech-elements";
import { PROJECTS, type Project, type ServiceType } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring" as const, stiffness: 320, damping: 28 };

const FLOATING_TECHS: FloatingTechItem[] = [
  {
    slug: "nextjs",
    label: "Next.js",
    top: "6%",
    right: "3.5%",
    duration: 8,
    delay: 0.2,
    size: "md",
  },
  {
    slug: "typescript",
    label: "TypeScript",
    top: "16%",
    left: "3%",
    duration: 9.5,
    delay: 0.8,
    size: "md",
  },
  {
    slug: "tailwindcss",
    label: "Tailwind CSS",
    bottom: "10%",
    right: "3%",
    duration: 8.5,
    delay: 1.2,
    size: "md",
  },
  {
    slug: "supabase",
    label: "Supabase",
    bottom: "16%",
    left: "3.5%",
    duration: 9,
    delay: 0.5,
    size: "md",
  },
];

interface ServiceTabItem {
  id: ServiceType;
  label: string;
  icon: typeof Globe;
  tag: string;
  tagline: string;
}

const SERVICE_TABS: ServiceTabItem[] = [
  {
    id: "Websites",
    label: "Websites",
    icon: Globe,
    tag: "3 Live Client Sites",
    tagline: "High-performance client websites engineered for sub-second speeds, top-tier SEO, and measurable conversions.",
  },
  {
    id: "Web Apps",
    label: "Web Apps",
    icon: LayoutDashboard,
    tag: "3 Fullstack Systems",
    tagline: "Focused enterprise software, cloud ERP platforms, and real-time operational dashboards.",
  },
  {
    id: "Mobile Apps",
    label: "Mobile Apps",
    icon: Smartphone,
    tag: "3 Mobile Products",
    tagline: "Cross-platform iOS and Android mobile experiences engineered with native performance and offline sync.",
  },
];

/**
 * Modern, Well-Proportioned Project Card
 * Balanced aspect ratio, crisp original visuals, clean typography, and interactive triggers.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-2xl sm:rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary transition-all duration-500 z-10" />
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", project.accentGradient)} />

      {/* ─── Visual Showcase Banner (Real Live Image) ─── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40 border-b border-border/60">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={cn("w-full h-full bg-gradient-to-br", project.accentGradient)} />
        )}

        {/* Soft Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/65 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.badge}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/65 backdrop-blur-md text-white border border-white/15 shadow-xs">
            {project.result}
          </span>
        </div>

        {/* Floating Domain Badge */}
        {project.domain && (
          <div className="absolute bottom-2.5 left-3 z-10">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/90 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 hover:border-primary/50 transition-colors shadow-xs"
            >
              <Globe size={11} className="text-primary" />
              <span>{project.domain}</span>
              <ExternalLink size={10} className="text-white/60" />
            </a>
          </div>
        )}
      </div>

      {/* ─── Card Content & Info ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between relative z-10">
        <div>
          {/* Number & Category */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mb-2">
            <span className="text-primary font-bold">{project.number}</span>
            <span>·</span>
            <span className="uppercase tracking-wider truncate">{project.category.split("·")[0].trim()}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 mb-2 leading-tight">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 mb-5">
            {project.description}
          </p>
        </div>

        {/* Tags & Action Row */}
        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-border/60 bg-muted/40 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5 group/link"
              >
                <span>Visit Production Site</span>
                <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <span />
            )}

            <Link
              href={`/work#${project.id}`}
              className="text-xs font-semibold text-foreground/80 hover:text-primary inline-flex items-center gap-1 transition-colors"
            >
              <span>Case study</span>
              <AnimatedArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveServiceContent({
  tab,
  projects,
}: {
  tab: ServiceTabItem;
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Service Tagline Summary */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {tab.tagline}
        </p>
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold text-primary">
          <Layers size={12} />
          <span>{projects.length} Works</span>
        </span>
      </div>

      {/* Modern Balanced 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Bottom Contextual Action */}
      <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/40">
        <div className="text-xs font-mono text-muted-foreground">
          Showing 3 curated works in <strong className="text-foreground">{tab.label}</strong>
        </div>

        <Link
          href={`/work?service=${encodeURIComponent(tab.id.toLowerCase().replace(" ", "-"))}`}
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/15 px-4 sm:px-5 py-2 rounded-full border border-primary/25"
        >
          <span>See all {tab.label}</span>
          <AnimatedArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const [activeService, setActiveService] = useState<ServiceType>("Websites");

  // Group projects by serviceType
  const activeTabInfo = SERVICE_TABS.find((tab) => tab.id === activeService) || SERVICE_TABS[0];
  const activeProjects = PROJECTS.filter((p) => p.serviceType === activeService).slice(0, 3);

  return (
    <section
      id="selected-work"
      className="relative w-full py-12 sm:py-16 bg-muted/25 dark:bg-muted/10 border-y border-border/50 overflow-hidden"
    >
      {/* Subtle Background Pattern & Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute -top-16 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Floating Animated Tech Stack Badges */}
      <FloatingTechGroup items={FLOATING_TECHS} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div ref={headerRef} className="max-w-3xl">
          <SectionDockSlot sectionId="selected-work" label="Portfolio · Our Work" className="mb-2" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-3"
          >
            Selected <span className="text-primary">Work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed"
          >
            Explore client projects and technical builds organized by our core services. 
            From live production websites to high-concurrency web platforms and mobile applications.
          </motion.p>
        </div>
      </div>

      {/* Service-Based Tab Navigation */}
      <div className="mb-6 relative z-10" role="tablist" aria-label="Work service categories">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-muted/40 border border-border/70 rounded-full backdrop-blur-md overflow-x-auto w-full sm:w-auto scrollbar-hide shadow-xs">
          {SERVICE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeService === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveService(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer select-none",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-service-tab"
                    className="absolute inset-0 bg-foreground rounded-full shadow-md"
                    initial={false}
                    transition={SPRING}
                  />
                )}
                <Icon
                  size={14}
                  className={cn(
                    "relative z-10 transition-colors",
                    isActive ? "text-background" : "text-primary"
                  )}
                />
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={cn(
                    "relative z-10 text-[10px] font-mono px-2 py-0.2 rounded-full transition-colors hidden sm:inline",
                    isActive
                      ? "bg-background/20 text-background font-bold"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 min-h-[460px]">
        <AnimatePresence mode="wait">
          <ActiveServiceContent
            key={activeService}
            tab={activeTabInfo}
            projects={activeProjects}
          />
        </AnimatePresence>
      </div>

      {/* Global Bottom CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border/80 shadow-xs text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
        >
          <span>View complete project archive & case studies</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
      </div>
    </section>
  );
}
