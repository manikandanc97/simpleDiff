"use client";

import { motion } from "motion/react";
import { GitBranch, CheckCircle2, CircleDashed, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const BRANCHES = [
  {
    name: "feat/interactive-docs",
    status: "merged",
    title: "Interactive API Documentation",
    desc: "A custom MDX renderer that allows users to run API calls directly from the docs.",
  },
  {
    name: "experiment/ai-copilot",
    status: "in-progress",
    title: "Local AI Copilot",
    desc: "Running WebLLM directly in the browser to provide context-aware suggestions without server costs.",
  },
  {
    name: "spike/webgl-hero",
    status: "archived",
    title: "WebGL Particle Hero",
    desc: "Exploration into Three.js particles. Looked cool, but hurt performance and accessibility. Scrapped in favor of CSS motion.",
  },
];

export default function LabPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Branches.</h1>
        <p className="text-muted-foreground text-lg">
          Experiments, ideas in progress, and things we decided not to ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BRANCHES.map((branch, i) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative border border-border rounded-xl p-6 bg-background hover:border-primary/50 transition-colors overflow-hidden flex flex-col"
          >
            {/* Spotlight effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground truncate">{branch.name}</span>
              
              <div className="ml-auto">
                {branch.status === "merged" && <span title="Merged"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></span>}
                {branch.status === "in-progress" && <span title="In Progress"><CircleDashed className="w-4 h-4 text-amber-500 animate-[spin_4s_linear_infinite]" /></span>}
                {branch.status === "archived" && <span title="Archived"><Archive className="w-4 h-4 text-muted-foreground opacity-50" /></span>}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">{branch.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {branch.desc}
            </p>

            {/* Mini Demo Area */}
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-center">
              {branch.status === "in-progress" ? (
                <div className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Compiling...
                </div>
              ) : (
                <button 
                  className={cn(
                    "text-xs font-mono px-4 py-2 rounded-md border border-border transition-colors w-full",
                    branch.status === "archived" ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
                  )}
                  disabled={branch.status === "archived"}
                >
                  {branch.status === "archived" ? "View Postmortem" : "Run Demo"}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
