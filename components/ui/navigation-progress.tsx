"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

/**
 * NavigationProgress
 * -----------------------------------------------------------------
 * A glowing progress bar that appears BELOW the navbar (not at the very
 * top where it would merge with the TopBar banner) on every client-side
 * route change.
 *
 * Positioning: fixed, top = 64px (below TopBar 32px + Navbar ~32px).
 * On scroll the TopBar hides, so we track that and shift accordingly.
 *
 * Visual: 3px tall gradient bar with a leading comet-glow dot that
 * sweeps from left to right, then vanishes with a fade + scale.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const isFirst = useRef(true);
  const t1 = useRef<ReturnType<typeof setTimeout>>(null);
  const t2 = useRef<ReturnType<typeof setTimeout>>(null);
  const t3 = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }

    // cancel previous
    [t1, t2, t3].forEach((t) => { if (t.current) clearTimeout(t.current); });

    setActive(true);
    setProgress(0);

    // Frame 1: immediate jump to 10%
    t1.current = setTimeout(() => setProgress(10), 30);

    // Frame 2: ease to 80% over ~600ms
    t2.current = setTimeout(() => setProgress(80), 60);

    // Frame 3: complete → 100% after ~650ms, then fade out
    t3.current = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setActive(false), 450);
    }, 700);

    return () => [t1, t2, t3].forEach((t) => { if (t.current) clearTimeout(t.current); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="nav-progress"
          aria-hidden="true"
          className="fixed left-0 right-0 z-[55] pointer-events-none"
          style={{ top: "63px" }} // just below navbar bottom edge
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.1 }}
        >
          {/* Track (very subtle) */}
          <div className="h-[3px] w-full bg-primary/8" />

          {/* Filled bar */}
          <motion.div
            className="absolute top-0 left-0 h-[3px] rounded-r-full origin-left"
            style={{
              background: `linear-gradient(
                90deg,
                color-mix(in oklch, var(--primary) 70%, transparent) 0%,
                var(--primary) 60%,
                color-mix(in oklch, var(--primary) 90%, white) 100%
              )`,
              boxShadow: `
                0 0 8px 2px color-mix(in oklch, var(--primary) 55%, transparent),
                0 0 18px 4px color-mix(in oklch, var(--primary) 25%, transparent)
              `,
            }}
            animate={{ width: `${progress}%` }}
            transition={{
              width: {
                duration:
                  progress === 10 ? 0.04
                  : progress === 80 ? 0.62
                  : 0.22,
                ease:
                  progress === 80
                    ? [0.16, 1, 0.3, 1]
                    : progress === 100
                    ? [0.4, 0, 0.2, 1]
                    : "linear",
              },
            }}
          />

          {/* Leading comet glow dot */}
          <motion.div
            className="absolute top-1/2 h-[10px] w-[10px] rounded-full -translate-y-1/2 -translate-x-1/2"
            style={{
              background: "var(--primary)",
              boxShadow: `
                0 0 6px 3px color-mix(in oklch, var(--primary) 55%, transparent),
                0 0 14px 6px color-mix(in oklch, var(--primary) 28%, transparent)
              `,
            }}
            animate={{ left: `${progress}%` }}
            transition={{
              left: {
                duration:
                  progress === 10 ? 0.04
                  : progress === 80 ? 0.62
                  : 0.22,
                ease:
                  progress === 80
                    ? [0.16, 1, 0.3, 1]
                    : progress === 100
                    ? [0.4, 0, 0.2, 1]
                    : "linear",
              },
            }}
          />

          {/* Flash burst when completing */}
          {progress === 100 && (
            <motion.div
              className="absolute inset-y-0 left-0 right-0"
              style={{
                background: `linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 35%, transparent), transparent)`,
              }}
              initial={{ opacity: 1, scaleX: 0, transformOrigin: "left" }}
              animate={{ opacity: 0, scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
