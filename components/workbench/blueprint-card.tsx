"use client";

import { motion } from "motion/react";
import { type Blueprint } from "@/lib/idea-engine";
import { Button } from "@/components/ui/button";
import { Clock, Layers } from "lucide-react";

export function BlueprintCard({ blueprint, onContact }: { blueprint: Blueprint; onContact: () => void }) {
  if (blueprint.stats.added === 0 && blueprint.stats.removed === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-muted/10 border border-border rounded-xl p-6 md:p-8 flex flex-col gap-8 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Project Type</h3>
          <p className="text-2xl font-bold">{blueprint.type}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-diff-remove-bg text-diff-remove px-3 py-1 rounded-sm text-sm font-mono">
            -{blueprint.stats.removed}
          </div>
          <div className="bg-diff-add-bg text-diff-add px-3 py-1 rounded-sm text-sm font-mono">
            +{blueprint.stats.added}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-diff-remove" />
            What We&apos;d Cut (Typical Build)
          </h4>
          <ul className="space-y-3 font-mono text-sm">
            {blueprint.complexityCut.map((item, i) => (
              <li key={i} className="flex gap-3 text-diff-remove items-start">
                <span className="select-none opacity-50">-</span>
                <span className="line-through opacity-75">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-diff-add" />
            The Simple Core (MVP Scope)
          </h4>
          <ul className="space-y-3 font-mono text-sm">
            {blueprint.mvpScope.map((item, i) => (
              <li key={i} className="flex gap-3 text-diff-add items-start">
                <span className="select-none opacity-50">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 border-t border-border pt-6 items-start md:items-center justify-between">
        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {blueprint.timeline}
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {blueprint.stack.join(", ")}
          </div>
        </div>
        
        <Button onClick={onContact} className="w-full md:w-auto font-medium">
          Send this to SimpleDiff &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
