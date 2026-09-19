"use client";

import { motion } from "motion/react";
import { useState, useRef } from "react";
import { PROJECTS } from "@/lib/data/projects";

function DiffSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pos);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-border bg-muted/10 group"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
      onClick={handleMove}
    >
      {/* Before */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed border-destructive/20 m-4 rounded-lg bg-background">
        <h4 className="text-2xl font-bold mb-2 text-destructive">Typical Build</h4>
        <p className="font-mono text-sm max-w-sm">Complex, slow, difficult to maintain. High friction.</p>
        <div className="mt-8 font-mono text-xs opacity-50 space-y-1">
          <div>- bloated_dependencies</div>
          <div>- generic_template_code</div>
          <div>- slow_ttfb</div>
        </div>
      </div>
      
      {/* After */}
      <div 
        className="absolute inset-0 bg-background"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-foreground border-2 border-diff-add/30 m-4 rounded-lg bg-background shadow-[0_0_40px_rgba(var(--primary),0.1)]">
          <h4 className="text-2xl font-bold mb-2 text-diff-add">SimpleDiff Build</h4>
          <p className="font-mono text-sm max-w-sm">Fast, clean, focused on what matters.</p>
          <div className="mt-8 font-mono text-xs text-diff-add space-y-1">
            <div>+ optimized_core</div>
            <div>+ bespoke_ui_system</div>
            <div>+ instant_interactions</div>
          </div>
        </div>
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-border cursor-ew-resize group-hover:bg-primary/50 transition-colors"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center text-[10px] text-foreground font-bold">
          &lt;&gt;
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Commits.</h1>
        <p className="text-muted-foreground text-lg">
          A log of things we&apos;ve built, simplified, and shipped.
        </p>
      </div>

      <div className="space-y-24">
        {PROJECTS.map((project) => (
          <motion.article 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs text-muted-foreground mb-2 block">
                  commit {project.id}
                </span>
                <h2 className="text-3xl font-bold">{project.name}</h2>
              </div>
              <div className="flex gap-4 font-mono text-sm">
                <span className="text-diff-remove bg-diff-remove-bg px-2 py-1 rounded-sm">-2.4k</span>
                <span className="text-diff-add bg-diff-add-bg px-2 py-1 rounded-sm">+850</span>
              </div>
            </div>
            
            <DiffSlider />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 text-muted-foreground leading-relaxed">
                {project.description || "A concept build demonstrating how we strip away unnecessary complexity to deliver a clean, focused user experience."}
              </div>
              <div className="font-mono text-sm flex flex-col gap-2">
                <div className="text-muted-foreground uppercase tracking-widest text-[10px]">Stack</div>
                <div>Next.js</div>
                <div>Tailwind v4</div>
                <div>Framer Motion</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
