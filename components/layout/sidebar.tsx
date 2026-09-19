"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Left Dock) */}
      <aside className="hidden md:flex flex-col items-center py-4 fixed top-0 left-0 bottom-0 w-16 bg-background border-r border-border z-50">
        <Link href="/" className="mb-8 font-bold text-xl select-none" title="SimpleDiff" aria-label="SimpleDiff Home">
          <span className="text-primary">S</span>D
        </Link>
        <nav aria-label="Primary" className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;
            const Icon = item.icon;

            return (
              <Link
                key={item.route}
                href={item.route}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative group p-3 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className="h-5 w-5 relative z-10" />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav aria-label="Primary" className="md:hidden fixed bottom-10 left-0 right-0 h-16 bg-background border-t border-border z-40 flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.route;
          const Icon = item.icon;

          return (
            <Link
              key={item.route}
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-full transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-active"
                  className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-b-full pointer-events-none z-0"
                />
              )}
              <Icon className="h-5 w-5 mb-1 relative z-10" />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
