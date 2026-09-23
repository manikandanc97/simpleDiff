"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function SelectedWork() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const activeProject = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];

  return (
    <section
      id="selected-work"
      className="relative w-full py-16 md:py-24 bg-background border-y border-border/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 uppercase">
            Selected Work
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
            A few digital experiences we've designed and built for businesses that wanted to move forward.
          </p>
        </div>

        {/* ── DESKTOP: Master-Detail Interactive Layout ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Project Navigation */}
          <div className="col-span-5 flex flex-col">
            <div className="flex flex-col border-t border-border/40">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeId;
                
                return (
                  <div key={project.id} className="border-b border-border/40">
                    <button
                      type="button"
                      onClick={() => setActiveId(project.id)}
                      className="w-full flex items-baseline gap-4 py-6 text-left group cursor-pointer"
                    >
                      <span
                        className={cn(
                          "font-heading font-extrabold text-lg transition-colors duration-300",
                          isActive ? "text-primary" : "text-muted-foreground/40 group-hover:text-foreground/60"
                        )}
                      >
                        {project.number}
                      </span>
                      <h3
                        className={cn(
                          "font-heading font-bold text-2xl tracking-tight transition-colors duration-300",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {project.name}
                      </h3>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-10">
                            {/* Active Indicator */}
                            <div className="w-8 h-[2px] bg-primary mb-6" />
                            
                            <p className="text-base text-muted-foreground font-medium mb-6 leading-relaxed">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-col gap-1 mb-8">
                              <span className="text-sm font-semibold text-foreground/90">
                                {project.serviceType}
                              </span>
                              <span className="text-sm font-medium text-muted-foreground">
                                {project.tags.slice(0, 2).join(" · ")}
                              </span>
                            </div>
                            
                            {project.url ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                              >
                                <span>View project</span>
                                <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                              </a>
                            ) : (
                              <Link
                                href={`/work#${project.id}`}
                                className="group/btn inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                              >
                                <span>Explore project</span>
                                <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Visual */}
          <div className="col-span-7 relative">
            <div className="sticky top-32 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/50 border border-border/40 shadow-sm flex items-center justify-center p-4 lg:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl border border-black/5 bg-background"
                >
                  {activeProject.image && (
                    <img
                      src={activeProject.image}
                      alt={activeProject.name}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── MOBILE: Stacked Layout ── */}
        <div className="flex flex-col gap-16 lg:hidden">
          {PROJECTS.map((project) => (
            <div key={project.id} className="flex flex-col">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-heading font-extrabold text-lg text-primary">
                  {project.number}
                </span>
                <h3 className="font-heading font-bold text-3xl tracking-tight text-foreground">
                  {project.name}
                </h3>
              </div>
              
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-secondary border border-border/50 p-4 sm:p-6">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-black/5 bg-background">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>
              </div>

              <p className="text-base text-muted-foreground font-medium mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-col gap-1 mb-8">
                <span className="text-sm font-semibold text-foreground/90">
                  {project.serviceType}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {project.tags.slice(0, 2).join(" · ")}
                </span>
              </div>

              <div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    <span>View project</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={`/work#${project.id}`}
                    className="group/btn inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    <span>Explore project</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

