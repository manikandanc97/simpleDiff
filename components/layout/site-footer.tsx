"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { SITE } from "@/lib/site";
import { NAV_ITEMS } from "@/lib/nav";
import { FooterRevealWordmark } from "./footer-reveal-wordmark";

import {
  AnimatedIcon,
  AnimatedArrowRight,
  AnimatedMail,
  AnimatedMessageSquare,
  type AnimatedIconName,
} from "@/components/ui/animated-icon";

const FOOTER_NAV_ICONS: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/lab": "lightbulb",
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
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        {/* Top Grid: Studio Brand, Navigation, Services, Direct CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-border/80">
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center text-2xl font-bold tracking-tight text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
                aria-label="SimpleThink Home"
              >
                <span>
                  Simple<span className="text-primary font-bold inline-block animate-pulse">Think</span>
                </span>
              </Link>
              <p className="text-lg font-medium text-foreground/90 max-w-sm leading-snug">
                Keep It Simple.
                <br />
                Think It Different.
              </p>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                A premier software development company engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions for ambitious businesses and founders.
              </p>
            </div>

            {/* Live availability indicator */}
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium pt-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{SITE.availability}</span>
              {SITE.location && (
                <>
                  <span className="text-border">&bull;</span>
                  <span>{SITE.location}</span>
                </>
              )}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => {
                const iconName = FOOTER_NAV_ICONS[item.route] || "sparkles";
                return (
                  <li key={item.route}>
                    <Link
                      href={item.route}
                      className="group text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 active:scale-95 transition-all inline-flex items-center gap-2"
                    >
                      <AnimatedIcon
                        name={iconName}
                        size={14}
                        className="text-primary/70 group-hover:text-primary transition-colors"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {CAPABILITY_ITEMS.map((cap) => (
                <li key={cap.label} className="group flex items-center gap-2">
                  <AnimatedIcon
                    name={cap.icon}
                    size={14}
                    className="text-primary/70 group-hover:text-primary transition-colors"
                  />
                  <span className="group-hover:text-foreground transition-colors">{cap.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Connect & CTA */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
                Direct Contact
              </h4>
              <ul className="space-y-2.5 text-sm">
                {SITE.email && (
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="group text-muted-foreground hover:text-primary active:scale-95 transition-all flex items-center gap-2"
                    >
                      <AnimatedMail size={14} className="text-primary" />
                      <span>{SITE.email}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" />
                    </a>
                  </li>
                )}
                {SITE.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-muted-foreground hover:text-primary active:scale-95 transition-all flex items-center gap-2"
                    >
                      <AnimatedMessageSquare size={14} className="text-primary" />
                      <span>WhatsApp Direct</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <Button
                onClick={handleStart}
                className="group/button w-full rounded-full text-xs h-10 font-semibold cursor-pointer shadow-sm hover:shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Start a project</span>
                <AnimatedArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SimpleThink Software Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Keep It Simple. Think It Different.</span>
          </div>
        </div>
      </div>

      {/* Standalone Edge-to-Edge Wordmark that reveals on scroll to the very bottom (Adobe style) */}
      <FooterRevealWordmark />
    </footer>
  );
}
