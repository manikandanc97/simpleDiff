"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { generateBlueprint, type Blueprint } from "@/lib/idea-engine";
import { BlueprintCard } from "./blueprint-card";
import { BuildYourIdea } from "@/components/sections/build-your-idea/build-your-idea";
import { Sparkles } from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";

const EXAMPLES = [
  "A modern e-commerce store with headless Shopify",
  "A bold brand identity and portfolio site for an agency",
  "A SaaS dashboard for managing subscription billing",
];

export function WorkbenchHero() {
  const [activeTab, setActiveTab] = useState<"quick" | "guided">("quick");
  const [idea, setIdea] = useState("");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const { theme } = useThemeColor();

  useEffect(() => {
    if (idea.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlueprint(null);
    } else {
      const timer = setTimeout(() => {
        setBlueprint(generateBlueprint(idea));
      }, 400); // Debounce
      return () => clearTimeout(timer);
    }
  }, [idea]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center pt-20 px-4 md:px-8">
      
      {/* Tabs */}
      <div className="flex bg-muted/20 p-1 rounded-lg border border-border mb-12">
        <button
          onClick={() => setActiveTab("quick")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "quick" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Quick Mode
        </button>
        <button
          onClick={() => setActiveTab("guided")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "guided" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Guided Mode
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "quick" ? (
          <motion.div 
            key="quick"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-5xl flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-8 max-w-3xl">
              Describe your idea. <br />
              <span className="text-muted-foreground">Watch us simplify it.</span>
            </h1>

            <div className="w-full max-w-3xl relative mb-6">
              <Input 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. A marketplace for vintage synthesizers..."
                className="h-16 pl-6 pr-12 text-lg rounded-xl bg-background border-2 shadow-xs transition-colors outline-none focus-visible:ring-0 focus-visible:border-primary"
                style={{ borderColor: idea ? theme.primary : "var(--border)" }}
              />
              <Sparkles className="absolute right-4 top-5 w-6 h-6 text-muted-foreground opacity-50" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-16">
              {EXAMPLES.map(ex => (
                <button
                  key={ex}
                  onClick={() => setIdea(ex)}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border bg-muted/10 hover:bg-muted/30 transition-colors text-muted-foreground"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Split Diff Pane */}
            {blueprint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden mb-8 border border-border">
                  
                  {/* Left: Typical Build (Red) */}
                  <div className="bg-background flex flex-col h-full">
                    <div className="bg-muted/20 border-b border-border px-4 py-2 flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">typical-build.js</span>
                      <span className="text-diff-remove bg-diff-remove-bg px-2 py-0.5 rounded-sm">-{blueprint.stats.removed}</span>
                    </div>
                    <div className="p-4 font-mono text-sm space-y-2 flex-1">
                      <div className="text-muted-foreground opacity-50">@@ -1,3 +1,3 @@</div>
                      {blueprint.complexityCut.map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="bg-diff-remove-bg/50 px-2 py-1 rounded-sm text-diff-remove flex gap-3 line-through opacity-80"
                        >
                          <span className="opacity-50 select-none">-</span>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: SimpleDiff Build (Green) */}
                  <div className="bg-background flex flex-col h-full">
                    <div className="bg-muted/20 border-b border-border px-4 py-2 flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">simplediff-build.js</span>
                      <span className="text-diff-add bg-diff-add-bg px-2 py-0.5 rounded-sm">+{blueprint.stats.added}</span>
                    </div>
                    <div className="p-4 font-mono text-sm space-y-2 flex-1">
                      <div className="text-muted-foreground opacity-50">@@ -1,3 +1,3 @@</div>
                      {blueprint.mvpScope.map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          key={i} 
                          className="bg-diff-add-bg/50 px-2 py-1 rounded-sm text-diff-add flex gap-3"
                        >
                          <span className="opacity-50 select-none">+</span>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Blueprint Card */}
                <BlueprintCard blueprint={blueprint} onContact={() => alert("Ready for Phase 6 (Lead Capture)")} />
                
              </motion.div>
            )}

          </motion.div>
        ) : (
          <motion.div 
            key="guided"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-5xl"
          >
            <div className="border border-border rounded-2xl overflow-hidden bg-muted/5 shadow-sm">
              <BuildYourIdea />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
