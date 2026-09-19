"use client";

import { motion } from "motion/react";
import { useState, useRef } from "react";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── DiffSlider (interactive before / after) ─────── */

interface DiffSliderProps {
  before: string[];
  after: string[];
  projectName: string;
}

function DiffSlider({ before, after, projectName }: DiffSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(Math.round(pos));
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Interactive before and after comparison for ${projectName}`}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-border bg-muted/10 group shadow-sm"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handlePointer(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) handlePointer(e.clientX);
      }}
    >
      <input
        id={`slider-${projectName.toLowerCase().replace(/\s+/g, "-")}`}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Compare before and after for ${projectName}`}
        aria-valuetext={`${position}% SimpleDiff build visible`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-2 focus:bg-background focus:text-foreground focus:rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* Before Pane */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center text-muted-foreground bg-background">
        <h3 className="text-lg sm:text-xl font-bold mb-1 text-destructive/80 font-mono">
          Typical Build
        </h3>
        <p className="font-mono text-xs text-muted-foreground/70 mb-5 max-w-sm">
          Complex, slow to ship, heavy ongoing maintenance.
        </p>
        <div className="font-mono text-xs text-diff-remove space-y-1.5 text-left w-full max-w-xs">
          {before.map((item, i) => (
            <div key={i} className="flex gap-2 bg-diff-remove-bg/40 px-2 py-1 rounded-sm">
              <span className="font-bold select-none shrink-0">-</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After Pane */}
      <div
        className="absolute inset-0 bg-background"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center text-foreground">
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-diff-add font-mono">
            SimpleDiff Build
          </h3>
          <p className="font-mono text-xs text-muted-foreground mb-5 max-w-sm">
            Fast, focused, stripped of unnecessary noise.
          </p>
          <div className="font-mono text-xs text-diff-add space-y-1.5 text-left w-full max-w-xs">
            {after.map((item, i) => (
              <div key={i} className="flex gap-2 bg-diff-add-bg/40 px-2 py-1 rounded-sm">
                <span className="font-bold select-none shrink-0">+</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-border/80 pointer-events-none group-hover:bg-primary/60 transition-colors"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background border-2 border-border shadow-xl flex items-center justify-center text-[10px] text-foreground font-bold select-none group-hover:border-primary/60 group-hover:shadow-primary/20 transition-all">
          ⟨⟩
        </div>
      </div>

      {/* Position label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-[10px] font-mono text-muted-foreground border border-border/50">
        drag to compare
      </div>
    </div>
  );
}

/* ─── Project card ────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isClient = project.kind === "client";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8 group"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="font-mono text-xs text-muted-foreground">
              {project.number} &mdash; {project.category}
            </span>
            {project.year && (
              <span className="font-mono text-xs text-muted-foreground/60">{project.year}</span>
            )}
            {isClient ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30">
                Client project
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
                Concept study
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {project.name}
            </h2>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        {project.outcome && (
          <div className="text-xs sm:text-sm text-muted-foreground font-medium sm:text-right max-w-xs bg-muted/30 px-4 py-2.5 rounded-lg border border-border">
            {project.outcome}
          </div>
        )}
      </div>

      {/* DiffSlider */}
      <DiffSlider before={project.before} after={project.after} projectName={project.name} />

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-muted-foreground leading-relaxed mb-5">{project.description}</p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Visit live site <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
        {project.stack && project.stack.length > 0 && (
          <div className="font-mono text-sm flex flex-col gap-2">
            <div className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">
              Technologies
            </div>
            {project.stack.map((tech) => (
              <div key={tech} className="text-foreground flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {tech}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ─── WorkView ────────────────────────────────────── */

export function WorkView() {
  const clientProjects = PROJECTS.filter((p) => p.kind === "client");
  const conceptProjects = PROJECTS.filter((p) => p.kind === "concept");

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
          Our Portfolio
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 text-foreground">
          Work.
        </h1>
        <p className="text-muted-foreground text-xl max-w-lg">
          Selected work and concept studies — showing how we strip complexity to build what actually matters.
        </p>
      </motion.div>

      {/* Client Projects */}
      {clientProjects.length > 0 && (
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              Client Projects
            </span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <div className="space-y-24">
            {clientProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Concept Studies */}
      {conceptProjects.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Concept Studies
            </span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <div className="space-y-24">
            {conceptProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
