"use client";

import { motion } from "motion/react";
import { MockupWrapper } from "./mockup-wrapper";

export function SaaSProductsMockup({ isActive }: { isActive?: boolean }) {
  return (
    <MockupWrapper
      isActive={isActive}
      gradientClass="bg-gradient-to-tr from-[#EDE9FE]/60 via-[#F3E8FF]/50 to-[#FCE7F3]/60"
      innerClassName="max-w-80 sm:max-w-80 p-3.5 sm:p-4 gap-3"
      floatDuration={5}
    >
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="w-20 h-2 rounded-full bg-slate-100" />
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
            <span className="text-xs font-extrabold tracking-wider">ENTERPRISE SAAS</span>
          </div>

          <div className="flex flex-col gap-1 text-xs relative z-10">
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
            <span className="text-xs font-mono text-[#121114]">Postgres DB</span>
          </div>
          <div className="flex-1 bg-slate-50 border border-black/[0.04] rounded-lg p-1.5 flex items-center gap-2">
            <motion.div animate={isActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} transition={{ duration: 2, repeat: isActive ? Infinity : 0 }} className="w-2 h-2 rounded-full bg-[#6C2BB8]" />
            <span className="text-xs font-mono text-[#121114]">Edge API</span>
          </div>

          {isActive && (
            <motion.div
              className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-[#08B875] to-[#6C2BB8] z-20"
              initial={{ width: 0, x: -10, y: 0, opacity: 0 }}
              animate={{ width: [0, 40, 0], x: [-10, -10, 10], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
    </MockupWrapper>
  );
}


