"use client";

import { FLOW_NODES } from "@/lib/data/philosophy";
import { Activity, Box, LayoutGrid, Lightbulb, TrendingUp, Users } from "lucide-react";
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
            className="relative rounded-[24px] bg-white border border-neutral-100 shadow-[0_12px_44px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col justify-between min-h-[460px] overflow-visible z-10"
          >
            {/* Top Bar inside Center Card */}
            <div className="flex items-center justify-between w-full mb-6 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100/60 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#D23D78] uppercase">
                  SIGNAL / 01
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-[11px] font-mono font-semibold tracking-widest uppercase">
                  SIMPLE SYSTEM
                </span>
                <Activity className="w-4 h-4 text-[#D23D78]" />
              </div>
            </div>

            {/* Main Interactive Diagram Canvas Area */}
            <div className="relative w-full flex-1 flex flex-col justify-between my-2 py-4">

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
                    <stop offset="0%" stopColor="#F472B6" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#A855F7" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient glow behind center medallion */}
                <circle cx="300" cy="180" r="160" fill="url(#centerGlow)" />

                {/* Outer concentric dashed ring */}
                <circle
                  cx="300"
                  cy="180"
                  r="125"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />

                {/* Inner concentric ring with subtle rose tone */}
                <circle
                  cx="300"
                  cy="180"
                  r="95"
                  stroke="#FBCFE8"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Connectors from the 4 corner cards to center ring nodes */}
                {/* 1. Top-Left Card (Direct access) -> Top-Left Node */}
                <path
                  d="M 180 85 C 215 85, 230 115, 240 128"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 2. Top-Right Card (Weekly progress) -> Top-Right Node */}
                <path
                  d="M 420 85 C 385 85, 370 115, 360 128"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 3. Bottom-Left Card (Production quality) -> Bottom-Left Node */}
                <path
                  d="M 180 275 C 215 275, 230 245, 240 232"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 4. Bottom-Right Card (Clear ownership) -> Bottom-Right Node */}
                <path
                  d="M 420 275 C 385 275, 370 245, 360 232"
                  stroke="url(#flowLineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Glowing Nodes on the Ring */}
                {/* Node 1: Top-Left */}
                <circle cx="240" cy="128" r="4" fill="#FFFFFF" stroke="#D23D78" strokeWidth="2.5" />
                {/* Node 2: Top-Right */}
                <circle cx="360" cy="128" r="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5" />
                {/* Node 3: Bottom-Left */}
                <circle cx="240" cy="232" r="4" fill="#FFFFFF" stroke="#D23D78" strokeWidth="2.5" />
                {/* Node 4: Bottom-Right */}
                <circle cx="360" cy="232" r="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5" />
              </svg>

              {/* ── Top Row of Feature Cards ── */}
              <div className="relative z-10 flex items-start justify-between w-full px-1">
                {/* Top-Left: Direct access */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="relative bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 hover:shadow-lg hover:border-rose-100 transition-all duration-300 w-52 sm:w-60"
                >
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-sm bg-rose-50 text-[#D23D78] border-rose-200/60 uppercase tracking-widest leading-none">
                      <LayoutGrid className="w-3 h-3" strokeWidth={2.5} /> {FLOW_NODES.topLeft.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#D23D78] bg-rose-50/50 rounded-full">
                      <Lightbulb className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 leading-tight">
                        {FLOW_NODES.topLeft.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 leading-snug mt-1.5">
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
                  className="relative bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 hover:shadow-lg hover:border-purple-100 transition-all duration-300 w-52 sm:w-60"
                >
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-sm bg-purple-50 text-[#7C3AED] border-purple-200/60 uppercase tracking-widest leading-none">
                      <LayoutGrid className="w-3 h-3" strokeWidth={2.5} /> {FLOW_NODES.topRight.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#7C3AED] bg-purple-50/50 rounded-full">
                      <TrendingUp className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 leading-tight">
                        {FLOW_NODES.topRight.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 leading-snug mt-1.5">
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
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white shadow-[0_20px_60px_rgba(210,61,120,0.2),0_4px_16px_rgba(0,0,0,0.04)] border border-rose-50 flex flex-col items-center justify-center p-3 sm:p-4">
                  <Image
                    src="/logo.png"
                    alt="SimplePrime Logo"
                    width={180}
                    height={40}
                    className="w-[90%] h-auto object-contain drop-shadow-sm select-none"
                    priority
                  />
                </div>
              </motion.div>

              {/* ── Bottom Row of Feature Cards ── */}
              <div className="relative z-10 flex items-end justify-between w-full px-1 mt-20 sm:mt-24">
                {/* Bottom-Left: Production quality */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="relative bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 hover:shadow-lg hover:border-rose-100 transition-all duration-300 w-52 sm:w-60"
                >
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-sm bg-rose-50 text-[#D23D78] border-rose-200/60 uppercase tracking-widest leading-none">
                      <LayoutGrid className="w-3 h-3" strokeWidth={2.5} /> {FLOW_NODES.bottomLeft.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#D23D78] bg-rose-50/50 rounded-full">
                      <Box className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 leading-tight">
                        {FLOW_NODES.bottomLeft.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 leading-snug mt-1.5">
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
                  className="relative bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 hover:shadow-lg hover:border-purple-100 transition-all duration-300 w-52 sm:w-60"
                >
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-sm bg-purple-50 text-[#7C3AED] border-purple-200/60 uppercase tracking-widest leading-none">
                      <LayoutGrid className="w-3 h-3" strokeWidth={2.5} /> {FLOW_NODES.bottomRight.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#7C3AED] bg-purple-50/50 rounded-full">
                      <Users className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 leading-tight">
                        {FLOW_NODES.bottomRight.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 leading-snug mt-1.5">
                        {FLOW_NODES.bottomRight.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Bar: YOUR IDEA ↔ REAL IMPACT */}
            <div className="flex items-center justify-between w-full max-w-xl mx-auto px-4 mt-6 z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D23D78]" />
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-[0.2em]">
                  YOUR IDEA
                </span>
              </div>
              <div className="flex-1 mx-4 border-b-2 border-dashed border-rose-100/60" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-[0.2em]">
                  REAL IMPACT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              </div>
            </div>
          </motion.div>


    </>
  );
}
