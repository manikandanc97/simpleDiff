import React from "react";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <div className={cn("font-bold tracking-tight text-foreground select-none flex items-center", className)}>
      <span>Simple</span>
      <span className="text-primary">Think</span>
    </div>
  );
}

export function SiteLogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn("font-bold tracking-tight text-foreground select-none flex items-center justify-center bg-background rounded-md border border-primary/40", className)}>
      <span className="text-foreground">S</span>
      <span className="text-primary">T</span>
    </div>
  );
}
