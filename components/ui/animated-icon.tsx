"use client";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

// Official Lucide icons from @animateicons/react (https://animateicons.in/)
import { ArrowRightIcon } from "@animateicons/react/lucide/arrow-right-icon";
import { ArrowLeftIcon } from "@animateicons/react/lucide/arrow-left-icon";
import { ChevronRightIcon } from "@animateicons/react/lucide/chevron-right-icon";
import { ExternalLinkIcon } from "@animateicons/react/lucide/external-link-icon";
import { SparklesIcon } from "@animateicons/react/lucide/sparkles-icon";
import { HouseIcon } from "@animateicons/react/lucide/house-icon";
import { LayersIcon } from "@animateicons/react/lucide/layers-icon";
import { LightbulbIcon } from "@animateicons/react/lucide/lightbulb-icon";
import { InfoIcon } from "@animateicons/react/lucide/info-icon";
import { SunMediumIcon } from "@animateicons/react/lucide/sun-medium-icon";
import { MoonIcon } from "@animateicons/react/lucide/moon-icon";
import { SendIcon } from "@animateicons/react/lucide/send-icon";
import { CheckIcon } from "@animateicons/react/lucide/check-icon";
import { RefreshCwIcon } from "@animateicons/react/lucide/refresh-cw-icon";
import { MailIcon } from "@animateicons/react/lucide/mail-icon";
import { MessageSquareIcon } from "@animateicons/react/lucide/message-square-icon";
import { XIcon } from "@animateicons/react/lucide/x-icon";
import { MenuIcon } from "@animateicons/react/lucide/menu-icon";
import { LayoutGridIcon } from "@animateicons/react/lucide/layout-grid-icon";
import { ZapIcon } from "@animateicons/react/lucide/zap-icon";
import { PencilIcon } from "@animateicons/react/lucide/pencil-icon";
import { ListChecksIcon } from "@animateicons/react/lucide/list-checks-icon";
import { SearchIcon } from "@animateicons/react/lucide/search-icon";
import { SlidersHorizontalIcon } from "@animateicons/react/lucide/sliders-horizontal-icon";
import { CodeIcon } from "@animateicons/react/lucide/code-icon";
import { TypeIcon } from "@animateicons/react/lucide/type-icon";
import { GlobeIcon } from "@animateicons/react/lucide/globe-icon";
import { SmartphoneIcon } from "@animateicons/react/lucide/smartphone-icon";
import { LaptopIcon } from "@animateicons/react/lucide/laptop-icon";
import { CpuIcon } from "@animateicons/react/lucide/cpu-icon";
import { FolderIcon } from "@animateicons/react/lucide/folder-icon";
import { ContactIcon } from "@animateicons/react/lucide/contact-icon";

export type AnimatedIconName =
  | "arrow-right"
  | "arrow-left"
  | "sparkles"
  | "home"
  | "briefcase"
  | "layers"
  | "lightbulb"
  | "info"
  | "contact"
  | "palette"
  | "type"
  | "sun"
  | "moon"
  | "send"
  | "check"
  | "rotate-ccw"
  | "mail"
  | "message-square"
  | "x"
  | "menu"
  | "grid"
  | "chevron-right"
  | "external-link"
  | "zap"
  | "pencil"
  | "list-checks"
  | "globe"
  | "smartphone"
  | "laptop"
  | "cpu"
  | "help-circle"
  | "folder"
  | "sliders"
  | "search"
  | "code";

export interface AnimateIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CustomIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  color?: string;
}

