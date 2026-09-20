"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";

import { AnimatedIcon, type AnimatedIconName } from "@/components/ui/animated-icon";

const BOTTOM_TABS: { label: string; route: string; iconName: AnimatedIconName }[] = [
  { label: "Home", route: "/", iconName: "home" },
  { label: "Work", route: "/work", iconName: "briefcase" },
  { label: "Services", route: "/services", iconName: "layers" },
  { label: "Ideas", route: "/lab", iconName: "lightbulb" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <nav
      aria-label="Mobile Bottom App Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/80 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] pb-[calc(env(safe-area-inset-bottom,0px)+4px)] pt-1.5 px-2"
    >
      <div className="grid grid-cols-5 items-center gap-1 max-w-md mx-auto">
        {BOTTOM_TABS.map((tab) => {
          const isActive = pathname === tab.route && !isOpen;

          return (
            <Link
              key={tab.route}
              href={tab.route}
              onClick={closeMenu}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring select-none active:scale-95",
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-bottom-tab-active"
                  className="absolute inset-0 bg-primary/12 rounded-2xl"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <motion.div whileTap={{ scale: 0.88 }} className="relative z-10 flex flex-col items-center gap-0.5">
                <AnimatedIcon
                  name={tab.iconName}
                  solid={isActive}
                  hoverDelay={1000}
                  oncePerInteraction={true}
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    isActive ? "scale-110 text-primary" : "text-muted-foreground group-hover:text-foreground group-hover:scale-115 group-active:scale-90"
                  )}
                />
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </motion.div>
            </Link>
          );
        })}

        {/* 5th Tab: App Menu / More */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu sheet" : "Open full app menu"}
          className={cn(
            "group relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring select-none active:scale-95",
            isOpen ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isOpen && (
            <motion.div
              layoutId="mobile-bottom-tab-active"
              className="absolute inset-0 bg-primary/12 rounded-2xl"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <motion.div whileTap={{ scale: 0.88 }} className="relative z-10 flex flex-col items-center gap-0.5">
            <div className="relative">
              <AnimatedIcon
                name="grid"
                size={20}
                className={cn(
                  "transition-transform duration-200",
                  isOpen ? "scale-110 text-primary" : "text-muted-foreground group-hover:text-foreground group-hover:scale-115 group-active:scale-90"
                )}
              />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary ring-1 ring-background" />
            </div>
            <span className="text-[10px] tracking-tight">Menu</span>
          </motion.div>
        </button>
      </div>
    </nav>
  );
}
