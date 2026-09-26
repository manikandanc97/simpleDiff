"use client";

import { AnimatedChevronRight } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";
import { type Project } from "@/types/project";

interface WorkProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

export function WorkProjectCard({ project, isActive, onClick }: WorkProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3.5 sm:gap-4 border cursor-pointer",
        isActive
          ? "bg-[#FFF5F8] border-[#F4A7C2] shadow-[0_4px_20px_rgba(216,40,122,0.08)]"
          : "bg-transparent border-transparent hover:bg-[#FAF7F9] hover:border-[#EFE7EC]"
      )}
    >
      {/* ── Number (01, 02, etc.) ── */}
      <span
        className={cn(
          "font-black text-base sm:text-lg w-7 shrink-0 transition-colors",
          isActive ? "text-[#D8287A]" : "text-[#121114]"
        )}
      >
        {project.number}
      </span>

      {/* ── Thumbnail Image ── */}
      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-black/5 bg-[#F0EBEF]">
        <img
          src={project.image || "/images/projects/valparai.jpg"}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ── Project Meta ── */}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium text-[#8C8894] mb-0.5">
          {project.year}
        </div>
        <h3 className="text-sm sm:text-base font-bold text-[#121114] truncate tracking-tight">
          {project.name}
        </h3>
        <p className="text-xs text-[#6B6673] truncate mt-0.5">
          {project.category}
        </p>

        {/* ── Tech Tag Pills ── */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-[#F4F0F4] text-[#55505C] text-[10px] sm:text-[11px] font-medium border border-[#ECE5EB]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Arrow Button ── */}
      <div
        className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ml-1",
          isActive
            ? "bg-white border-[#F4A7C2] text-[#D8287A] shadow-sm translate-x-0.5"
            : "bg-white border-[#E9E2E8] text-[#6B6673] group-hover:border-[#922F55] group-hover:text-[#922F55] group-hover:translate-x-0.5"
        )}
      >
        <AnimatedChevronRight size={16} />
      </div>
    </button>
  );
}
