"use client";

import { useLead } from "@/components/leads/lead-provider";
import {
  AnimatedIcon,
  type AnimatedIconName,
} from "@/components/ui/animated-icon";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const FOOTER_NAV_ICONS: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/about": "info",
  "/contact": "mail",
};

const CAPABILITY_ITEMS: { label: string; icon: AnimatedIconName }[] = [
  { label: "Websites & Landing Pages", icon: "globe" },
  { label: "Web Applications", icon: "laptop" },
  { label: "Mobile Apps (iOS & Android)", icon: "smartphone" },
  { label: "SaaS Platforms", icon: "layers" },
  { label: "Branding & Identity", icon: "palette" },
  { label: "AI Automation & Agents", icon: "cpu" },
];

interface SiteFooterProps {
  onStartProject?: () => void;
}

export function SiteFooter({ onStartProject }: SiteFooterProps) {
  const { openLead } = useLead();

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "footer" });
  };

  return (
    <footer className="w-full bg-background border-t border-border mt-auto relative overflow-hidden">
      {/* Soft ambient background glows */}
      <div className="pointer-events-none absolute -left-28 top-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-primary/8 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute -right-24 -top-16 w-[440px] h-[360px] bg-primary/5 blur-[110px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Top Grid: Brand, Explore, Capabilities, Connect Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-border/80 items-start">

          {/* Col 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Brand Logo */}
              <Link
                href="/"
                className="inline-flex items-center focus-visible:ring-2 focus-visible:ring-ring outline-none"
                aria-label="SimpleThink Home"
              >
                <Image
                  src="/logo.png"
                  alt="SimpleThink"
                  width={160}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-[1.2] tracking-tight">
                Keep It Simple.
                <br />
                Make It{" "}
                <span className="brand-gradient-text">
                  Luxury.
                </span>
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-[360px]">
                A premier software development company engineering custom software,
                scalable web applications, mobile apps, SaaS platforms, and enterprise
                solutions for ambitious businesses and founders.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* X (Twitter) */}
                <a
                  href={SITE.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 hover:text-foreground hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={SITE.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#E8F4FD] text-[#0A66C2] flex items-center justify-center hover:bg-[#D5EBFB] hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={SITE.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#FDF2F8] text-[#E1306C] flex items-center justify-center hover:bg-[#FCE7F3] hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={SITE.youtube || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#FF0033] text-white flex items-center justify-center hover:bg-[#E6002E] hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.547 12 3.547 12 3.547s-7.505 0-9.377.503a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.503 9.377.503 9.377.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href={SITE.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 hover:text-foreground hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation / Explore (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
              EXPLORE
            </h4>
            <ul className="space-y-3.5">
              {NAV_ITEMS.map((item) => {
                const iconName = FOOTER_NAV_ICONS[item.route] || "sparkles";
                return (
                  <li key={item.route}>
                    <Link
                      href={item.route}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-3"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <AnimatedIcon
                          name={iconName}
                          size={13}
                          className="text-primary"
                        />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Capabilities (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
              CAPABILITIES
            </h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              {CAPABILITY_ITEMS.map((cap) => (
                <li key={cap.label} className="group flex items-center gap-3 cursor-default">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <AnimatedIcon
                      name={cap.icon}
                      size={13}
                      className="text-primary"
                    />
                  </span>
                  <span className="font-medium group-hover:text-foreground transition-colors whitespace-nowrap">
                    {cap.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect & CTA Card (3 cols) */}
          <div className="lg:col-span-3 flex flex-col relative">
            {/* Decorative accent */}
            <div className="absolute -top-3.5 -right-2 text-primary pointer-events-none select-none z-20" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="8" y1="12" x2="12" y2="4" />
                <line x1="10" y1="14" x2="18" y2="8" />
                <line x1="10" y1="16" x2="20" y2="16" />
              </svg>
            </div>

            <div className="bg-card rounded-[28px] p-7 shadow-sm border border-border relative z-10 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-5">
                {/* Send icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5 mt-0.5" aria-hidden="true">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>

                {/* Live pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold text-foreground shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Let&apos;s Build
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                  Have a project in mind?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Let&apos;s discuss your idea and turn it into a premium digital product.
                </p>

                <button
                  onClick={handleStart}
                  className="w-full h-12 rounded-full text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(146,47,85,0.25)] hover:shadow-[0_8px_25px_rgba(146,47,85,0.35)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Start a project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SimpleThink Digital Studio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 text-primary text-[11px] font-semibold tracking-wide ml-2 border border-primary/15">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Keep It Simple. Make It Luxury.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
