"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { generateBlueprint } from "@/lib/idea-engine";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { BlueprintCard } from "@/components/workbench/blueprint-card";
import { BuildYourIdea } from "@/components/sections/build-your-idea/build-your-idea";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import {
  AnimatedPencil,
  AnimatedListChecks,
  AnimatedZap,
} from "@/components/ui/animated-icon";

const EXAMPLES = [
  "A modern e-commerce store with headless Shopify",
  "A SaaS dashboard for managing subscription billing",
  "A booking system for a multi-location services business",
];

export function IdeaWorkbench() {
  const [activeTab, setActiveTab] = useState<"quick" | "guided">("quick");
  const [idea, setIdea] = useState("");
  const { openLead } = useLead();

  const debouncedIdea = useDebouncedValue(idea, 400);

  const blueprint = useMemo(() => {
    return debouncedIdea.trim() ? generateBlueprint(debouncedIdea) : null;
  }, [debouncedIdea]);

  const handleContact = () => {
    const summary = blueprint
      ? `Category: ${blueprint.type}. Cuts: ${blueprint.complexityCut.join("; ")}. MVP: ${blueprint.mvpScope.join("; ")}.`
      : undefined;
    openLead({ description: idea, blueprintSummary: summary, source: "quick" });
  };

  return (
    <section
      id="idea-workbench"
      className="py-16 sm:py-20 bg-background border-t border-border/60 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground text-center mb-6 font-medium"
        >
          Try it &mdash; describe your idea and see how we&apos;d simplify it.
        </motion.div>

        {/* Glass Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          role="tablist"
          aria-label="Idea input mode"
          className="flex glass p-1 rounded-full mb-10"
        >
          <button
            role="tab"
            id="tab-describe"
            aria-controls="panel-describe"
            aria-selected={activeTab === "quick"}
            onClick={() => setActiveTab("quick")}
            className={cn(
              "group px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1.5 active:scale-95",
              activeTab === "quick"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <AnimatedPencil size={13} className={activeTab === "quick" ? "text-primary" : "text-muted-foreground"} />
            <span>Describe it</span>
          </button>
          <button
            role="tab"
            id="tab-guided"
            aria-controls="panel-guided"
            aria-selected={activeTab === "guided"}
            onClick={() => setActiveTab("guided")}
            className={cn(
              "group px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1.5 active:scale-95",
              activeTab === "guided"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <AnimatedListChecks size={13} className={activeTab === "guided" ? "text-primary" : "text-muted-foreground"} />
            <span>Answer a few questions</span>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "quick" ? (
            <motion.div
              key="quick"
              id="panel-describe"
              role="tabpanel"
              aria-labelledby="tab-describe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-5xl flex flex-col items-center"
            >
              <div className="w-full max-w-3xl relative mb-5">
                <label htmlFor="idea-input-workbench" className="sr-only">
                  Describe your idea
                </label>
                <Input
                  id="idea-input-workbench"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. A marketplace for vintage synthesizers..."
                  className={cn(
                    "h-16 px-6 text-lg rounded-xl bg-background border-2 shadow-xs transition-all duration-200 outline-none",
                    "border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
                    idea.trim() ? "border-primary shadow-primary/10 shadow-lg" : ""
                  )}
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setIdea(ex)}
                    className="group text-xs md:text-sm px-3.5 py-1.5 rounded-full border border-border bg-muted/10 hover:bg-primary/10 hover:border-primary/40 hover:text-primary-text active:scale-95 transition-all duration-200 text-muted-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-ring outline-none flex items-center gap-1.5"
                  >
                    <AnimatedZap size={12} className="text-primary/70 group-hover:text-primary transition-colors" />
                    <span>{ex}</span>
                  </button>
                ))}
              </div>

              {blueprint && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <BlueprintCard blueprint={blueprint} onContact={handleContact} />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="guided"
              id="panel-guided"
              role="tabpanel"
              aria-labelledby="tab-guided"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-5xl"
            >
              <div className="border border-border rounded-2xl overflow-hidden bg-muted/5 shadow-sm p-6 sm:p-8">
                <BuildYourIdea initialDescription={idea} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
