"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MousePointer2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";

// ── 1. WEBSITES 3D MOCKUP ──
function WebsitesMockup({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E8D9FE]/60 via-[#FCE4EC]/50 to-[#F3EBF9]/60 rounded-3xl blur-[30px] pointer-events-none -z-10" />

      <motion.div 
        animate={isActive ? { y: [-4, 4, -4] } : { y: 0 }}
        transition={{ duration: 4, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.02)] p-3.5 sm:p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="w-20 h-2 rounded-full bg-slate-100" />
        </div>

        <div className="relative w-full h-[100px] overflow-hidden rounded-lg">
          <motion.div 
            animate={isActive ? { y: [0, -90, 0] } : { y: 0 }}
            transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut", repeatDelay: 1 }}
            className="flex flex-col gap-6 w-full relative"
          >
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-6 flex flex-col gap-2">
                <h4 className="text-[14px] sm:text-[15px] font-[800] tracking-tight text-[#121114] leading-snug">
                  Build Your Next Idea
                </h4>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-5 rounded-md bg-[#922F55] flex items-center justify-center shadow-sm cursor-pointer"
                >
                  <div className="w-9 h-1.5 rounded-full bg-white/90" />
                </motion.div>
              </div>

              <div className="col-span-6 aspect-[4/3] rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 via-[#EC4899]/30 to-[#922F55]/20 border border-white/80 p-1.5 flex items-center justify-center relative overflow-hidden shadow-sm">
                <motion.div 
                  animate={isActive ? { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] } : { opacity: 0.7, scale: 1 }}
                  transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                  className="w-full h-full rounded-lg bg-gradient-to-t from-[#6C2BB8]/40 to-transparent flex items-end justify-center pb-1"
                >
                  <svg width="36" height="24" viewBox="0 0 40 30" fill="none" className="opacity-70">
                    <path d="M4 26 L16 10 L24 20 L30 14 L36 26 Z" fill="#6C2BB8" />
                  </svg>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 items-center opacity-80">
              <div className="col-span-12 flex flex-col gap-1.5">
                <div className="w-24 h-2.5 rounded-full bg-slate-200" />
                <div className="w-full h-2 rounded-full bg-slate-100" />
                <div className="w-4/5 h-2 rounded-full bg-slate-100" />
              </div>
              <div className="col-span-4 aspect-square rounded-lg bg-[#E8D9FE] border border-white/80" />
              <div className="col-span-4 aspect-square rounded-lg bg-[#FCE4EC] border border-white/80" />
              <div className="col-span-4 aspect-square rounded-lg bg-[#DBEAFE] border border-white/80" />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between pt-1 relative z-10">
          <div className="flex items-center gap-1.5 bg-slate-50/90 border border-black/[0.05] rounded-lg p-1">
            <motion.div 
              animate={isActive ? { backgroundColor: ["#ffffff", "#f8f9fa", "#ffffff"] } : { backgroundColor: "#ffffff" }}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              className="w-6 h-6 rounded-md bg-white shadow-xs flex items-center justify-center text-[#922F55]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </motion.div>
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[#68666C]">
              <span className="text-[10px] font-bold">Tt</span>
            </div>
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[#68666C]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
          </div>
        </div>

        <div className="absolute -top-3 -right-3 flex items-start z-20">
          <motion.div 
            animate={isActive ? { rotate: [0, 10, 0, -10, 0], scale: [1, 1.05, 1] } : { rotate: 0, scale: 1 }}
            transition={{ duration: 5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#922F55] to-[#6C2BB8] shadow-md flex items-center justify-center text-white border-2 border-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </motion.div>
          <motion.div 
            animate={isActive ? { 
              x: [0, -40, -120, -40, 0], 
              y: [0, 80, 40, 0, 0] 
            } : { x: 0, y: 0 }}
            transition={{ duration: 5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="absolute -bottom-3 -right-2 transform translate-x-1 translate-y-1 drop-shadow-md z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#121114" stroke="white" strokeWidth="1.5">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ── 2. WEB APPLICATIONS 3D MOCKUP ──
function WebAppsMockup({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#DBEAFE]/60 via-[#E0E7FF]/50 to-[#F3E8FF]/60 rounded-3xl blur-[30px] pointer-events-none -z-10" />

      <motion.div 
        animate={isActive ? { y: [-4, 4, -4] } : { y: 0 }}
        transition={{ duration: 4.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.02)] p-3.5 sm:p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[9px] font-mono text-[#68666C]">app.simpleprime.io</span>
        </div>

        <div className="grid grid-cols-12 gap-2.5 relative">
          <motion.div 
            animate={isActive ? {
              x: [60, -85, -85, 20, 20, -85, -85, 60],
              y: [40, -10, -10, 30, 30, -35, -35, 40],
              scale: [1, 1, 0.8, 1, 1, 1, 0.8, 1],
              opacity: [0, 1, 1, 1, 1, 1, 1, 0]
            } : { x: 60, y: 40, scale: 1, opacity: 0 }}
            transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="absolute bottom-0 right-10 z-30 pointer-events-none drop-shadow-md text-[#121114]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1.5">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </motion.div>

          <div className="col-span-4 bg-[#1B1B1D] rounded-xl p-2 flex flex-col gap-1.5 shadow-inner relative z-10">
            <div className="w-full h-2 rounded bg-white/20 mb-1" />
            <motion.div 
              animate={isActive ? { backgroundColor: ["rgba(146,47,85,1)", "rgba(146,47,85,1)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(146,47,85,1)"] } : { backgroundColor: "rgba(146,47,85,1)" }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="w-3/4 h-2 rounded" 
            />
            <motion.div 
              animate={isActive ? { backgroundColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(146,47,85,1)", "rgba(146,47,85,1)", "rgba(255,255,255,0.1)"] } : { backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="w-4/5 h-2 rounded" 
            />
            <div className="w-2/3 h-1.5 rounded bg-white/10" />
            <motion.div animate={isActive ? { opacity: [1, 0.5, 1] } : { opacity: 1 }} transition={{ duration: 2, repeat: isActive ? Infinity : 0, delay: 1 }} className="w-3/4 h-1.5 rounded bg-white/10 mt-auto" />
          </div>

          <div className="col-span-8 flex flex-col gap-2 relative overflow-hidden rounded-lg h-[105px]">
            <motion.div 
              animate={isActive ? { x: ["0%", "0%", "-100%", "-100%", "0%"] } : { x: "0%" }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="absolute inset-0 w-full flex flex-col gap-2"
            >
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-1.5">
                  <span className="text-[8px] text-[#68666C] block">Users</span>
                  <span className="text-[12px] font-bold text-[#121114]">14.2k</span>
                </div>
                <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-1.5">
                  <span className="text-[8px] text-[#68666C] block">Uptime</span>
                  <span className="text-[12px] font-bold text-[#08B875]">99.9%</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-2 flex items-end justify-between h-[60px] gap-1.5 overflow-hidden">
                <motion.div animate={isActive ? { height: ["40%", "70%", "40%"] } : { height: "40%" }} transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0 }} className="w-full bg-[#E8D9FE] rounded-t" />
                <motion.div animate={isActive ? { height: ["75%", "50%", "75%"] } : { height: "75%" }} transition={{ duration: 3.5, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0.2 }} className="w-full bg-[#922F55] rounded-t" />
                <motion.div animate={isActive ? { height: ["95%", "80%", "95%"] } : { height: "95%" }} transition={{ duration: 4, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0.4 }} className="w-full bg-[#6C2BB8] rounded-t" />
                <motion.div animate={isActive ? { height: ["60%", "90%", "60%"] } : { height: "60%" }} transition={{ duration: 3.2, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0.1 }} className="w-full bg-[#F05BAD] rounded-t" />
                <motion.div animate={isActive ? { height: ["80%", "45%", "80%"] } : { height: "80%" }} transition={{ duration: 3.8, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0.3 }} className="w-full bg-[#4BA8FF] rounded-t" />
              </div>
            </motion.div>

            <motion.div 
              animate={isActive ? { x: ["100%", "100%", "0%", "0%", "100%"] } : { x: "100%" }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-slate-50 border border-black/[0.04] rounded-lg p-2 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between pb-1 border-b border-black/[0.05]">
                <div className="w-16 h-2 rounded-full bg-slate-200" />
                <div className="w-8 h-2 rounded-full bg-slate-200" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#922F55]" />
                    <div className="w-12 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="w-8 h-1.5 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#4BA8FF]" />
                    <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="w-6 h-1.5 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#08B875]" />
                    <div className="w-14 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="w-8 h-1.5 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#F05BAD]" />
                    <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="w-8 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── 3. MOBILE APPS 3D MOCKUP ──
function MobileAppsMockup({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FCE7F3]/60 via-[#FDF2F8]/50 to-[#EDE9FE]/60 rounded-3xl blur-[30px] pointer-events-none -z-10" />

      <motion.div 
        animate={isActive ? { y: [-5, 5, -5] } : { y: 0 }}
        transition={{ duration: 4, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className="relative w-[130px] sm:w-[145px] h-[210px] sm:h-[230px] bg-[#121114] rounded-[28px] p-2 shadow-[0_20px_40px_-10px_rgba(146,47,85,0.2),0_4px_12px_rgba(0,0,0,0.1)] border-2 border-[#2A2930] flex flex-col overflow-hidden"
      >
        <motion.div 
           animate={isActive ? { width: ["40px", "100px", "100px", "40px", "40px"], height: ["12px", "32px", "32px", "12px", "12px"], borderRadius: ["12px", "16px", "16px", "12px", "12px"] } : { width: "40px", height: "12px", borderRadius: "12px" }}
           transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
           className="bg-black mx-auto mb-1.5 flex items-center justify-center overflow-hidden z-20 shrink-0 relative"
        >
           <motion.div 
             animate={isActive ? { opacity: [1, 0, 0, 1, 1] } : { opacity: 1 }}
             transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
             className="w-1.5 h-1.5 rounded-full bg-slate-900 absolute right-3" 
           />
           <motion.div
             animate={isActive ? { opacity: [0, 1, 1, 0, 0] } : { opacity: 0 }}
             transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
             className="flex items-center gap-2 px-2 w-full absolute inset-0"
           >
             <div className="w-4 h-4 rounded-full bg-green-500" />
             <div className="w-10 h-1.5 rounded-full bg-slate-300" />
           </motion.div>
        </motion.div>

        <div className="flex-1 bg-gradient-to-b from-[#FFF5F9] to-[#F3EBF9] rounded-[20px] p-2 flex flex-col gap-1.5 relative overflow-hidden">
          <div className="flex items-center gap-1.5 relative z-10">
            <div className="w-5 h-5 rounded-full bg-[#922F55] flex items-center justify-center text-[8px] text-white font-bold">
              SP
            </div>
            <div className="w-12 h-1.5 rounded-full bg-slate-300" />
          </div>

          <motion.div 
            animate={isActive ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], scale: [1, 0.95, 1, 1, 1] } : { backgroundPosition: "0% 50%", scale: 1 }}
            transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="w-full h-20 rounded-xl bg-gradient-to-br from-[#922F55] via-[#D23D78] to-[#6C2BB8] bg-[length:200%_200%] p-2 text-white flex flex-col justify-between shadow-sm relative z-10"
          >
            <span className="text-[8px] font-bold opacity-80">PRO FEATURE</span>
            <div className="w-full h-1.5 rounded-full bg-white/40" />
          </motion.div>

          <motion.div 
            animate={isActive ? { y: [0, 40, 40, 0, 0] } : { y: 0 }}
            transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="flex flex-col gap-1.5 w-full absolute top-[115px] left-0 px-2"
          >
            <div className="flex items-center gap-1.5 bg-white rounded-lg p-1 shadow-2xs">
              <div className="w-4 h-4 rounded-md bg-blue-100 flex items-center justify-center text-[#4BA8FF] text-[8px] font-bold">A</div>
              <div className="w-14 h-1.5 rounded bg-slate-200" />
            </div>
            <div className="flex items-center gap-1.5 bg-white rounded-lg p-1 shadow-2xs">
              <div className="w-4 h-4 rounded-md bg-pink-100 flex items-center justify-center text-[#D23D78] text-[8px] font-bold">★</div>
              <div className="w-12 h-1.5 rounded bg-slate-200" />
            </div>
          </motion.div>
          
          <motion.div
            animate={isActive ? { y: [40, 0, 0, 40, 40], opacity: [0, 1, 1, 0, 0] } : { y: 40, opacity: 0 }}
            transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="absolute top-[115px] left-0 px-2 w-full flex flex-col gap-2"
          >
            <div className="w-full h-16 rounded-xl bg-white shadow-sm p-2 flex flex-col gap-1">
               <div className="w-full h-2 rounded-full bg-slate-200" />
               <div className="w-3/4 h-2 rounded-full bg-slate-200" />
               <div className="w-1/2 h-2 rounded-full bg-[#922F55] mt-auto" />
            </div>
          </motion.div>

          <motion.div 
            animate={isActive ? {
              x: [30, 40, 40, 20, 20, 30],
              y: [120, 50, 50, 90, 90, 120],
              scale: [1, 1, 0.8, 1, 1, 1],
              opacity: [0, 1, 1, 1, 1, 0]
            } : { x: 30, y: 120, scale: 1, opacity: 0 }}
            transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="absolute z-30 pointer-events-none text-[#121114]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1.5">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        animate={isActive ? { y: [0, -10, 0], rotate: [-6, -2, -6] } : { y: 0, rotate: -6 }}
        transition={{ duration: 3.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className="absolute top-10 right-4 sm:right-8 bg-white/95 backdrop-blur-md border border-black/[0.06] rounded-xl p-2 shadow-lg flex items-center gap-1.5 origin-center"
      >
        <div className="w-6 h-6 rounded-lg bg-[#4BA8FF] flex items-center justify-center text-white font-bold text-[10px]">A</div>
      </motion.div>
      <motion.div 
        animate={isActive ? { y: [0, 10, 0], rotate: [6, 2, 6] } : { y: 0, rotate: 6 }}
        transition={{ duration: 4.5, repeat: isActive ? Infinity : 0, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-8 left-4 sm:left-8 bg-white/95 backdrop-blur-md border border-black/[0.06] rounded-xl p-2 shadow-lg flex items-center gap-1.5 origin-center"
      >
        <div className="w-6 h-6 rounded-lg bg-[#922F55] flex items-center justify-center text-white font-bold text-[10px]">99%</div>
      </motion.div>
    </div>
  );
}

// ── 4. SAAS PRODUCTS 3D MOCKUP ──
function SaaSProductsMockup({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EDE9FE]/60 via-[#F3E8FF]/50 to-[#FCE7F3]/60 rounded-3xl blur-[30px] pointer-events-none -z-10" />

      <motion.div 
        animate={isActive ? { y: [3, -3, 3] } : { y: 0 }}
        transition={{ duration: 5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.02)] p-3.5 sm:p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[10px] font-bold text-[#08B875] bg-emerald-50 px-2 py-0.5 rounded-full">+148% MRR</span>
        </div>

        <div className="bg-gradient-to-br from-[#922F55] to-[#6C2BB8] rounded-xl p-3 text-white flex flex-col gap-2 shadow-md relative overflow-hidden">
          {isActive && (
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            />
          )}
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-extrabold tracking-wider">ENTERPRISE SAAS</span>
            <span className="text-[14px] font-black">$499<span className="text-[9px] font-normal opacity-80">/mo</span></span>
          </div>

          <div className="flex flex-col gap-1 text-[10px] relative z-10">
            <div className="flex items-center gap-1.5">
              <motion.span animate={isActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} transition={{ duration: 2, repeat: isActive ? Infinity : 0 }} className="text-[#08B875]">✓</motion.span> Multi-tenant Cloud Sync
            </div>
            <div className="flex items-center gap-1.5">
              <motion.span animate={isActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} transition={{ duration: 2, repeat: isActive ? Infinity : 0, delay: 1 }} className="text-[#08B875]">✓</motion.span> Automated Stripe Billing
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 relative">
          <div className="flex-1 bg-slate-50 border border-black/[0.04] rounded-lg p-1.5 flex items-center gap-2">
            <motion.div animate={isActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }} className="w-2 h-2 rounded-full bg-[#08B875]" />
            <span className="text-[10px] font-mono text-[#121114]">Postgres DB</span>
          </div>
          <div className="flex-1 bg-slate-50 border border-black/[0.04] rounded-lg p-1.5 flex items-center gap-2">
            <motion.div animate={isActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} transition={{ duration: 2, repeat: isActive ? Infinity : 0 }} className="w-2 h-2 rounded-full bg-[#6C2BB8]" />
            <span className="text-[10px] font-mono text-[#121114]">Edge API</span>
          </div>
          
          {/* Animated Sync Line */}
          {isActive && (
            <motion.div
               className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-[#08B875] to-[#6C2BB8] z-20"
               initial={{ width: 0, x: -10, y: 0, opacity: 0 }}
               animate={{ width: [0, 40, 0], x: [-10, -10, 10], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── SERVICES DATA SPECIFICATION ──
const SERVICES = [
  {
    id: "01",
    numColor: "text-[#922F55]",
    badgeBg: "bg-[#922F55]/10 text-[#922F55]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Websites",
    tagline: "Digital experiences that make your business clear, credible and memorable.",
    deliverables: [
      "Custom Design Systems",
      "High Conversion UX",
      "SEO & Sub-second Speed",
    ],
    ctaText: "Explore Websites",
    Mockup: WebsitesMockup,
  },
  {
    id: "02",
    numColor: "text-[#6C2BB8]",
    badgeBg: "bg-[#6C2BB8]/10 text-[#6C2BB8]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Web Applications",
    tagline: "Scalable, secure and high-performance web apps tailored to your business needs.",
    deliverables: [
      "Next.js & React Fullstack",
      "Real-time Workflows",
      "Secure Role-based Auth",
    ],
    ctaText: "Explore Web Apps",
    Mockup: WebAppsMockup,
  },
  {
    id: "03",
    numColor: "text-[#D23D78]",
    badgeBg: "bg-[#D23D78]/10 text-[#D23D78]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    title: "Mobile Apps",
    tagline: "Native-like mobile experiences that engage users and drive growth.",
    deliverables: [
      "React Native Cross-Platform",
      "Offline Functionality",
      "App Store & Play Store",
    ],
    ctaText: "Explore Mobile Apps",
    Mockup: MobileAppsMockup,
  },
  {
    id: "04",
    numColor: "text-[#5B21B6]",
    badgeBg: "bg-[#5B21B6]/10 text-[#5B21B6]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: "SaaS Products",
    tagline: "End-to-end SaaS platforms with modern architecture and business-ready features.",
    deliverables: [
      "Stripe Billing & Subscriptions",
      "Multi-tenant Architecture",
      "Product Telemetry & Analytics",
    ],
    ctaText: "Explore SaaS Products",
    Mockup: SaaSProductsMockup,
  },
];

export function WhatWeBuild() {
  const { openLead } = useLead();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  return (
    <section
      id="capabilities"
      className="relative w-full pt-20 pb-10 sm:pt-28 sm:pb-12 overflow-hidden bg-[#FFFDFC]"
    >
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#F3EBF9]/60 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-[#FAF0F6]/70 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-14 sm:mb-20 font-satoshi">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[rgba(30,24,30,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#922F55] inline-block" />
            <span className="text-[11px] sm:text-[12px] font-[800] tracking-[0.08em] text-[#121114]/90 uppercase">
              WHAT WE BUILD
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-[800] tracking-[-0.045em] text-[#121114] leading-[1.05] mb-4">
            From Ideas to{" "}
            <span className="relative inline-block brand-gradient-text">
              Impact.
              <svg 
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[12px] text-[#922F55] overflow-visible pointer-events-none" 
                viewBox="0 0 200 20" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M4 12 C50 4, 130 5, 195 10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M30 15 C90 11, 150 12, 185 14" 
                  stroke="#D23D78" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeOpacity="0.8"
                />
              </svg>
            </span>
          </h2>

          <p className="text-[15px] sm:text-[17px] lg:text-[18px] text-[#68666C] leading-[1.5] max-w-[660px]">
            We engineer custom software, scalable web applications, and mobile platforms — with enterprise-grade reliability and zero unnecessary overhead.
          </p>
        </div>

        <div ref={containerRef} className="relative w-full py-4 perspective-[1400px] overflow-visible">
          <div className="flex items-center justify-center min-h-[425px] sm:min-h-[460px] relative w-full">
            {SERVICES.map((service, index) => {
              let offset = index - activeIndex;
              if (offset > 2) offset -= SERVICES.length;
              if (offset < -2) offset += SERVICES.length;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              const MockupComponent = service.Mockup;

              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    x: `${offset * 72}%`,
                    scale: isActive ? 1 : 0.88,
                    rotateY: offset * -15,
                    z: isActive ? 50 : -60,
                    opacity: isActive ? 1 : isVisible ? 0.75 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                  }}
                  className={cn(
                    "absolute top-0 w-full max-w-[700px] lg:max-w-[760px] rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 lg:p-10 font-satoshi cursor-pointer transition-shadow",
                    "bg-white/85 backdrop-blur-2xl border border-[rgba(30,24,30,0.08)]",
                    isActive
                      ? "shadow-[0_24px_60px_-15px_rgba(0,0,0,0.09),0_2px_12px_rgba(0,0,0,0.03)] z-30 pointer-events-auto"
                      : "shadow-[0_12px_32px_-10px_rgba(0,0,0,0.05)] z-10 pointer-events-auto hover:opacity-90"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe < -50) {
                      handleNext();
                    } else if (swipe > 50) {
                      handlePrev();
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
                    <div className="md:col-span-7 flex flex-col items-start text-left">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={cn("text-[26px] sm:text-[30px] font-[900] tracking-tight leading-none font-mono", service.numColor)}>
                          {service.id}
                        </span>
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shadow-xs", service.badgeBg)}>
                          {service.icon}
                        </div>
                      </div>

                      <h3 className="text-[24px] sm:text-[30px] lg:text-[34px] font-[800] tracking-[-0.03em] text-[#121114] leading-tight mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-[14px] sm:text-[15px] text-[#68666C] leading-[1.5] mb-5 font-[500]">
                        {service.tagline}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-[rgba(30,24,30,0.06)] text-[12px] font-[600] text-[#121114]/85 tracking-[-0.01em]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLead({
                            source: "what-we-build",
                            description: `Interested in: ${service.title}.`,
                          });
                        }}
                        className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#922F55] text-white text-[14px] font-[700] hover:bg-[#7D2748] active:scale-95 transition-all shadow-[0_4px_16px_rgba(146,47,85,0.25)]"
                      >
                        <span>{service.ctaText}</span>
                        <AnimatedArrowRight size={15} className="text-white" />
                      </button>
                    </div>

                    <div className="md:col-span-5 flex items-center justify-center relative w-full">
                      <MockupComponent isActive={isActive} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between max-w-[760px] mx-auto mt-8 sm:mt-12 px-2 font-satoshi">
          <div className="flex items-center gap-2 text-[#68666C]">
            <span className="text-[12px] sm:text-[13px] font-[600] text-[#68666C] select-none">
              Drag to explore
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#121114]">
              <MousePointer2 size={12} />
            </div>
            <svg width="28" height="18" viewBox="0 0 35 20" fill="none" className="text-[#D23D78] -ml-0.5 transform scale-x-[-1]">
              <path
                d="M32 16 C20 18, 10 12, 4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M10 3 L3 4 L6 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  activeIndex === i
                    ? "w-8 bg-[#922F55]"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
              className="w-10 h-10 rounded-full bg-white border border-[rgba(30,24,30,0.08)] shadow-sm text-[#121114] hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              className="w-10 h-10 rounded-full bg-white border border-[rgba(30,24,30,0.08)] shadow-sm text-[#121114] hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
