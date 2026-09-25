"use client";

import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import type { Experiment } from "@/lib/data/experiments";
import { motion } from "motion/react";

interface ExperimentCardProps {
  experiment: Experiment;
  isFeatured?: boolean;
}

export function ExperimentCard({ experiment, isFeatured = false }: ExperimentCardProps) {
  // Abstract visual patterns based on experiment patternType
  const renderPattern = () => {
    switch (experiment.patternType) {
      case "grid":
        return (
          <div className="absolute inset-0 flex flex-wrap opacity-25 group-hover:opacity-40 transition-opacity duration-500">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="w-1/6 h-1/6 border border-foreground/10 group-hover:border-primary/20 transition-colors"
              />
            ))}
          </div>
        );
      case "geometric":
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-50 transition-opacity duration-500">
            <div className="w-2/3 h-2/3 border border-foreground/30 rotate-45 transform group-hover:rotate-90 group-hover:border-primary/40 transition-all duration-1000 ease-out" />
            <div className="w-1/3 h-1/3 border border-foreground/40 absolute group-hover:scale-125 transition-transform duration-700" />
          </div>
        );
      case "dots":
        return (
          <div className="absolute inset-0 opacity-25 group-hover:opacity-50 transition-opacity duration-500 bg-[radial-gradient(var(--color-foreground)_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        );
      case "waves":
        return (
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-25 group-hover:opacity-50 transition-opacity duration-500">
            <div className="w-[140%] h-[140%] border border-foreground/30 rounded-full absolute translate-x-1/4 group-hover:translate-x-1/3 group-hover:border-primary/40 transition-all duration-1000" />
            <div className="w-[110%] h-[110%] border border-foreground/30 rounded-full absolute -translate-x-1/4 group-hover:-translate-x-1/3 transition-transform duration-1000" />
          </div>
        );
      case "abstract":
      default:
        return (
          <div className="absolute inset-0 opacity-25 group-hover:opacity-50 transition-opacity duration-500 flex items-end">
            <div className="w-full h-2/3 bg-gradient-to-t from-primary/20 via-foreground/10 to-transparent transform origin-bottom group-hover:scale-y-110 transition-transform duration-700 ease-out" />
          </div>
        );
    }
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group flex flex-col text-left relative overflow-hidden bg-card border border-border/80 rounded-2xl shadow-xs hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
        isFeatured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Visual Canvas Area */}
      <div
        className={`w-full relative overflow-hidden bg-muted/25 border-b border-border/60 ${
          isFeatured ? "h-64 sm:h-80" : "h-48 sm:h-56"
        }`}
      >
        {renderPattern()}

        {/* Ambient Gradient Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-primary transition-opacity duration-500" />

        {/* Dynamic Top Accent Bar */}
        <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out bg-primary" />

        {/* Card Number */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
            {experiment.number}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-card">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary block mb-2">
            {experiment.category}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-foreground mb-3">
            {(() => {
              const words = experiment.title.split(" ");
              if (words.length === 1) {
                return <span className="text-primary">{experiment.title}</span>;
              }
              const last = words.pop();
              return (
                <>
                  {words.join(" ")} <span className="text-primary">{last}</span>
                </>
              );
            })()}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {experiment.description}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">Software Prototype</span>
          <span className="group-hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5">
            <span>Explore concept</span>
            <AnimatedArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
