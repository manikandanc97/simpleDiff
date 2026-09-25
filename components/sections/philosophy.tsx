"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  Users,
  Target,
  Layers,
  Zap,
  Briefcase,
  Lightbulb,
  ArrowUpRight,
  ArrowRight,
  Activity,
  TrendingUp,
  Box,
  Database,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useLead } from "@/components/leads/lead-provider";

// ─── Left Column: Process Steps ─────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Clarity",
    desc: "Clear goals.",
    subDesc: "No confusion.",
    active: true,
  },
  {
    num: "02",
    icon: Zap,
    title: "Speed",
    desc: "Move fast.",
    subDesc: "Ship early.",
    active: false,
  },
  {
    num: "03",
    icon: Layers,
    title: "Craft",
    desc: "Pixel perfect.",
    subDesc: "Production ready.",
    active: false,
  },
  {
    num: "04",
    icon: Users,
    title: "Ownership",
    desc: "Direct access.",
    subDesc: "We stand with you.",
    active: false,
  },
];

// ─── Center Panel: Flow Nodes ───────────────────────────────────────────────
const FLOW_NODES = {
  topLeft: {
    id: "direct-access",
    badge: "IDEA",
    badgeColor: "rose",
    title: "Direct access",
    desc: "Work directly with the team building your product.",
    icon: Lightbulb,
  },
  topRight: {
    id: "weekly-progress",
    badge: "PLAN",
    badgeColor: "purple",
    title: "Weekly progress",
    desc: "Transparent updates and real milestones every week.",
    icon: TrendingUp,
  },
  bottomLeft: {
    id: "production-quality",
    badge: "BUILD",
    badgeColor: "rose",
    title: "Production quality",
    desc: "Modern tech, clean designs, and scalable architecture.",
    icon: Box,
  },
  bottomRight: {
    id: "clear-ownership",
    badge: "DELIVER",
    badgeColor: "purple",
    title: "Clear ownership",
    desc: "No handoff friction. We take responsibility end to end.",
    icon: Users,
  },
};

// ─── Right Panel: Outcomes ──────────────────────────────────────────────────
const REAL_OUTCOMES = [
  {
    value: 5,
    suffix: "+",
    label: "Projects shipped",
    icon: Briefcase,
  },
  {
    value: 3,
    suffix: "×",
    label: "Faster iteration",
    icon: Zap,
  },
  {
    value: 100,
    suffix: "%",
    label: "Milestone visibility",
    icon: Target,
  },
  {
    value: 500,
    prefix: "<",
    suffix: "ms",
    label: "Performance target",
    icon: Database,
  },
];

