"use client";

import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, MessageSquare, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/section-header";

interface CTAProps {
  onStartProject?: () => void;
}

export function CTA({ onStartProject }: CTAProps) {
  const { openLead } = useLead();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "cta" });
  };

  const handleSchedule = () => {
    openLead({ source: "cta-schedule", description: "Interested in scheduling a discovery call." });
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#FCFBF9] border-t border-[#EAE6DF] overflow-hidden select-none"
    >
      {/* ── Soft Ambient Glows & Dot Patterns Matching SimpleThink Theme ── */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-[420px] h-[420px] rounded-full bg-rose-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-[480px] h-[480px] rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-pink-100/40 blur-3xl" />

      {/* Decorative Dot Matrix on corners */}
      <div className="hidden lg:block pointer-events-none absolute top-12 left-8 w-28 h-28 hero-dots opacity-40" />
      <div className="hidden lg:block pointer-events-none absolute bottom-12 right-10 w-28 h-28 hero-dots opacity-35" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── Left Column: 3D Illustration ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-5 flex justify-center items-center relative"
          >
            {/* Subtle glow backdrop for the 3D illustration */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#922F55]/12 via-[#6C2BB8]/10 to-transparent blur-2xl pointer-events-none" />

            <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px]">
              {/* Gentle floating motion */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/simplemind.png"
                  alt="Turn your idea into a premium digital product"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(146,47,85,0.12)]"
                  priority
                />
              </motion.div>

              {/* READY TO BUILD? Floating Pill */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute right-[4%] bottom-[20%] sm:right-[8%] sm:bottom-[22%] z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(30,24,30,0.10)] border border-[rgba(30,24,30,0.08)] hover:scale-105 transition-transform duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#922F55] font-extrabold text-[11px] tracking-widest uppercase font-satoshi">
                  READY TO BUILD?
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Column: Content & Actions ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left font-satoshi"
          >
            {/* Top Info Header */}
            <SectionHeader
              eyebrow="FROM IDEA TO IMPACT"
              title="Let's turn your idea into a"
              highlightedText="premium digital product."
              description="High craft, sub-second performance, and zero bloat. We partner with ambitious founders to build products people actually love using."
              className="mb-6 lg:items-start lg:text-left mx-0"
              maxWidth="max-w-[620px]"
            />

            {/* 3 Pillars as sleek pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-8 sm:mb-10">
              {[
                { label: "Simple process.", icon: Zap },
                { label: "Clear communication.", icon: MessageSquare },
                { label: "Real results.", icon: CheckCircle2 },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(30,24,30,0.08)] shadow-[0_2px_6px_rgba(0,0,0,0.03)] text-[13px] sm:text-[14px] font-[600] text-[#121114]"
                  >
                    <Icon size={14} className="text-[#922F55]" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons & Fast Response Note */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={handleStart}
                className="group h-13 sm:h-14 px-8 rounded-full bg-[#922F55] text-white text-[15px] sm:text-[16px] font-[700] tracking-tight hover:bg-[#7D2748] active:scale-95 transition-all duration-200 shadow-[0_8px_24px_rgba(146,47,85,0.25)] hover:shadow-[0_10px_28px_rgba(146,47,85,0.35)] hover:-translate-y-0.5 cursor-pointer border-0 w-full sm:w-auto flex items-center justify-center gap-2.5"
              >
                <span>Start a project</span>
                <AnimatedArrowRight size={16} className="text-white" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleSchedule}
                className="h-13 sm:h-14 px-7 rounded-full bg-white text-[#121114] border border-[rgba(30,24,30,0.12)] hover:border-[rgba(30,24,30,0.25)] hover:bg-[#FAF9F7] text-[15px] sm:text-[16px] font-[700] tracking-tight active:scale-95 transition-all duration-200 shadow-xs hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Calendar size={16} className="text-[#68666C]" />
                <span>Schedule a call</span>
              </Button>
            </div>

            {/* Subtle Trust / Response Note */}
            <div className="flex items-center gap-2 mt-4 text-[12px] sm:text-[13px] font-medium text-[#68666C]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Response within 2 hours • Free 30-min discovery session</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
