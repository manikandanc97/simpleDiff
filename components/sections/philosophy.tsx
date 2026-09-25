"use client";

import { useLead } from "@/components/leads/lead-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PROCESS_STEPS, REAL_OUTCOMES } from "@/lib/data/philosophy";
import {
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FlowDiagram } from "./philosophy/flow-diagram";
import { SectionHeader } from "@/components/ui/section-header";

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const { openLead } = useLead();

  return (
    <section
      id="why-SimpleThink"
      className="relative w-full pt-24 sm:pt-28 pb-16 sm:pb-24 bg-transparent"
    >
      {/* ── Atmospheric Ambient Glowing Blobs & Dots ── */}


      {/* Decorative Dot Matrix on left & right edges matching screenshot */}
      <div className="pointer-events-none hidden xl:block absolute left-6 top-1/3 opacity-30 select-none">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-[#D23D78]" />
          ))}
        </div>
      </div>
      <div className="pointer-events-none hidden xl:block absolute right-8 bottom-24 opacity-30 select-none">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-[#7C3AED]" />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Top Header ── */}
        <SectionHeader
          eyebrow="WHY SIMPLEPRIME"
          centered
          title="Built simple."
          highlightedText="Delivered sharp."
          description="A focused team, a clear process, and production-ready work without unnecessary layers."
        />

        {/* ── Main 3-Column Layout ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-cols-[260px_minmax(0,1fr)_260px] gap-6 xl:gap-7 items-start">

          {/* ────────────────────────────────────────────────────────────
              1. LEFT COLUMN: PROCESS / 04
          ──────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3.5 relative z-20">
            {/* Header */}
            <div className="flex items-center gap-1.5 px-1 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
              <span className="text-[10px] font-bold tracking-widest text-[#D23D78] uppercase">
                PROCESS / 04
              </span>
            </div>

            {/* 4 Cards */}
            <div className="flex flex-col gap-3">
              {PROCESS_STEPS.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                    className="relative rounded-r-2xl rounded-l-[32px] p-2 sm:p-2.5 pr-4 flex items-center gap-3 bg-white/80 backdrop-blur-md border border-neutral-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-rose-200/80 hover:shadow-md transition-all duration-300"
                  >
                    {/* Number pill */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        step.active
                          ? "bg-[#831843] text-white shadow-xs"
                          : "bg-rose-50/80 text-neutral-800"
                      }`}
                    >
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                        step.active
                          ? "bg-rose-50 text-[#831843] border-rose-100/80"
                          : "bg-rose-50/50 text-[#D23D78] border-transparent"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-tight">
                        {step.title}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug mt-0.5">
                        {step.desc} {step.subDesc}
                      </span>
                    </div>

                    {/* Connector dot on Card 01 right edge with continuous dashed bezier curve */}
                    {step.active && (
                      <div className="hidden xl:block absolute -right-2 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
                        {/* Dot */}
                        <span className="block w-3 h-3 rounded-full bg-[#831843] border-2 border-white shadow-xs" />

                        {/* Single unbroken swooping curved dashed line from Card 01 dot to Direct access card */}
                        <svg
                          className="absolute left-1.5 top-1.5 overflow-visible pointer-events-none"
                          style={{ width: "100px", height: "60px" }}
                          fill="none"
                        >
                          <defs>
                            <linearGradient id="card1ConnectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#831843" />
                              <stop offset="50%" stopColor="#D23D78" />
                              <stop offset="100%" stopColor="#D23D78" stopOpacity="0.4" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 0 C 35 0, 25 35, 85 35"
                            stroke="url(#card1ConnectorGrad)"
                            strokeWidth="1.5"
                            strokeDasharray="4 5"
                          />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Handwritten annotation under Card 04 with curved arrow */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="relative mt-2 pl-3 select-none pointer-events-none"
            >
              <span className="font-handwriting font-bold text-xs sm:text-sm text-[#831843] block -rotate-3 leading-tight">
                Simple Process
                <br />
                Real Results
              </span>
              <svg
                className="w-8 h-8 text-[#831843] ml-16 -mt-0.5 rotate-12"
                viewBox="0 0 28 28"
                fill="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
                  d="M 4 22 C 10 16, 16 10, 22 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.6, ease: "easeOut" }}
                  d="M 14 6 L 22 6 L 22 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          <FlowDiagram inView={inView} />

          {/* ────────────────────────────────────────────────────────────
              3. RIGHT COLUMN: REAL OUTCOMES
          ──────────────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Top-Right Handwritten Annotation with curved arrow pointing to diagram */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="hidden sm:block absolute -top-5 right-2 lg:-top-5 lg:right-8 pointer-events-none select-none z-40"
            >
              <span className="font-handwriting font-bold text-xs sm:text-sm text-[#831843] block rotate-3 leading-tight text-center">
                From
                <br />
                Idea to Impact
              </span>
              <svg
                className="w-8 h-8 text-[#831843] -ml-2 -mt-0.5 -rotate-6"
                viewBox="0 0 28 28"
                fill="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
                  d="M 6 4 C 10 12, 16 18, 22 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.7, ease: "easeOut" }}
                  d="M 14 22 L 22 22 L 20 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Outcomes Card Container */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-[28px] lg:mt-14 sm:rounded-[36px] bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-[0_12px_44px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col gap-3.5"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-1 px-1">
                <div className="flex items-end gap-0.5 text-[#831843]">
                  <span className="w-1 h-2 bg-[#831843] rounded-xs" />
                  <span className="w-1 h-3.5 bg-[#831843] rounded-xs" />
                  <span className="w-1 h-2.5 bg-[#831843] rounded-xs" />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#831843] uppercase">
                  REAL OUTCOMES
                </span>
              </div>

              {/* 4 Outcome Stat Cards */}
              <div className="flex flex-col gap-3">
                {REAL_OUTCOMES.map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.28 + i * 0.08 }}
                      className="bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-2.5 sm:p-3 flex items-center justify-between gap-1 hover:shadow-md hover:border-rose-200/70 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-rose-50/70 border border-rose-100/60 flex items-center justify-center text-[#D23D78] shrink-0">
                          <StatIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-lg sm:text-[22px] font-black text-neutral-900 tracking-tighter leading-none font-mono">
                            <AnimatedCounter
                              value={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              duration={1.5}
                              delay={i * 0.1}
                            />
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium mt-1 leading-tight truncate">
                            {stat.label}
                          </span>
                        </div>
                      </div>

                      {/* Small Circular Arrow Button */}
                      <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 group-hover:border-neutral-400 transition-colors shrink-0 ml-1">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Strip: Tagline + Pill CTA Button (Matching Screenshot) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative"
        >
          {/* Subtle horizontal separator line */}
          <div className="hidden sm:block absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-neutral-200/80 to-transparent pointer-events-none" />

          {/* Masked content container */}
          <div className="relative z-10 px-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-xs sm:text-sm text-neutral-600 font-medium text-center">
              No middle layers. No handoff friction. Just focused building.
            </span>

            <button
              type="button"
              onClick={() => openLead({ source: "cta" })}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#831843] bg-white text-xs sm:text-sm font-bold text-[#831843] hover:bg-rose-50/80 hover:shadow-xs transition-all duration-300 group cursor-pointer"
            >
              <span>See how we work</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
