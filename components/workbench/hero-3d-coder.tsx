"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface Hero3DCoderProps {
  className?: string;
}

export function Hero3DCoder({ className }: Hero3DCoderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), {
    stiffness: 150,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), {
    stiffness: 150,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full h-[320px] xs:h-[350px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center justify-center select-none perspective-[1200px] max-w-[620px] mx-auto",
        className
      )}
    >
      {/* ── AMBIENT PURPLE & PINK GLOWS ── */}
      <div className="absolute top-4 left-4 w-[220px] sm:w-[320px] md:w-[400px] h-[220px] sm:h-[320px] md:h-[400px] bg-[#E8D9FE]/60 rounded-full blur-[70px] pointer-events-none -translate-x-1/4 -translate-y-1/4 z-0" />
      <div className="absolute bottom-4 right-4 w-[180px] sm:w-[280px] md:w-[360px] h-[180px] sm:h-[280px] md:h-[360px] bg-[#F5D0E8]/50 rounded-full blur-[70px] pointer-events-none translate-x-1/4 translate-y-1/4 z-0" />

      {/* 3D Parallax Canvas */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center z-10"
      >
        {/* ── LEFT FLOATING WORKFLOW CARD (Behind desk/character) ── */}
        <div className="absolute top-[4%] sm:top-[6%] left-[-2%] xs:left-0 sm:left-2 md:left-6 lg:left-12 xl:left-16 z-0 scale-[0.56] xs:scale-[0.64] sm:scale-75 md:scale-90 lg:scale-100 origin-left pointer-events-none sm:pointer-events-auto">
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transform: "translateZ(-10px) rotateY(6deg) rotateZ(-6deg)" }}
            className="bg-white/85 backdrop-blur-xl border border-[rgba(30,24,30,0.08)] shadow-[0_16px_36px_-10px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.02)] rounded-[22px] p-3 sm:p-3.5 flex gap-2.5 sm:gap-3.5 font-satoshi relative"
          >
            {/* Menu Column */}
            <div className="flex flex-col gap-1.5 w-[85px] sm:w-[95px] justify-center">
              {/* Ideas */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-[600] text-[#68666C]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#68666C]">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
                <span>Ideas</span>
              </div>
              {/* Design */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-[600] text-[#68666C]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#68666C]">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <span>Design</span>
              </div>
              {/* Develop (Active State) */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#922F55] text-[12px] font-[600] text-white shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
                </svg>
                <span>Develop</span>
              </div>
              {/* Launch */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-[600] text-[#68666C]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#68666C]">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-2.05 9.05A22 22 0 0 1 15 12z"/>
                </svg>
                <span>Launch</span>
              </div>
            </div>

            {/* Right Code Editor Mockup */}
            <div className="w-[105px] sm:w-[125px] bg-[#1B1B1D] rounded-xl p-2.5 flex flex-col gap-1.5 relative overflow-hidden shadow-inner">
              {/* Window control dots */}
              <div className="flex gap-1 mb-1 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
              </div>
              {/* Decorative colored syntax bars */}
              {[
                { num: 12, w: "72%", c: "bg-[#F05BAD]" },
                { num: 13, w: "86%", c: "bg-[#4BA8FF]" },
                { num: 14, w: "52%", c: "bg-[#B86BFF]" },
                { num: 15, w: "78%", c: "bg-[#FFD23F]" },
                { num: 16, w: "62%", c: "bg-[#13D59B]" },
                { num: 17, w: "84%", c: "bg-[#F05BAD]" },
                { num: 18, w: "45%", c: "bg-[#4BA8FF]" },
                { num: 19, w: "68%", c: "bg-[#B86BFF]" },
              ].map((line) => (
                <div key={line.num} className="flex items-center gap-1.5">
                  <span className="text-[7.5px] text-white/30 font-mono w-2.5 text-right select-none">{line.num}</span>
                  <div className={`h-[3px] rounded-full ${line.c}`} style={{ width: line.w }} />
                </div>
              ))}
            </div>

            {/* Handwritten Annotation: From Idea to Launch */}
            <div
              className="absolute -top-11 sm:-top-12 left-2 sm:left-4 flex items-end gap-1 pointer-events-none"
              style={{ transform: "translateZ(15px)" }}
            >
              <span className="font-handwriting text-[17px] sm:text-[20px] font-bold text-[#4A3E4E] -rotate-6 leading-none whitespace-nowrap">
                From Idea<br />to Launch
              </span>
              <svg
                width="24"
                height="34"
                viewBox="0 0 40 50"
                fill="none"
                className="text-[#922F55] -mb-1"
              >
                {/* Curved arrow pointing down to workflow card */}
                <path
                  d="M5 8 C18 10, 28 22, 24 42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M17 36 L24 43 L29 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* ── CENTRAL 3D CHARACTER ── */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(25px)" }}
          className="relative z-10 w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] h-[270px] xs:h-[300px] sm:h-[380px] md:h-[440px] lg:h-[500px] flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/assets/simplehero.png"
              alt="SimpleThink 3D Developer Character"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </motion.div>

        {/* ── RIGHT FLOATING FEATURE BADGES ── */}
        <div className="absolute top-[12%] sm:top-[16%] right-[-2%] xs:right-0 sm:right-0 md:right-2 lg:-right-2 xl:-right-6 z-20 scale-[0.56] xs:scale-[0.64] sm:scale-75 md:scale-90 lg:scale-100 origin-right pointer-events-none sm:pointer-events-auto">
          <div
            className="flex flex-col gap-2.5 sm:gap-3 font-satoshi"
            style={{ transform: "translateZ(35px) rotateY(-6deg) rotateZ(4deg)" }}
          >
            {/* Card 1: Modern Design */}
            <motion.div
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/90 backdrop-blur-md border border-[rgba(30,24,30,0.08)] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.02)] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 min-w-[155px] sm:min-w-[175px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#922F55]/10 flex items-center justify-center text-[#922F55]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 10 10 0 0 0 9.5-6.5" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[13px] font-[700] text-[#121114] tracking-[-0.01em]">Modern Design</span>
            </motion.div>

            {/* Card 2: Clean Code */}
            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="bg-white/90 backdrop-blur-md border border-[rgba(30,24,30,0.08)] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.02)] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 min-w-[155px] sm:min-w-[175px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#922F55]/10 flex items-center justify-center text-[#922F55]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </div>
              <span className="text-[13px] font-[700] text-[#121114] tracking-[-0.01em]">Clean Code</span>
            </motion.div>

            {/* Card 3: Scalable Solutions */}
            <motion.div
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="bg-white/90 backdrop-blur-md border border-[rgba(30,24,30,0.08)] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.02)] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 min-w-[155px] sm:min-w-[175px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#922F55]/10 flex items-center justify-center text-[#922F55]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <span className="text-[13px] font-[700] text-[#121114] tracking-[-0.01em]">Scalable Solutions</span>
            </motion.div>

            {/* Handwritten Annotation: Ideas into Impact */}
            <div
              className="flex flex-col items-center self-end mr-2 text-[#922F55] pointer-events-none mt-0.5"
              style={{ transform: "translateZ(15px)" }}
            >
              <svg
                width="30"
                height="34"
                viewBox="0 0 50 60"
                fill="none"
                className="text-[#922F55] -mr-3"
              >
                {/* Curved arrow from card down-left to text */}
                <path
                  d="M40 5 C38 28, 25 42, 12 50"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M12 40 L10 52 L22 52"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className="font-handwriting text-[17px] sm:text-[20px] font-bold text-[#4A3E4E] -rotate-3 leading-none text-center whitespace-nowrap">
                Ideas<br />into Impact
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
