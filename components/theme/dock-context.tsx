"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export interface SectionMeta {
  id: string;
  label: string;
}

export const PAGE_SECTIONS: SectionMeta[] = [
  { id: "hero", label: "Hero" },
  { id: "capabilities", label: "Capabilities & Focus" },
  { id: "selected-work", label: "Shipped Client Websites · Portfolio" },
  { id: "how-we-work", label: "Process · Methodology" },
  { id: "why-SimpleThink", label: "Why SimpleThink" },
  { id: "industries", label: "Verticals · Domains" },
  { id: "tech-stack", label: "Tools & Technologies" },
  { id: "testimonials", label: "Client Voices · Reviews" },
  { id: "faq", label: "Questions · Answers" },
  { id: "cta", label: "Start Your Build" },
];

interface DockSlotInfo {
  id: string;
  label: string;
  element: HTMLElement;
}

interface DockContextType {
  activeSlot: string;
  activeLabel: string;
  registerSlot: (id: string, label: string, element: HTMLElement) => void;
  unregisterSlot: (id: string) => void;
  scrollToSlot: (id: string) => void;
}

const DockContext = createContext<DockContextType | undefined>(undefined);

export function DockProvider({ children }: { children: React.ReactNode }) {
  const [activeSlot, setActiveSlot] = useState<string>("hero");
  const [activeLabel, setActiveLabel] = useState<string>("Hero");
  const slotsRef = useRef<Map<string, DockSlotInfo>>(new Map());

  const registerSlot = useCallback((id: string, label: string, element: HTMLElement) => {
    slotsRef.current.set(id, { id, label, element });
    if (id === "hero" && typeof window !== "undefined" && window.scrollY < 200) {
      setActiveSlot("hero");
      setActiveLabel(label);
    }
  }, []);

  const unregisterSlot = useCallback((id: string) => {
    slotsRef.current.delete(id);
  }, []);

  const scrollToSlot = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const evaluateActiveSlot = () => {
      ticking = false;
      if (typeof window === "undefined") return;

      const slots = Array.from(slotsRef.current.values());

      // 1. Check Hero slot first
      const heroSlot = slotsRef.current.get("hero");
      if (heroSlot && heroSlot.element) {
        const heroRect = heroSlot.element.getBoundingClientRect();
        if (window.scrollY < 180 || (heroRect.top >= 70 && heroRect.bottom <= window.innerHeight * 0.85)) {
          setActiveSlot("hero");
          setActiveLabel("Hero");
          return;
        }
      } else if (window.scrollY < 180) {
        setActiveSlot("hero");
        setActiveLabel("Hero");
        return;
      }

      // 2. Check other section slots (docking zone: top between 75px [below navbar] and 60% of viewport)
      const navbarOffset = 75;
      const maxDockTop = window.innerHeight * 0.62;
      const targetFocalY = window.innerHeight * 0.32;

      let bestDockSlot: DockSlotInfo | null = null;
      let minDockDist = Infinity;

      for (const slot of slots) {
        if (slot.id === "hero" || !slot.element) continue;
        const rect = slot.element.getBoundingClientRect();

        // Slot is within visible reading docking zone
        if (rect.top >= navbarOffset && rect.top <= maxDockTop && rect.bottom >= navbarOffset) {
          const dist = Math.abs(rect.top - targetFocalY);
          if (dist < minDockDist) {
            minDockDist = dist;
            bestDockSlot = slot;
          }
        }
      }

      if (bestDockSlot) {
        setActiveSlot(bestDockSlot.id);
        setActiveLabel(bestDockSlot.label);
        return;
      }

      // 3. When NO slot is in the docking zone (slot scrolled off top or user in-between):
      // The dock detaches and floats smoothly at the bottom!
      setActiveSlot("floating");

      // While floating, determine activeLabel based on the section spanning viewport center
      const focalY = window.innerHeight * 0.45;
      let currentSection: SectionMeta | null = null;
      let minDistance = Infinity;

      for (const section of PAGE_SECTIONS) {
        if (section.id === "hero") continue;
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        if (rect.top <= focalY && rect.bottom >= focalY) {
          currentSection = section;
          break;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - focalY);
        if (dist < minDistance && rect.bottom > 0 && rect.top < window.innerHeight) {
          minDistance = dist;
          currentSection = section;
        }
      }

      if (currentSection) {
        setActiveLabel(currentSection.label);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateActiveSlot);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    evaluateActiveSlot();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <DockContext.Provider
      value={{
        activeSlot,
        activeLabel,
        registerSlot,
        unregisterSlot,
        scrollToSlot,
      }}
    >
      {children}
    </DockContext.Provider>
  );
}

export function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within a DockProvider");
  }
  return context;
}

