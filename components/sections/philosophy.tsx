"use client";

import { motion } from "motion/react";

const PRINCIPLES = [
  {
    id: "01",
    title: "Clarity over cleverness",
    description:
      "Code should be easy to read. Interfaces should be easy to use. We remove unnecessary complexity.",
  },
  {
    id: "02",
    title: "Purpose-driven scope",
    description:
      "Every feature must justify its existence. If it doesn't serve the core purpose, it gets cut.",
  },
  {
    id: "03",
    title: "The difference is in the details",
    description:
      "By cutting out the noise, we create room for thoughtful micro-interactions, robust speed, and real polish.",
  },
];

export function Philosophy() {
  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden relative">
      {/* subtle background mesh */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Editorial Heading */}
        <div className="max-w-4xl mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl font-medium tracking-tight text-muted-foreground mb-5"
          >
            Simple doesn&apos;t mean basic.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.0]"
          >
            It means{" "}
            <span className="text-gradient">nothing</span>
            <br />
            unnecessary.
          </motion.h2>
        </div>

        {/* Principles Stack */}
        <div className="flex flex-col border-t border-border">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              className="group border-b border-border py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 hover:bg-primary/5 transition-colors duration-500 px-2 rounded-sm"
            >
              <div className="text-lg font-mono font-bold opacity-40 group-hover:opacity-100 transition-all duration-300 text-primary min-w-[3rem]">
                {principle.id}
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground md:w-[36%] group-hover:text-primary-text transition-colors duration-300">
                {principle.title}
              </h3>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed flex-1">
                {principle.description}
              </p>
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border"
        >
          {[
            { value: "5+", label: "Client Projects" },
            { value: "3×", label: "Avg Lead Increase" },
            { value: "100%", label: "On-Time Delivery" },
            { value: "<500ms", label: "Target Load Time" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="flex flex-col"
            >
              <span className="text-4xl font-bold tracking-tight text-foreground mb-1 text-gradient">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
