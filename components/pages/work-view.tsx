"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { ExternalLink, Sparkles } from "lucide-react";
import { AnimatedSparkles, AnimatedIcon } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

/* ─── Selective Simple → Different Toggle Pill ─── */
function SimpleDifferentToggle({
  simpleText,
  differentText,
}: {
  simpleText: string;
  differentText: string;
}) {
  const [active, setActive] = useState<"simple" | "different">("different");

  return (
    <div className="inline-flex flex-col gap-2 p-4 rounded-xl border border-border bg-muted/20 my-4 max-w-lg">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActive("simple")}
          className={cn(
            "text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer",
            active === "simple"
              ? "bg-foreground text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Typical Build
        </button>
        <span className="text-muted-foreground text-xs">&rarr;</span>
        <button
          type="button"
          onClick={() => setActive("different")}
          className={cn(
            "group text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5",
            active === "different"
              ? "bg-primary text-primary-foreground font-bold shadow-xs"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <AnimatedSparkles size={12} />
          <span>SimpleDiff</span>
        </button>
      </div>
      <p className="text-xs text-foreground/80 leading-relaxed font-mono">
        {active === "simple" ? simpleText : differentText}
      </p>
    </div>
  );
}

/* ─── Stylized Visual Preview Canvas ─── */
function ProjectVisualCanvas({ project }: { project: Project }) {
  if (project.id === "proj-valparai") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/20 shadow-xl group-hover:border-emerald-500/40 transition-colors">
        {/* Decorative Mountain Contour Lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top,#10b981,transparent_70%)]" />
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-medium border border-emerald-500/30">
            Valparai, Western Ghats
          </span>
          <span className="text-xs text-emerald-300/80 font-mono font-bold">
            4.9★ Google Reviews
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Valparai Wanderer Tours
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100/70 max-w-sm">
            Immersive tea estate visuals, guided rainforest treks, and instant WhatsApp booking flow.
          </p>
        </div>

        {/* Floating Mini Mockup Card */}
        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
          <span>WhatsApp Bookings:</span>
          <span className="text-emerald-400 font-bold font-mono">+300% in Month 1</span>
        </div>
      </div>
    );
  }

  if (project.id === "proj-grn") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-neutral-900 p-6 sm:p-8 flex flex-col justify-between border border-cyan-500/20 shadow-xl group-hover:border-cyan-500/40 transition-colors">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-medium border border-cyan-500/30">
            Construction & Architecture
          </span>
          <span className="text-xs text-cyan-300/80 font-mono font-bold">
            10+ Years Authority
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            GRN Construction
          </h4>
          <p className="text-xs sm:text-sm text-cyan-100/70 max-w-sm">
            Glassmorphism portfolio, structured project categories, and regional SEO authority.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
          <span>Search Ranking:</span>
          <span className="text-cyan-400 font-bold font-mono">Page 1 Local Builder</span>
        </div>
      </div>
    );
  }

  if (project.id === "proj-fintech") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-950 via-purple-950 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between border border-purple-500/20 shadow-xl group-hover:border-purple-500/40 transition-colors">
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-medium border border-purple-500/30">
            Concept Study &bull; Mobile
          </span>
          <span className="text-xs text-purple-300/80 font-mono">iOS & Android</span>
        </div>

        <div className="relative z-10 space-y-2">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Minimalist Banking Flow
          </h4>
          <p className="text-xs sm:text-sm text-purple-100/70 max-w-sm">
            Stripped of marketing banners, promotional popups, and 6-step confirmation fatigue.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
          <span>Transfer Steps:</span>
          <span className="text-purple-300 font-bold font-mono">6 screens &rarr; 2 taps</span>
        </div>
      </div>
    );
  }

  if (project.id === "proj-retail") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between border border-amber-500/20 shadow-xl group-hover:border-amber-500/40 transition-colors">
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-medium border border-amber-500/30">
            Headless E-Commerce
          </span>
          <span className="text-xs text-amber-300/80 font-mono font-bold">
            Sub-500ms Loads
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Editorial Brand Commerce
          </h4>
          <p className="text-xs sm:text-sm text-amber-100/70 max-w-sm">
            Curated typography and headless performance without heavy plugin bloat.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
          <span>Checkout Speed:</span>
          <span className="text-amber-400 font-bold font-mono">Instant One-Page Flow</span>
        </div>
      </div>
    );
  }

  // Default / Operations Dashboard
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between border border-rose-500/20 shadow-xl group-hover:border-rose-500/40 transition-colors">
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-medium border border-rose-500/30">
          Internal Systems & Web App
        </span>
        <span className="text-xs text-rose-300/80 font-mono font-bold">
          High-Signal UI
        </span>
      </div>

      <div className="relative z-10 space-y-2">
        <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Operations Dashboard
        </h4>
        <p className="text-xs sm:text-sm text-rose-100/70 max-w-sm">
          Surfacing critical business exceptions rather than drowning teams in 50-column data tables.
        </p>
      </div>

      <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
        <span>Decision Clarity:</span>
        <span className="text-rose-400 font-bold font-mono">Immediate Priorities</span>
      </div>
    </div>
  );
}

/* ─── Alternating Project Showcase Item ─── */
function ProjectShowcaseItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* Visual Area (Alternates left or right based on index) */}
      <div
        className={cn(
          "lg:col-span-7",
          isEven ? "lg:order-1" : "lg:order-2"
        )}
      >
        <ProjectVisualCanvas project={project} />
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "lg:col-span-5 space-y-6",
          isEven ? "lg:order-2" : "lg:order-1"
        )}
      >
        {/* Category & Year */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
            {project.number} &mdash; {project.category}
          </span>
          {project.year && (
            <span className="text-xs font-mono text-muted-foreground/60">
              {project.year}
            </span>
          )}
          {project.kind === "client" ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/25">
              Client Project
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground bg-muted border border-border">
              Concept Study
            </span>
          )}
        </div>

        {/* Project Name */}
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          {(() => {
            const words = project.name.split(" ");
            if (words.length === 1) {
              return <span className="text-primary">{project.name}</span>;
            }
            const last = words.pop();
            return (
              <>
                {words.join(" ")} <span className="text-primary">{last}</span>
              </>
            );
          })()}
        </h2>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Selective Simple → Different Toggle Pill */}
        {project.before.length > 0 && project.after.length > 0 && (
          <SimpleDifferentToggle
            simpleText={project.before[0]}
            differentText={project.after[0]}
          />
        )}

        {/* Technologies / Stack tags */}
        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted/50 border border-border/60 text-foreground/80 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Live Site Link if Available */}
        {project.url && (
          <div className="pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group/link"
            >
              <span>Visit live production website</span>
              <AnimatedIcon name="external-link" size={15} />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function WorkView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mb-20 sm:mb-28">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Featured Portfolio
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          <span className="text-primary">Work.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          Selected client projects and digital experiments. We design and engineer products that strip unnecessary friction and stand out in their markets.
        </p>
      </div>

      {/* Alternating Project Showcase Stack */}
      <div className="space-y-28 sm:space-y-36">
        {PROJECTS.map((project, index) => (
          <ProjectShowcaseItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
