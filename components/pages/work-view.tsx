"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { PROJECTS } from "@/lib/data/projects";
import { PROJECT_ENHANCEMENTS } from "@/components/work/work-data";
import { WorkHero } from "@/components/work/work-hero";
import { WorkControls } from "@/components/work/work-controls";
import { WorkProjectCard } from "@/components/work/work-project-card";
import { WorkBrowserFrame } from "@/components/work/work-browser-frame";
import { WorkProjectDetails } from "@/components/work/work-project-details";
import { WorkFullscreenModal } from "@/components/work/work-fullscreen-modal";

function WorkViewContent() {
  const searchParams = useSearchParams();
  const rawServiceParam = searchParams.get("service")?.toLowerCase();

  const [activeFilter, setActiveFilter] = useState<string>(() => {
    if (rawServiceParam === "websites") return "websites";
    if (rawServiceParam === "web-apps") return "web-apps";
    if (rawServiceParam === "mobile-apps") return "mobile-apps";
    return "all";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"latest" | "oldest" | "name">("latest");
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0]?.id || "proj-valparai");
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  // Filter & Sort logic
  const filteredProjects = useMemo(() => {
    let result = [...PROJECTS];

    // Filter by Service Type
    if (activeFilter === "websites") {
      result = result.filter((p) => p.serviceType === "Websites");
    } else if (activeFilter === "web-apps") {
      result = result.filter((p) => p.serviceType === "Web Apps");
    } else if (activeFilter === "mobile-apps") {
      result = result.filter((p) => p.serviceType === "Mobile Apps");
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => a.number.localeCompare(b.number));
    } else {
      result.sort((a, b) => a.number.localeCompare(b.number));
    }

    return result;
  }, [activeFilter, searchQuery, sortOption]);

  // Active Project & Enhancement Data
  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) ||
    PROJECTS.find((p) => p.id === activeProjectId) ||
    filteredProjects[0] ||
    PROJECTS[0];

  const activeEnhancement =
    PROJECT_ENHANCEMENTS[activeProject?.id] || PROJECT_ENHANCEMENTS["proj-valparai"];

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7FC] text-[#121114] overflow-hidden pt-28 sm:pt-36 pb-28">
      {/* ── Background Atmospheric Layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#d3ccd8_1px,transparent_1px)] [background-size:24px_24px] opacity-45 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#FFD2E5]/50 via-[#F3E5FF]/40 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-20 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#E8DCFF]/45 via-[#FFDFEF]/35 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-[#F4DCFF]/40 via-[#FFE8F4]/30 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-40 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FFE0ED]/40 to-transparent blur-[110px] pointer-events-none" />

      {/* ── Hero Section (Badges, Title, Floating Stickers) ── */}
      <WorkHero />

      {/* ── Main Showcase Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] border border-[#EFE5EC] shadow-[0_24px_64px_-16px_rgba(146,47,85,0.08),0_4px_24px_rgba(0,0,0,0.02)] p-5 sm:p-7 lg:p-9">
          {/* Top Control Bar: Filters, Search & Sort */}
          <WorkControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
            allProjects={PROJECTS}
          />

          {/* Split Pane: Left Project List (5) & Right Interactive Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-start pt-6 sm:pt-8">
            {/* ── LEFT COLUMN: Project Selector List ── */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 px-4 bg-[#FBF9FB] rounded-2xl border border-dashed border-[#EAE3E9]">
                  <p className="text-sm text-[#706B78] font-medium">
                    No projects found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchQuery("");
                    }}
                    className="mt-3 text-xs font-bold text-[#922F55] hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <WorkProjectCard
                    key={project.id}
                    project={project}
                    isActive={project.id === activeProject?.id}
                    onClick={() => setActiveProjectId(project.id)}
                  />
                ))
              )}
            </div>

            {/* ── RIGHT COLUMN: Active Project Showcase & Details ── */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:sticky lg:top-24">
              {activeProject && (
                <>
                  <WorkBrowserFrame
                    project={activeProject}
                    onOpenFullscreen={() => setIsFullscreenModalOpen(true)}
                  />
                  <WorkProjectDetails
                    project={activeProject}
                    enhancement={activeEnhancement}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Live Iframe Preview Modal ── */}
      <WorkFullscreenModal
        isOpen={isFullscreenModalOpen}
        onClose={() => setIsFullscreenModalOpen(false)}
        project={activeProject}
      />
    </div>
  );
}

export function WorkView() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7FC]">
          <div className="w-9 h-9 border-3 border-[#922F55]/30 border-t-[#922F55] rounded-full animate-spin" />
        </div>
      }
    >
      <WorkViewContent />
    </Suspense>
  );
}
