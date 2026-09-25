"use client";

import { useLead } from "@/components/leads/lead-provider";
import { STEPS } from "@/lib/data/how-we-work";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { StepVisual } from "./how-we-work/step-visuals";
import { SectionHeader } from "@/components/ui/section-header";

export function HowWeWork() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { openLead } = useLead();

  const currentStep = STEPS[activeStepIndex];

  const handleNextStep = () => {
    if (activeStepIndex < STEPS.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      openLead({ source: "how-we-work" });
    }
  };

  return (
    <section
      id="how-we-work"
      className="relative py-16 sm:py-20 lg:py-24 select-none"
    >
      {/* Soft Pastel Background Ambient Accents */}


      {/* Decorative Dotted Grid Accents */}
      <div className="hidden lg:block pointer-events-none absolute top-16 left-8 w-28 h-28 hero-dots opacity-40" />
      <div className="hidden lg:block pointer-events-none absolute top-1/2 left-3 w-20 h-28 hero-dots opacity-35" />
      <div className="hidden lg:block pointer-events-none absolute top-28 right-10 w-24 h-24 hero-dots opacity-35" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER (Center Aligned, matching reference) */}
        {/* ========================================================================= */}
        <SectionHeader
          eyebrow="OUR PROCESS"
          centered
          title="How We"
          highlightedText="Work."
          description={
            <>
              A clear 4-step delivery process to turn your ideas into real, scalable digital products.
              <br className="hidden sm:inline" /> No confusion. No black boxes. Just results.
            </>
          }
        />

        {/* ========================================================================= */}
        {/* STEPPER NAVIGATION BAR (Horizontal connected flow) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 md:gap-4 mb-4 overflow-x-auto py-4 -my-4 px-4 -mx-4 scrollbar-none">
          {STEPS.map((step, index) => {
            const isActive = activeStepIndex === index;
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Step Button Card */}
                <button
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={cn(
                    "relative group flex items-center gap-3 transition-all duration-300 cursor-pointer text-left rounded-2xl select-none",
                    isActive
                      ? "bg-white px-4 py-2.5 shadow-lg shadow-pink-500/10 border border-pink-200/90 ring-1 ring-pink-100"
                      : "px-3 py-2 hover:bg-white/80 rounded-2xl border border-transparent hover:border-neutral-200/80"
                  )}
                >
                  {/* Step Number Circle */}
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors shrink-0",
                      isActive
                        ? "bg-[#831843] text-white shadow-xs"
                        : "bg-purple-50 text-purple-700 font-bold group-hover:bg-purple-100"
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Step Icon */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-rose-50 text-rose-500"
                        : "bg-neutral-100 text-neutral-500 group-hover:text-neutral-700"
                    )}
                  >
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>

                  {/* Step Titles */}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-bold leading-tight transition-colors",
                        isActive ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium leading-tight whitespace-nowrap mt-0.5">
                      {step.subtitle}
                    </span>
                  </div>
                </button>

                {/* Dotted Curved Arrow to Next Step */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-1">
                    {index === 0 && (
                      <svg
                        className={cn(
                          "w-10 lg:w-14 h-6 shrink-0 transition-colors duration-500",
                          activeStepIndex > index ? "text-[#E11D48] drop-shadow-sm" : "text-pink-300"
                        )}
                        viewBox="0 0 56 24"
                        fill="none"
                      >
                        <path
                          d="M 4 8 C 20 20, 36 20, 50 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M 43 9 L 50 8 L 48 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg
                        className={cn(
                          "w-10 lg:w-14 h-8 shrink-0 transition-colors duration-500",
                          activeStepIndex > index ? "text-[#E11D48] drop-shadow-sm" : "text-pink-300"
                        )}
                        viewBox="0 0 56 32"
                        fill="none"
                      >
                        <path
                          d="M 4 14 C 16 14, 22 26, 14 26 C 6 26, 6 14, 22 10 C 36 6, 46 14, 52 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M 51 15 L 52 22 L 46 19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg
                        className={cn(
                          "w-10 lg:w-14 h-6 shrink-0 transition-colors duration-500",
                          activeStepIndex > index ? "text-[#E11D48] drop-shadow-sm" : "text-pink-300"
                        )}
                        viewBox="0 0 56 24"
                        fill="none"
                      >
                        <path
                          d="M 4 18 C 20 6, 36 6, 50 18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M 48 11 L 50 18 L 43 17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN BENTO CARD (Left Narrative + Right 3D Visual Scene) */}
        {/* ========================================================================= */}
        <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-8 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              {/* ------------------------------------------------------------- */}
              {/* LEFT COLUMN: Narrative & 2x2 Features Grid */}
              {/* ------------------------------------------------------------- */}
              <div className="lg:col-span-6 flex flex-col justify-between z-10">
                {/* Step Kicker */}
                <div className="mb-3.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-[11px] font-black tracking-widest text-[#E11D48] uppercase">
                    {currentStep.stepKicker}
                  </span>
                </div>

                {/* Big Headline */}
                <h3 className="font-satoshi font-black text-3xl sm:text-4xl lg:text-[44px] text-neutral-900 tracking-tight leading-[1.12]">
                  {currentStep.headlineFirst}{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {currentStep.headlineAccent}
                  </span>
                </h3>

                {/* Description Paragraph */}
                <p className="mt-3.5 text-neutral-500 text-sm sm:text-[15px] font-normal leading-relaxed max-w-lg">
                  {currentStep.summary}
                </p>

                {/* 2x2 Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 my-6 sm:my-7">
                  {currentStep.features.map((feature, idx) => {
                    const FeatIcon = feature.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-transparent rounded-2xl border border-neutral-200/70 p-2 sm:p-2.5 hover:bg-white/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-purple-200/80 transition-all flex items-start gap-2.5 group"
                      >
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                            feature.iconBg,
                            feature.iconColor
                          )}
                        >
                          <FeatIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                            {feature.title}
                          </span>
                          <span className="text-[11px] text-neutral-500 leading-snug mt-0.5">
                            {feature.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action Row: Primary Next Step Button + Overview */}
                <div className="flex items-center gap-4 sm:gap-6 pt-2 flex-wrap">
                  {/* Primary Button */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#831843] hover:bg-[#6e1336] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#831843]/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 group"
                  >
                    <span>
                      {activeStepIndex === STEPS.length - 1
                        ? "Start Your Project"
                        : `Next Step: ${currentStep.nextStepName}`}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* RIGHT COLUMN: 3D Visual Scene Composition */}
              {/* ------------------------------------------------------------- */}
                <StepVisual activeStepIndex={activeStepIndex} />
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Bottom Trust & Quality Seal */}
        <div className="mt-8 pt-5 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dedicated senior engineers · Direct communication · Production warranty.</span>
          </div>

          <span className="text-[11px] text-neutral-400 tracking-wider uppercase">
            SimpleThink · Engineering Framework
          </span>
        </div>

      </div>
    </section>
  );
}
