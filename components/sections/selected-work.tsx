"use client";

import { PROJECTS } from "@/lib/data/projects";
import { type Project } from "@/types/project";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  Maximize2,
  ShoppingCart
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";

const FILTER_TABS = ["Websites", "Web Apps", "Mobile Apps"] as const;

function GoogleIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function getProjectBadge(project: Project) {
  if (project.id === "proj-valparai") {
    return {
      bg: "bg-[#FCE4EC]",
      text: "text-[#922F55]",
      icon: null,
      label: "+ 3600% Month 1 Bookings",
    };
  }
  if (project.id === "proj-grn") {
    return {
      bg: "bg-[#EEF2FF]",
      text: "text-[#4F46E5]",
      icon: <GoogleIcon />,
      label: "#1 Google SEO Ranking",
    };
  }
  if (project.id === "proj-viha") {
    return {
      bg: "bg-[#F5F3FF]",
      text: "text-[#7C3AED]",
      icon: <ShoppingCart size={11} className="text-[#7C3AED]" />,
      label: "Pan-India Orders",
    };
  }
  if (project.id === "proj-clixprocrm") {
    return {
      bg: "bg-[#EFF6FF]",
      text: "text-[#2563EB]",
      icon: <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />,
      label: "Work In Progress",
    };
  }
  if (project.id === "proj-grn-app") {
    return {
      bg: "bg-[#FAF5FF]",
      text: "text-[#9333EA]",
      icon: <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA] animate-pulse" />,
      label: "Coming Soon",
    };
  }
  return {
    bg: "bg-slate-100",
    text: "text-slate-600",
    icon: null,
    label: project.result,
  };
}

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<string>("Websites");
  
  const clientProjects = PROJECTS.filter((p) => p.kind === "client");
  const filteredProjects = clientProjects.filter((p) => p.serviceType === activeFilter);
  const displayProjects = filteredProjects.slice(0, 3);
  
  const [activeId, setActiveId] = useState<string>(displayProjects[0]?.id || "");

  useEffect(() => {
    if (!displayProjects.find((p) => p.id === activeId) && displayProjects.length > 0) {
      setActiveId(displayProjects[0].id);
    }
  }, [activeFilter, displayProjects, activeId]);

  const activeProjectIndex = displayProjects.findIndex((p) => p.id === activeId);
  const activeProject = displayProjects[activeProjectIndex] || displayProjects[0];

  const handleNext = () => {
    if (displayProjects.length === 0) return;
    const nextIdx = (activeProjectIndex + 1) % displayProjects.length;
    setActiveId(displayProjects[nextIdx].id);
  };

  const handlePrev = () => {
    if (displayProjects.length === 0) return;
    const prevIdx = (activeProjectIndex - 1 + displayProjects.length) % displayProjects.length;
    setActiveId(displayProjects[prevIdx].id);
  };

  return (
    <section 
      id="selected-work" 
      className="relative w-full py-12 sm:py-16 lg:py-20 font-satoshi selection:bg-[#922F55]/20 selection:text-[#922F55]"
    >
      {/* ── Background Decorative Elements ── */}
      {/* 1. Left Dot Grid Matrix */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[420px] pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1.4px, transparent 1.4px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* 2. Soft Ambient Blurred Orbs */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
           
          {/* ── LEFT COLUMN: Heading & Project List ── */}
          <div className="lg:col-span-5 flex flex-col">
            <SectionHeader
              eyebrow="Our Work"
              title="Selected"
              highlightedText="Work."
              description="Live client systems and digital products engineered for measurable scale."
              className="mb-7 items-start text-left mx-0"
              maxWidth="max-w-[420px]"
            />
            {/* Project List: Max 3 Cards on Home Page */}
            <div className="flex flex-col gap-3">
              {displayProjects.map((project) => {
                const isActive = project.id === activeId;
                const badge = getProjectBadge(project);

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    className={cn(
                      "group p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer transition-all duration-300 border relative",
                      isActive
                        ? "bg-white border-[#FCE4EC] shadow-[0_12px_30px_rgba(146,47,85,0.15)] ring-1 ring-[#FCE4EC] translate-x-1.5 sm:translate-x-3 z-10"
                        : "bg-transparent border-transparent hover:bg-white/40 hover:border-slate-100 hover:translate-x-1"
                    )}
                  >
                    {/* Project Number */}
                    <span 
                      className={cn(
                        "text-[15px] sm:text-[16px] font-bold w-6 shrink-0 transition-colors",
                        isActive ? "text-[#922F55]" : "text-slate-400"
                      )}
                    >
                      {project.number}
                    </span>

                    {/* Logo (No Background) */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                      <img
                        src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${project.url}&size=128`}
                        alt={`${project.name} Logo`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                      />
                    </div>

                    {/* Content Details: Title, Badge, Description, Tags */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                      {/* Line 1: Title + Result Badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 
                          className={cn(
                            "font-bold text-[14px] sm:text-[15px] truncate tracking-tight transition-colors",
                            isActive ? "text-[#121114]" : "text-slate-800 group-hover:text-[#121114]"
                          )}
                        >
                          {project.name}
                        </h4>
                        
                        <span 
                          className={cn(
                            "text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap",
                            badge.bg,
                            badge.text
                          )}
                        >
                          {badge.icon}
                          {badge.label}
                        </span>
                      </div>

                      {/* Line 2 & 3: Description and Tech Stack (Visible only when Active) */}
                      <div className={cn(
                        "flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out",
                        isActive ? "max-h-24 opacity-100 mt-1" : "max-h-0 opacity-0"
                      )}>
                        <p className="text-[12px] sm:text-[13px] text-slate-500 truncate leading-snug">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-1.5 overflow-hidden pt-0.5">
                          {project.stack.slice(0, 3).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[9px] sm:text-[10px] bg-[#F1F5F9]/80 text-[#64748B] px-1.5 py-0.5 rounded font-medium whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Chevron Button */}
                    <div 
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
                        isActive 
                          ? "bg-[#922F55] border-[#922F55] text-white shadow-md translate-x-1" 
                          : "bg-white/80 border-slate-100 text-slate-400 group-hover:text-slate-700 shadow-sm group-hover:translate-x-1"
                      )}
                    >
                      <ChevronRight size={15} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* List Footer */}
            <div className="mt-7 flex items-center justify-between">
              <Link 
                href="/portfolio" 
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#121114] hover:text-[#922F55] transition-colors group"
              >
                View complete portfolio archive 
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[13px] font-medium text-slate-400">
                {filteredProjects.length} of {PROJECTS.length} builds
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Browser Mockup & Live Hero View ── */}
          <div className="lg:col-span-7 flex flex-col relative pt-2 lg:pt-0">
            
            {/* Top Header: Filter Tabs & Live Client Site Badge + Prev/Next Arrows */}
            <div className="flex items-center justify-between gap-4 mb-4 relative z-10 min-h-[40px]">
              
              {/* Left: Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab;
                  const count = PROJECTS.filter((p) => p.kind === "client" && p.serviceType === tab).length;

                  return (
                    <button 
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={cn(
                        "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer",
                        isActive 
                          ? "bg-[#591730] text-white shadow-sm" 
                          : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-800 shadow-sm"
                      )}
                    >
                      {tab} 
                      <span 
                        className={cn(
                          "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Live Client Site Badge & Nav Buttons */}
              <div className="flex items-center gap-6 shrink-0">
                {/* Handwritten "Live Client Site" badge positioned left of arrows */}
                <div className="hidden sm:flex pointer-events-none items-center gap-2 z-30 select-none mt-1">
                  <span className="font-handwriting text-[18px] text-[#922F55] font-bold -rotate-2 tracking-wide drop-shadow-sm">
                    Live Client Site
                  </span>
                  <svg width="42" height="34" viewBox="0 0 42 34" fill="none" className="text-[#922F55] mt-1 -ml-1 drop-shadow-sm">
                    {/* Arrow pointing downwards towards the browser window */}
                    <path d="M4 4 C 14 10, 24 18, 30 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M22 28 L 30 26 L 32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>

                {/* Prev / Next Circular Navigation Buttons */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <button 
                    onClick={handlePrev} 
                    aria-label="Previous Project"
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 text-[#121114] hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNext} 
                    aria-label="Next Project"
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 text-[#121114] hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Browser Window Mockup Frame ── */}
            <div className="relative w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] border border-slate-200/90 bg-white overflow-hidden flex flex-col z-20">
               
              {/* Browser Window Header Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FA] rounded-t-2xl border-b border-slate-200/80 select-none">
                {/* 3 Traffic Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-xs" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-xs" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-xs" />
                </div>
                
                {/* Centered Address Pill with Green Lock */}
                <div className="flex-1 flex justify-center px-2">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 shadow-xs rounded-md px-3.5 py-1 text-[11px] sm:text-[12px] font-medium text-slate-600 min-w-[190px] max-w-sm truncate hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer group"
                    title={`Visit ${activeProject.domain}`}
                  >
                    <Lock size={12} className="text-emerald-500 shrink-0" />
                    <span className="truncate">{activeProject.domain}</span>
                    <ExternalLink size={10} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 shrink-0" />
                  </a>
                </div>
                
                {/* Right Maximize Icon */}
                <div className="w-[42px] flex justify-end">
                  <a 
                    href={activeProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Open live site in new tab"
                    className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                  >
                    <Maximize2 size={13} />
                  </a>
                </div>
              </div>
               
              {/* Browser Viewport Area (Render Authentic High-End Mockup Hero) */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full bg-white"
                  >
                    {activeProject.serviceType === "Websites" && activeProject.url ? (
                      <div className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50">
                        <iframe 
                          src={activeProject.url}
                          title={activeProject.name}
                          className="w-full h-full border-none pointer-events-auto"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-5 shadow-sm">
                          <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[18px] sm:text-[22px] font-bold text-slate-800 tracking-tight mb-2">
                          Building in Stealth
                        </h3>
                        <p className="text-[13px] sm:text-[14px] text-slate-500 max-w-[280px] sm:max-w-xs leading-relaxed">
                          This {activeProject.serviceType.toLowerCase().replace('s', '')} is currently under active development in our lab.
                        </p>
                        <span className="mt-6 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[11px] font-bold tracking-wide uppercase shadow-sm">
                          Preview Coming Soon
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
