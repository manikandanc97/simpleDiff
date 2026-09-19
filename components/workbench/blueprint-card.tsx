"use client";

import { motion } from "motion/react";
import { type Blueprint } from "@/lib/idea-engine";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export function BlueprintCard({
  blueprint,
  onContact,
}: {
  blueprint: Blueprint;
  onContact: () => void;
}) {
  if (blueprint.stats.kept === 0 && blueprint.stats.cut === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-muted/10 border border-border rounded-xl p-6 md:p-8 flex flex-col gap-8 shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
            Project Type
          </h3>
          <p className="text-2xl font-bold tracking-tight">{blueprint.type}</p>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <div className="bg-diff-remove-bg text-diff-remove px-2.5 py-1 rounded-sm font-medium">
            {blueprint.stats.cut} cut
          </div>
          <div className="bg-diff-add-bg text-diff-add px-2.5 py-1 rounded-sm font-medium">
            {blueprint.stats.kept} kept
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-foreground">
            <span className="w-2 h-2 rounded-full bg-diff-remove" aria-hidden="true" />
            What We&apos;d Cut (Typical Build)
          </h4>
          <ul className="space-y-3 font-mono text-sm">
            {blueprint.complexityCut.map((item, i) => (
              <li key={i} className="flex gap-3 text-diff-remove items-start">
                <span className="select-none font-bold" aria-hidden="true">
                  -
                </span>
                <span className="line-through">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-foreground">
            <span className="w-2 h-2 rounded-full bg-diff-add" aria-hidden="true" />
            The Simple Core (MVP Scope)
          </h4>
          <ul className="space-y-3 font-mono text-sm">
            {blueprint.mvpScope.map((item, i) => (
              <li key={i} className="flex gap-3 text-diff-add items-start">
                <span className="select-none font-bold" aria-hidden="true">
                  +
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 border-t border-border pt-6 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <span>{blueprint.indicativeTimeline}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            (Indicative &mdash; confirmed after a short call)
          </span>
        </div>

        <Button onClick={onContact} className="w-full md:w-auto font-medium cursor-pointer">
          Send this to SimpleDiff &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