/* ─────────────────────────────────────────────────────────────
   PaletteIcon (Built with exact AnimateIcons Motion architecture)
───────────────────────────────────────────────────────────── */
export const PaletteIcon = forwardRef<AnimateIconHandle, CustomIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, duration = 1, isAnimated = true, color, ...props }, ref) => {
    const controls = useAnimation();
    const hasRef = useRef(false);

    useImperativeHandle(ref, () => {
      hasRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnimated) return;
        if (hasRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, isAnimated, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (hasRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    const bodyVariants = {
      normal: { rotate: 0, scale: 1 },
      animate: {
        rotate: [0, -14, 14, -6, 0],
        scale: [1, 1.08, 1.04, 1],
        transition: { duration: 0.75 * duration, ease: "easeInOut" as const },
      },
    };

    const dotVariants = {
      normal: { scale: 1, opacity: 1 },
      animate: {
        scale: [1, 1.4, 0.9, 1],
        opacity: [1, 0.7, 1],
        transition: { duration: 0.6 * duration, ease: "easeOut" as const },
      },
    };

    return (
      <div
        className={cn("inline-flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color, ...props.style }}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={bodyVariants}
        >
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          <motion.circle cx="13.5" cy="6.5" r=".5" fill="currentColor" variants={dotVariants} />
          <motion.circle cx="17.5" cy="10.5" r=".5" fill="currentColor" variants={dotVariants} />
          <motion.circle cx="8.5" cy="7.5" r=".5" fill="currentColor" variants={dotVariants} />
          <motion.circle cx="6.5" cy="12.5" r=".5" fill="currentColor" variants={dotVariants} />
        </motion.svg>
      </div>
    );
  }
);
PaletteIcon.displayName = "PaletteIcon";

/* ─────────────────────────────────────────────────────────────
   BriefcaseIcon (Built with exact AnimateIcons Motion architecture)
───────────────────────────────────────────────────────────── */
export const BriefcaseIcon = forwardRef<AnimateIconHandle, CustomIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, duration = 1, isAnimated = true, color, ...props }, ref) => {
    const controls = useAnimation();
    const hasRef = useRef(false);

    useImperativeHandle(ref, () => {
      hasRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnimated) return;
        if (hasRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, isAnimated, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (hasRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    const containerVariants = {
      normal: { y: 0, rotate: 0 },
      animate: {
        y: [0, -3, 1, 0],
        rotate: [0, -4, 4, 0],
        transition: { duration: 0.65 * duration, ease: "easeInOut" as const },
      },
    };

    const handleVariants = {
      normal: { y: 0 },
      animate: {
        y: [0, -2, 0],
        transition: { duration: 0.5 * duration, ease: "easeOut" as const },
      },
    };

    return (
      <div
        className={cn("inline-flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color, ...props.style }}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={containerVariants}
        >
          <motion.path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" variants={handleVariants} />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </motion.svg>
      </div>
    );
  }
);
BriefcaseIcon.displayName = "BriefcaseIcon";

/* ─────────────────────────────────────────────────────────────
   Icon Component Registry (Direct AnimateIcons mapping)
───────────────────────────────────────────────────────────── */
export interface IconBaseProps {
  size?: number;
  className?: string;
  isAnimated?: boolean;
  color?: string;
  ref?: React.Ref<AnimateIconHandle>;
}

const ICON_COMPONENT_MAP: Record<AnimatedIconName, React.ComponentType<IconBaseProps>> = {
  "arrow-right": ArrowRightIcon as unknown as React.ComponentType<IconBaseProps>,
  "arrow-left": ArrowLeftIcon as unknown as React.ComponentType<IconBaseProps>,
  sparkles: SparklesIcon as unknown as React.ComponentType<IconBaseProps>,
  home: HouseIcon as unknown as React.ComponentType<IconBaseProps>,
  briefcase: BriefcaseIcon as unknown as React.ComponentType<IconBaseProps>,
  layers: LayersIcon as unknown as React.ComponentType<IconBaseProps>,
  lightbulb: LightbulbIcon as unknown as React.ComponentType<IconBaseProps>,
  info: InfoIcon as unknown as React.ComponentType<IconBaseProps>,
  palette: PaletteIcon as unknown as React.ComponentType<IconBaseProps>,
  type: TypeIcon as unknown as React.ComponentType<IconBaseProps>,
  sun: SunMediumIcon as unknown as React.ComponentType<IconBaseProps>,
  moon: MoonIcon as unknown as React.ComponentType<IconBaseProps>,
  send: SendIcon as unknown as React.ComponentType<IconBaseProps>,
  check: CheckIcon as unknown as React.ComponentType<IconBaseProps>,
  "rotate-ccw": RefreshCwIcon as unknown as React.ComponentType<IconBaseProps>,
  mail: MailIcon as unknown as React.ComponentType<IconBaseProps>,
  "message-square": MessageSquareIcon as unknown as React.ComponentType<IconBaseProps>,
  x: XIcon as unknown as React.ComponentType<IconBaseProps>,
  menu: MenuIcon as unknown as React.ComponentType<IconBaseProps>,
  grid: LayoutGridIcon as unknown as React.ComponentType<IconBaseProps>,
  "chevron-right": ChevronRightIcon as unknown as React.ComponentType<IconBaseProps>,
  "external-link": ExternalLinkIcon as unknown as React.ComponentType<IconBaseProps>,
  zap: ZapIcon as unknown as React.ComponentType<IconBaseProps>,
  pencil: PencilIcon as unknown as React.ComponentType<IconBaseProps>,
  "list-checks": ListChecksIcon as unknown as React.ComponentType<IconBaseProps>,
  globe: GlobeIcon as unknown as React.ComponentType<IconBaseProps>,
  smartphone: SmartphoneIcon as unknown as React.ComponentType<IconBaseProps>,
  laptop: LaptopIcon as unknown as React.ComponentType<IconBaseProps>,
  cpu: CpuIcon as unknown as React.ComponentType<IconBaseProps>,
  "help-circle": InfoIcon as unknown as React.ComponentType<IconBaseProps>,
  folder: FolderIcon as unknown as React.ComponentType<IconBaseProps>,
  sliders: SlidersHorizontalIcon as unknown as React.ComponentType<IconBaseProps>,
  search: SearchIcon as unknown as React.ComponentType<IconBaseProps>,
  code: CodeIcon as unknown as React.ComponentType<IconBaseProps>,
  contact: ContactIcon as unknown as React.ComponentType<IconBaseProps>,
};

/* ─────────────────────────────────────────────────────────────
   Solid Icon Components (For active state in navigation menus)
───────────────────────────────────────────────────────────── */

function SolidHomeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.291 3.472a1 1 0 0 1 1.418 0l7.291 6.25A1 1 0 0 1 20.35 11H20v8a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-8h-.35a1 1 0 0 1-.65-1.278l7.291-6.25z" />
    </svg>
  );
}

function SolidBriefcaseIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2h-4zm4 4V4h-4v2h4z" />
    </svg>
  );
}

function SolidLayersIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.738a.75.75 0 0 1 0 1.322l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.322l1.372-.737Z" />
      <path d="M3.265 15.602l7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.738a.75.75 0 0 1 0 1.322l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.322l1.372-.737Z" />
    </svg>
  );
}

function SolidLightbulbIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.123 1.135 1.915V19.5a2.25 2.25 0 0 0 2.25 2.25h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.445c.02-.792.449-1.517 1.135-1.915A8.25 8.25 0 0 0 12 .75Zm-2.25 22.5a.75.75 0 0 0 .75.75h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0-.75.75Z" />
    </svg>
  );
}

function SolidInfoIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.8 5.5a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0zM10.8 11a1 1 0 0 1 1-1H12a1 1 0 0 1 1 1v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V12h-.2a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function SolidMailIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function SolidContactCardIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm8 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-4.5 9a4.5 4.5 0 0 1 9 0H7.5zM7 2a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1zm10 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z" />
    </svg>
  );
}

const SOLID_ICON_MAP: Partial<Record<AnimatedIconName, React.ComponentType<{ size?: number; className?: string }>>> = {
  home: SolidHomeIcon,
  briefcase: SolidBriefcaseIcon,
  layers: SolidLayersIcon,
  lightbulb: SolidLightbulbIcon,
  info: SolidInfoIcon,
  contact: SolidContactCardIcon,
  mail: SolidMailIcon,
};

const solidVariants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.25, 0.92, 1.1, 1],
    rotate: [0, -6, 6, -2, 0],
    transition: { duration: 0.65, ease: "easeInOut" as const },
  },
};

