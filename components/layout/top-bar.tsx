"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { SITE } from "@/lib/site";
import { AnimatedIcon } from "@/components/ui/animated-icon";

export function TopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      role="complementary"
      aria-label="Contact information"
      className="fixed top-0 left-0 right-0 z-[60] h-8 flex items-center bg-primary text-primary-foreground text-[11px] font-medium tracking-wide overflow-hidden"
      animate={{ y: hidden ? -32 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Left — Email */}
        <Link
          href={`mailto:${SITE.email}`}
          aria-label={`Email us at ${SITE.email}`}
          className="group flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
        >
          <AnimatedIcon
            name="mail"
            size={12}
            hoverDelay={600}
            oncePerInteraction
            className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
          />
          <span className="hidden sm:inline group-hover:underline underline-offset-2">
            {SITE.email}
          </span>
          <span className="sm:hidden group-hover:underline underline-offset-2">
            Email us
          </span>
        </Link>

        {/* Right — Phone */}
        <Link
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          aria-label={`Call us at ${SITE.phone}`}
          className="group flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
        >
          <AnimatedIcon
            name="smartphone"
            size={12}
            hoverDelay={600}
            oncePerInteraction
            className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
          />
          <span className="hidden sm:inline group-hover:underline underline-offset-2">
            {SITE.phone}
          </span>
          <span className="sm:hidden group-hover:underline underline-offset-2">
            Call us
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
