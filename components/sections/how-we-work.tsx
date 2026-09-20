"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Search, Palette, Code2, Rocket } from "lucide-react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

const STEPS = [
  {
    id: "01",
    icon: Search,
    title: "Discovery",
    subtitle: "Understand the problem deeply",
    description:
      "We start with a structured discovery session — mapping your goals, users, technical constraints, and business model. No templates. Just real conversation to define scope, success metrics, and an honest timeline.",
    duration: "Week 1",
    deliverable: "Project Blueprint",
  },
  {
    id: "02",
    icon: Palette,
    title: "Design",
    subtitle: "Clarity before a single line of code",
    description:
      "We wireframe and prototype the critical flows first. Your brand, your users, your context — translated into a design system that engineers can build with precision and speed.",
    duration: "Week 2–3",
    deliverable: "Design System + Prototype",
  },
  {
    id: "03",
    icon: Code2,
    title: "Engineer",
    subtitle: "Build with intention, not velocity",
    description:
      "Feature-by-feature development with weekly milestone reviews. Code is clean, documented, and tested. You see real working software — not slide decks — at every checkpoint.",
    duration: "Week 3–N",
    deliverable: "Staging Build + Review",
  },
  {
    id: "04",
    icon: Rocket,
    title: "Launch",
    subtitle: "Ship with confidence",
    description:
      "Production deployment, CI/CD pipelines, monitoring, and a 30-day post-launch support window. We don't disappear at go-live. We stay until it works exactly as intended.",
    duration: "Final Sprint",
    deliverable: "Live Product + Handover",
  },
];

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-we-work"
      className="relative py-20 sm:py-28 bg-background border-t border-border overflow-hidden"
    >
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-0 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Process · Methodology
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            >
              How We <span className="text-primary">Work.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              A focused 4-phase process — structured enough to give you clarity, flexible enough to adapt to your reality. No sprints that vanish, no hand-offs to juniors.
            </motion.p>
          </div>

          <div className="shrink-0">
            <SectionDockSlot sectionId="how-we-work" label="Process" />
          </div>
        </div>

        {/* Steps — Desktop: horizontal timeline, Mobile: vertical stack */}
        <div className="relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-border/60 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-primary/60 via-primary/40 to-primary/20 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                    delay: index * 0.12,
                  }}
                  className="group flex flex-col"
                >
                  {/* Step icon + number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-[52px] h-[52px] rounded-2xl border border-border/70 bg-card flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <span className="text-3xl font-black font-mono text-muted-foreground/20 group-hover:text-primary/30 transition-colors select-none">
                      {step.id}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 p-5 rounded-2xl border border-border/50 bg-card/60 group-hover:border-primary/30 group-hover:bg-primary/[0.02] transition-all duration-300">
                    <h3 className="text-xl font-black tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-primary uppercase tracking-[0.12em] mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                          Timeline
                        </div>
                        <div className="text-xs font-semibold text-foreground/70">
                          {step.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                          Deliverable
                        </div>
                        <div className="text-xs font-semibold text-primary">
                          {step.deliverable}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 pt-8 border-t border-border/60 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            Timelines vary by scope — we scope every project individually, not from a rate card.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
