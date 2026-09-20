"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

const PRINCIPLES = [
  {
    id: "01",
    title: "Not an agency. Not a freelancer.",
    description:
      "Agencies layer on project managers, account reps, and juniors — then charge you for all of it. Freelancers disappear when things get hard. We're a focused studio: senior engineers and designers who own your project end-to-end, every sprint.",
  },
  {
    id: "02",
    title: "Scope that earns trust, not hours.",
    description:
      "We don't bill by the hour. We scope per outcome — so our incentive is to build efficiently, not inflate timelines. Clear milestones, predictable costs, zero retrospective invoice surprises.",
  },
  {
    id: "03",
    title: "One studio. Both disciplines.",
    description:
      "Design and engineering work in the same room from day one. No handoff documents, no translation loss, no 'the designer would have done it differently' moments. What ships is what was intended.",
  },
];

const STATS = [
  { value: "5+", label: "Client Projects Shipped" },
  { value: "3×", label: "Average Lead Increase" },
  { value: "100%", label: "On-Time Milestone Delivery" },
  { value: "<500ms", label: "Target Core Web Vitals" },
];

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="why-simplethink" className="py-20 sm:py-28 bg-background border-t border-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Editorial Manifesto Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Why SimpleThink
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl sm:text-2xl font-medium tracking-tight text-muted-foreground mb-3"
            >
              The studio built different.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]"
            >
              Three reasons clients{" "}
              <span className="text-primary transition-colors duration-500">choose us.</span>
            </motion.h2>
          </div>

          {/* Dedicated Section Theme Dock Slot for Why SimpleThink */}
          <div className="shrink-0">
            <SectionDockSlot sectionId="why-simplethink" label="Why SimpleThink" />
          </div>
        </div>

        {/* Studio Manifesto Principles Stack */}
        <div className="border-t border-border divide-y divide-border">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                delay: index * 0.1,
              }}
              className="group py-8 sm:py-12 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 hover:bg-primary/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-xl"
            >
              {/* Number */}
              <span className="text-xl sm:text-2xl font-mono font-bold text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 select-none">
                {principle.id}
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground md:w-[38%] transition-colors duration-300">
                {(() => {
                  const words = principle.title.split(" ");
                  const last = words.pop();
                  return (
                    <>
                      {words.join(" ")} <span className="text-primary">{last}</span>
                    </>
                  );
                })()}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed flex-1">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Clean Editorial Stats Strip */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col gap-2 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                  <span className="text-primary mr-1">+</span>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
