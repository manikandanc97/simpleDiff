"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  ExternalLink,
  Lock,
  RotateCw,
  ArrowUpRight,
} from "lucide-react";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };

/**
 * Interactive Live Browser Window Mockup
 * Renders the actual original live website inside a scaled, responsive iframe
 * with window controls, reload button, interactive browsing toggle, and fallback.
 */
function BrowserWebsiteMockup({
  project,
  isFeatured = false,
}: {
  project: Project;
  isFeatured?: boolean;
}) {
  const { previewTheme } = project;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteractive, setIsInteractive] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  // Dynamically calculate responsive scale for 1200px desktop viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(width / 1200);
      }
    };

    updateScale();

    const ro = new ResizeObserver(() => {
      updateScale();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const handleReload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoaded(false);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="group/browser relative flex flex-col w-full h-full rounded-2xl border border-border/80 bg-background/95 shadow-xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      {/* ─── Window Chrome / Header Bar ─── */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/70 border-b border-border/70 backdrop-blur-md select-none shrink-0 z-20">
        {/* macOS Style Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50 transition-transform hover:scale-110 cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50 transition-transform hover:scale-110 cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50 transition-transform hover:scale-110 cursor-pointer" />
        </div>

        {/* Reload Button */}
        <div className="flex items-center gap-1.5 text-muted-foreground/50 text-xs">
          <button
            type="button"
            onClick={handleReload}
            title="Reload live site preview"
            aria-label="Reload website preview"
            className="p-1 rounded-md hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <RotateCw size={11} className={cn("transition-transform", !isLoaded && "animate-spin text-primary")} />
          </button>
        </div>

        {/* SSL Address Bar with Direct Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${project.url} in new tab`}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background/90 border border-border/60 text-[11px] font-mono text-muted-foreground hover:text-foreground max-w-[240px] sm:max-w-[340px] truncate shadow-2xs hover:border-primary/40 transition-colors"
        >
          <Lock size={10} className="text-emerald-500 shrink-0" />
          <span className="text-muted-foreground/50">https://</span>
          <span className="text-foreground/90 font-medium truncate">
            {project.domain}
          </span>
        </a>

        {/* Live Indicator & Direct Launch */}
        <div className="flex items-center gap-2">
          {/* Pulsing Live Badge */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">LIVE</span>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window"
            aria-label={`Open ${project.name} in a new tab`}
            className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-muted/80"
          >
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* ─── Live Viewport Frame ─── */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden bg-muted/20",
          isFeatured
            ? "h-[320px] sm:h-[400px] lg:h-[460px]"
            : "h-[280px] sm:h-[340px] lg:h-[380px]"
        )}
      >
        {/* Loading Spinner & Skeleton Fallback (visible while iframe loads) */}
        {!isLoaded && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none"
            style={{ background: previewTheme.previewBg }}
          >
            <div className="flex items-center gap-2 mb-3">
              <RotateCw size={18} className="animate-spin text-primary" />
              <span className="text-xs font-mono font-semibold text-white/90">
                Connecting to {project.domain}...
              </span>
            </div>
            <p className="text-[11px] text-white/60 max-w-xs">
              {previewTheme.subheadline}
            </p>
          </div>
        )}

        {/* Scaled Desktop Iframe rendering the real original website */}
        <div
          style={{
            width: "1200px",
            height: isFeatured ? "1050px" : "950px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="absolute top-0 left-0"
        >
          <iframe
            key={reloadKey}
            src={project.url}
            title={`${project.name} live interactive website`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "w-full h-full border-0 transition-opacity duration-700 bg-white pointer-events-auto",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Featured Wide Card Layout (For Project 01)
 */
function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.08 }}
      className="group relative col-span-1 md:col-span-2 rounded-3xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-500" />
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
        {/* Left: Project Metadata & Story (5 Cols on large) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Top header row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-6xl sm:text-7xl font-black tracking-tighter text-muted-foreground/15 group-hover:text-primary/20 transition-colors font-mono select-none leading-none">
                {project.number}
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Category */}
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary mb-2">
              {project.category}
            </p>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags / Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-border/70 bg-muted/40 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions & Result */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border/50">
            <div className="flex items-center gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline group/link"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>

              <span className="text-border">·</span>

              <Link
                href={`/work#${project.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                <span>Case study</span>
                <AnimatedArrowRight size={12} />
              </Link>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-500 font-bold">
              <span>↑</span>
              <span>{project.result}</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Browser Viewport (7 Cols on large) */}
        <div className="lg:col-span-7 flex items-center">
          <BrowserWebsiteMockup project={project} isFeatured={true} />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Standard Project Card (For Projects 02, 03, and any added in the future)
 */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.08 }}
      className="group relative rounded-3xl border border-border/80 bg-card overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary transition-all duration-500" />
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Top Section: Full Interactive Browser Mockup */}
      <div className="p-4 sm:p-5 pb-0">
        <BrowserWebsiteMockup project={project} isFeatured={false} />
      </div>

      {/* Bottom Section: Project Information */}
      <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-7">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl sm:text-5xl font-black tracking-tighter text-muted-foreground/15 group-hover:text-primary/20 transition-colors font-mono select-none leading-none">
              {project.number}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-500 border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.badge}
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-primary text-right">
            {project.category.split("·")[0].trim()}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-border/70 bg-muted/40 text-muted-foreground group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-foreground transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dual Actions & Result */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 group/link"
            >
              <span>Visit Site</span>
              <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
            <span className="text-border">·</span>
            <Link
              href={`/work#${project.id}`}
              className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <span>Case study</span>
              <AnimatedArrowRight size={11} />
            </Link>
          </div>

          <span className="text-xs font-mono text-emerald-500 font-bold">
            ↑ {project.result}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 05 — SELECTED WORK SECTION
 * Dynamically maps freelance client websites from @/lib/data/projects.ts
 */
export function SelectedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const [featured, ...rest] = PROJECTS;

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
          <SectionDockSlot sectionId="selected-work" label="Shipped Client Websites · Portfolio" className="mb-3" />

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
            Live client websites engineered end-to-end. We own every detail from UX architecture and responsive design to local SEO and production launch.
          </motion.p>
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      <div className="space-y-6 sm:space-y-8">
        {/* Row 1: Featured Project (Valparai Wanderer Tours) */}
        {featured && (
          <div className="grid grid-cols-1">
            <FeaturedProjectCard project={featured} index={0} />
          </div>
        )}

        {/* Row 2: Secondary Projects Grid (GRN Construction & Viha Handicrafts) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {rest.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 sm:mt-16 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <span>Explore full case studies and technical architecture</span>
          <AnimatedArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
