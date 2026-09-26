"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ChevronDownIcon } from "@animateicons/react/lucide/chevron-down-icon";
import { AnimatedIcon, AnimatedX } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";
import { FILTER_SERVICES } from "./work-data";
import { type Project } from "@/types/project";

interface WorkControlsProps {
  activeFilter: string;
  onFilterChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: "latest" | "oldest" | "name";
  onSortChange: (option: "latest" | "oldest" | "name") => void;
  allProjects: Project[];
}

export function WorkControls({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  allProjects,
}: WorkControlsProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 sm:pb-7 border-b border-[#F0E8EE]">
      {/* ── Filter Pills ── */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {FILTER_SERVICES.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          const count =
            tab.id === "all"
              ? allProjects.length
              : allProjects.filter((p) => p.serviceType === tab.serviceType).length;

          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={cn(
                "group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[#7D1E4A] hover:bg-[#6B183E] text-white shadow-md shadow-[#7D1E4A]/25"
                  : "bg-white hover:bg-[#FAF7F9] text-[#4A4552] border border-[#E9E1E7]"
              )}
            >
              {Icon && (
                <AnimatedIcon
                  name={Icon as any}
                  size={15}
                  className={cn(
                    "transition-transform",
                    isActive ? "text-white" : "text-[#706B78] group-hover:scale-110"
                  )}
                />
              )}
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors",
                  isActive
                    ? "bg-[#5D1235] text-white/90"
                    : "bg-[#F1ECEE] text-[#6B6673] group-hover:bg-[#EAE4E8]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search & Sort Controls ── */}
      <div className="flex items-center gap-3">
        {/* Search Pill */}
        <div className="relative flex-1 sm:flex-initial">
          <AnimatedIcon
            name="search"
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A95A0] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full sm:w-56 pl-9 pr-4 py-2 bg-[#F8F6F8] hover:bg-[#F4F1F4] border border-[#EAE3E9] rounded-full text-xs sm:text-sm text-[#121114] placeholder:text-[#9A95A0] focus:outline-none focus:border-[#922F55] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A95A0] hover:text-[#121114]"
            >
              <AnimatedX size={14} />
            </button>
          )}
        </div>

        {/* Sort Pill Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="bg-white border border-[#EAE3E9] rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#121114] flex items-center gap-2 hover:bg-[#FAF7F9] cursor-pointer shadow-sm transition-all group"
          >
            <span>
              {sortOption === "latest"
                ? "Latest First"
                : sortOption === "oldest"
                ? "Oldest First"
                : "Alphabetical"}
            </span>
            <AnimatedIcon 
              icon={ChevronDownIcon}
              size={14}
              className={cn(
                "text-[#8C8894] transition-transform duration-200",
                isSortOpen && "rotate-180"
              )}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-[#EDE5EC] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  onSortChange("latest");
                  setIsSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#FAF7F9] transition-colors",
                  sortOption === "latest" ? "text-[#922F55] font-bold" : "text-[#4A4552]"
                )}
              >
                Latest First
              </button>
              <button
                onClick={() => {
                  onSortChange("oldest");
                  setIsSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#FAF7F9] transition-colors",
                  sortOption === "oldest" ? "text-[#922F55] font-bold" : "text-[#4A4552]"
                )}
              >
                Oldest First
              </button>
              <button
                onClick={() => {
                  onSortChange("name");
                  setIsSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#FAF7F9] transition-colors",
                  sortOption === "name" ? "text-[#922F55] font-bold" : "text-[#4A4552]"
                )}
              >
                Alphabetical
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
