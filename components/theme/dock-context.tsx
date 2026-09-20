"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

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
    // If it's the hero slot on initial mount, default to it
    if (id === "hero" && typeof window !== "undefined" && window.scrollY < 300) {
      setActiveSlot("hero");
      setActiveLabel(label);
    }
  }, []);

  const unregisterSlot = useCallback((id: string) => {
    slotsRef.current.delete(id);
  }, []);

  const scrollToSlot = useCallback((id: string) => {
    const slot = slotsRef.current.get(id);
    if (slot && slot.element) {
      const rect = slot.element.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - (window.innerHeight / 2 - 50);
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const evaluateActiveSlot = () => {
      ticking = false;
      const slots = Array.from(slotsRef.current.values());
      if (slots.length === 0) {
        if (activeSlot !== "floating") {
          setActiveSlot("floating");
          setActiveLabel("SimpleThink");
        }
        return;
      }

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      // Find all slots currently within the viewport docking zone (15% to 85% of screen height)
      let bestSlot: DockSlotInfo | null = null;
      let minDistance = Infinity;

      for (const slot of slots) {
        if (!slot.element) continue;
        const rect = slot.element.getBoundingClientRect();
        const slotCenter = rect.top + rect.height / 2;

        // Check if slot is visibly in viewport docking range
        const isVisible = rect.bottom > viewportHeight * 0.1 && rect.top < viewportHeight * 0.9;
        if (isVisible) {
          const dist = Math.abs(slotCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            bestSlot = slot;
          }
        }
      }

      if (bestSlot) {
        setActiveSlot(bestSlot.id);
        setActiveLabel(bestSlot.label);
      } else {
        // If at the very top of the page, stick to Hero
        if (window.scrollY < 200 && slotsRef.current.has("hero")) {
          setActiveSlot("hero");
          setActiveLabel(slotsRef.current.get("hero")?.label || "Hero");
        } else {
          // If in transition between sections, float smoothly
          setActiveSlot("floating");
          // Keep the previous label or find closest
          let closestSlot: DockSlotInfo | null = null;
          let closestDist = Infinity;
          for (const slot of slots) {
            const rect = slot.element.getBoundingClientRect();
            const dist = Math.abs(rect.top - viewportCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closestSlot = slot;
            }
          }
          if (closestSlot) {
            setActiveLabel(closestSlot.label);
          }
        }
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
  }, [activeSlot]);

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
