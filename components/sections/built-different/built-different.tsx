"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "@/lib/data/projects";
import { ProjectPreview } from "./project-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useThemeColor } from "@/components/theme/color-provider";

export function BuiltDifferent() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const { theme } = useThemeColor();

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built Different.
          </h2>
          <p className="text-xl text-muted-foreground">
            Real problems. Simple ideas. Thoughtful digital products.
          </p>
        </div>

        {/* Desktop Split Layout & Mobile Stack Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left: Project List & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex flex-col border-t border-border">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeProjectId;

                return (
                  <div
                    key={project.id}
                    className="border-b border-border group"
                  >
                    {/* Selectable Header */}
                    <button
                      onClick={() => setActiveProjectId(project.id)}
                      className="w-full py-6 text-left flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-6">
                        <span className={cn(
                          "text-sm font-mono transition-colors duration-300",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                        )}>
                          {project.number}
                        </span>
                        <h3 className={cn(
                          "text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                        )}>
                          {project.name}
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                        {project.category}
                      </span>
                    </button>

                    {/* Expandable Metadata (Visible when active) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-2 flex flex-col gap-6">
                            
                            {/* Mobile-only Preview (shows inline on small screens) */}
                            <div className="block lg:hidden w-full aspect-[4/3] relative rounded-md overflow-hidden border border-border">
                              <ProjectPreview project={project} isActive={true} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                              <div>
                                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-destructive" />
                                  The Problem
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {project.problem}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.primary }} />
                                  Our Solution
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {project.solution}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-foreground font-medium leading-relaxed mt-2">
                              {project.description}
                            </p>

                            <div className="pt-4">
                              <Button variant="outline" className="transition-colors group/btn">
                                Explore Project 
                                <motion.span 
                                  className="ml-2 inline-block transition-transform group-hover/btn:translate-x-1"
                                >
                                  &rarr;
                                </motion.span>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Large Visual Preview (Desktop only) */}
          <div className="hidden lg:block lg:col-span-7 relative h-[600px] border border-border bg-muted/10 rounded-lg overflow-hidden shadow-xs">
            {PROJECTS.map((project) => (
              <ProjectPreview
                key={project.id}
                project={project}
                isActive={project.id === activeProjectId}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
