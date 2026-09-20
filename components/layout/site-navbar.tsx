"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { FontPickerDialog } from "@/components/theme/font-picker";
import { ColorPickerDialog } from "@/components/theme/color-picker-dialog";
import { MobileAppMenu } from "@/components/layout/mobile-app-menu";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { Menu, X, ArrowRight } from "lucide-react";

import { AnimatedIcon, AnimatedArrowRight, AnimatedMenu, AnimatedX, type AnimatedIconName } from "@/components/ui/animated-icon";

const ROUTE_ICON_NAMES: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/lab": "lightbulb",
  "/about": "info",
};

interface SiteNavbarProps {
  onStartProject?: () => void;
}

export function SiteNavbar({ onStartProject }: SiteNavbarProps) {
  const { openLead } = useLead();
  const pathname = usePathname();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
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
    closeMenu();
    if (onStartProject) onStartProject();
    else openLead({ source: "navbar" });
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/70 py-2.5 sm:py-3 shadow-xs"
            : "bg-background/40 backdrop-blur-xs py-3.5 md:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-ring rounded-lg outline-none"
            aria-label="SimpleDiff Home"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Simple<span className="text-primary transition-transform inline-block group-hover:scale-105 animate-pulse">Diff</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/70 bg-muted/40 backdrop-blur-md"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.route;
              const iconName = ROUTE_ICON_NAMES[item.route] || "sparkles";
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1.5",
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
                  <AnimatedIcon
                    name={iconName}
                    size={13}
                    className={cn(
                      "relative z-10 transition-transform",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Color Accent Selector */}
            <ColorPickerDialog />

            {/* Typography / Font Selector */}
            <FontPickerDialog />

            {/* Dark / Light Toggle */}
            <ThemeToggle />

            {/* Start a project CTA */}
            <Button
              size="sm"
              onClick={handleStart}
              id="navbar-start-project"
              className="group font-medium text-xs h-9 px-4.5 rounded-full cursor-pointer shadow-sm hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Start a project</span>
              <AnimatedArrowRight size={13} className="ml-0.5" />
            </Button>
          </div>

          {/* Mobile Right Controls: Color, Font, Theme & Menu */}
          <div className="flex md:hidden items-center gap-1">
            {/* 1-tap Color Picker directly in top navbar */}
            <ColorPickerDialog />

            {/* 1-tap Font Picker directly in top navbar */}
            <FontPickerDialog />

            {/* Dark / Light theme toggle */}
            <ThemeToggle />

            {/* Native Mobile Menu Trigger */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="group p-2 rounded-full text-foreground hover:bg-muted/60 transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer flex items-center justify-center"
            >
              {isOpen ? <AnimatedX size={18} /> : <AnimatedMenu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Native Mobile App Sheet Drawer */}
      <MobileAppMenu open={isOpen} onClose={closeMenu} />
    </>
  );
}
