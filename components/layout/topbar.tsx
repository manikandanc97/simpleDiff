"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ColorPicker } from "@/components/theme/color-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";

interface TopbarProps {
  onStartProject?: () => void;
}

export function Topbar({ onStartProject }: TopbarProps) {
  const { openLead } = useLead();
  const pathname = usePathname();

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "topbar" });
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 h-14 bg-background/70 backdrop-blur-xl border-b border-border/60 z-40 flex items-center justify-between px-4 md:pl-20 shadow-sm"
    >
      {/* Logo */}
      <div className="text-lg font-bold tracking-tight">
        <Link href="/" className="hover:opacity-90 transition-opacity flex items-center gap-0 group">
          <span>Simple</span>
          <span className="font-mono text-diff-add text-[10px] font-bold select-none opacity-70 group-hover:opacity-100 transition-opacity mr-0.5">+</span>
          <span className="text-primary">Think</span>
        </Link>
      </div>

      {/* Desktop pill nav */}
      <nav
        aria-label="Primary navigation"
        className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border/80 bg-muted/30 backdrop-blur-sm"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="topbar-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={handleStart}
          id="topbar-start-project"
          className="text-xs h-8 px-3 cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-transform"
        >
          Start a project
        </Button>
        <Dialog>
          <DialogTrigger render={<Button variant="ghost" size="icon-sm" className="rounded-full" title="Appearance Settings" />}>
            <Palette className="h-4 w-4" />
            <span className="sr-only">Appearance Settings</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Appearance</DialogTitle>
              <DialogDescription className="sr-only">
                Customize the accent color and appearance mode of the application.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-2">
              <ColorPicker />
            </div>
          </DialogContent>
        </Dialog>
        <ThemeToggle />
      </div>
    </header>
  );
}
