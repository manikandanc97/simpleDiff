"use client";

import { motion } from "motion/react";
import { MockupWrapper } from "./mockup-wrapper";

export function WebsitesMockup({ isActive }: { isActive?: boolean }) {
  return (
    <MockupWrapper
      isActive={isActive}
      gradientClass="bg-gradient-to-tr from-[#E8D9FE]/60 via-[#FCE4EC]/50 to-[#F3EBF9]/60"
      innerClassName="max-w-80 sm:max-w-80 p-3.5 sm:p-4 gap-3"
      floatDuration={4}
      floatY={4}
    >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="w-20 h-2 rounded-full bg-slate-100" />
        </div>

        <div className="relative w-full h-24 overflow-hidden rounded-lg">
          <motion.div
            animate={isActive ? { y: [0, -90, 0] } : { y: 0 }}
            transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut", repeatDelay: 1 }}
            className="flex flex-col gap-6 w-full relative"
          >
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-6 flex flex-col gap-2">
                <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-[#121114] leading-snug">
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
              <span className="text-xs font-bold">Tt</span>
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
            animate={isActive ? { x: [0, -40, -120, -40, 0], y: [0, 80, 40, 0, 0] } : { x: 0, y: 0 }}
            transition={{ duration: 5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
            className="absolute -bottom-3 -right-2 transform translate-x-1 translate-y-1 drop-shadow-md z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#121114" stroke="white" strokeWidth="1.5">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </motion.div>
        </div>
    </MockupWrapper>
  );
}


