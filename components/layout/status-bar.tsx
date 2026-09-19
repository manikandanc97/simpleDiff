"use client";

import { SITE } from "@/lib/site";
import { useLead } from "@/components/leads/lead-provider";

interface StatusBarProps {
  onStartProject?: () => void;
}

export function StatusBar({ onStartProject }: StatusBarProps) {
  const { openLead } = useLead();

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "topbar" });
  };
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-background border-t border-border z-50 flex items-center justify-between px-4 text-xs font-mono text-muted-foreground md:pl-20">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{SITE.availability}</span>
      </div>

      <div className="flex items-center gap-4">
        {SITE.email && (
          <a 
            href={`mailto:${SITE.email}`} 
            className="hover:text-foreground transition-colors"
          >
            {SITE.email}
          </a>
        )}
        <button
          type="button"
          onClick={handleStart}
          className="hover:text-foreground transition-colors font-medium cursor-pointer"
        >
          Start a project &rarr;
        </button>
      </div>
    </footer>
  );
}
