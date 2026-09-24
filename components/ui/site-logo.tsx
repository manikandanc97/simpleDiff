import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <div className={cn("select-none flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="SimpleThink Logo"
        width={150}
        height={32}
        className="h-7 w-auto object-contain"
      />
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
