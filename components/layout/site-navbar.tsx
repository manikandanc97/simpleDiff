"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ColorPicker } from "@/components/theme/color-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { Palette, Menu, X, ArrowRight } from "lucide-react";

interface SiteNavbarProps {
  onStartProject?: () => void;
}

export function SiteNavbar({ onStartProject }: SiteNavbarProps) {
  const { openLead } = useLead();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStart = () => {
    setMobileMenuOpen(false);
    if (onStartProject) onStartProject();
    else openLead({ source: "navbar" });
  };

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 py-3 shadow-xs"
          : "bg-background/40 backdrop-blur-xs py-4 md:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-ring rounded-lg outline-none"
          aria-label="SimpleDiff Home"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Simple
          </span>
          <span className="text-primary text-xl sm:text-2xl font-bold tracking-tight transition-transform group-hover:scale-105">
            Diff
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-0.5 animate-pulse" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/70 bg-muted/40 backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Appearance Settings */}
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Customize accent color"
                />
              }
            >
              <Palette className="h-4 w-4" />
              <span className="sr-only">Customize accent color</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>Appearance & Accent</DialogTitle>
                <DialogDescription>
                  Choose your preferred accent hue. The entire interface adapts instantly.
                </DialogDescription>
              </DialogHeader>
              <div className="pt-2">
                <ColorPicker />
              </div>
            </DialogContent>
          </Dialog>

          <ThemeToggle />

          <Button
            size="sm"
            onClick={handleStart}
            id="navbar-start-project"
            className="group font-medium text-xs h-9 px-4.5 rounded-full cursor-pointer shadow-sm hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Start a project
            <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Mobile Hamburger & Quick Theme */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen / Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-[57px] bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl px-6 py-6 flex flex-col gap-6"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.route;
                return (
                  <Link
                    key={item.route}
                    href={item.route}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 rounded-xl text-lg font-semibold tracking-tight transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-70" />
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border pt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Brand Accent
                </span>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs gap-1.5 h-8"
                      />
                    }
                  >
                    <Palette className="h-3.5 w-3.5" />
                    <span>Change color</span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                      <DialogTitle>Appearance & Accent</DialogTitle>
                      <DialogDescription>
                        Choose your preferred accent hue.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="pt-2">
                      <ColorPicker />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                size="lg"
                onClick={handleStart}
                className="w-full font-semibold rounded-xl text-sm h-12 shadow-md cursor-pointer"
              >
                Start a project &rarr;
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
