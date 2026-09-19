"use client";

import Link from "next/link";

// Rewriting without date-fns:
export function StatusBar() {
  const time = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(new Date());

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-background border-t border-border z-50 flex items-center justify-between px-4 text-xs font-mono text-muted-foreground md:pl-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Available for work</span>
          <span className="sm:hidden">Available</span>
        </div>
        <div className="hidden sm:block border-l border-border h-4" />
        <div className="hidden sm:block">{time} Local</div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="#" className="hover:text-foreground transition-colors">v0.1.0</Link>
        <Link href="#" className="hover:text-foreground transition-colors hidden sm:block">GitHub</Link>
        <Link href="#" className="hover:text-foreground transition-colors hidden sm:block">X</Link>
        <Link href="#" className="hover:text-foreground transition-colors">Legal</Link>
      </div>
    </div>
  );
}
