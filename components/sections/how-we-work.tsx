"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Lightbulb,
  Pencil,
  Code2,
  Rocket,
  Users,
  Target,
  FileText,
  Layers,
  Play,
  BarChart2,
  BarChart3,
  CheckCircle2,
  GitFork,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  X,
  Palette,
  Type,
  MousePointer2,
  Smartphone,
  Database,
  Server,
  TerminalSquare,
  Activity,
  TrendingUp,
  Globe,
  Wifi,
  MonitorPlay,
  LayoutTemplate
} from "lucide-react";
import { useLead } from "@/components/leads/lead-provider";
import { cn } from "@/lib/utils";

interface StepFeature {
  icon: typeof Users;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
}

interface StepConfig {
  id: string;
  number: string;
  stepKicker: string;
  title: string;
  subtitle: string;
  icon: typeof Lightbulb;
  headlineFirst: string;
  headlineAccent: string;
  summary: string;
  features: StepFeature[];
  nextStepName: string;
  imageSrc?: string;
}

const STEPS: StepConfig[] = [
  {
    id: "discover",
    number: "01",
    stepKicker: "STEP 01 / 04",
    title: "Discover",
    subtitle: "Understand & Plan",
    icon: Lightbulb,
    headlineFirst: "Understand",
    headlineAccent: "before we build.",
    summary:
      "We take time to understand your business, users and goals. This helps us create a clear roadmap and technical blueprint for a successful product.",
    features: [
      {
        icon: Users,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Business Goals",
        desc: "Understand your vision and market opportunity.",
      },
      {
        icon: Target,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "User Research",
        desc: "Identify user needs and key problem areas.",
      },
      {
        icon: FileText,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Project Scope",
        desc: "Define features, timeline and required resources.",
      },
      {
        icon: Layers,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Technical Blueprint",
        desc: "Plan architecture and scalability for the future.",
      },
    ],
    nextStepName: "Design",
    imageSrc: "/images/process/discover.png",
  },
  {
    id: "design",
    number: "02",
    stepKicker: "STEP 02 / 04",
    title: "Design",
    subtitle: "UI/UX & Prototype",
    icon: Pencil,
    headlineFirst: "Clarity before a single line",
    headlineAccent: "of code.",
    summary:
      "Interactive Figma prototypes and a production token library. You test and validate the screens and interactions before development begins.",
    features: [
      {
        icon: Layers,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Interactive Flows",
        desc: "Clickable prototypes validating real user journeys.",
      },
      {
        icon: Sparkles,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Design Tokens",
        desc: "Strict color, typography, and spacing system.",
      },
      {
        icon: Target,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Design Systems",
        desc: "Reusable component library with accessibility built-in.",
      },
      {
        icon: Users,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Usability Testing",
        desc: "Pre-code feedback loops with real stakeholder testing.",
      },
    ],
    nextStepName: "Engineer",
    imageSrc: "/images/process/design.png",
  },
  {
    id: "engineer",
    number: "03",
    stepKicker: "STEP 03 / 04",
    title: "Engineer",
    subtitle: "Build & Integrate",
    icon: Code2,
    headlineFirst: "Production code, built",
    headlineAccent: "to scale.",
    summary:
      "Next.js App Router, TailwindCSS, TypeScript, and serverless backend architecture. Demo deployments let you watch the product come alive.",
    features: [
      {
        icon: Code2,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Modern Stack",
        desc: "Next.js 15, TypeScript, Tailwind, and serverless backend.",
      },
      {
        icon: Clock,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Weekly Staging Builds",
        desc: "Live demo environments to test sprint deliverables.",
      },
      {
        icon: ShieldCheck,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Clean Architecture",
        desc: "Secure endpoints, structured databases, and clean code.",
      },
      {
        icon: Rocket,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "CI/CD Pipelines",
        desc: "Automated test suites and zero-downtime deployments.",
      },
    ],
    nextStepName: "Launch",
    imageSrc: "/images/process/engineer.png",
  },
  {
    id: "launch",
    number: "04",
    stepKicker: "STEP 04 / 04",
    title: "Launch",
    subtitle: "Deploy & Grow",
    icon: Rocket,
    headlineFirst: "Launch day is step one,",
    headlineAccent: "not the finish line.",
    summary:
      "DNS cutover, SEO indexing check, telemetry dashboards, and post-launch support to ensure a smooth transition to production.",
    features: [
      {
        icon: Rocket,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Production Cutover",
        desc: "Secure SSL, DNS propagation, and edge caching.",
      },
      {
        icon: Target,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "SEO & Analytics",
        desc: "Sitemaps, structured data, and real-time tracking.",
      },
      {
        icon: ShieldCheck,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Performance Audits",
        desc: "Sub-second load times and 95+ Core Web Vitals.",
      },
      {
        icon: Users,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Post-Launch Warranty",
        desc: "30 days dedicated support and ongoing maintenance.",
      },
    ],
    nextStepName: "Start Project",
    imageSrc: "/images/process/launch.png",
  },
];

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
      className="relative py-16 sm:py-20 lg:py-24 bg-[#FCFBF9] border-t border-[#EAE6DF] overflow-hidden select-none"
    >
      {/* Soft Pastel Background Ambient Accents */}
      <div className="pointer-events-none absolute -top-12 -left-12 w-[420px] h-[420px] rounded-full bg-rose-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-16 w-[480px] h-[480px] rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-[360px] h-[360px] rounded-full bg-pink-100/40 blur-3xl" />

      {/* Decorative Dotted Grid Accents */}
      <div className="hidden lg:block pointer-events-none absolute top-16 left-8 w-28 h-28 hero-dots opacity-40" />
      <div className="hidden lg:block pointer-events-none absolute top-1/2 left-3 w-20 h-28 hero-dots opacity-35" />
      <div className="hidden lg:block pointer-events-none absolute top-28 right-10 w-24 h-24 hero-dots opacity-35" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER (Center Aligned, matching reference) */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F4] border border-[#FECDD3] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
            <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#BE123C] uppercase">
              OUR PROCESS
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-satoshi font-black text-4xl sm:text-5xl lg:text-[56px] text-neutral-900 tracking-tight leading-[1.08]">
            How We {" "}
            <span className="bg-gradient-to-r from-[#6C2BB8] via-[#9333EA] to-[#DB2777] bg-clip-text text-transparent">
              Work.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-neutral-500 font-normal text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A clear 4-step delivery process to turn your ideas into real, scalable digital products.
            <br className="hidden sm:inline" /> No confusion. No black boxes. Just results.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* STEPPER NAVIGATION BAR (Horizontal connected flow) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 overflow-x-auto py-4 -my-4 px-4 -mx-4 scrollbar-none">
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
              <div className="lg:col-span-6 relative flex items-end justify-center">
                
                {/* Soft Radial Ambient Behind Graphic */}
                <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-pink-300/25 via-purple-200/20 to-rose-300/25 rounded-full blur-3xl" />

                {activeStepIndex === 0 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Project Blueprint" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Project Blueprint
                        </span>
                      </div>

                      {/* Blueprint Flowchart Diagram */}
                      <div className="flex flex-col items-center">
                        {/* Root Node */}
                        <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                          <Users className="w-3 h-3 text-purple-600" />
                          <span>Business Goals</span>
                        </div>

                        {/* Branching SVG Lines */}
                        <svg className="w-40 sm:w-48 h-4 text-neutral-200" viewBox="0 0 200 16" fill="none">
                          <path d="M 100 0 L 100 8 M 30 8 L 170 8 M 30 8 L 30 16 M 170 8 L 170 16" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        {/* Child Nodes Row */}
                        <div className="flex items-center justify-between w-full max-w-[220px] sm:max-w-[260px] gap-2">
                          <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                            <Target className="w-3 h-3 text-rose-500" />
                            <span>User Research</span>
                          </div>
                          <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                            <FileText className="w-3 h-3 text-purple-600" />
                            <span>Feature Scope</span>
                          </div>
                        </div>

                        {/* Converging SVG Lines */}
                        <svg className="w-40 sm:w-48 h-4 text-neutral-200" viewBox="0 0 200 16" fill="none">
                          <path d="M 30 0 L 30 8 M 170 0 L 170 8 M 30 8 L 170 8 M 100 8 L 100 16" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        {/* Bottom Node */}
                        <div className="bg-white border border-neutral-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                          <Layers className="w-3 h-3 text-blue-600" />
                          <span>Technical Plan</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note (Top-Left of Blueprint) */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Ideas
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Business Goals</div>
                        <div>• Target Audience</div>
                      </div>

                      {/* Hand-drawn Red Arrow pointing to Blueprint */}
                      <svg
                        className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M 6 4 C 10 12, 14 16, 22 22"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 14 22 L 22 22 L 20 14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation (Top-Right) */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        From Strategy <br /> to Product
                      </span>
                      {/* Curved Red Arrow pointing to Market Research */}
                      <svg
                        className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M 4 18 C 10 10, 18 10, 24 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 16 6 L 24 6 L 22 14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Market Research" Card (Right Side) */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-40 sm:w-48 pointer-events-none select-none"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Market Research
                        </span>
                        <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E11D48]" />
                      </div>

                      {/* Skeletal bars */}
                      <div className="space-y-1 mb-2.5">
                        <div className="w-14 h-1.5 bg-neutral-200/80 rounded-full" />
                        <div className="w-8 h-1.5 bg-neutral-100 rounded-full" />
                      </div>

                      {/* Checklist items */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            Competitor Analysis
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            User Insights
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                            Feature Prioritization
                          </span>
                        </div>
                      </div>

                      {/* Downward Hand-drawn Arrow */}
                      <svg
                        className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12"
                        viewBox="0 0 32 48"
                        fill="none"
                      >
                        <path
                          d="M 12 4 C 12 20, 20 30, 20 44"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 12 36 L 20 44 L 28 36"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Handwritten Sticky Badge (Bottom-Right) */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Clear Plan <br /> Better Results
                      </span>
                    </motion.div>

                    {/* Layer 6: Foreground 3D Character at Desk (discover.png) */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/images/process/discover.png"
                        alt="Discover Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 1 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Design System" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Design System
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col items-center gap-4">
                        {/* Colors */}
                        <div className="flex items-center gap-2 bg-white border border-neutral-100 rounded-full px-3 py-2 shadow-sm">
                          <div className="w-5 h-5 rounded-full bg-[#E11D48] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#9333EA] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#3B82F6] shadow-inner" />
                          <div className="w-5 h-5 rounded-full bg-[#10B981] shadow-inner" />
                        </div>

                        <svg className="w-32 h-4 text-neutral-200" viewBox="0 0 100 16" fill="none">
                          <path d="M 50 0 L 50 16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>

                        {/* Typography */}
                        <div className="bg-white border border-neutral-100 rounded-2xl px-5 py-3 shadow-sm flex flex-col items-center">
                           <span className="font-satoshi font-black text-2xl text-neutral-900">Aa</span>
                           <span className="text-[10px] text-neutral-500 font-medium">Satoshi / Inter</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Pencil className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          UI / UX
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Pixel Perfect</div>
                        <div>• User First</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        Beautiful & <br /> Intuitive
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Components" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-40 sm:w-48 pointer-events-none select-none"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Components
                        </span>
                        <LayoutTemplate className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      </div>
                      
                      <div className="space-y-2">
                        {/* Fake button */}
                        <div className="w-full h-6 bg-[#E11D48] rounded-md flex items-center justify-center">
                          <div className="w-8 h-1 bg-white/50 rounded-full" />
                        </div>
                        {/* Fake Input */}
                        <div className="w-full h-6 bg-neutral-100 border border-neutral-200 rounded-md flex items-center px-2">
                          <div className="w-12 h-1 bg-neutral-300 rounded-full" />
                        </div>
                        {/* Fake Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-1 bg-neutral-200 rounded-full" />
                          <div className="w-6 h-3 bg-purple-500 rounded-full relative">
                             <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <MousePointer2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Interactive <br /> Prototypes
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/images/process/design.png"
                        alt="Design Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 2 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Architecture" Window Card */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Architecture
                        </span>
                      </div>

                      {/* Content Flow */}
                      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2">
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">DB</span>
                         </div>
                         <svg className="w-6 sm:w-10 h-4 text-neutral-300" viewBox="0 0 40 16" fill="none">
                           <path d="M 0 8 L 40 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                         </svg>
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <Server className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">API</span>
                         </div>
                         <svg className="w-6 sm:w-10 h-4 text-neutral-300" viewBox="0 0 40 16" fill="none">
                           <path d="M 0 8 L 40 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                         </svg>
                         <div className="bg-white border border-neutral-100 rounded-xl p-2 sm:p-3 shadow-sm flex flex-col items-center gap-1">
                           <MonitorPlay className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                           <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600">CLIENT</span>
                         </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Code2 className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Tech Stack
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• Next.js 15</div>
                        <div>• TypeScript</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        Built to <br /> Scale
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Terminal" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-[#1E1E1E]/95 backdrop-blur-md rounded-2xl border border-neutral-700 shadow-xl shadow-neutral-900/10 p-3 sm:p-4 z-10 w-44 sm:w-52 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="font-mono text-[10px] text-neutral-400 ml-2">bash</span>
                      </div>
                      
                      <div className="font-mono text-[10px] sm:text-[11px] space-y-1">
                        <div className="text-white"><span className="text-pink-500">$</span> npm run build</div>
                        <div className="text-neutral-400">Compiling...</div>
                        <div className="text-emerald-400">✓ Compiled successfully in 2.1s</div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Zero <br /> Downtime
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/images/process/engineer.png"
                        alt="Engineer Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
                {activeStepIndex === 3 && (
                  <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-end justify-center overflow-visible">
                    
                    {/* Layer 1: Floating "Dashboard" Window Card (Live & Growing) */}
                    <motion.div 
                      animate={{ y: [-3, 3, -3], rotate: [-1, -1, -1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 w-fit sm:top-30 bottom-10 sm:bottom-6 left-1 sm:left-4 right-6 sm:right-16 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-6 z-0 overflow-hidden select-none flex flex-col items-center"
                    >
                      {/* Window Header */}
                      <div className="w-full flex items-center gap-2 mb-3 sm:mb-4 ml-4 sm:ml-8">
                        <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981]" />
                        <span className="font-bold text-[13px] sm:text-[15px] text-[#1E293B] tracking-tight">
                          Live & Growing
                        </span>
                      </div>

                      {/* Content Flow */}
                      <div className="flex flex-col items-center w-full max-w-[200px] sm:max-w-[240px]">
                        <div className="flex items-center justify-between w-full mb-2">
                           <div className="flex flex-col">
                              <span className="text-[10px] text-neutral-500 font-semibold uppercase">Active Users</span>
                              <span className="text-xl sm:text-2xl font-black text-neutral-900">10.4k</span>
                           </div>
                           <div className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> +42%
                           </div>
                        </div>
                        {/* Fake Line Chart */}
                        <svg className="w-full h-12" viewBox="0 0 200 40" fill="none">
                          <path d="M 0 35 Q 20 30 40 25 T 80 15 T 120 20 T 160 5 T 200 0" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#9333EA" />
                              <stop offset="1" stopColor="#E11D48" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Layer 2: Yellow Sticky Note */}
                    <motion.div 
                      animate={{ y: [-4, 4, -4], rotate: [-8, -4, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute top-8 sm:top-8 -left-4 sm:-left-6 bg-[#FFF9C4]/95 border border-[#FFF176] rounded-xl p-2 sm:p-2.5 shadow-md shadow-amber-900/10 z-10 w-28 sm:w-36 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Rocket className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-neutral-800">
                          Go Live
                        </span>
                      </div>
                      <div className="font-handwriting text-[10px] sm:text-xs text-neutral-700 leading-tight space-y-0.5">
                        <div>• SEO Ready</div>
                        <div>• Fast Load</div>
                      </div>
                      <svg className="absolute -bottom-4 right-1 w-6 h-6 text-[#E11D48]" viewBox="0 0 28 28" fill="none">
                        <path d="M 6 4 C 10 12, 14 16, 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 14 22 L 22 22 L 20 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 3: Handwritten Annotation */}
                    <motion.div 
                      animate={{ y: [2, -2, 2], rotate: [-2, 0, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-18 right-10 sm:right-52 z-10 text-right pointer-events-none select-none"
                    >
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-[#E11D48] tracking-tight block transform -rotate-3 leading-tight">
                        We are <br /> Live!
                      </span>
                      <svg className="w-6 h-6 text-[#E11D48] ml-auto -mt-1 transform rotate-12" viewBox="0 0 28 28" fill="none">
                        <path d="M 4 18 C 10 10, 18 10, 24 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 16 6 L 24 6 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Floating "Server Status" Card */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-18 -right-4 sm:-right-6 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-900/5 p-3 sm:p-4 z-10 w-44 sm:w-52 pointer-events-none select-none"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-bold text-[11px] sm:text-xs text-neutral-800">
                          Server Status
                        </span>
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">SSL</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">Active</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">CDN</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">Global</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600">Uptime</span>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-neutral-800">99.9%</span></div>
                        </div>
                      </div>

                      <svg className="absolute -bottom-10 sm:-bottom-12 left-10 sm:left-14 w-8 h-12 sm:w-10 sm:h-14 text-[#E11D48] transform -rotate-12" viewBox="0 0 32 48" fill="none">
                        <path d="M 12 4 C 12 20, 20 30, 20 44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M 12 36 L 20 44 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Layer 5: Sticky Badge */}
                    <motion.div 
                      animate={{ y: [3, -3, 3], rotate: [1, 3, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                      className="absolute bottom-20 sm:bottom-30 -right-1 sm:right-3 bg-white/95 rounded-xl border border-neutral-200/90 shadow-md p-1.5 px-2.5 flex items-center gap-1.5 z-20 pointer-events-none select-none"
                    >
                      <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-handwriting font-bold text-xs text-neutral-800 leading-tight">
                        Sub-second <br /> Load
                      </span>
                    </motion.div>

                    {/* Layer 6: Image */}
                    <div className="relative z-20 w-full flex items-end justify-center pointer-events-none">
                      <Image
                        src="/images/process/launch.png"
                        alt="Launch Phase - SimpleThink"
                        width={1774}
                        height={887}
                        priority
                        className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-xl select-none"
                      />
                    </div>
                  </div>
                )}
              </div>
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
