"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { FontPickerDialog } from "@/components/theme/font-picker";
import { ColorPickerDialog } from "@/components/theme/color-picker-dialog";
import { MobileAppMenu } from "@/components/layout/mobile-app-menu";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { AnimatedIcon, AnimatedArrowRight, AnimatedMenu, AnimatedX, type AnimatedIconName } from "@/components/ui/animated-icon";

const ROUTE_ICON_NAMES: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/lab": "lightbulb",
  "/about": "info",
  "/contact": "mail",
};

interface SiteNavbarProps {
  onStartProject?: () => void;
}

export function SiteNavbar({ onStartProject }: SiteNavbarProps) {
  const { openLead } = useLead();
  const pathname = usePathname();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
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
      {/* ── Navbar shell — springs from y:32 (below TopBar) to y:0 ── */}
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: scrolled ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
      >
        {/* ── Glass background layer — fades in on scroll ── */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="glass-bg"
              className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                boxShadow:
                  "0 4px 32px -4px hsl(var(--primary) / 0.12), 0 1px 0 0 hsl(var(--primary) / 0.08)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Scroll Progress Bar ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
        >
          <motion.div
            className="h-full bg-primary origin-left"
            style={{ boxShadow: "0 0 8px 1px hsl(var(--primary) / 0.5)" }}
            animate={{ scaleX: scrollProgress / 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 40, mass: 0.5 }}
          />
        </div>

        {/* ── Content row ── */}
        <motion.div
          className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between relative z-10"
          animate={{ paddingTop: scrolled ? 10 : 14, paddingBottom: scrolled ? 10 : 14 }}
          transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-ring rounded-lg outline-none"
            aria-label="SimpleDiff Home"
          >
            <motion.span
              className="text-xl sm:text-2xl font-bold tracking-tight text-foreground"
              animate={{ scale: scrolled ? 0.93 : 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
              style={{ transformOrigin: "left center" }}
            >
              Simple<span className="text-primary transition-transform inline-block group-hover:scale-105 animate-pulse">Diff</span>
            </motion.span>
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
                    "group relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1.5 active:scale-95",
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
                    solid={isActive}
                    hoverDelay={1000}
                    oncePerInteraction={true}
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
            <ColorPickerDialog />
            <FontPickerDialog />
            <ThemeToggle />
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

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1">
            <ColorPickerDialog />
            <FontPickerDialog />
            <ThemeToggle />
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="group p-2 rounded-full text-foreground hover:bg-muted/60 active:scale-90 transition-all focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer flex items-center justify-center"
              id="mobile-menu-trigger"
            >
              {isOpen ? <AnimatedX size={18} /> : <AnimatedMenu size={18} />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Native Mobile App Sheet Drawer */}
      <MobileAppMenu open={isOpen} onClose={closeMenu} />
    </>
  );
}
