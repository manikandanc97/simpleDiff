"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/data/projects";

interface ProjectPreviewProps {
  project: Project;
  isActive: boolean;
}

export function ProjectPreview({ project, isActive }: ProjectPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 overflow-hidden"
    >
      {project.image ? (
        // Future-proof: if image exists, render it. 
        // Using an img tag here as a placeholder for next/image when real data arrives
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      ) : (
        // Minimal abstract CSS preview when real image is unavailable
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: project.accent }} />
          
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: isActive ? 1 : 0.9, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-3/4 aspect-[4/3] bg-background border border-border shadow-xs relative flex flex-col"
          >
            {/* Fake browser/app header */}
            <div className="h-10 border-b border-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            {/* Fake content area */}
            <div className="flex-1 p-8 flex flex-col gap-6">
              <div className="w-1/3 h-6 bg-muted/50 rounded-sm" />
              <div className="w-full h-32 bg-muted/20 rounded-sm border border-border flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: project.accent }}
                />
                <div className="w-16 h-16 border border-foreground/10 rounded-sm rotate-45" style={{ backgroundColor: project.accent }} />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 h-4 bg-muted/40 rounded-sm" />
                <div className="w-1/2 h-4 bg-muted/40 rounded-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
