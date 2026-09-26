"use client";

import { ExternalLink, X } from "lucide-react";
import { type Project } from "@/types/project";

interface WorkFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function WorkFullscreenModal({ isOpen, onClose, project }: WorkFullscreenModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="flex-1 w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Fullscreen Header */}
        <div className="h-12 bg-[#FBF9FA] border-b border-[#ECE6EB] px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-xs font-mono text-[#706B78] ml-2 hidden sm:inline">
              {project.domain}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F0F4] hover:bg-[#EAE4E8] text-xs font-medium text-[#2E2934] transition-colors"
              >
                <span>Open in New Tab</span>
                <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F4F0F4] hover:bg-[#EAE4E8] flex items-center justify-center text-[#55505C] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Iframe View */}
        <div className="flex-1 w-full bg-background relative">
          {project.url ? (
            <iframe
              src={project.url}
              className="w-full h-full border-none"
              title={`${project.name} Live Preview`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center text-muted-foreground">
              No live preview available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
