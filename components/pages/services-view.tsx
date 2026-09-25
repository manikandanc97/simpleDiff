"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Plus, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedArrowRight, AnimatedRotateCcw } from "@/components/ui/animated-icon";
import { useLead } from "@/components/leads/lead-provider";
import { PageBanner } from "@/components/ui/page-banner";
import { cn } from "@/lib/utils";
import {
  SERVICES_LIST,
  CATEGORY_ORDER,
  type ServiceItem,
} from "@/lib/data/services";

function BlueprintNode({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      className="relative flex-1 min-w-[140px] p-4 rounded-xl border border-primary/30 bg-background/80 backdrop-blur-md shadow-lg shadow-primary/5 flex flex-col items-center text-center gap-3 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative z-10">
        <Icon size={20} />
      </div>
      <div className="relative z-10">
        <h4 className="text-sm font-bold text-foreground leading-tight mb-1">{service.name}</h4>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Module Active
        </div>
      </div>
    </motion.div>
  );
}

function BlueprintCanvas({ selectedServices }: { selectedServices: ServiceItem[] }) {
  // Group selected services by category
  const grouped = selectedServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

  if (selectedServices.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-muted-foreground/40 flex items-center justify-center mb-6">
          <TerminalSquare className="w-8 h-8 text-muted-foreground/60" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Awaiting Configuration</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Select capabilities from the left to visualize your project architecture.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 py-8">
      {CATEGORY_ORDER.map((category) => {
        const servicesInCategory = grouped[category];
        if (!servicesInCategory || servicesInCategory.length === 0) return null;

        return (
          <div key={category} className="w-full max-w-md flex flex-col items-center">
            {/* Category Label */}
            <div className="text-[10px] font-mono text-primary/70 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary/20" />
              {category} Layer
              <span className="w-8 h-px bg-primary/20" />
            </div>
            
            {/* Nodes */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <AnimatePresence mode="popLayout">
                {servicesInCategory.map((service) => (
                  <BlueprintNode key={service.id} service={service} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServicesView() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
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
      source: "services-configurator",
      description: `Configured Architecture: ${selectedNames.join(", ")}.`,
    });
  };

  return (
    <div className="w-full bg-background min-h-screen pb-24 lg:pb-0">
      <PageBanner
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services Configurator" },
        ]}
        title="Project Configurator"
        description="Select the capabilities you need to construct your custom project scope. The architecture blueprint will update in real-time."
        techStack={["nextjs", "reactnative", "fastapi", "postgresql", "aws", "docker"]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Pane: Configurator List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Capabilities Library</h2>
              <p className="text-sm text-muted-foreground mt-1">Toggle modules to add them to your stack.</p>
            </div>

            {SERVICES_LIST.map((service) => {
              const isSelected = selected.has(service.id);
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => toggleService(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleService(service.id);
                    }
                  }}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "group relative p-5 sm:p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isSelected
                      ? "bg-card border-primary ring-1 ring-primary/40 shadow-lg shadow-primary/5"
                      : "bg-card/40 border-border/60 hover:border-primary/40 hover:bg-card hover:shadow-md"
                  )}
                >
                  {/* Left Accent Bar */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300",
                      isSelected
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-primary/30"
                    )}
                  />

                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-inner"
                            : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                            {service.number}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                            {service.name}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {service.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Button/Indicator */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground group-hover:border-primary/50"
                      )}
                    >
                      {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={16} />}
                    </div>
                  </div>

                  {/* Expandable Details if Selected */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-4 border-t border-border/40">
                           <div className="flex flex-wrap gap-2 mb-4">
                            {service.pillars.map((pillar) => (
                              <span
                                key={pillar}
                                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/20"
                              >
                                {pillar}
                              </span>
                            ))}
                          </div>
                          <ul className="space-y-2">
                            {service.includes.map((item, i) => (
                              <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Pane: Sticky Blueprint */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 h-auto lg:h-[calc(100vh-8rem)] rounded-3xl border border-primary/20 bg-card overflow-hidden flex flex-col shadow-2xl shadow-black/5 mt-8 lg:mt-0">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-border/50 flex items-center justify-between bg-muted/20 relative z-10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="font-bold text-lg text-foreground">Architecture Blueprint</h3>
              </div>
              <div className="flex items-center gap-3">
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <AnimatedRotateCcw size={12} />
                    <span>RESET</span>
                  </button>
                )}
                <span className="text-xs font-mono bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
                  {selected.size} MODULE{selected.size !== 1 && "S"}
                </span>
              </div>
            </div>
            
            {/* Dynamic Canvas Area */}
            <div className="flex-1 relative overflow-y-auto" style={{
              backgroundImage: 'radial-gradient(circle at center, var(--primary) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.8
            }}>
               {/* Radial gradient overlay to focus center */}
               <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
               
               <div className="relative z-10 w-full h-full min-h-[400px]">
                  <BlueprintCanvas selectedServices={selectedServices} />
               </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 sm:p-6 border-t border-border/50 bg-background/80 backdrop-blur-md relative z-10">
              <Button
                onClick={handleStartProject}
                disabled={selected.size === 0}
                className={cn(
                  "w-full group/button font-semibold text-sm h-14 rounded-xl flex items-center justify-center gap-2 transition-all",
                  selected.size > 0 
                    ? "shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5" 
                    : "opacity-50 cursor-not-allowed"
                )}
              >
                <span>Initialize Project Scope</span>
                {selected.size > 0 && <AnimatedArrowRight size={16} />}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

