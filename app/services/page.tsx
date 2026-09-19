"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODULES = [
  { id: "core", name: "Core Architecture", desc: "Next.js foundation, routing, basic UI system.", required: true },
  { id: "auth", name: "Authentication", desc: "User login, registration, session management.", required: false },
  { id: "db", name: "Database & API", desc: "Data modeling, migrations, API endpoints.", required: false },
  { id: "cms", name: "Content Management", desc: "Headless CMS integration for marketing pages.", required: false },
  { id: "pay", name: "Payments", desc: "Stripe integration, subscriptions, one-off charges.", required: false },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["core"]));

  const toggleModule = (id: string, required: boolean) => {
    if (required) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Modules.</h1>
        <p className="text-muted-foreground text-lg">
          We don&apos;t do hourly billing. We build by modules. Toggle features to define your scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {MODULES.map((mod) => {
            const isSelected = selected.has(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => toggleModule(mod.id, mod.required)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  isSelected ? "bg-muted/30 border-primary" : "bg-background border-border hover:border-primary/50"
                }`}
                style={isSelected ? { borderColor: "var(--primary)" } : {}}
              >
                <div className={`mt-1 w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 ${
                  isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    {mod.name}
                    {mod.required && <span className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded-sm uppercase tracking-wider text-muted-foreground">Required</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-muted/10 border border-border p-6 rounded-xl shadow-sm">
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">Scope Summary</h3>
            <ul className="space-y-4 mb-8">
              {Array.from(selected).map(id => {
                const mod = MODULES.find(m => m.id === id);
                return (
                  <li key={id} className="flex justify-between items-center text-sm font-medium">
                    <span>{mod?.name}</span>
                    <span className="text-muted-foreground font-mono">+1</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center font-bold">
                <span>Total Modules</span>
                <span className="font-mono text-primary">{selected.size}</span>
              </div>
            </div>
            <Button className="w-full">
              Request Blueprint &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
