"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Home,
  Briefcase,
  Layers,
  Lightbulb,
  Info,
  Palette,
  Type,
  Sun,
  Moon,
  Send,
  Check,
  RotateCcw,
  Mail,
  MessageSquare,
  X,
  Menu,
  Grid2X2,
  ChevronRight,
  ExternalLink,
  Zap,
  Pencil,
  ListChecks,
  Globe,
  Smartphone,
  Laptop,
  Cpu,
  HelpCircle,
  Folder,
  SlidersHorizontal,
  Search,
  Code,
  type LucideIcon,
} from "lucide-react";

export type AnimatedIconName =
  | "arrow-right"
  | "arrow-left"
  | "sparkles"
  | "home"
  | "briefcase"
  | "layers"
  | "lightbulb"
  | "info"
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

interface AnimatedIconProps extends Omit<HTMLMotionProps<"span">, "children"> {
  name?: AnimatedIconName;
  icon?: LucideIcon;
  size?: number | string;
  className?: string;
  animateOnHover?: boolean;
  loop?: boolean;
}

const ICON_MAP: Record<AnimatedIconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  sparkles: Sparkles,
  home: Home,
  briefcase: Briefcase,
  layers: Layers,
  lightbulb: Lightbulb,
  info: Info,
  palette: Palette,
  type: Type,
  sun: Sun,
  moon: Moon,
  send: Send,
  check: Check,
  "rotate-ccw": RotateCcw,
  mail: Mail,
  "message-square": MessageSquare,
  x: X,
  menu: Menu,
  grid: Grid2X2,
  "chevron-right": ChevronRight,
  "external-link": ExternalLink,
  zap: Zap,
  pencil: Pencil,
  "list-checks": ListChecks,
  globe: Globe,
  smartphone: Smartphone,
  laptop: Laptop,
  cpu: Cpu,
  "help-circle": HelpCircle,
  folder: Folder,
  sliders: SlidersHorizontal,
  search: Search,
  code: Code,
};

export function AnimatedIcon({
  name,
  icon,
  size = 16,
  className,
  animateOnHover = true,
  loop = false,
  ...props
}: AnimatedIconProps) {
  const IconComponent = icon || (name ? ICON_MAP[name] : null) || Sparkles;

  // Determine specific animation variant based on icon name
  const getVariants = (): Variants => {
    switch (name) {
      case "arrow-right":
      case "chevron-right":
      case "external-link":
        return {
          initial: { x: 0 },
          hover: { x: 4, transition: { type: "spring" as const, stiffness: 450, damping: 18 } },
        };
      case "arrow-left":
        return {
          initial: { x: 0 },
          hover: { x: -4, transition: { type: "spring" as const, stiffness: 450, damping: 18 } },
        };
      case "sparkles":
      case "zap":
        return {
          initial: { scale: 1, rotate: 0 },
          hover: {
            scale: [1, 1.25, 1.1],
            rotate: [0, -12, 12, 0],
            transition: { duration: 0.45, ease: "easeInOut" as const },
          },
        };
      case "rotate-ccw":
        return {
          initial: { rotate: 0 },
          hover: {
            rotate: -360,
            transition: { duration: 0.6, ease: "easeInOut" as const },
          },
        };
      case "send":
        return {
          initial: { x: 0, y: 0, rotate: 0 },
          hover: {
            x: [0, -2, 5, 0],
            y: [0, 2, -4, 0],
            rotate: [0, -10, 15, 0],
            transition: { duration: 0.5, ease: "easeInOut" as const },
          },
        };
      case "sun":
        return {
          initial: { rotate: 0, scale: 1 },
          hover: {
            rotate: 90,
            scale: 1.15,
            transition: { type: "spring" as const, stiffness: 350, damping: 15 },
          },
        };
      case "moon":
        return {
          initial: { rotate: 0, scale: 1 },
          hover: {
            rotate: -25,
            scale: 1.15,
            transition: { type: "spring" as const, stiffness: 350, damping: 15 },
          },
        };
      case "palette":
        return {
          initial: { rotate: 0 },
          hover: {
            rotate: [0, -15, 15, -5, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          },
        };
      case "type":
        return {
          initial: { scale: 1 },
          hover: {
            scale: [1, 1.2, 0.95, 1.05],
            transition: { duration: 0.4 },
          },
        };
      case "home":
        return {
          initial: { y: 0, scale: 1 },
          hover: {
            y: -2,
            scale: 1.1,
            transition: { type: "spring" as const, stiffness: 450, damping: 16 },
          },
        };
      case "briefcase":
        return {
          initial: { rotate: 0, y: 0 },
          hover: {
            rotate: [0, -8, 8, 0],
            y: -1.5,
            transition: { duration: 0.45 },
          },
        };
      case "layers":
        return {
          initial: { y: 0, scale: 1 },
          hover: {
            y: -2.5,
            scale: 1.12,
            transition: { type: "spring" as const, stiffness: 400, damping: 15 },
          },
        };
      case "lightbulb":
        return {
          initial: { scale: 1 },
          hover: {
            scale: [1, 1.22, 1.08],
            transition: { duration: 0.4 },
          },
        };
      case "info":
      case "help-circle":
        return {
          initial: { rotate: 0 },
          hover: {
            rotate: [0, -12, 12, 0],
            transition: { duration: 0.45 },
          },
        };
      case "check":
        return {
          initial: { scale: 1 },
          hover: {
            scale: [1, 1.3, 1],
            transition: { duration: 0.35 },
          },
        };
      case "mail":
      case "message-square":
        return {
          initial: { y: 0 },
          hover: {
            y: [0, -3, 0],
            scale: [1, 1.12, 1],
            transition: { duration: 0.4 },
          },
        };
      case "grid":
      case "menu":
        return {
          initial: { scale: 1 },
          hover: {
            scale: 1.15,
            transition: { type: "spring" as const, stiffness: 400, damping: 18 },
          },
        };
      default:
        return {
          initial: { scale: 1 },
          hover: {
            scale: 1.15,
            transition: { type: "spring" as const, stiffness: 400, damping: 18 },
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.span
      data-slot="animated-icon"
      variants={variants}
      initial="initial"
      whileHover={animateOnHover ? "hover" : undefined}
      whileTap={{ scale: 0.88 }}
      animate={
        loop
          ? {
              scale: [1, 1.08, 1],
              rotate: [0, 4, -4, 0],
              transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
            }
          : undefined
      }
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none transition-transform pointer-events-none group-hover/button:scale-110",
        // When inside any .group element, apply reactive motion
        name === "arrow-right" && "group-hover:translate-x-1 group-hover/button:translate-x-1",
        name === "arrow-left" && "group-hover:-translate-x-1 group-hover/button:-translate-x-1",
        name === "chevron-right" && "group-hover:translate-x-1",
        name === "rotate-ccw" && "group-hover:-rotate-90 group-hover/button:-rotate-180",
        name === "sparkles" && "group-hover:rotate-12 group-hover:scale-110",
        name === "send" && "group-hover:translate-x-1 group-hover:-translate-y-0.5",
        name === "sun" && "group-hover:rotate-45",
        name === "moon" && "group-hover:-rotate-12",
        className
      )}
      {...props}
    >
      <IconComponent
        size={typeof size === "number" ? size : undefined}
        className={cn(
          typeof size === "string" ? size : "",
          "shrink-0 transition-transform duration-200"
        )}
      />
    </motion.span>
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
