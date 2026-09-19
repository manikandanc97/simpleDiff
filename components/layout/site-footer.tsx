"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { SITE } from "@/lib/site";
import { NAV_ITEMS } from "@/lib/nav";

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
                className="inline-flex items-center gap-1 text-2xl font-bold tracking-tight text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
                aria-label="SimpleDiff Home"
              >
                <span>Simple</span>
                <span className="text-primary font-bold">Diff</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-0.5" />
              </Link>
              <p className="text-lg font-medium text-foreground/90 max-w-sm leading-snug">
                Keep It Simple.
                <br />
                Make It Different.
              </p>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                A digital product studio designing and building modern websites, web applications, mobile apps, SaaS products, and custom software for ambitious businesses and founders.
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
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Websites & Landing Pages</li>
              <li>Web Applications</li>
              <li>Mobile Apps (iOS & Android)</li>
              <li>SaaS Platforms</li>
              <li>Branding & Identity</li>
              <li>AI Automation & Agents</li>
            </ul>
          </div>

          {/* Col 5: Connect & CTA */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Direct Contact
              </h4>
              <ul className="space-y-2.5 text-sm">
                {SITE.email && (
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span>{SITE.email}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </li>
                )}
                {SITE.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span>WhatsApp Direct</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <Button
                onClick={handleStart}
                className="w-full rounded-xl text-xs h-10 font-semibold cursor-pointer shadow-sm hover:shadow-primary/25 transition-all"
              >
                Start a project &rarr;
              </Button>
            </div>
          </div>
        </div>

        {/* Signature Wordmark */}
        <div className="pt-10 pb-4 select-none overflow-hidden">
          <div className="flex items-baseline justify-between tracking-tight font-extrabold leading-none text-[9vw] sm:text-[8vw] lg:text-[7vw]">
            <span className="text-muted-foreground/20 hover:text-muted-foreground/30 transition-colors">
              Simple
            </span>
            <span className="text-primary hover:opacity-90 transition-opacity">
              Diff
            </span>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SimpleDiff Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Keep It Simple. Make It Different.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
