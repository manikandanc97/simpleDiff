"use client";

import { motion } from "motion/react";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { ExperimentCard } from "@/components/sections/lab/experiment-card";

export function LabView() {
  const featured = EXPERIMENTS[0];
  const rest = EXPERIMENTS.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Software R&D & Prototypes
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          <span className="text-primary">Ideas.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          Experiments, concepts and things we&apos;re exploring. A space for testing interactive ideas, generative interfaces, and design physics before bringing them to client builds.
        </p>
      </div>

      {/* Editorial Grid: Featured canvas + Asymmetric cards */}
      <div className="space-y-8">
        {/* Large Feature Idea: 01 Generative UI */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ExperimentCard experiment={featured} isFeatured={true} />
          </motion.div>
        )}

        {/* Remaining Experiments Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {rest.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
