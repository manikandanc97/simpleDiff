"use client";

import { NAV_ITEMS } from "@/config/nav";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { Button } from "@/components/ui/button";

interface SiteNavbarProps {
  onStartProject?: () => void;
}

export function SiteNavbar({ onStartProject }: SiteNavbarProps) {
  const { openLead } = useLead();
  const pathname = usePathname();
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
    if (onStartProject) onStartProject();
    else openLead({ source: "navbar" });
  };

  return (
    <>
      {/* ── Navbar shell ── */}
      <motion.header
        role="banner"
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6"
        animate={{ y: scrolled ? 0 : 8 }}
        transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
      >
        {/* ── Content row (Pill) ── */}
        <motion.div
          className="w-[92vw] max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between bg-[rgba(255,255,255,0.72)] backdrop-blur-[16px] border border-[rgba(30,24,30,0.08)] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-ring rounded-lg outline-none font-satoshi"
            aria-label="SimpleThink Home"
          >
            <Image
              src="/logo.png"
              alt="SimpleThink Logo"
              width={180}
              height={40}
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8 xl:gap-10 font-satoshi"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative text-base font-semibold tracking-tight transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring flex flex-col items-center",
                    isActive
                      ? "text-[#922F55]"
                      : "text-[#121114] hover:text-[#922F55]"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="nav-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-[#922F55] absolute -bottom-2.5" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 font-satoshi">
            <div className="hidden xl:flex items-center gap-2.5 border-l border-[rgba(30,24,30,0.08)] pl-5 py-1 mr-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#08B875] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#08B875]" />
              </span>
              <span className="text-sm font-medium text-[#121114]/90 tracking-tight">Available for projects</span>
            </div>
            
            {/* Start a project CTA Button */}
            <Button
              size="sm"
              onClick={handleStart}
              id="navbar-start-project"
              className="flex group font-bold text-sm sm:text-base tracking-tight h-9 sm:h-11 px-4 sm:px-6 rounded-full bg-[#922F55] text-white hover:bg-[#7D2748] active:scale-95 cursor-pointer transition-all duration-200 items-center gap-1.5 shadow-[0_4px_14px_rgba(146,47,85,0.25)] border-0"
            >
              <span>Start a project</span>
              <AnimatedArrowRight size={15} className="ml-0.5 text-white" />
            </Button>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
