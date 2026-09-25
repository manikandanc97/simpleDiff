"use client";

import { PageBanner } from "@/components/ui/page-banner";
import { PROJECTS } from "@/lib/data/projects";
import { type Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { ArrowRight, Globe, Layers, LayoutDashboard, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

/* ─── Modern Visual Preview Canvas with Live Iframe ─── */
function ProjectVisualCanvas({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div 
      className={cn(
        "relative w-full h-[50vh] lg:h-[calc(100vh-16rem)] min-h-96 max-h-96 rounded-2xl overflow-hidden bg-muted/10 border shadow-xl transition-all duration-500 group/canvas flex flex-col",
        isInteractive ? "border-primary shadow-2xl shadow-primary/20 ring-1 ring-primary/50" : "border-border/50 group-hover:shadow-2xl group-hover:border-primary/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isInteractive) {
          setIsHovered(false);
        }
      }}
    >
      {/* Mock Browser Header */}
      <div className="w-full h-8 sm:h-10 bg-background/80 backdrop-blur-md flex items-center px-3 sm:px-4 border-b border-border/50 z-30 shrink-0 transition-colors group-hover/canvas:bg-muted/80">
        <div className="flex items-center gap-1.5 sm:gap-2 w-1/4">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 flex justify-center px-2">
          <div className="max-w-36 sm:max-w-48 w-full h-5 sm:h-6 bg-muted rounded-md border border-border/50 flex items-center justify-center px-2">
            <span className="text-xs sm:text-xs text-muted-foreground truncate font-mono">
              {project.domain || project.url}
            </span>
          </div>
        </div>
        <div className="w-1/4 flex justify-end gap-2 items-center">
           {isInteractive && (
             <button
               onClick={() => {
                 setIsInteractive(false);
                 setIsHovered(false);
               }}
               className="text-xs sm:text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md hover:bg-red-500/20 transition-colors cursor-pointer"
             >
               Close
             </button>
           )}
           {(isHovered || isInteractive) && project.url && (
             <div className="flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
               <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
               </span>
               <span className="text-xs sm:text-xs font-bold text-primary uppercase tracking-widest hidden sm:block">Live</span>
             </div>
           )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 w-full bg-background overflow-hidden">
        
        {/* Fallback Static Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out z-0",
              (isHovered || isInteractive) && project.url ? "scale-110 opacity-0 blur-sm" : "scale-100 opacity-100 blur-0"
            )}
          />
        )}

        {/* Live Iframe Preview */}
        {project.url && (isHovered || isInteractive) && (
           <div className="absolute inset-0 w-full h-full bg-background animate-in fade-in duration-700 z-10 flex items-center justify-center">
              {!iframeLoaded && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-xs sm:text-xs font-mono text-muted-foreground animate-pulse">Connecting to live preview...</span>
                </div>
              )}
              <iframe
                src={project.url}
                className={cn(
                  "w-full h-full border-none transition-all",
                  isInteractive ? "pointer-events-auto" : "pointer-events-none"
                )}
                onLoad={() => setIframeLoaded(true)}
              />
           </div>
        )}

        {/* Interactive Overlay Button */}
        {project.url && isHovered && !isInteractive && iframeLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors backdrop-blur-[1px] cursor-pointer" onClick={() => setIsInteractive(true)}>
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform text-xs sm:text-sm"
            >
              <LayoutDashboard size={16} />
              Interact Live
            </button>
          </div>
        )}

        {/* Overlay Gradient on image only (hide when iframe active) */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 z-10",
          (isHovered || isInteractive) ? "opacity-0" : "opacity-100"
        )} />
        
        {/* Project Name & Tags Overlay */}
        <div className={cn(
          "absolute bottom-0 left-0 w-full p-4 sm:p-6 z-20 pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-4 transition-opacity duration-500",
          (isHovered || isInteractive) ? "opacity-0" : "opacity-100"
        )}>
           <div>
             <h4 className="text-xl sm:text-3xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight drop-shadow-md">
               {project.name}
             </h4>
             <div className="flex flex-wrap gap-1.5 sm:gap-2">
               {project.tags.slice(0, 3).map((tag: string) => (
                 <span key={tag} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/40 backdrop-blur-md text-xs sm:text-xs font-mono text-white/90 border border-white/20">
                   {tag}
                 </span>
               ))}
             </div>
           </div>
           {project.result && project.result !== "Work in Progress" && project.result !== "Coming Soon" && (
             <div className="text-left sm:text-right">
               <span className="block text-xs sm:text-xs font-mono text-white/70 mb-0.5 sm:mb-1 uppercase tracking-wider">Key Result</span>
               <span className="block text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 inline-block">{project.result}</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

/* ─── Modern Project List Item ─── */
function ProjectListItem({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 overflow-hidden flex items-center gap-4 sm:gap-5 border",
        isActive 
          ? "bg-primary text-primary-foreground shadow-lg scale-[1.02] border-primary" 
          : "bg-muted/40 hover:bg-muted/80 text-foreground hover:scale-[1.01] border-transparent hover:border-border/60"
      )}
    >
      {/* Background Accent Gradient for active state */}
      {isActive && (
        <div 
          className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", project.accentGradient)} 
          aria-hidden="true" 
        />
      )}

      {/* Original Logo / Favicon Placeholder */}
      <div className={cn(
        "relative z-10 w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center overflow-hidden border shadow-sm transition-colors",
        isActive ? "bg-white border-white/20" : "bg-background border-border/60 group-hover:border-primary/30"
      )}>
         {project.url ? (
           // The external favicon URL must use an img tag
           <img 
             src={`https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`} 
             alt={`${project.name} logo`}
             className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-sm"
             onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
               (e.target as HTMLImageElement).parentElement!.innerText = project.name.charAt(0);
               (e.target as HTMLImageElement).parentElement!.className = cn(
                 (e.target as HTMLImageElement).parentElement!.className,
                 "text-xl font-bold font-mono",
                 isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
               );
             }}
           />
         ) : (
           <span className={cn(
             "text-xl font-bold font-mono",
             isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
           )}>
             {project.name.charAt(0)}
           </span>
         )}
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-xs sm:text-xs font-mono font-bold tracking-widest",
            isActive ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {project.number}
          </span>
          <span className={cn(
            "text-xs sm:text-xs font-mono px-1.5 py-0.5 rounded-full border",
            isActive ? "bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground" : "bg-muted border-border/50 text-muted-foreground"
          )}>
            {project.year}
          </span>
        </div>

        <h3 className={cn(
          "text-base sm:text-lg font-bold tracking-tight truncate transition-colors",
          isActive ? "text-white" : "text-foreground group-hover:text-primary"
        )}>
          {project.name}
        </h3>
        
        <p className={cn(
          "text-xs sm:text-sm truncate mt-0.5",
          isActive ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
           {project.category}
        </p>
      </div>
      
      {/* Arrow Indicator */}
      <div className={cn(
        "relative z-10 w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ml-2",
        isActive ? "bg-white text-primary translate-x-1" : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white"
      )}>
        <ArrowRight size={16} />
      </div>
    </button>
  );
}

const FILTER_SERVICES = [
  { id: "all", label: "All Works", icon: Layers },
  { id: "websites", label: "Websites", icon: Globe, serviceType: "Websites" },
  { id: "web-apps", label: "Web Apps", icon: LayoutDashboard, serviceType: "Web Apps" },
  { id: "mobile-apps", label: "Mobile Apps", icon: Smartphone, serviceType: "Mobile Apps" },
] as const;

function WorkViewContent() {
  const searchParams = useSearchParams();
  const rawServiceParam = searchParams.get("service")?.toLowerCase();
  const categoryParam = searchParams.get("category");

  // Determine initial filter based on query param
  const initialFilter = useMemo(() => {
    if (rawServiceParam === "websites") return "websites";
    if (rawServiceParam === "web-apps") return "web-apps";
    if (rawServiceParam === "mobile-apps") return "mobile-apps";
    return "all";
  }, [rawServiceParam]);

  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  const filteredProjects = useMemo(() => {
    let result = PROJECTS;

    // Filter by Service Type if selected
    if (activeFilter === "websites") {
      result = result.filter((p) => p.serviceType === "Websites");
    } else if (activeFilter === "web-apps") {
      result = result.filter((p) => p.serviceType === "Web Apps");
    } else if (activeFilter === "mobile-apps") {
      result = result.filter((p) => p.serviceType === "Mobile Apps");
    }

    // Filter by Category if param specified
    if (categoryParam) {
      result = result.filter((p) => p.category.toLowerCase().includes(categoryParam.toLowerCase()));
    }

    return result;
  }, [activeFilter, categoryParam]);

  // Handle active project state for the split-pane layout
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // When filtered projects change, ensure the active project is valid
  useMemo(() => {
    if (filteredProjects.length > 0) {
      if (!activeProjectId || !filteredProjects.find(p => p.id === activeProjectId)) {
        setActiveProjectId(filteredProjects[0].id);
      }
    } else {
      setActiveProjectId(null);
    }
  }, [filteredProjects, activeProjectId]);

  const activeProject = filteredProjects.find(p => p.id === activeProjectId) || filteredProjects[0];

  return (
    <div className="w-full">
      <PageBanner
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Work" },
        ]}
        title="Our Works"
        description="A curated selection of our finest digital architectures, platforms, and experiences engineered end-to-end."
        techStack={["react", "nextjs", "typescript", "tailwindcss", "supabase", "docker"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Interactive Service Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-16">
        {FILTER_SERVICES.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          const count = tab.id === "all" 
            ? PROJECTS.length 
            : PROJECTS.filter((p) => p.serviceType === tab.serviceType).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "group relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border/50"
              )}
            >
              <Icon size={16} className={cn("transition-colors", isActive ? "text-primary-foreground" : "text-primary group-hover:scale-110")} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "ml-0.5 sm:ml-1 text-xs sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full transition-colors",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-background"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modern Split-Pane Project Showcase */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 sm:py-32 bg-muted/10 rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground font-mono">No projects found matching the selected filter.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
          
          {/* Left Column: Project List */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            {filteredProjects.map((project) => (
              <ProjectListItem 
                key={project.id} 
                project={project} 
                isActive={project.id === activeProject?.id}
                onClick={() => setActiveProjectId(project.id)}
              />
            ))}
          </div>

          {/* Right Column: Sticky Preview Canvas */}
          <div className="w-full lg:w-[60%] lg:sticky lg:top-28 z-10">
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <ProjectVisualCanvas project={activeProject} />
                
                {/* Project Details Below Canvas */}
                <div className="flex flex-col gap-4 p-2 sm:px-4">
                   <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                     {activeProject.description}
                   </p>
                   <div className="flex flex-wrap items-center gap-2 mt-2">
                     <span className="text-xs font-mono text-foreground/50 mr-2">Tech Stack:</span>
                     {activeProject.stack.map((tech) => (
                       <span key={tech} className="px-3 py-1 rounded-full text-xs sm:text-xs font-mono bg-muted/50 border border-border/50 text-foreground/80 hover:bg-muted transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                   </div>
                   {activeProject.url && (
                     <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap gap-4 items-center justify-between">
                       <div className="text-xs font-mono text-muted-foreground">
                         <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 mr-2 inline-block mb-1 sm:mb-0">Result</span>
                         {activeProject.result}
                       </div>
                       <a
                         href={activeProject.url}
                         target="_blank"
                         rel="noreferrer"
                         className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all w-full sm:w-auto text-sm"
                       >
                         <Globe size={16} />
                         Visit Live
                       </a>
                     </div>
                   )}
                </div>
              </motion.div>
            ) : null}
          </div>

        </div>
      )}
      </div>
    </div>
  );
}

export function WorkView() {
  return (
    <Suspense fallback={<div className="min-h-96 flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
      <WorkViewContent />
    </Suspense>
  );
}
