"use client";

import { EXPERIMENTS } from "@/lib/data/experiments";
import { ExperimentCard } from "./experiment-card";
import { motion } from "motion/react";

export function SimpleDiffLab() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <span className="inline-block px-3 py-1 border border-border text-xs font-medium tracking-widest uppercase text-muted-foreground bg-muted/10">
            SimpleDiff Lab
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Ideas we&apos;re playing with.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experiments, prototypes and small ideas that might become something bigger.
          </p>
        </div>

        {/* Asymmetric CSS Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {EXPERIMENTS.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
