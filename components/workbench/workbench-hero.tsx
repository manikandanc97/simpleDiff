"use client";

import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { HERO_CONTENT } from "@/lib/data/hero";
import { Hero3DCoder } from "./hero-3d-coder";
import { HeroGridAccents } from "./hero-grid-accents";

export function WorkbenchHero() {
  const { openLead } = useLead();
  const heroRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("capabilities");
    if (nextSection) {
      const offset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-12 flex flex-col items-center justify-between"
    >
      {/* Background Elements */}
      <HeroGridAccents />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          
          {/* LEFT: Text Content */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-start text-left max-w-xl z-10 gap-8 sm:gap-12">
            <div className="flex flex-col gap-5 sm:gap-6">

            {/* Pill Tag */}
            

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-satoshi font-extrabold tracking-tighter text-[#121114] leading-none text-5xl sm:text-6xl lg:text-7xl flex flex-col gap-2"
            >
              <span className="block">{HERO_CONTENT.headlineLine1}</span>
              <span className="block relative inline-block whitespace-nowrap">
                {HERO_CONTENT.headlineLine2Prefix}
                <span className="relative inline-block brand-gradient-text">
                  {HERO_CONTENT.headlineHighlight}
                  {/* Hand-drawn style SVG underline stroke */}
                  <svg 
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3.5 text-[#922F55] overflow-visible pointer-events-none" 
                    viewBox="0 0 240 24" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M4 14 C60 4, 150 6, 230 12" 
                      stroke="currentColor" 
                      strokeWidth="4.5" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M40 18 C105 13, 175 14, 215 17" 
                      stroke="#D23D78" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeOpacity="0.85"
                    />
                    <path 
                      d="M224 8 L234 12 L227 18" 
                      stroke="#6C2BB8" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </span>
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="type-lead text-muted-foreground max-w-lg"
            >
              {HERO_CONTENT.description}
            </motion.p>
            </div>

            <div className="flex flex-col gap-10 sm:gap-14 w-full">
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto font-satoshi"
            >
              <Button
                id="hero-start-project"
                onClick={() => openLead({ source: "cta" })}
                size="lg"
                className="group rounded-full shadow-[0_6px_20px_rgba(146,47,85,0.25)]"
              >
                <span>Start a project</span>
                <AnimatedArrowRight size={16} className="text-white" />
              </Button>
              
              <button
                type="button"
                className="group flex items-center gap-3.5 hover:opacity-85 transition-opacity py-1"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm border border-[rgba(30,24,30,0.08)] text-[#121114] group-hover:scale-105 transition-transform pl-0.5">
                  <Play size={13} fill="currentColor" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-[#121114] leading-tight tracking-tight">See our work</span>
                  <span className="text-xs font-medium text-[#68666C] mt-0.5">2 min overview</span>
                </div>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex items-center gap-5 sm:gap-8 w-full pt-2 font-satoshi"
            >
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(30,24,30,0.08)] shadow-sm flex items-center justify-center text-[#922F55]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#121114] leading-tight">{HERO_CONTENT.stats[0].value}</span>
                  <span className="text-xs font-medium text-[#68666C] leading-none mt-0.5">{HERO_CONTENT.stats[0].label}</span>
                </div>
              </div>
              
              {/* Vertical divider */}
              <div className="w-0 h-8 bg-[rgba(30,24,30,0.08)] hidden sm:block" />

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(30,24,30,0.08)] shadow-sm flex items-center justify-center text-[#922F55]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#121114] leading-tight">{HERO_CONTENT.stats[1].value}</span>
                  <span className="text-xs font-medium text-[#68666C] leading-none mt-0.5">{HERO_CONTENT.stats[1].label}</span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-0 h-8 bg-[rgba(30,24,30,0.08)] hidden sm:block" />

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(30,24,30,0.08)] shadow-sm flex items-center justify-center text-[#922F55]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#121114] leading-tight">{HERO_CONTENT.stats[2].value}</span>
                  <span className="text-xs font-medium text-[#68666C] leading-none mt-0.5">{HERO_CONTENT.stats[2].label}</span>
                </div>
              </div>
            </motion.div>
            </div>
          </div>

          {/* RIGHT: 3D Character & Floating UI Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-6 flex justify-center items-center w-full relative min-h-96 lg:min-h-96"
          >
            <Hero3DCoder />
          </motion.div>
          
        </div>
      </div>
      
      {/* Interactive scroll indicator button */}
      <motion.button
        type="button"
        id="hero-scroll-indicator"
        aria-label="Scroll down to explore capabilities"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="group absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-slate-400 hover:text-foreground cursor-pointer focus:outline-none transition-all select-none"
      >
        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 rounded-full border-[1.5px] border-slate-300 group-hover:border-primary/50 flex items-center justify-center transition-colors"
        >
          <ChevronDown className="h-2.5 w-2.5 text-slate-400 group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}

