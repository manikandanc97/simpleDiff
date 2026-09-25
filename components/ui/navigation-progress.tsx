"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * NavigationProgress
 * -----------------------------------------------------------------
 * A reliable glowing top progress bar for Next.js App Router.
 *
 * Problem: `usePathname` fires AFTER the page has already rendered
 * (navigation is instant due to prefetching), making it invisible.
 *
 * Solution: intercept anchor `<a>` clicks on the document directly.
 * The moment a link is clicked → bar starts. When pathname updates
 * (confirming navigation committed) → bar completes & fades.
 *
 * Position: just below the navbar bottom edge (top: 63px) so it's
 * clearly visible and doesn't blend with the green TopBar banner.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [completing, setCompleting] = useState(false);

  const rafRef = useRef<number>(null);
  const completeRef = useRef<ReturnType<typeof setTimeout>>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout>>(null);
  const pendingRef = useRef(false);

  const clearAll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (completeRef.current) clearTimeout(completeRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  const startBar = useCallback(() => {
    clearAll();
    pendingRef.current = true;
    setCompleting(false);
    setActive(true);
    setWidth(0);

    // Tick: 0 → 15 immediately, then ease toward 75 slowly
    let current = 0;
    const tick = () => {
      if (!pendingRef.current) return;
      if (current < 15) {
        current = 15;
      } else if (current < 75) {
        current += (75 - current) * 0.04;
      }
      setWidth(current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [clearAll]);

  const completeBar = useCallback(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    clearAll();
    setCompleting(true);
    setWidth(100);
    completeRef.current = setTimeout(() => {
      setActive(false);
      resetRef.current = setTimeout(() => {
        setWidth(0);
        setCompleting(false);
      }, 100);
    }, 420);
  }, [clearAll]);

  // ── Intercept anchor clicks ──
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a[href]");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      // Only intercept same-origin, non-hash, non-external links
      if (href.startsWith("http") || href.startsWith("//") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      startBar();
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [startBar]);

  // ── Complete when pathname actually changes ──
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      completeBar();
    }
  }, [pathname, completeBar]);

  // Cleanup on unmount
  useEffect(() => () => clearAll(), [clearAll]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="progress-root"
          aria-hidden="true"
          className="fixed left-0 right-0 z-[55] pointer-events-none"
          style={{ top: "63px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* subtle track */}
          <div className="h-0.5 w-full" style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)" }} />

          {/* fill bar */}
          <div
            className="absolute top-0 left-0 h-0.5 rounded-r-full"
            style={{
              width: `${width}%`,
              transition: completing
                ? "width 0.25s cubic-bezier(0.4,0,0.2,1)"
                : "width 0.08s linear",
              background: `linear-gradient(
                90deg,
                color-mix(in oklch, var(--primary) 70%, transparent) 0%,
                var(--primary) 55%,
                color-mix(in oklch, var(--primary) 92%, white) 100%
              )`,
              boxShadow: `
                0 0 10px 3px color-mix(in oklch, var(--primary) 50%, transparent),
                0 0 22px 6px color-mix(in oklch, var(--primary) 22%, transparent)
              `,
            }}
          />

          {/* leading comet dot */}
          {!completing && (
            <div
              className="absolute top-0 h-2.5 w-2.5 rounded-full -translate-y-[4px] -translate-x-1/2"
              style={{
                left: `${width}%`,
                background: "var(--primary)",
                transition: "left 0.08s linear",
                boxShadow: `
                  0 0 6px 3px color-mix(in oklch, var(--primary) 55%, transparent),
                  0 0 14px 6px color-mix(in oklch, var(--primary) 25%, transparent)
                `,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
