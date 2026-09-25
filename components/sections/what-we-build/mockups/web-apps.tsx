"use client";

import { motion } from "motion/react";
import { MockupWrapper } from "./mockup-wrapper";

export function WebAppsMockup({ isActive }: { isActive?: boolean }) {
  return (
    <MockupWrapper
      isActive={isActive}
      gradientClass="bg-gradient-to-tr from-[#DBEAFE]/60 via-[#E0E7FF]/50 to-[#F3E8FF]/60"
      innerClassName="max-w-80 sm:max-w-80 p-3.5 sm:p-4 gap-3"
      floatDuration={4.5}
      floatY={4}
    >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-xs font-mono text-[#68666C]">app.simpleprime.io</span>
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
            <div className="w-full h-2 rounded bg-white/20" />
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

          <div className="col-span-8 flex flex-col gap-2 relative overflow-hidden rounded-lg h-28">
            <motion.div
              animate={isActive ? { x: ["0%", "0%", "-100%", "-100%", "0%"] } : { x: "0%" }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="absolute inset-0 w-full flex flex-col gap-2"
            >
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-1.5">
                  <span className="text-xs text-[#68666C] block">Users</span>
                  <span className="text-xs font-bold text-[#121114]">14.2k</span>
                </div>
                <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-1.5">
                  <span className="text-xs text-[#68666C] block">Uptime</span>
                  <span className="text-xs font-bold text-[#08B875]">99.9%</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-black/[0.04] rounded-lg p-2 flex items-end justify-between h-14 gap-1.5 overflow-hidden">
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
                {[["#922F55", "w-12", "w-8"], ["#4BA8FF", "w-10", "w-6"], ["#08B875", "w-14", "w-8"], ["#F05BAD", "w-10", "w-8"]].map(([color, w1, w2], i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <div className={`${w1} h-1.5 rounded-full bg-slate-300`} />
                    </div>
                    <div className={`${w2} h-1.5 rounded-full bg-slate-300`} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
    </MockupWrapper>
  );
}


