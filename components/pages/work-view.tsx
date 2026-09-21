"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { Globe, LayoutDashboard, Smartphone, Layers } from "lucide-react";
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
          <span>SimpleThink</span>
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

  if (project.id === "proj-viha") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between border border-amber-500/20 shadow-xl group-hover:border-amber-500/40 transition-colors">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top,#d97706,transparent_70%)]" />
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-medium border border-amber-500/30">
            Chettinad Heritage & Art
          </span>
          <span className="text-xs text-amber-300/80 font-mono font-bold">
            100% Handcrafted
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Viha Handicrafts
          </h4>
          <p className="text-xs sm:text-sm text-amber-100/70 max-w-sm">
            Generational brass idols, Tanjore paintings, and Chettinad artifacts with direct WhatsApp buying flow.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs text-white">
          <span>Client Reach:</span>
          <span className="text-amber-400 font-bold font-mono">Pan-India Direct Orders</span>
        </div>
      </div>
    );
  }

  // Dynamic Visual Canvas with Real Images & Themes
  return (
    <div
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between border border-border/60 shadow-xl group-hover:border-primary/40 transition-colors"
      style={{ background: project.previewTheme?.previewBg || "linear-gradient(135deg, #111827 0%, #1f2937 100%)" }}
    >
      {project.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-xs font-mono font-medium border border-primary/40">
          {project.serviceType} · {project.category.split("·")[0].trim()}
        </span>
        <span className="text-xs text-white/80 font-mono font-bold bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
          {project.year || "2025"}
        </span>
      </div>

      <div className="relative z-10 space-y-2">
        <h4 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
          {project.name}
        </h4>
        <p className="text-xs sm:text-sm text-white/80 max-w-sm line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs text-white">
        <span className="text-white/70">Milestone Result:</span>
        <span className="text-emerald-400 font-bold font-mono">{project.result}</span>
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
      id={project.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center scroll-mt-24"
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
          "lg:col-span-5 space-y-5",
          isEven ? "lg:order-2" : "lg:order-1"
        )}
      >
        {/* Service Type, Category & Year */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/25">
            {project.serviceType}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {project.number} &mdash; {project.category}
          </span>
          {project.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              {project.badge}
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
          <div className="flex flex-wrap gap-2 pt-1">
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
              <span>{project.serviceType === "Websites" ? "Visit live production website" : "Open project demo / portal"}</span>
              <AnimatedIcon name="external-link" size={15} />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

const FILTER_SERVICES = [
  { id: "all", label: "All Works", icon: Layers },
  { id: "websites", label: "Websites", icon: Globe, serviceType: "Websites" },
  { id: "web-apps", label: "Web Apps", icon: LayoutDashboard, serviceType: "Web Apps" },
  { id: "mobile-apps", label: "Mobile Apps", icon: Smartphone, serviceType: "Mobile Apps" },
] as const;

function WorkViewContent() {
  const searchParams = useSearchParams();
  const rawServiceParam = searchParams.get("service")?.toLowerCase();
  const categoryParam = searchParams.get("category");

  // Determine initial filter based on query param
  const initialFilter = useMemo(() => {
    if (rawServiceParam === "websites") return "websites";
    if (rawServiceParam === "web-apps") return "web-apps";
    if (rawServiceParam === "mobile-apps") return "mobile-apps";
    return "all";
  }, [rawServiceParam]);

  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  const filteredProjects = useMemo(() => {
    let result = PROJECTS;

    // Filter by Service Type if selected
    if (activeFilter === "websites") {
      result = result.filter((p) => p.serviceType === "Websites");
    } else if (activeFilter === "web-apps") {
      result = result.filter((p) => p.serviceType === "Web Apps");
    } else if (activeFilter === "mobile-apps") {
      result = result.filter((p) => p.serviceType === "Mobile Apps");
    }

    // Filter by Category if param specified
    if (categoryParam) {
      result = result.filter((p) => p.category.toLowerCase().includes(categoryParam.toLowerCase()));
    }

    return result;
  }, [activeFilter, categoryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Featured Portfolio
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          <span className="text-primary">Work.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          Selected client projects and digital architectures engineered end-to-end. 
          Explore our works across Websites, Web Applications, and Mobile Apps.
        </p>
      </div>

      {/* Interactive Service Filter Tabs */}
      <div className="mb-16 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
        {FILTER_SERVICES.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          const count = tab.id === "all" 
            ? PROJECTS.length 
            : PROJECTS.filter((p) => p.serviceType === tab.serviceType).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none",
                isActive
                  ? "bg-foreground text-background shadow-xs font-bold"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/60"
              )}
            >
              <Icon size={14} className={isActive ? "text-background" : "text-primary"} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                  isActive ? "bg-background/25 text-background" : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alternating Project Showcase Stack */}
      <div className="space-y-28 sm:space-y-36">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No projects found matching the selected filter.
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectShowcaseItem
              key={project.id}
              project={project}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function WorkView() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WorkViewContent />
    </Suspense>
  );
}
