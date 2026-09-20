"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLead } from "@/components/leads/lead-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import {
  AnimatedArrowRight,
  AnimatedMail,
  AnimatedMessageSquare,
} from "@/components/ui/animated-icon";
import { SITE } from "@/lib/site";
import { LaunchIllustration } from "@/components/ui/clay-3d/clay-illustrations";

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
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden border-t border-border"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Start Your Build
          </span>
        </motion.div>

        {/* 3D Claymorphic Launch Illustration (Dynamic theme color) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="w-48 sm:w-56 -mb-4 relative z-10"
        >
          <LaunchIllustration />
        </motion.div>

        {/* Scaled-down Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-5 leading-[1.05] uppercase select-none"
        >
          Got Something
          <br />
          In <span className="text-primary transition-colors duration-500">Mind?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-2xl font-medium tracking-tight text-muted-foreground mb-8 max-w-xl"
        >
          Let&apos;s make it <span className="text-foreground font-semibold">simple</span>.
          <br />
          Let&apos;s think it{" "}
          <span className="text-primary font-bold transition-colors duration-500">different.</span>
        </motion.div>

        {/* Dedicated Section Theme Dock Slot for Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <SectionDockSlot sectionId="cta" label="Final CTA" />
        </motion.div>

        {/* Main Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Button
            size="lg"
            onClick={handleStart}
            id="cta-start-project"
            className="group/button h-14 px-10 rounded-full text-base font-bold tracking-tight shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center gap-2.5"
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
