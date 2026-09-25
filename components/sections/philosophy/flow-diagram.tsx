"use client";

import { FLOW_NODES } from "@/lib/data/philosophy";
import { Activity, Box, Lightbulb, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export function FlowDiagram({ inView }: { inView: boolean }) {
  return (
    <>
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


    </>
  );
}