export interface AnimatedIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: AnimatedIconName;
  icon?: React.ComponentType<IconBaseProps>;
  size?: number | string;
  className?: string;
  animateOnHover?: boolean;
  loop?: boolean;
  solid?: boolean;
  hoverDelay?: number; // Milliseconds to wait before animating on hover (e.g. 1000 for menu items)
  oncePerInteraction?: boolean; // When true, hover and click combined only animates once per hover session
}

export function AnimatedIcon({
  name = "sparkles",
  icon,
  size = 16,
  className,
  animateOnHover = true,
  loop = false,
  solid = false,
  hoverDelay = 0,
  oncePerInteraction = false,
  ...props
}: AnimatedIconProps) {
  const IconComponent = icon || (name ? ICON_COMPONENT_MAP[name] : null) || SparklesIcon;
  const SolidComponent = solid && name ? SOLID_ICON_MAP[name] : null;

  const iconRef = useRef<AnimateIconHandle>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const solidControls = useAnimation();

  const hasAnimatedRef = useRef<boolean>(false);
  const hoverDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const numericSize = typeof size === "number" ? size : parseInt(size, 10) || 16;

  // Plays original AnimateIcons animation (or solid spring bounce) exactly once per interaction,
  // and smoothly returns to normal state afterwards.
  const executeAnimation = useCallback(() => {
    if (oncePerInteraction && hasAnimatedRef.current) {
      return;
    }
    hasAnimatedRef.current = true;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    if (SolidComponent) {
      solidControls.start("animate");
    } else {
      iconRef.current?.startAnimation?.();
    }

    // Auto-return to normal after animation completes (900ms)
    resetTimerRef.current = setTimeout(() => {
      if (SolidComponent) {
        solidControls.start("normal");
      } else {
        iconRef.current?.stopAnimation?.();
      }
      resetTimerRef.current = null;
    }, 900);
  }, [oncePerInteraction, SolidComponent, solidControls]);

  const stopAnimation = useCallback(() => {
    if (hoverDelayTimerRef.current) {
      clearTimeout(hoverDelayTimerRef.current);
      hoverDelayTimerRef.current = null;
    }
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (SolidComponent) {
      solidControls.start("normal");
    } else {
      iconRef.current?.stopAnimation?.();
    }
    // Interaction session ended on mouseleave, so reset hasAnimated
    hasAnimatedRef.current = false;
  }, [SolidComponent, solidControls]);

  // Seamless parent interaction: triggers animation after hoverDelay threshold
  // and respects once-per-interaction across both hover and click
  useEffect(() => {
    const span = containerRef.current;
    if (!span) return;

    const interactiveParent = span.closest("button, a, [role='button'], [role='tab'], .group");
    if (!interactiveParent) return;

    const handleParentEnter = () => {
      if (!animateOnHover) return;
      if (oncePerInteraction && hasAnimatedRef.current) return;

      if (hoverDelay > 0) {
        if (hoverDelayTimerRef.current) {
          clearTimeout(hoverDelayTimerRef.current);
        }
        hoverDelayTimerRef.current = setTimeout(() => {
          executeAnimation();
          hoverDelayTimerRef.current = null;
        }, hoverDelay);
      } else {
        executeAnimation();
      }
    };

    const handleParentLeave = () => {
      stopAnimation();
    };

    const handleParentClick = () => {
      // If user clicks, cancel pending hover timer and execute immediately once
      if (hoverDelayTimerRef.current) {
        clearTimeout(hoverDelayTimerRef.current);
        hoverDelayTimerRef.current = null;
      }
      // "hover and click rendum serthe one time than animate aganum"
      if (!hasAnimatedRef.current) {
        executeAnimation();
      }
    };

    interactiveParent.addEventListener("mouseenter", handleParentEnter);
    interactiveParent.addEventListener("mouseleave", handleParentLeave);
    interactiveParent.addEventListener("click", handleParentClick);

    return () => {
      interactiveParent.removeEventListener("mouseenter", handleParentEnter);
      interactiveParent.removeEventListener("mouseleave", handleParentLeave);
      interactiveParent.removeEventListener("click", handleParentClick);
      if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [animateOnHover, hoverDelay, oncePerInteraction, executeAnimation, stopAnimation]);

  // Loop mode for continuous ambient motion if requested
  useEffect(() => {
    if (!loop) return;
    const interval = setInterval(() => {
      executeAnimation();
    }, 2800);
    return () => clearInterval(interval);
  }, [loop, executeAnimation]);

  return (
    <span
      ref={containerRef}
      data-slot="animated-icon"
      data-icon-name={name}
      data-solid={solid ? "true" : undefined}
      onMouseEnter={() => {
        if (!animateOnHover) return;
        if (oncePerInteraction && hasAnimatedRef.current) return;
        if (hoverDelay > 0) {
          if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
          hoverDelayTimerRef.current = setTimeout(() => {
            executeAnimation();
            hoverDelayTimerRef.current = null;
          }, hoverDelay);
        } else {
          executeAnimation();
        }
      }}
      onMouseLeave={stopAnimation}
      onClick={() => {
        if (hoverDelayTimerRef.current) {
          clearTimeout(hoverDelayTimerRef.current);
          hoverDelayTimerRef.current = null;
        }
        if (!hasAnimatedRef.current) {
          executeAnimation();
        }
      }}
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none",
        className
      )}
      {...props}
    >
      {SolidComponent ? (
        <motion.div
          animate={solidControls}
          initial="normal"
          variants={solidVariants}
          className="inline-flex items-center justify-center shrink-0"
        >
          <SolidComponent size={numericSize} className="shrink-0" />
        </motion.div>
      ) : (
        <IconComponent
          ref={iconRef}
          size={numericSize}
          isAnimated={animateOnHover}
          className="shrink-0"
        />
      )}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pre-composed convenient exports for clean drop-in usage
───────────────────────────────────────────────────────────── */

export function AnimatedArrowRight({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="arrow-right" size={size} className={className} />;
}

export function AnimatedArrowLeft({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="arrow-left" size={size} className={className} />;
}

export function AnimatedSparkles({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="sparkles" size={size} className={className} />;
}

export function AnimatedSend({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="send" size={size} className={className} />;
}

export function AnimatedCheck({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="check" size={size} className={className} />;
}

export function AnimatedRotateCcw({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="rotate-ccw" size={size} className={className} />;
}

export function AnimatedSun({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="sun" size={size} className={className} />;
}

export function AnimatedMoon({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="moon" size={size} className={className} />;
}

export function AnimatedPalette({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="palette" size={size} className={className} />;
}

export function AnimatedType({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="type" size={size} className={className} />;
}

export function AnimatedMail({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="mail" size={size} className={className} />;
}

export function AnimatedMessageSquare({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="message-square" size={size} className={className} />;
}

export function AnimatedBriefcase({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="briefcase" size={size} className={className} />;
}

export function AnimatedLayers({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="layers" size={size} className={className} />;
}

export function AnimatedLightbulb({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="lightbulb" size={size} className={className} />;
}

export function AnimatedInfo({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="info" size={size} className={className} />;
}

export function AnimatedHome({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="home" size={size} className={className} />;
}

export function AnimatedPencil({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="pencil" size={size} className={className} />;
}

export function AnimatedListChecks({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="list-checks" size={size} className={className} />;
}

export function AnimatedZap({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="zap" size={size} className={className} />;
}

export function AnimatedX({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="x" size={size} className={className} />;
}

export function AnimatedMenu({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="menu" size={size} className={className} />;
}

export function AnimatedGrid({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="grid" size={size} className={className} />;
}

export function AnimatedChevronRight({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="chevron-right" size={size} className={className} />;
}

export function AnimatedContact({ className, size = 16 }: { className?: string; size?: number }) {
  return <AnimatedIcon name="contact" size={size} className={className} />;
}

