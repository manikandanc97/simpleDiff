"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MousePointer2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";

import { WebsitesMockup, WebAppsMockup, MobileAppsMockup, SaaSProductsMockup } from './what-we-build/mockups';

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
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-8 sm:mb-10 font-satoshi">
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

        <div ref={containerRef} className="relative w-full py-2 perspective-[1400px] overflow-visible">
          <div className="flex items-center justify-center min-h-[350px] sm:min-h-[380px] relative w-full">
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

        <div className="flex items-center justify-between max-w-[760px] mx-auto mt-4 sm:mt-6 px-2 font-satoshi">
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