export function WhySimpleThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const { openLead } = useLead();

  return (
    <section
      id="why-SimpleThink"
      className="relative w-full pt-24 sm:pt-28 pb-16 sm:pb-24 bg-transparent overflow-hidden"
    >
      {/* ── Atmospheric Ambient Glowing Blobs & Dots ── */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-rose-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-20 w-[460px] h-[460px] rounded-full bg-purple-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 w-[380px] h-[380px] rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-12 w-[300px] h-[300px] rounded-full bg-rose-100/40 blur-2xl" />

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

      <div ref={containerRef} className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Top Header (Matching Exact Reference Screenshot) ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50/90 border border-rose-200/70 shadow-xs mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#831843]" />
            <span className="text-[11px] font-bold tracking-widest text-[#831843] uppercase">
              WHY SIMPLEPRIME
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-neutral-900 tracking-tight leading-[1.15]"
          >
            Built simple.{" "}
            <span className="bg-gradient-to-r from-[#831843] via-[#D23D78] to-[#7C3AED] bg-clip-text text-transparent">
              Delivered sharp.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-3 text-sm sm:text-base text-neutral-500 max-w-xl mx-auto font-normal leading-relaxed"
          >
            A focused team, a clear process, and production-ready work without unnecessary layers.
          </motion.p>
        </div>

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

          {/* ────────────────────────────────────────────────────────────
              2. CENTER PANEL: SIGNAL / 01 & INTERACTIVE FLOW DIAGRAM
          ──────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-[28px] sm:rounded-[36px] bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-[0_12px_44px_rgba(0,0,0,0.03)] p-5 sm:p-7 flex flex-col justify-between min-h-[490px] sm:min-h-[510px] overflow-hidden"
          >
            {/* Top Bar inside Center Card */}
            <div className="flex items-center justify-between w-full mb-4 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/90 border border-rose-200/60 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
                <span className="text-[10px] font-bold tracking-widest text-neutral-700 uppercase">
                  SIGNAL / 01
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <span className="text-[9px] font-mono tracking-wider uppercase">
                  SIMPLE SYSTEM
                </span>
                <Activity className="w-3.5 h-3.5 text-[#D23D78]" />
              </div>
            </div>

            {/* Main Interactive Diagram Canvas Area */}
            <div className="relative w-full flex-1 flex flex-col justify-between my-2 py-2">

              {/* ── Background SVG connector lines & concentric rings ── */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                viewBox="0 0 600 360"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Linear gradient for lines */}
                  <linearGradient id="flowLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D23D78" />
                    <stop offset="50%" stopColor="#BE123C" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>

                  {/* Radial glow for center */}
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F472B6" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#A855F7" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient glow behind center medallion */}
                <circle cx="300" cy="175" r="135" fill="url(#centerGlow)" />

                {/* Outer concentric dashed ring */}
                <circle
                  cx="300"
                  cy="175"
                  r="110"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />

                {/* Inner concentric ring with subtle rose tone */}
                <circle
                  cx="300"
                  cy="175"
                  r="80"
                  stroke="#FBCFE8"
                  strokeWidth="1.25"
                  opacity="0.75"
                />

                {/* Connectors from the 4 corner cards to center ring nodes */}
                {/* 1. Top-Left Card (Direct access) -> Top-Left Node */}
                <path
                  d="M 185 85 C 215 85, 230 110, 244 124"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 2. Top-Right Card (Weekly progress) -> Top-Right Node */}
                <path
                  d="M 415 85 C 385 85, 370 110, 356 124"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 3. Bottom-Left Card (Production quality) -> Bottom-Left Node */}
                <path
                  d="M 185 265 C 215 265, 230 240, 244 226"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 4. Bottom-Right Card (Clear ownership) -> Bottom-Right Node */}
                <path
                  d="M 415 265 C 385 265, 370 240, 356 226"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Glowing Nodes on the Ring */}
                {/* Node 1: Top-Left */}
                <circle cx="244" cy="124" r="3.5" fill="#FFFFFF" stroke="#D23D78" strokeWidth="2" />
                {/* Node 2: Top-Right */}
                <circle cx="356" cy="124" r="3.5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
                {/* Node 3: Bottom-Left */}
                <circle cx="244" cy="226" r="3.5" fill="#FFFFFF" stroke="#D23D78" strokeWidth="2" />
                {/* Node 4: Bottom-Right */}
                <circle cx="356" cy="226" r="3.5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
              </svg>

              {/* ── Top Row of Feature Cards ── */}
              <div className="relative z-10 flex items-start justify-between w-full px-1 sm:px-3">
                {/* Top-Left: Direct access */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-3.5 sm:p-4 hover:shadow-md hover:border-rose-100 transition-all duration-300 w-[190px] sm:w-[220px]"
                >
                  <div className="absolute -top-2.5 right-4 z-20">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-rose-50 text-[#D23D78] border-rose-200/60">
                      ⊞ {FLOW_NODES.topLeft.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 mt-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border bg-rose-50/80 border-rose-100 text-[#D23D78]">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-[13px] text-neutral-900 leading-tight">
                        {FLOW_NODES.topLeft.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug mt-1">
                        {FLOW_NODES.topLeft.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Top-Right: Weekly progress */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-3.5 sm:p-4 hover:shadow-md hover:border-purple-100 transition-all duration-300 w-[190px] sm:w-[220px]"
                >
                  <div className="absolute -top-2.5 right-4 z-20">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-purple-50 text-[#7C3AED] border-purple-200/60">
                      ⊞ {FLOW_NODES.topRight.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 mt-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border bg-purple-50/80 border-purple-100 text-[#7C3AED]">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-[13px] text-neutral-900 leading-tight">
                        {FLOW_NODES.topRight.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug mt-1">
                        {FLOW_NODES.topRight.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── CENTER MEDALLION: EXACT BRAND LOGO ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.38, type: "spring", stiffness: 220 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-[0_12px_36px_rgba(210,61,120,0.18),0_4px_16px_rgba(0,0,0,0.06)] border border-rose-100/90 flex flex-col items-center justify-center p-2">
                  <Image
                    src="/favicon.png"
                    alt="SimplePrime Logo"
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-xs select-none"
                    priority
                  />
                  <span className="text-[9px] sm:text-[10px] font-black tracking-[0.16em] text-neutral-900 uppercase mt-1 select-none">
                    SIMPLE<span className="text-[#D23D78]">PRIME</span>
                  </span>
                </div>
              </motion.div>

              {/* ── Bottom Row of Feature Cards ── */}
              <div className="relative z-10 flex items-end justify-between w-full px-1 sm:px-3 mt-14 sm:mt-16">
                {/* Bottom-Left: Production quality */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-3.5 sm:p-4 hover:shadow-md hover:border-rose-100 transition-all duration-300 w-[190px] sm:w-[220px]"
                >
                  <div className="absolute -top-2.5 right-4 z-20">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-rose-50 text-[#D23D78] border-rose-200/60">
                      ⊞ {FLOW_NODES.bottomLeft.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 mt-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border bg-rose-50/80 border-rose-100 text-[#D23D78]">
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-[13px] text-neutral-900 leading-tight">
                        {FLOW_NODES.bottomLeft.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug mt-1">
                        {FLOW_NODES.bottomLeft.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom-Right: Clear ownership */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-3.5 sm:p-4 hover:shadow-md hover:border-purple-100 transition-all duration-300 w-[190px] sm:w-[220px]"
                >
                  <div className="absolute -top-2.5 right-4 z-20">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-purple-50 text-[#7C3AED] border-purple-200/60">
                      ⊞ {FLOW_NODES.bottomRight.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 mt-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border bg-purple-50/80 border-purple-100 text-[#7C3AED]">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-[13px] text-neutral-900 leading-tight">
                        {FLOW_NODES.bottomRight.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug mt-1">
                        {FLOW_NODES.bottomRight.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Bar: YOUR IDEA ↔ REAL IMPACT */}
            <div className="flex items-center justify-between w-full max-w-[500px] mx-auto px-2 mt-4 z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  YOUR IDEA
                </span>
              </div>
              <div className="flex-1 mx-3 border-b border-dotted border-rose-200/80" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  REAL IMPACT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              </div>
            </div>
          </motion.div>

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
