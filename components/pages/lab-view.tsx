"use client";

import { ExperimentCard } from "@/components/sections/lab/experiment-card";
import { PageBanner } from "@/components/ui/page-banner";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { motion } from "motion/react";

export function LabView() {
  const featured = EXPERIMENTS[0];
  const rest = EXPERIMENTS.slice(1);

  return (
    <div className="w-full">
      <PageBanner
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Ideas" },
        ]}
        badge="Software R&D & Prototypes"
        title={
          <span>
            Ideas & <span className="text-primary">Prototypes.</span>
          </span>
        }
        description="Experiments, concepts, and things we're exploring. A space for testing interactive ideas, generative interfaces, and design physics before client builds."
        techStack={["openai", "huggingface", "langchain", "pytorch", "fastapi", "typescript"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

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
    </div>
  );
}
