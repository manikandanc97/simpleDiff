"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  TrendingUp,
} from "lucide-react";
import { PROJECTS, type Project, type ServiceType } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type FilterCategory = "All" | ServiceType;

const CATEGORIES: { id: FilterCategory; label: string; count: number }[] = [
  { id: "All", label: "All", count: PROJECTS.length },
  { id: "Websites", label: "Websites", count: PROJECTS.filter((p) => p.serviceType === "Websites").length },
  { id: "Web Apps", label: "Web Apps", count: PROJECTS.filter((p) => p.serviceType === "Web Apps").length },
  { id: "Mobile Apps", label: "Mobile Apps", count: PROJECTS.filter((p) => p.serviceType === "Mobile Apps").length },
];

export function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.serviceType === activeCategory);

  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);

  // Ensure selected project belongs to filtered list, fallback to first in list
  const activeProject: Project =
    filteredProjects.find((p) => p.id === selectedId) || filteredProjects[0] || PROJECTS[0];

  const currentIndex = Math.max(
    0,
    filteredProjects.findIndex((p) => p.id === activeProject.id)
  );

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedId(filteredProjects[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedId(filteredProjects[nextIndex].id);
  };

  const handleCategoryChange = (category: FilterCategory) => {
    setActiveCategory(category);
    const newFiltered =
      category === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.serviceType === category);
    if (newFiltered.length > 0) {
      setSelectedId(newFiltered[0].id);
    }
  };

  return (
    <section
      id="selected-work"
      className="relative w-full py-8 sm:py-12 bg-zinc-100/60 dark:bg-zinc-950/60 border-y border-border/60 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Compact Header Row: Title on Left, Category Switcher on Right ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 opacity-60">
              <span className="font-mono text-primary text-xs font-semibold select-none">+</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                SYS // 02.PORTFOLIO
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Selected <span className="text-primary">Work.</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg">
              Live client systems and digital products engineered for measurable scale.
            </p>
          </div>

          {/* Segmented Filter Pills */}
          <div className="inline-flex items-center gap-1 p-1 bg-muted/50 border border-border/70 rounded-full backdrop-blur-md self-start sm:self-auto overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-work-category"
                      className="absolute inset-0 bg-primary rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat.label}
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {cat.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Studio Showcase Stage: Master-Detail Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* ── Left Column: Interactive Project Index Rail (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="space-y-2">
              {filteredProjects.map((project) => {
                const isSelected = project.id === activeProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    className={cn(
                      "w-full text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 relative border cursor-pointer select-none group",
                      isSelected
                        ? "bg-card border-primary/50 shadow-md shadow-primary/5 ring-1 ring-primary/25"
                        : "bg-card/40 border-border/60 hover:bg-card/75 hover:border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {/* Active Indicator Bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-project-bar"
                        className="absolute -left-[1px] top-2.5 bottom-2.5 w-1 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={cn(
                            "font-mono text-xs font-bold",
                            isSelected ? "text-primary" : "text-muted-foreground/60"
                          )}
                        >
                          {project.number}
                        </span>
                        <span className="text-muted-foreground/30 font-mono text-xs">·</span>
                        <span
                          className={cn(
                            "font-bold text-sm tracking-tight truncate",
                            isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                          )}
                        >
                          {project.name}
                        </span>
                      </div>

                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold whitespace-nowrap shrink-0 border",
                          isSelected
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-muted/40 text-muted-foreground/80 border-border/40"
                        )}
                      >
                        {project.result}
                      </span>
                    </div>

                    {/* Active Expanded Context: 1-line punch + tech pills */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 pt-2 border-t border-border/40"
                      >
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-2 font-normal leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 border border-border/50 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Archive Link in rail */}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-text transition-colors"
              >
                <span>View complete portfolio archive</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-muted-foreground/50">
                {filteredProjects.length} of {PROJECTS.length} builds
              </span>
            </div>
          </div>

          {/* ── Right Column: Studio Device Showcase Canvas (7 Cols) ── */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-zinc-950 shadow-xl overflow-hidden flex flex-col h-[380px] sm:h-[430px] group">
              {/* Browser Top Chrome */}
              <div className="h-9 sm:h-10 px-3.5 sm:px-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between gap-3 shrink-0 z-20 backdrop-blur-md">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>

                {/* URL Search Pill */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-md bg-zinc-800/80 border border-white/5 text-[11px] font-mono text-zinc-300 max-w-[200px] sm:max-w-xs truncate">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{activeProject.domain || "simpleprime.io"}</span>
                </div>

                {/* Prev / Next Pagination Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 font-semibold hidden sm:inline">
                    {currentIndex + 1} / {filteredProjects.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous project"
                      className="w-6 h-6 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next project"
                      className="w-6 h-6 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Canvas Image Viewport */}
              <div className="relative flex-1 w-full overflow-hidden bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    {activeProject.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={activeProject.image}
                        alt={activeProject.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-black">
                        <span className="font-mono text-xs text-muted-foreground">Preview Active</span>
                      </div>
                    )}

                    {/* Subtle Scrim Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                    {/* Floating Top Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {activeProject.badge}
                      </span>
                    </div>

                    {/* Floating Metric Highlight Pill */}
                    <div className="absolute bottom-14 sm:bottom-16 left-3 sm:left-4 right-3 sm:right-auto z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 text-white shadow-xl">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-mono font-bold tracking-tight">
                          {activeProject.result}
                        </span>
                        <span className="text-white/40 text-xs hidden sm:inline">|</span>
                        <span className="text-[11px] text-zinc-300 hidden sm:inline font-mono">
                          {activeProject.category.split("·")[0].trim()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Glass Action Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 bg-gradient-to-t from-black via-black/95 to-transparent flex items-center justify-between gap-3 z-20">
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-zinc-400 truncate block">
                      {activeProject.domain ? `https://${activeProject.domain}` : activeProject.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {activeProject.url && (
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-primary/20 active:scale-95"
                      >
                        <span>Visit Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <Link
                      href={`/work#${activeProject.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                    >
                      <span>Case study</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
