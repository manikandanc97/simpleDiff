"use client";

import { motion } from "motion/react";
import type { Experiment } from "@/lib/data/experiments";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  // Abstract CSS patterns based on experiment patternType
  const renderPattern = () => {
    switch (experiment.patternType) {
      case "grid":
        return (
          <div className="absolute inset-0 flex flex-wrap opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-1/8 h-1/5 border border-foreground/10" />
            ))}
          </div>
        );
      case "geometric":
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <div className="w-1/2 h-1/2 border border-foreground/30 rotate-45 transform group-hover:rotate-90 transition-transform duration-1000 ease-out" />
            <div className="w-1/3 h-1/3 border border-foreground/30 absolute" />
          </div>
        );
      case "dots":
        return (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:16px_16px]" />
        );
      case "waves":
        return (
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <div className="w-[150%] h-[150%] border border-foreground/20 rounded-full absolute translate-x-1/4 group-hover:translate-x-1/3 transition-transform duration-1000" />
            <div className="w-[120%] h-[120%] border border-foreground/20 rounded-full absolute -translate-x-1/4 group-hover:-translate-x-1/3 transition-transform duration-1000" />
          </div>
        );
      case "abstract":
      default:
        return (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 flex items-end">
            <div className="w-full h-1/2 bg-linear-to-t from-foreground/10 to-transparent transform origin-bottom group-hover:scale-y-125 transition-transform duration-700 ease-out" />
          </div>
        );
    }
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group flex flex-col text-left relative overflow-hidden bg-background border border-border rounded-xl shadow-xs ${
        experiment.spanClass || ""
      }`}
    >
      {/* Visual Area */}
      <div className="w-full h-48 sm:h-60 relative overflow-hidden bg-muted/20 border-b border-border">
        {renderPattern()}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-primary mix-blend-overlay transition-opacity duration-500" />
        
        {/* Dynamic Accent Highlight Line */}
        <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-primary" />
        
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {experiment.number}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col gap-2 relative bg-background flex-1">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          {experiment.category}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
          {experiment.title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
          {experiment.description}
        </p>
      </div>
    </motion.article>
  );
}
