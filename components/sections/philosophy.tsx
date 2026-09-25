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

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const { openLead } = useLead();

  return (
    <section
      id="why-SimpleThink"
      className="relative w-full py-16 sm:py-24 bg-[#FCFAFA] overflow-hidden font-satoshi"
    >
      {/* ── Atmospheric Ambient Glowing Blobs & Dots ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-32 w-full max-w-lg aspect-square bg-rose-100/40 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-32 w-full max-w-lg aspect-square bg-purple-100/40 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Main 3-Column Layout ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-cols-[250px_minmax(0,1fr)_250px] gap-6 xl:gap-8 items-center">

          {/* ────────────────────────────────────────────────────────────
              1. LEFT COLUMN: PROCESS / 04
          ──────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 relative z-20">
            {/* Header */}
            <div className="flex items-center gap-2 px-1 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#D23D78] uppercase">
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
                    className={`relative rounded-[22px] p-2.5 sm:p-3 pr-4 flex items-center gap-3 bg-white border transition-all duration-300 ${
                      step.active
                        ? "border-rose-100/80 shadow-[0_8px_30px_rgba(210,61,120,0.06)]"
                        : "border-neutral-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md"
                    }`}
                  >
                    {/* Number pill */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 font-mono ${
                        step.active
                          ? "bg-[#831843] text-white shadow-sm"
                          : "bg-neutral-50/80 text-neutral-800"
                      }`}
                    >
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex items-center justify-center shrink-0 ${
                        step.active ? "text-[#D23D78]" : "text-[#D23D78]/70"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-neutral-900 leading-tight">
                        {step.title}
                      </span>
                      <span className="text-[11px] text-neutral-500 leading-snug mt-0.5">
                        {step.desc} {step.subDesc}
                      </span>
                    </div>

                    {/* Connector dot on Card 01 right edge with continuous dashed bezier curve */}
                    {step.active && (
                      <div className="hidden xl:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
                        {/* Dot */}
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#831843] border-2 border-white shadow-sm" />

                        {/* Single unbroken swooping curved dashed line from Card 01 dot to Direct access card */}
                        <svg
                          className="absolute left-1 top-1 overflow-visible pointer-events-none"
                          style={{ width: "120px", height: "80px" }}
                          fill="none"
                        >
                          <defs>
                            <linearGradient id="card1ConnectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#831843" />
                              <stop offset="50%" stopColor="#D23D78" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#D23D78" stopOpacity="0.2" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 0 C 40 0, 30 40, 100 40"
                            stroke="url(#card1ConnectorGrad)"
                            strokeWidth="1.5"
                            strokeDasharray="3 4"
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
              className="relative mt-2 pl-4 select-none pointer-events-none"
            >
              <span className="font-handwriting text-sm sm:text-base text-[#831843] block -rotate-3 leading-tight drop-shadow-sm">
                Simple Process
                <br />
                Real Results
              </span>
              <svg
                className="w-8 h-8 text-[#831843] ml-20 -mt-1 rotate-12"
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
              className="hidden sm:block absolute -top-12 right-2 lg:-top-16 lg:right-10 pointer-events-none select-none z-40"
            >
              <span className="font-handwriting text-sm sm:text-base text-[#831843] block rotate-3 leading-tight text-center drop-shadow-sm">
                From
                <br />
                Idea to Impact
              </span>
              <svg
                className="w-8 h-8 text-[#831843] -ml-2 -mt-0.5 rotate-[120deg]"
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
              className="rounded-3xl bg-white border border-neutral-100 shadow-[0_12px_44px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-4 relative z-20"
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-1 px-1">
                <div className="flex items-end gap-0.5 text-[#831843]">
                  <span className="w-1.5 h-2.5 bg-[#831843] rounded-[1px]" />
                  <span className="w-1.5 h-4 bg-[#831843] rounded-[1px]" />
                  <span className="w-1.5 h-3 bg-[#831843] rounded-[1px]" />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#831843] uppercase">
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
                      className="bg-white rounded-2xl border border-neutral-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-2.5 flex items-center justify-between gap-2 hover:shadow-md hover:border-rose-100 transition-all duration-300 group cursor-default"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-full bg-rose-50 border border-rose-100/50 flex items-center justify-center text-[#D23D78] shrink-0">
                          <StatIcon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[20px] font-black text-neutral-900 tracking-tight leading-none font-satoshi flex items-baseline gap-[1px]">
                            {stat.prefix && <span className="text-lg">{stat.prefix}</span>}
                            <AnimatedCounter
                              value={stat.value}
                              duration={1.5}
                              delay={i * 0.1}
                            />
                            {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium mt-1 leading-tight truncate">
                            {stat.label}
                          </span>
                        </div>
                      </div>

                      {/* Small Circular Arrow Button */}
                      <div className="w-7 h-7 rounded-full bg-white border border-neutral-100/80 shadow-xs flex items-center justify-center text-neutral-400 group-hover:text-neutral-600 group-hover:border-neutral-200 transition-colors shrink-0 ml-1">
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
