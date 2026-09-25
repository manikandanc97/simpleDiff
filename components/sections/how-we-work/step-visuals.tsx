"use client";

import {
  Activity,
  BarChart2, BarChart3, CheckCircle2,
  Code2,
  Database,
  FileText,
  GitFork,
  Globe,
  Layers,
  LayoutTemplate,
  Lightbulb,
  MonitorPlay,
  MousePointer2,
  Palette,
  Pencil,
  Rocket,
  Server,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wifi
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export function StepVisual({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className="lg:col-span-6 relative flex items-end justify-center">
              <div className="lg:col-span-6 relative flex items-end justify-center">
                
                {/* Soft Radial Ambient Behind Graphic */}
                <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-pink-300/25 via-purple-200/20 to-rose-300/25 rounded-full blur-3xl" />

                {activeStepIndex === 0 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Project Blueprint" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Project Blueprint
                        </span>
                      </div>

                      {/* Blueprint Flowchart Diagram */}
                      <div className="flex flex-col items-center">
                        {/* Root Node */}
                        <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                          <Users className="w-3 h-3 text-purple-600" />
                          <span>Business Goals</span>
                        </div>

                        {/* Branching SVG Lines */}
                        <svg className="w-40 sm:w-48 h-4 text-neutral-200" viewBox="0 0 200 16" fill="none">
                          <path d="M 100 0 L 100 8 M 30 8 L 170 8 M 30 8 L 30 16 M 170 8 L 170 16" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        {/* Child Nodes Row */}
                        <div className="flex items-center justify-between w-full max-w-[220px] sm:max-w-[260px] gap-2">
                          <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                            <Target className="w-3 h-3 text-rose-500" />
                            <span>User Research</span>
                          </div>
                          <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                            <FileText className="w-3 h-3 text-purple-600" />
                            <span>Feature Scope</span>
                          </div>
                        </div>

                        {/* Converging SVG Lines */}
                        <svg className="w-40 sm:w-48 h-4 text-neutral-200" viewBox="0 0 200 16" fill="none">
                          <path d="M 30 0 L 30 8 M 170 0 L 170 8 M 30 8 L 170 8 M 100 8 L 100 16" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        {/* Bottom Node */}
                        <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                          <Layers className="w-3 h-3 text-blue-600" />
                          <span>Technical Plan</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note (Top-Left of Blueprint) */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Ideas
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Business Goals</div>
                        <div>• Target Audience</div>
                      </div>

                      {/* Hand-drawn Red Arrow pointing to Blueprint */}
                      <svg
                        className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M 6 4 C 10 12, 14 16, 22 22"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 14 22 L 22 22 L 20 14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation (Top-Right) */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        From Strategy <br /> to Product
                      </span>
                      {/* Curved Red Arrow pointing to Market Research */}
                      <svg
                        className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M 4 18 C 10 10, 18 10, 24 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 16 6 L 24 6 L 22 14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Market Research" Card (Right Side) */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-40 sm:w-48 pointer-events-none select-none"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Market Research
                        </span>
                        <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E11D48]" />
                      </div>

                      {/* Skeletal bars */}
                      <div className="space-y-1 mb-2.5">
                        <div className="w-14 h-1.5 bg-neutral-200/80 rounded-full" />
                        <div className="w-8 h-1.5 bg-neutral-100 rounded-full" />
                      </div>

                      {/* Checklist items */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            Competitor Analysis
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            User Insights
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            Feature Prioritization
                          </span>
                        </div>
                      </div>

                      {/* Downward Hand-drawn Arrow */}
                      <svg
                        className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12"
                        viewBox="0 0 32 48"
                        fill="none"
                      >
                        <path
                          d="M 12 4 C 12 20, 20 30, 20 44"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 12 36 L 20 44 L 28 36"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Handwritten Sticky Badge (Bottom-Right) */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Clear Plan <br /> Better Results
                      </span>
                    </motion.div>

                    {/* Layer 6: Foreground 3D Character at Desk (discover.png) */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/assets/discover.png"
                        alt="Discover Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 1 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Design System" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Design System
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col items-center gap-4">
                        {/* Colors */}
                        <div className="flex items-center gap-2 bg-white border border-neutral-100 rounded-full px-3 py-2 shadow-sm">
                          <div className="w-5 h-5 rounded-full bg-[#E11D48] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#9333EA] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#3B82F6] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#10B981] shadow-inner" />
                        </div>

                        <svg className="w-32 h-4 text-neutral-200" viewBox="0 0 100 16" fill="none">
                          <path d="M 50 0 L 50 16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>

                        {/* Typography */}
                        <div className="bg-white border border-neutral-100 rounded-2xl px-5 py-3 shadow-sm flex flex-col items-center">
                           <span className="font-satoshi font-black text-2xl text-neutral-900">Aa</span>
                           <span className="text-[10px] text-neutral-500 font-medium">Satoshi / Inter</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Pencil className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          UI / UX
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Pixel Perfect</div>
                        <div>• User First</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        Beautiful & <br /> Intuitive
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Components" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-40 sm:w-48 pointer-events-none select-none"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Components
                        </span>
                        <LayoutTemplate className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      </div>
                      
                      <div className="space-y-2">
                        {/* Fake button */}
                        <div className="w-full h-6 bg-[#E11D48] rounded-md flex items-center justify-center">
                          <div className="w-8 h-1 bg-white/50 rounded-full" />
                        </div>
                        {/* Fake Input */}
                        <div className="w-full h-6 bg-neutral-100 border border-neutral-200 rounded-md flex items-center px-2">
                          <div className="w-12 h-1 bg-neutral-300 rounded-full" />
                        </div>
                        {/* Fake Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-1 bg-neutral-200 rounded-full" />
                          <div className="w-6 h-3 bg-purple-500 rounded-full relative">
                             <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <MousePointer2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Interactive <br /> Prototypes
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/assets/design-develop.png"
                        alt="Design Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 2 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Architecture" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Architecture
                        </span>
                      </div>

                      {/* Content Flow */}
                      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2">
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">DB</span>
                         </div>
                         <svg className="w-6 sm:w-10 h-4 text-neutral-300" viewBox="0 0 40 16" fill="none">
                           <path d="M 0 8 L 40 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                         </svg>
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <Server className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">API</span>
                         </div>
                         <svg className="w-6 sm:w-10 h-4 text-neutral-300" viewBox="0 0 40 16" fill="none">
                           <path d="M 0 8 L 40 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                         </svg>
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <MonitorPlay className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">CLIENT</span>
                         </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Code2 className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Tech Stack
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Next.js 15</div>
                        <div>• TypeScript</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        Built to <br /> Scale
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Terminal" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-[#1E1E1E]/95 backdrop-blur-md rounded-2xl border border-neutral-700 shadow-xl shadow-neutral-900/10 p-3 sm:p-4 z-10 w-44 sm:w-52 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="font-mono text-[10px] text-neutral-400 ml-2">bash</span>
                      </div>
                      
                      <div className="font-mono text-[10px] sm:text-[11px] space-y-1">
                        <div className="text-white"><span className="text-pink-500">$</span> npm run build</div>
                        <div className="text-neutral-400">Compiling...</div>
                        <div className="text-emerald-400">✓ Compiled successfully in 2.1s</div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Zero <br /> Downtime
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/assets/design-develop.png"
                        alt="Develop Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 3 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Dashboard" Window Card (Live & Growing) */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Live & Growing
                        </span>
                      </div>

                      {/* Content Flow */}
                      <div className="flex flex-col items-center w-full max-w-[200px] sm:max-w-[240px]">
                        <div className="flex items-center justify-between w-full mb-2">
                           <div className="flex flex-col">
                              <span className="text-[10px] text-neutral-500 font-semibold uppercase">Active Users</span>
                              <span className="text-xl sm:text-2xl font-black text-neutral-900">10.4k</span>
                           </div>
                           <div className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> +42%
                           </div>
                        </div>
                        {/* Fake Line Chart */}
                        <svg className="w-full h-12" viewBox="0 0 200 40" fill="none">
                          <path d="M 0 35 Q 20 30 40 25 T 80 15 T 120 20 T 160 5 T 200 0" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#9333EA" />
                              <stop offset="1" stopColor="#E11D48" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Rocket className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Go Live
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• SEO Ready</div>
                        <div>• Fast Load</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        We are <br /> Live!
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Server Status" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-44 sm:w-52 pointer-events-none select-none"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Server Status
                        </span>
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">SSL</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">Active</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">CDN</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">Global</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">Uptime</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">99.9%</span></div>
                        </div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Sub-second <br /> Load
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/assets/launch.png"
                        alt="Launch Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
              </div>
    </div>
  );
}
