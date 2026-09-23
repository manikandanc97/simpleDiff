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

export function WorkbenchHero() {
  const { openLead } = useLead();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for glow orbs
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -50]);
  const orbY3 = useTransform(scrollY, [0, 600], [0, -30]);

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
      className="relative min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-7rem)] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Studio Architectural Grid Accents & Precision Coordinates ── */}
      <HeroGridAccents />

      <div className="relative z-10 flex flex-col items-center justify-center pt-2 sm:pt-4 md:pt-6 pb-16 sm:pb-20 px-4 md:px-8 w-full max-w-7xl mx-auto my-auto flex-1">
        {/* Top Hero: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          {/* Left Column: Headlines, Pitch, Chips, and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 2. Single h1 for entire page — standardized H1 typography */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-black tracking-tight text-foreground mb-3 sm:mb-4 lg:mb-5 leading-[1.08]">
              <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 mb-1.5 sm:mb-2">
                <AnimatedWord word="Think" delay={0.05} />
                <AnimatedWord word="Simple." delay={0.12} className="text-primary transition-colors duration-500" />
              </span>
              <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3">
                <AnimatedWord word="Build" delay={0.28} />
                <AnimatedWord word="Premium." delay={0.38} />
              </span>
            </h1>

            {/* 3. Lead Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mb-4 sm:mb-6 leading-relaxed font-normal"
            >
              We design, engineer, and deploy custom software, enterprise web applications, mobile apps, and scalable SaaS platforms for businesses and founders.
            </motion.p>

            {/* 4. Service chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-5 sm:mb-7 max-w-xl"
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
              className="flex flex-col sm:flex-row items-center gap-3 mb-2 sm:mb-4"
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

      {/* Interactive scroll indicator button */}
      <motion.button
        type="button"
        id="hero-scroll-indicator"
        aria-label="Scroll down to explore capabilities"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-muted-foreground/60 hover:text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-3 py-1.5 transition-all select-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 group-hover:text-primary group-hover:tracking-[0.2em] transition-all duration-300">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 rounded-full border border-border/70 group-hover:border-primary/50 group-hover:bg-primary/10 flex items-center justify-center transition-colors shadow-xs"
        >
          <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
