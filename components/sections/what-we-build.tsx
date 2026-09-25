"use client";

import { useLead } from "@/components/leads/lead-provider";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";

import { MobileAppsMockup, SaaSProductsMockup, WebAppsMockup, WebsitesMockup, EcommerceMockup, BrandingMockup, UIUXMockup, AutomationMockup } from './what-we-build/mockups/index';

import { SERVICES_LIST } from "@/lib/data/services";

const MOCKUPS: Record<string, React.ElementType> = {
  "websites": WebsitesMockup,
  "web-apps": WebAppsMockup,
  "ecommerce": EcommerceMockup,
  "mobile-apps": MobileAppsMockup,
  "saas": SaaSProductsMockup,
  "branding": BrandingMockup,
  "ui-ux": UIUXMockup,
  "automation": AutomationMockup,
};

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ delay, duration: 0.38, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function WhatWeBuild() {
  const { openLead } = useLead();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayServices = SERVICES_LIST.slice(0, 8);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayServices.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayServices.length) % displayServices.length);
  };

  return (
    <section
      id="capabilities"
      className="relative w-full py-16 sm:py-20 lg:py-24"
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        <SectionHeader
          eyebrow="WHAT WE BUILD"
          centered
          title={
            <>
              From Ideas to{" "}
              <span className="relative inline-block brand-gradient-text">
                Impact.
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 text-primary overflow-visible pointer-events-none"
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
            </>
          }
          description="We engineer custom software, scalable web applications, and mobile platforms — with enterprise-grade reliability and zero unnecessary overhead."
        />

        <div ref={containerRef} className="relative w-full py-2 perspective-[1400px] overflow-visible">
          <div className="flex items-center justify-center min-h-80 sm:min-h-96 relative w-full">
            {displayServices.map((service, index) => {
              let offset = index - activeIndex;
              const half = Math.floor(displayServices.length / 2);
              if (offset > half) offset -= displayServices.length;
              if (offset < -half) offset += displayServices.length;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              const MockupComponent = MOCKUPS[service.id];
              const IconComponent = service.icon;

              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    x: `${offset * 70}%`,
                    scale: isActive ? 1 : 0.75,
                    rotateY: offset * -10,
                    z: isActive ? 100 : -100,
                    opacity: isActive ? 1 : isVisible ? 0.4 : 0,
                    filter: isActive
                      ? "blur(0px) brightness(1)"
                      : isVisible
                      ? "blur(1.5px) brightness(0.92)"
                      : "blur(4px) brightness(0.8)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 36,
                    mass: 0.75,
                    filter: { type: "tween", duration: 0.35, ease: "easeOut" },
                    opacity: { type: "tween", duration: 0.3, ease: "easeOut" },
                  }}
                  className={cn(
                    "absolute top-0 w-full max-w-3xl lg:max-w-4xl rounded-3xl p-6 sm:p-8 lg:p-10 font-satoshi cursor-pointer",
                    "backdrop-blur-2xl border",
                    isActive
                      ? "bg-white/95 border-[rgba(146,47,85,0.15)] z-30 pointer-events-auto"
                      : "bg-white/55 border-[rgba(30,24,30,0.05)] z-10 pointer-events-auto"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(146,47,85,0.07), 0 20px 60px -10px rgba(146,47,85,0.2), 0 8px 24px -4px rgba(0,0,0,0.07)"
                      : "0 4px 16px -4px rgba(0,0,0,0.05)",
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.06}
                  dragTransition={{ bounceStiffness: 450, bounceDamping: 45, power: 0.15, timeConstant: 160 }}
                  whileDrag={{ cursor: "grabbing", scale: isActive ? 0.98 : 0.73 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    const velocityX = velocity.x;
                    if (swipe < -40 || velocityX < -500) {
                      handleNext();
                    } else if (swipe > 40 || velocityX > 500) {
                      handlePrev();
                    }
                  }}
                >
                  {/* Ambient glow — only on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      aria-hidden
                    >
                      <motion.div
                        className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${service.brandColor}22 0%, transparent 70%)`,
                        }}
                        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center w-full relative z-10">
                    <div className="md:col-span-7 flex flex-col items-start text-left">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={`content-${service.id}`}
                            className="flex flex-col items-start w-full gap-5"
                          >
                            {/* Number + Icon */}
                            <FadeUp delay={0} className="flex items-center gap-3">
                              <span
                                className="text-2xl sm:text-3xl font-black tracking-tight leading-none font-mono"
                                style={{ color: service.brandColor }}
                              >
                                {service.number}
                              </span>
                              <motion.div
                                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
                                style={{ backgroundColor: `${service.brandColor}1A`, color: service.brandColor }}
                                whileHover={{ rotate: 8, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              >
                                <IconComponent className="w-4 h-4 stroke-[2.2]" />
                              </motion.div>
                            </FadeUp>

                            {/* Title */}
                            <FadeUp delay={0.07}>
                              <h3 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold tracking-tighter text-[#121114] leading-tight">
                                {service.name}
                              </h3>
                            </FadeUp>

                            {/* Description */}
                            <FadeUp delay={0.14}>
                              <p className="text-sm sm:text-base text-[#68666C] leading-relaxed font-medium">
                                {service.shortTagline}
                              </p>
                            </FadeUp>

                            {/* Tags */}
                            <FadeUp delay={0.21} className="flex flex-wrap gap-2">
                              {service.deliverables?.map((item, i) => (
                                <motion.span
                                  key={i}
                                  className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-[rgba(30,24,30,0.06)] text-xs font-semibold text-[#121114]/85 tracking-tight"
                                  initial={{ opacity: 0, scale: 0.88 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.26 + i * 0.055, duration: 0.3, ease: "easeOut" }}
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </FadeUp>

                            {/* CTA */}
                            <FadeUp delay={0.28}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLead({
                                    source: "what-we-build",
                                    description: `Interested in: ${service.name}.`,
                                  });
                                }}
                                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#922F55] text-white text-sm font-bold hover:bg-[#7D2748] active:scale-95 transition-all shadow-[0_4px_16px_rgba(146,47,85,0.28)]"
                              >
                                <span>Explore {service.name}</span>
                                <AnimatedArrowRight size={15} className="text-white" />
                              </button>
                            </FadeUp>
                          </motion.div>
                        )}

                        {/* Inactive — show minimal skeleton-like hint */}
                        {!isActive && (
                          <motion.div
                            key={`inactive-${service.id}`}
                            className="flex flex-col items-start w-full gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="text-2xl sm:text-3xl font-black tracking-tight leading-none font-mono"
                                style={{ color: service.brandColor }}
                              >
                                {service.number}
                              </span>
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${service.brandColor}1A`, color: service.brandColor }}
                              >
                                <IconComponent className="w-4 h-4 stroke-[2.2]" />
                              </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#121114] leading-tight">
                              {service.name}
                            </h3>
                            <p className="text-sm text-[#68666C] leading-relaxed font-medium line-clamp-2">
                              {service.shortTagline}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="md:col-span-5 flex items-center justify-center relative w-full">
                      <motion.div
                        className="w-full"
                        animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.92, opacity: 0.6, y: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      >
                        <div className="w-full max-w-xs h-64 mx-auto flex items-center justify-center px-3">
                          <MockupComponent isActive={isActive} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between max-w-4xl mx-auto px-2 font-satoshi w-full">
          <div className="flex items-center gap-2 text-[#68666C]">
            <span className="text-xs sm:text-sm font-semibold text-[#68666C] select-none">
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

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {displayServices.map((svc, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                animate={{
                  width: activeIndex === i ? 28 : 8,
                  backgroundColor: activeIndex === i ? "#922F55" : "#CBD5E1",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="h-1.5 rounded-full cursor-pointer"
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2.5">
            <motion.button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full bg-white border border-[rgba(30,24,30,0.08)] shadow-sm text-[#121114] flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full bg-white border border-[rgba(30,24,30,0.08)] shadow-sm text-[#121114] flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
