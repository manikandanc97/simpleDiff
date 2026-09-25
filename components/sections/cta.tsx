"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";

import {
  AnimatedArrowRight,
  AnimatedMail,
  AnimatedMessageSquare,
} from "@/components/ui/animated-icon";
import { SITE } from "@/lib/site";
import Image from "next/image";

interface CTAProps {
  onStartProject?: () => void;
}

export function CTA({ onStartProject }: CTAProps) {
  const { openLead } = useLead();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "cta" });
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden border-t border-border"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" />
      <div className="pointer-events-none absolute top-[40%] left-[10%] w-[500px] h-[500px] bg-[#D81159]/15 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#8C1EFF]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Mind Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="w-full max-w-[300px] sm:max-w-[380px] relative z-10 -mb-4"
        >
          <Image
            src="/assets/simplemind.png"
            alt="From Idea to Product"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>

        {/* LET'S BUILD TOGETHER Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-border/50 text-xs sm:text-sm font-bold tracking-wide text-foreground uppercase mb-6 z-10 relative"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] animate-pulse"></span>
          Let&apos;s Build Together
        </motion.div>

        {/* Scaled Headline (64px H1/Finale Scale) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.08] uppercase select-none z-10 relative"
        >
          Got Something
          <br />
          In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D81159] to-[#8C1EFF] transition-colors duration-500">Mind?</span>
        </motion.h2>

        {/* Subtitle (Lead: 20px) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl font-medium tracking-tight text-muted-foreground mb-8 max-w-xl z-10 relative"
        >
          Let&apos;s make it <span className="text-foreground font-semibold">simple</span>.
          <br />
          Let&apos;s build it{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D81159] to-[#8C1EFF]">premium.</span>
        </motion.div>

        {/* Dedicated Section Theme Dock Slot for Final CTA */}
        {/* Main Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 z-10 relative"
        >
          <Button
            size="lg"
            onClick={handleStart}
            id="cta-start-project"
            className="group/button h-14 px-10 rounded-full text-base font-bold tracking-tight shadow-xl shadow-pink-500/20 hover:shadow-pink-500/35 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center gap-2.5 bg-gradient-to-r from-[#D81159] to-[#8C1EFF] hover:from-[#C01050] hover:to-[#7B1AD9] text-white border-0"
          >
            <span>Start a project</span>
            <AnimatedArrowRight size={18} />
          </Button>
        </motion.div>

        {/* Direct Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/50 w-full max-w-md"
        >
          {SITE.email && (
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-2 hover:text-primary active:scale-95 transition-all font-medium"
            >
              <AnimatedMail size={16} className="text-primary" />
              <span>{SITE.email}</span>
            </a>
          )}
          {SITE.whatsapp && (
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-primary active:scale-95 transition-all font-medium"
            >
              <AnimatedMessageSquare size={16} className="text-primary" />
              <span>WhatsApp Direct</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
