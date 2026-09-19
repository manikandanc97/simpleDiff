"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Home, FolderGit2, FlaskConical, LayoutTemplate, BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Workbench", icon: Home },
  { href: "/work", label: "Commits", icon: FolderGit2 },
  { href: "/lab", label: "Branches", icon: FlaskConical },
  { href: "/services", label: "Modules", icon: LayoutTemplate },
  { href: "/about", label: "README.md", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Left Dock) */}
      <aside className="hidden md:flex flex-col items-center py-4 fixed top-0 left-0 bottom-0 w-16 bg-background border-r border-border z-50">
        <Link href="/" className="mb-8 font-bold text-xl select-none" title="SimpleDiff">
          <span className="text-primary">S</span>D
        </Link>
        <nav className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group p-3 rounded-xl transition-all outline-none",
                  isActive ? "text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-10 left-0 right-0 h-16 bg-background border-t border-border z-40 flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-active"
                  className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-b-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
