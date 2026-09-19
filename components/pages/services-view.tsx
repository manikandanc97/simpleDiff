"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  name: string;
  outcome: string;
  includes: [string, string, string];
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: "websites",
    name: "Websites",
    outcome: "Fast, high-converting websites that represent your brand with clarity.",
    includes: [
      "Custom responsive design & development",
      "Content structure & conversion optimization",
      "SEO, performance & accessibility tuning",
    ],
  },
  {
    id: "web-apps",
    name: "Web applications",
    outcome: "Reliable, interactive web apps that streamline workflows and delight users.",
    includes: [
      "Modern React / Next.js architecture",
      "Secure authentication & database integration",
      "Real-time dashboards & workflow automations",
    ],
  },
  {
    id: "mobile-apps",
    name: "Mobile apps",
    outcome: "Smooth, native iOS and Android apps built for daily customer use.",
    includes: [
      "Cross-platform iOS & Android development",
      "Offline-ready flows & push notifications",
      "App Store & Google Play launch support",
    ],
  },
  {
    id: "saas",
    name: "SaaS products",
    outcome: "Complete digital products built to scale from launch to recurring revenue.",
    includes: [
      "Self-serve customer onboarding flows",
      "Stripe subscriptions & billing portal",
      "Team workspaces & role-based permissions",
    ],
  },
  {
    id: "branding",
    name: "Branding & identity",
    outcome: "Distinct visual identities that make your business instantly recognizable.",
    includes: [
      "Primary & secondary logo systems",
      "Color palettes & typography guidelines",
      "Digital asset kit & brand style guide",
    ],
  },
  {
    id: "ui-ux",
    name: "UI/UX design",
    outcome: "Intuitive product design that eliminates user friction and confusion.",
    includes: [
      "User journey mapping & wireframing",
      "Interactive Figma prototypes",
      "Complete design system with components",
    ],
  },
  {
    id: "automation",
    name: "AI automation",
    outcome: "Practical AI workflows and smart automations that save hundreds of hours.",
    includes: [
      "Custom AI assistants & conversational bots",
      "Automated document processing & triage",
      "Integrations with your everyday tools",
    ],
  },
  {
    id: "custom-software",
    name: "Custom software",
    outcome: "Tailored software solutions engineered for your specific business operations.",
    includes: [
      "Internal tools & management portals",
      "Custom API development & system bridges",
      "Database design & legacy modernizations",
    ],
  },
];

export function ServicesView() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["websites"]));
  const { openLead } = useLead();

  const toggleService = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const selectedServices = SERVICES_LIST.filter((s) => selected.has(s.id));
  const selectedNames = selectedServices.map((s) => s.name);

  const handleStartProject = () => {
    if (selected.size === 0) return;
    openLead({
      source: "services",
      description: `Interested in: ${selectedNames.join(", ")}.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Services.
        </h1>
        {/* TODO(owner): confirm pricing philosophy */}
        <p className="text-muted-foreground text-lg max-w-2xl">
          Tell us what you need. We&apos;ll come back with a clear scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Services Multi-Select List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">
            Select services to include
          </div>
          {SERVICES_LIST.map((service) => {
            const isChecked = selected.has(service.id);

            return (
              <div
                key={service.id}
                role="checkbox"
                tabIndex={0}
                aria-checked={isChecked}
                aria-label={service.name}
                onClick={() => toggleService(service.id)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleService(service.id);
                  }
                }}
                className={cn(
                  "w-full text-left p-6 rounded-xl border transition-all duration-200 flex items-start gap-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary select-none",
                  isChecked
                    ? "bg-muted/30 border-primary shadow-xs"
                    : "bg-background border-border hover:border-primary/50"
                )}
              >
                <div
                  className={cn(
                    "mt-1 w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 transition-colors",
                    isChecked
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground bg-background"
                  )}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.outcome}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/80 block mb-1.5">
                      Typically includes:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Scope Summary Card */}
        <div className="lg:col-span-1 sticky top-24">
          <div className="bg-muted/10 border border-border p-6 rounded-xl shadow-xs flex flex-col gap-6">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Pick what you need
              </h2>
              <div className="text-2xl font-bold text-foreground">
                {selected.size} selected
              </div>
            </div>

            <div className="border-t border-border pt-4">
              {selected.size === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No services selected yet. Click any service card on the left to add it to your scope.
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {selectedServices.map((service) => (
                    <li
                      key={service.id}
                      className="flex items-center justify-between text-sm font-medium text-foreground"
                    >
                      <span>{service.name}</span>
                      <span className="text-primary font-mono text-xs">Included</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <Button
                onClick={handleStartProject}
                disabled={selected.size === 0}
                className="w-full h-11 text-sm font-medium cursor-pointer"
              >
                Start a project with these &rarr;
              </Button>
              {selected.size === 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Select at least one service to get started.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
