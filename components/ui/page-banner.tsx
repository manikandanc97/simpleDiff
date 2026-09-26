"use client";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@animateicons/react/lucide/chevron-right-icon";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  breadcrumb: BreadcrumbItem[];
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  techStack?: string[];
  className?: string;
}

import { TECH_STACK } from "@/lib/data/tech-stack";

const DEFAULT_TECH_SLUGS = [
  "react",
  "nextjs",
  "typescript",
  "tailwindcss",
  "supabase",
  "docker",
];

// 6 positions scattered symmetrically on outer gutters
const TECH_POSITIONS = [
  {
    className: "top-[8%] sm:top-[12%] left-[2%] sm:left-[5%] lg:left-[8%]",
    duration: 6.5,
    delay: 0,
    yOffset: 8,
    rotateOffset: 3,
    hideOnMobile: true,
  },
  {
    className: "top-[calc(50%-22px)] sm:top-[calc(50%-26px)] left-[1.5%] sm:left-[3%] lg:left-[5%]",
    duration: 8,
    delay: 1.2,
    yOffset: 10,
    rotateOffset: -3,
    hideOnMobile: false,
  },
  {
    className: "bottom-[8%] sm:bottom-[12%] left-[3%] sm:left-[6%] lg:left-[9%]",
    duration: 7,
    delay: 0.4,
    yOffset: 7,
    rotateOffset: 2.5,
    hideOnMobile: true,
  },
  {
    className: "top-[8%] sm:top-[12%] right-[2%] sm:right-[5%] lg:right-[8%]",
    duration: 7.2,
    delay: 0.8,
    yOffset: 9,
    rotateOffset: -3,
    hideOnMobile: true,
  },
  {
    className: "top-[calc(50%-22px)] sm:top-[calc(50%-26px)] right-[1.5%] sm:right-[3%] lg:right-[5%]",
    duration: 6,
    delay: 1.6,
    yOffset: 8,
    rotateOffset: 3,
    hideOnMobile: false,
  },
  {
    className: "bottom-[8%] sm:bottom-[12%] right-[3%] sm:right-[6%] lg:right-[9%]",
    duration: 8.5,
    delay: 0.2,
    yOffset: 10,
    rotateOffset: -2.5,
    hideOnMobile: true,
  },
];

export function PageBanner({
  breadcrumb,
  badge,
  badgeIcon,
  title,
  description,
  techStack = DEFAULT_TECH_SLUGS,
  className,
}: PageBannerProps) {
  const activeBreadcrumb = breadcrumb[breadcrumb.length - 1];
  const parentBreadcrumbs = breadcrumb.slice(0, breadcrumb.length - 1);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none",
        // ── Solid primary color fill ──
        "bg-primary",
        // Compact padding
        "py-8 sm:py-10 md:py-12",
        className
      )}
    >
      {/* ─── Subtle dot-grid on primary ──────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 85% 90% at 50% 50%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 90% at 50% 50%, #000 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Top-left corner glow accent ─────────────────────── */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      {/* ─── Bottom-right corner glow accent ─────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* ─── Bottom separator line ────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0.25) 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Floating Tech Badges ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {techStack.slice(0, 6).map((slug, idx) => {
          const config = TECH_POSITIONS[idx] || TECH_POSITIONS[0];
          const techItem = TECH_STACK.find((t) => t.slug === slug);
          const meta = {
            label: techItem?.name || slug,
            invertInDark: techItem?.invertInDark,
          };

          return (
            <motion.div
              key={`${slug}-${idx}`}
              initial={{ opacity: 0, scale: 0.75, y: 10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [-config.yOffset, config.yOffset, -config.yOffset],
                rotate: [
                  -config.rotateOffset,
                  config.rotateOffset,
                  -config.rotateOffset,
                ],
              }}
              transition={{
                y: {
                  duration: config.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: config.delay,
                },
                rotate: {
                  duration: config.duration * 1.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: config.delay,
                },
                opacity: { duration: 0.7, delay: 0.2 + config.delay * 0.2 },
                scale: { duration: 0.7, delay: 0.2 + config.delay * 0.2 },
              }}
              whileHover={{ scale: 1.18, rotate: 0, transition: { duration: 0.2 } }}
              title={meta.label}
              className={cn(
                "pointer-events-auto absolute z-10 flex items-center justify-center",
                "w-11 h-11 sm:w-13 sm:h-13 p-2.5 sm:p-3",
                "rounded-2xl",
                // White solid bg so original SVG colors pop against primary bg
                "bg-white/90 backdrop-blur-sm",
                "border border-white/60 shadow-md",
                "hover:bg-white hover:shadow-xl hover:scale-110",
                "transition-all duration-300 cursor-default group",
                config.hideOnMobile ? "hidden sm:flex" : "flex",
                config.className
              )}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={`/images/tech-stack/${slug}.svg`}
                  alt={meta.label}
                  width={26}
                  height={26}
                  className={cn(
                    "w-full h-full object-contain transition-opacity duration-300 opacity-90 group-hover:opacity-100",
                    meta.invertInDark && "dark:invert"
                  )}
                />
              </div>
              {/* Tooltip */}
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/75 text-white text-xs font-semibold whitespace-nowrap shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-30">
                {meta.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Centered Content ────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-4 sm:gap-5">

        {/* ── Breadcrumb — white glass pill on primary ── */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-1.5 text-xs sm:text-xs font-medium text-white/70 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 hover:bg-white/15 hover:border-white/40 transition-colors cursor-default"
        >
          {parentBreadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {i === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  )}
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              <AnimatedIcon icon={ChevronRightIcon} size={11} className="opacity-40" />
            </React.Fragment>
          ))}
          {activeBreadcrumb && (
            <span className="text-white font-bold flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {activeBreadcrumb.label}
            </span>
          )}
        </motion.nav>

        {/* Optional Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-white/30 bg-white/15 text-white text-xs font-bold uppercase tracking-widest">
              {badgeIcon ?? <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              {badge}
            </span>
          </motion.div>
        )}

        {/* ── MAIN TITLE — always white on solid primary ── */}
        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "font-black tracking-tight text-white leading-[1.05]",
            "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
            // Reduced: ~28px → 40px
            "text-[clamp(1.75rem,3.5vw,2.5rem)]"
          )}
        >
          {title}
        </motion.h1>

        {/* ── DESCRIPTION — soft white ── */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "text-white/60 leading-relaxed font-normal max-w-lg",
              "text-[clamp(0.8125rem,1.4vw,0.9375rem)]"
            )}
          >
            {description}
          </motion.p>
        )}

        {/* ── Animated white accent line ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center h-0.5 w-10 sm:w-14 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
        />
      </div>
    </div>
  );
}

