"use client";

import { useLead } from "@/components/leads/lead-provider";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { FAQS } from "@/lib/data/faq";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-pricing");
  const { openLead } = useLead();

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section id="faq" className="relative scroll-mt-24 py-28 sm:py-32">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">


        {/* Top-left dot grid */}
        <div className="absolute top-12 left-6 sm:left-12 grid grid-cols-4 gap-2.5 opacity-35">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
          ))}
        </div>

        {/* Right edge dot grid */}
        <div className="absolute top-1/3 right-4 sm:right-10 grid grid-cols-4 gap-2.5 opacity-30">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
          ))}
        </div>

        {/* Top-right diagonal accent lines */}
        <div className="absolute top-10 right-16 flex gap-1.5 rotate-[35deg] opacity-75">
          <div className="w-[3px] h-4 bg-[#f43f5e] rounded-full" />
          <div className="w-[3px] h-5 bg-[#f43f5e] rounded-full -translate-y-1" />
          <div className="w-[3px] h-4 bg-[#f43f5e] rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-start gap-4">
          
          {/* Top Info */}
          <SectionHeader
            eyebrow="FAQ"
            title={<>Frequently Asked <br/></>}
            highlightedText="Questions."
            description="Honest answers to the most common questions founders and engineering teams ask before building with us."
            className="mb-8 items-start text-left mx-0"
            maxWidth="max-w-[400px]"
          />

          {/* Bottom Composite Card Component (Single Unified Card containing CTA, Character & Stats) */}
          <div className="relative mt-6 sm:mt-8 pt-4">
            
            {/* 1. "Still have a question?" Handwritten note & curved arrow */}
            <div className="absolute -top-5 left-1 sm:left-2 z-20 flex items-start gap-1 pointer-events-none select-none">
              <span className="font-['Caveat',cursive] italic text-[22px] sm:text-[24px] text-slate-700 dark:text-zinc-300 font-bold rotate-[-8deg] leading-[1.1] block">
                Still have a<br />question?
              </span>
              <svg 
                width="44" 
                height="38" 
                viewBox="0 0 54 46" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-[#db2777] -mt-1 -ml-1"
              >
                <path 
                  d="M6 14C16 3 32 2 40 14C45 22 44 32 41 40" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M34 33L41 41L48 34" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            {/* 2. Main Outer White Card */}
            <div className="relative z-10 w-full max-w-[490px] bg-white dark:bg-zinc-900 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(244,63,94,0.06),_0_0_1px_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-rose-50/60 dark:border-white/10">
              
              {/* Upper Content Area: Left CTA + Right 3D Character */}
              <div className="relative min-h-[210px] sm:min-h-[215px]">
                
                {/* Left: Text & CTA Button */}
                <div className="relative z-10 max-w-[240px] sm:max-w-[250px]">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100/80 dark:border-rose-900/40 mb-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#db2777]">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      <circle cx="9" cy="12" r="1" fill="currentColor"/>
                      <circle cx="12" cy="12" r="1" fill="currentColor"/>
                      <circle cx="15" cy="12" r="1" fill="currentColor"/>
                    </svg>
                    <span className="text-[10.5px] font-bold text-[#db2777]">We&apos;re here to help</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-lg sm:text-[20px] font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight leading-tight">
                    Can&apos;t find your answer?
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-[12px] text-slate-500 dark:text-zinc-400 leading-[1.5] mb-4">
                    Talk to our team and get a clear, no-fluff answer for your specific requirement.
                  </p>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => openLead({ description: "FAQ - Technical Consultation" })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-[13px] font-bold shadow-[0_6px_20px_rgba(225,29,72,0.25)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    <span>Talk to our team</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                {/* Right: 3D Character Sitting with Laptop (Completely visible, zero obstruction!) */}
                <div className="absolute right-[-10px] sm:right-[-14px] bottom-[2px] sm:bottom-[6px] w-[220px] sm:w-[250px] pointer-events-none select-none z-10">
                  {/* 3 accent lines radiating from hair */}
                  <div className="absolute -top-2 right-4 flex gap-1.5 rotate-[35deg]">
                    <div className="w-[2.5px] h-3 bg-[#f43f5e] rounded-full" />
                    <div className="w-[2.5px] h-4 bg-[#f43f5e] rounded-full -translate-y-1" />
                    <div className="w-[2.5px] h-3 bg-[#f43f5e] rounded-full" />
                  </div>

                  <Image
                    src="/assets/simplefaq.png"
                    alt="Technical Lead with laptop"
                    width={500}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-[0_12px_25px_rgba(244,63,94,0.12)]"
                    priority
                  />
                </div>

              </div>

              {/* Bottom: Stats Panel (Full-width rounded card with dividers) */}
              <div className="relative z-20 mt-3 bg-white/95 dark:bg-zinc-800/80 backdrop-blur-sm rounded-[14px] p-2.5 sm:p-3 border border-zinc-100 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-700/60 text-center sm:text-left">
                <div className="px-2">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#be123c] dark:text-rose-400">100%</div>
                  <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-zinc-400 mt-0.5">
                    Honest Answers
                  </div>
                </div>
                <div className="px-2">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#be123c] dark:text-rose-400">Usually</div>
                  <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-zinc-400 mt-0.5">
                    Within a Few Hours
                  </div>
                </div>
                <div className="px-2">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#be123c] dark:text-rose-400">Zero</div>
                  <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-zinc-400 mt-0.5">
                    Sales Pressure
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column (7 Cols) - FAQ Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-4 pt-0 lg:pt-1">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                className={`group rounded-[24px] transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-zinc-900 border-[1.5px] border-rose-300/80 dark:border-rose-500/50 shadow-[0_12px_35px_rgba(244,63,94,0.12)]"
                    : "bg-white dark:bg-zinc-900 border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.06)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-[18px] text-left cursor-pointer outline-none"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                    {/* Number Box */}
                    <div
                      className={`shrink-0 flex items-center justify-center w-[46px] h-[46px] rounded-[14px] font-bold text-[15px] transition-colors duration-300 ${
                        isOpen
                          ? "bg-rose-50 dark:bg-rose-950/50 text-[#e11d48] dark:text-rose-400"
                          : "bg-[#f4f4f6] dark:bg-zinc-800/60 text-[#1e1b4b] dark:text-zinc-300 group-hover:bg-[#f0f0f4]"
                      }`}
                    >
                      {faq.num}
                    </div>

                    {/* Tag + Question */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="w-[13px] h-[13px] text-[#db2777] dark:text-pink-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#db2777] dark:text-pink-500">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-[14.5px] sm:text-[15px] font-bold text-zinc-900 dark:text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Dropdown Chevron */}
                  <div
                    className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 shadow-sm ${
                      isOpen
                        ? "bg-white dark:bg-zinc-800 border-rose-200 dark:border-rose-900/50 text-[#e11d48] dark:text-rose-400 rotate-180 shadow-rose-100/50"
                        : "bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-400 shadow-zinc-100/50"
                    }`}
                  >
                    <ChevronDown className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-[18px] pb-[18px] pt-0 pl-[68px] sm:pl-[76px]">
                        <p className="text-[12.5px] sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-[1.6] max-w-[95%]">
                          {faq.answer}
                        </p>

                        {faq.highlights && faq.highlights.length > 0 && (
                          <div className="mt-3.5 pt-1 flex flex-wrap gap-2">
                            {faq.highlights.map((hl, i) => {
                              const HlIcon = hl.icon;
                              return (
                                <div
                                  key={i}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100/80 dark:border-rose-900/40 text-rose-950 dark:text-rose-200 text-[11px] font-semibold"
                                >
                                  <HlIcon className="w-3.5 h-3.5 text-[#e11d48] dark:text-rose-500" />
                                  <span>{hl.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
