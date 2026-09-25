import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  highlightedText?: string;
  description?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  highlightedText,
  description,
  className,
  maxWidth = "max-w-3xl",
  centered = false,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <div
      ref={headerRef}
      className={cn(maxWidth, centered && "mx-auto text-center flex flex-col items-center", "mb-10 sm:mb-12 font-satoshi", className)}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-border shadow-sm mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="type-label font-[800] tracking-[0.08em] text-foreground/90 uppercase">
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="type-h2 text-foreground mb-4"
      >
        {title}
        {highlightedText && (
          <>
            {" "}
            <span className="relative inline-block brand-gradient-text pb-1">
              {highlightedText}
              <svg 
                className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-[12px] text-primary overflow-visible pointer-events-none" 
                viewBox="0 0 200 20" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path d="M4 12 C50 4, 130 5, 195 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M30 15 C90 11, 150 12, 185 14" stroke="#D23D78" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
              </svg>
            </span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="type-lead text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
