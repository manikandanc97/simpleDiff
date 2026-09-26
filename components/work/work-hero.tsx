"use client";

import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import { NextJsIcon, FigmaIcon } from "./tech-icons";

export function WorkHero() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
      {/* ── Left Floating Badges (Desktop) ── */}
      <div className="hidden xl:block absolute left-2 2xl:left-8 top-0 pointer-events-none z-10">
        <div className="flex flex-col items-center">
          {/* Handwritten Note */}
          <span
            className="font-handwriting text-2xl text-[#524E59] font-bold -rotate-6 select-none tracking-wide text-center leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            From<br />Idea to Product
          </span>

          {/* Hand-drawn Pink Arrow */}
          <svg
            className="w-10 h-10 text-[#D8287A] mt-1 -rotate-12"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6 C 12 18, 16 28, 28 32"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M20 33 L 28 32 L 27 24"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Floating Next.js Card */}
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [-4, -1, -4] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-white/90 flex items-center justify-center p-3 relative mt-3 pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <NextJsIcon className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Floating TypeScript Blue Card */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [6, 9, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-[#007ACC] shadow-[0_12px_28px_rgba(0,122,204,0.28)] flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter border border-[#3395DB] mt-4 pointer-events-auto"
          >
            TS
          </motion.div>
        </div>
      </div>

      {/* ── Right Floating Badges (Desktop) ── */}
      <div className="hidden xl:block absolute right-2 2xl:right-8 top-0 pointer-events-none z-10">
        <div className="flex flex-col items-center">
          {/* Scalable Digital Products Card */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [1, -1, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-2xl px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-[#ECE5EB] flex items-center gap-3 pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4B72]/15 to-[#FF7B92]/15 flex items-center justify-center text-[#D8287A]">
              <BarChart3 size={18} className="text-[#D8287A]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-[#121114]">Scalable</div>
              <div className="text-[11px] font-medium text-[#706B78]">Digital Products</div>
            </div>
          </motion.div>

          {/* Floating Figma Card */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [-5, -2, -5] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            className="w-16 h-16 rounded-2xl bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#ECE5EB] flex items-center justify-center p-3.5 mt-5 pointer-events-auto"
          >
            <FigmaIcon className="w-7 h-7" />
          </motion.div>

          {/* Hand-drawn Arrow towards Figma */}
          <svg
            className="w-10 h-10 text-[#D8287A] mt-2 rotate-12"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 8 C 26 20, 22 28, 14 30"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M13 22 L 14 30 L 22 29"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Handwritten Note */}
          <span
            className="font-handwriting text-2xl text-[#524E59] font-bold rotate-3 select-none tracking-wide text-center leading-tight mt-1"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Ideas<br />into Impact
          </span>
        </div>
      </div>

      {/* ── Center Hero Content ── */}
      <div className="max-w-3xl mx-auto text-center relative z-20">
        {/* Badge: OUR WORK */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EDDFEB] shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md mb-5">
          <span className="w-2 h-2 rounded-full bg-[#D8287A] animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider text-[#2A2330] uppercase">
            Our Work
          </span>
        </div>

        {/* Main Headline with Brush Underline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#121114] tracking-tight leading-[1.12]">
          Real Projects.{" "}
          <span className="relative inline-block text-[#922F55]">
            Real Impact.
            {/* Hand-drawn Hot Pink Brush Underline */}
            <svg
              className="absolute -bottom-2.5 left-0 w-full h-3 text-[#D8287A] overflow-visible pointer-events-none"
              viewBox="0 0 240 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8.5C52 3.5 142 2.5 236 7.5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 10C72 6 162 5.5 224 9.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#64606D] max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal">
          A curated selection of our finest digital products, platforms, and experiences engineered end-to-end.
        </p>
      </div>
    </div>
  );
}
