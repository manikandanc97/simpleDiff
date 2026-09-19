"use client";

import { motion } from "motion/react";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { ExperimentCard } from "@/components/sections/lab/experiment-card";

// TODO(owner): confirm these are ideas you're genuinely exploring, or replace them.
export function LabView() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Ideas.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Ideas we&apos;re exploring. Concepts, prototypes, and experiments from the studio.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
      >
        {EXPERIMENTS.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </motion.div>
    </div>
  );
}
