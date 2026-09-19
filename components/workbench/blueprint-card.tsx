"use client";

import { motion } from "motion/react";
import { type Blueprint } from "@/lib/idea-engine";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, CheckCircle2, MinusCircle } from "lucide-react";

interface BlueprintCardProps {
  blueprint: Blueprint;
  onContact: () => void;
}

export function BlueprintCard({ blueprint, onContact }: BlueprintCardProps) {
  if (blueprint.stats.kept === 0 && blueprint.stats.cut === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-background border border-border/80 rounded-2xl shadow-xl overflow-hidden text-left"
    >
      {/* Top Banner */}
      <div className="px-6 py-5 bg-muted/20 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
            SimpleDiff Blueprint
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {blueprint.type}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
            {blueprint.stats.cut} cut
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {blueprint.stats.kept} prioritized
          </span>
        </div>
      </div>

      {/* Editorial Comparison: What typical agencies quote vs How SimpleDiff starts */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
        {/* Left: What We Cut */}
        <div className="p-6 sm:p-8 space-y-4 bg-muted/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground font-semibold text-xs tracking-wider uppercase">
              <MinusCircle className="h-4 w-4 text-destructive/70" />
              <span>Unnecessary Complexity Cut</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Costly bloat that delays your launch without adding customer value.
            </p>
          </div>
          <ul className="space-y-2.5 pt-2">
            {blueprint.complexityCut.map((item, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-destructive font-mono font-bold select-none shrink-0 mt-0.5">
                  &minus;
                </span>
                <span className="line-through decoration-muted-foreground/50 opacity-80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: The Focused Core */}
        <div className="p-6 sm:p-8 space-y-4 bg-primary/[0.02]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs tracking-wider uppercase">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>The Focused MVP Scope</span>
            </div>
            <p className="text-xs text-muted-foreground">
              The high-impact 20% that delivers 80% of the real business value.
            </p>
          </div>
          <ul className="space-y-2.5 pt-2">
            {blueprint.mvpScope.map((item, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-foreground flex items-start gap-2.5 leading-relaxed font-medium"
              >
                <span className="text-primary font-mono font-bold select-none shrink-0 mt-0.5">
                  +
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Strip */}
      <div className="px-6 py-5 bg-muted/30 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground">
            {blueprint.indicativeTimeline}
          </span>
          <span className="opacity-70">&bull; Indicative timeline to first release</span>
        </div>

        <Button
          onClick={onContact}
          className="font-medium text-xs sm:text-sm h-10 px-5 rounded-full cursor-pointer shadow-sm hover:shadow-primary/20 active:scale-[0.99] transition-all"
        >
          Discuss this blueprint with us
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );
}
