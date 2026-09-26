"use client";

import { ExternalLinkIcon } from "@animateicons/react/lucide/external-link-icon";
import { LockIcon } from "@animateicons/react/lucide/lock-icon";
import { Maximize2, Lock } from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { AnimatePresence, motion } from "motion/react";
import { type Project } from "@/types/project";

interface WorkBrowserFrameProps {
  project: Project;
  onOpenFullscreen: () => void;
}

export function WorkBrowserFrame({ project, onOpenFullscreen }: WorkBrowserFrameProps) {
  const isWebsite = project.serviceType === "Websites" && Boolean(project.url);

  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E9E1E7] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] flex flex-col">
      {/* ── Browser Header Bar ── */}
      <div className="h-10 sm:h-11 bg-[#F8F9FA] border-b border-[#ECE6EB] px-4 flex items-center justify-between select-none">
        {/* Mac 3 dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-xs" />
        </div>

        {/* Centered URL Pill */}
        <div className="flex-1 flex justify-center px-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-white border border-[#EAE3E9] shadow-xs rounded-md px-3.5 py-1 text-xs font-medium text-[#504C56] min-w-44 max-w-sm truncate hover:border-[#922F55]/40 hover:text-[#121114] transition-colors cursor-pointer group"
            title={`Visit ${project.domain}`}
          >
            <AnimatedIcon icon={LockIcon} size={12} className="text-emerald-500 shrink-0" />
            <span className="truncate">{project.domain || project.url?.replace("https://", "")}</span>
            <AnimatedIcon icon={ExternalLinkIcon} size={10} className="text-[#8C8894] opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 shrink-0" />
          </a>
        </div>

        {/* Right Action Controls: Live Status & Fullscreen */}
        <div className="flex items-center gap-2">
          {isWebsite && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[10px] font-bold text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>LIVE</span>
            </div>
          )}
          <button
            type="button"
            onClick={onOpenFullscreen}
            aria-label="Expand Preview"
            className="text-[#6B6673] hover:text-[#121114] transition-colors p-1 rounded-md hover:bg-[#EAE4E8] cursor-pointer group"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* ── Browser Viewport: Live Original Website (like Home Page) ── */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-white"
          >
            {isWebsite ? (
              <div className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50">
                <iframe
                  src={project.url}
                  title={project.name}
                  className="w-full h-full border-none pointer-events-auto"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-[#FAF9FB] flex flex-col items-center justify-center p-6 text-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#EAE3E9] flex items-center justify-center shadow-sm">
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#9A95A0]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#121114] tracking-tight">
                    Building in Stealth
                  </h3>
                  <p className="text-xs sm:text-sm text-[#706B78] max-w-72 sm:max-w-xs leading-relaxed">
                    This {project.serviceType?.toLowerCase()?.replace("s", "") || "product"} is currently under active development in our lab.
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold tracking-wide uppercase shadow-sm">
                  Preview Coming Soon
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
