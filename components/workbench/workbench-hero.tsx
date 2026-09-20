"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { ChevronDown } from "lucide-react";
import {
  AnimatedArrowRight,
  AnimatedBriefcase,
} from "@/components/ui/animated-icon";
import { HeroGridAccents } from "./hero-grid-accents";
import { Hero3DCoder } from "./hero-3d-coder";

const SERVICE_CHIPS = [
  "Custom Software",
  "Web Applications",
  "Mobile Apps",
  "SaaS Platforms",
  "Cloud & DevOps",
  "AI Solutions",
];

interface WorkbenchHeroProps {
  onStartProject?: (prefill?: { description: string; blueprintSummary?: string }) => void;
}

function AnimatedWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("inline-block font-black tracking-tight", className)}
    >
      {word}
    </motion.span>
  );
}

// Magnetic tilt button wrapper
function MagneticButton({
  children,
  className,
  onClick,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), {
    stiffness: 400,
    damping: 30,
  });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function WorkbenchHero({ onStartProject }: WorkbenchHeroProps) {
  const { openLead } = useLead();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for glow orbs
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -50]);
  const orbY3 = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[calc(100svh-3.5rem)] flex flex-col items-center justify-center overflow-hidden"
    >
        {/* ── Animated mesh background ── */}
        <div className="pointer-events-none absolute inset-0 mesh-bg transition-colors duration-700" />

        {/* ── Subtle grid overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 60px,currentColor 60px,currentColor 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,currentColor 60px,currentColor 61px)",
          }}
        />

        {/* ── Parallax glowing orbs ── */}
        <motion.div
          style={{ y: orbY1 }}
          className="pointer-events-none absolute top-1/4 -left-32 w-72 h-72 rounded-full bg-primary/25 blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="pointer-events-none absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl"
        />
        <motion.div
          style={{ y: orbY3 }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full bg-primary/8 blur-3xl"
        />

        {/* ── Studio Architectural Grid Accents & Precision Coordinates (Unique, handcrafted) ── */}
        <HeroGridAccents />

        <div className="relative z-10 flex flex-col items-center pt-8 pb-16 px-4 md:px-8 w-full max-w-7xl mx-auto">
          {/* Top Hero: 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full pt-2 sm:pt-4">
            {/* Left Column: Headlines, Pitch, Chips, and CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* 2. Single h1 for entire page — refined font-black bold typography */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.1]">
                <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 mb-2">
                  <AnimatedWord word="Keep" delay={0.05} />
                  <AnimatedWord word="It" delay={0.12} />
                  <AnimatedWord word="Simple." delay={0.19} className="text-primary" />
                </span>
                <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3">
                  <AnimatedWord word="Make" delay={0.28} />
                  <AnimatedWord word="It" delay={0.33} />
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block font-black"
                  >
                    <span className="text-primary transition-colors duration-500 font-black">Different.</span>
                  </motion.span>
                </span>
              </h1>

              {/* 3. Sub-line */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed font-normal"
              >
                We design, engineer, and deploy custom software, enterprise web applications, mobile apps, and scalable SaaS platforms for businesses and founders.
              </motion.p>

              {/* 4. Service chips */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 max-w-xl"
              >
                {SERVICE_CHIPS.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                    className="px-3 py-1 rounded-full text-xs sm:text-sm bg-muted/40 border border-border text-foreground font-medium select-none hover:bg-primary/10 hover:border-primary/40 hover:text-primary-text transition-colors duration-200 cursor-default"
                  >
                    {chip}
                  </motion.span>
                ))}
                <Link
                  href="/services"
                  className="group text-xs sm:text-sm text-primary hover:underline font-medium ml-1 transition-colors flex items-center gap-1"
                >
                  <span>See all</span>
                  <AnimatedArrowRight size={12} />
                </Link>
              </motion.div>

              {/* 5. CTA buttons — primary uses magnetic tilt */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-3 mb-7"
              >
                <MagneticButton
                  id="hero-start-project"
                  onClick={() => openLead({ source: "cta" })}
                  className="group relative inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:shadow-primary/30 active:scale-95 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 animate-shimmer pointer-events-none" />
                  <span>Start a project</span>
                  <AnimatedArrowRight size={16} />
                </MagneticButton>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 h-12 px-7 rounded-full border border-border bg-background/60 backdrop-blur-sm text-sm font-semibold text-foreground hover:bg-muted/60 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-200"
                >
                  <AnimatedBriefcase size={15} className="text-primary/80 group-hover:text-primary transition-colors" />
                  <span>See our work</span>
                </Link>
              </motion.div>

              {/* Dedicated Section Theme Dock Slot for Hero */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-2"
              >
                <SectionDockSlot sectionId="hero" label="Hero" />
              </motion.div>
            </div>

            {/* Right Column: 3D Coder Showcase with GIF-like float animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center items-center w-full"
            >
              <Hero3DCoder />
            </motion.div>
          </div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
    </section>
  );
}
