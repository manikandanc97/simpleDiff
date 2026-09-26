"use client";

import { ArrowRight, BarChart3, ShieldCheck, Star, Users } from "lucide-react";
import { type Project } from "@/types/project";
import { type EnhancedProjectDetails } from "./work-data";

interface WorkProjectDetailsProps {
  project: Project;
  enhancement: EnhancedProjectDetails;
}

export function WorkProjectDetails({ project, enhancement }: WorkProjectDetailsProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* ── Stats Bar (4 Metric Cards in a Row) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {enhancement.metrics.map((m, idx) => {
          let IconComponent = BarChart3;
          if (m.iconType === "users") IconComponent = Users;
          if (m.iconType === "star") IconComponent = Star;
          if (m.iconType === "shield") IconComponent = ShieldCheck;

          return (
            <div
              key={idx}
              className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F9] border border-[#EFE7EC] flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D8287A]/15 to-[#FF7B92]/10 flex items-center justify-center text-[#D8287A] shrink-0">
                <IconComponent size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-extrabold text-[#121114] leading-tight truncate">
                  {m.value}
                </div>
                <div className="text-[11px] text-[#706B78] font-medium truncate mt-0.5">
                  {m.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Project Overview ── */}
      <div className="pt-1">
        <h4 className="text-sm sm:text-base font-bold text-[#121114] mb-1.5">
          Project Overview
        </h4>
        <p className="text-xs sm:text-sm text-[#5B5664] leading-relaxed">
          {enhancement.overview}
        </p>
      </div>

      {/* ── Tech Stack Row ── */}
      <div className="pt-1">
        <div className="text-xs font-semibold text-[#121114] mb-2.5">
          Tech Stack
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {enhancement.techStack.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F9] border border-[#EBE4EA] text-xs font-medium text-[#2E2934] shadow-sm hover:border-[#D8287A]/30 transition-colors"
            >
              <tech.icon className="w-3.5 h-3.5" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Visit Live Site Action Row ── */}
      {project.url && project.serviceType === "Websites" && (
        <div className="pt-2 flex items-center justify-between border-t border-[#EFE7EC]">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#922F55] hover:bg-[#7D2748] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#922F55]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Visit Live Website</span>
            <ArrowRight size={15} />
          </a>
          <span className="text-xs text-[#706B78] font-mono">
            {project.domain}
          </span>
        </div>
      )}
    </div>
  );
}
