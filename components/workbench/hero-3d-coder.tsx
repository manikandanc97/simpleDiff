"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { DynamicTShirtCharacter } from "@/components/ui/dynamic-tshirt-character";
import { Terminal, Layers, ShieldCheck } from "lucide-react";

const CODE_SNIPPETS = [
  "const app = SimpleThink.create();",
  "await app.deploy({ speed: 'instant' });",
  "// 🚀 MVP launched in 48 hours",
  "export default function Product() {}",
];

interface Hero3DCoderProps {
  className?: string;
}

export function Hero3DCoder({ className }: Hero3DCoderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typing code animation
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = CODE_SNIPPETS[snippetIndex];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < current.length) {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(current.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, snippetIndex]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-[480px] sm:max-w-[540px] aspect-square flex items-center justify-center select-none perspective-[1200px]",
        className
      )}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-primary/15 to-transparent blur-3xl opacity-80 pointer-events-none animate-pulse-glow transition-colors duration-500" />
      <div className="absolute -inset-4 rounded-full bg-gradient-to-bl from-primary/20 via-transparent to-primary/10 blur-2xl pointer-events-none transition-colors duration-500" />

      {/* 3D Parallax Canvas */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Central Developer Character Graphic without card */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 w-[86%] sm:w-[92%] h-[86%] sm:h-[92%] drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] flex items-center justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center transition-transform duration-700 hover:scale-105">
            <DynamicTShirtCharacter />
          </div>
        </motion.div>

        {/* Floating Code Typing Window (Simulated IDE snippet) */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            x: [-4, 4, -4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(70px)" }}
          className="absolute -top-2 -left-2 sm:top-4 sm:-left-6 z-20 glass rounded-xl p-3 sm:p-3.5 border border-primary/30 shadow-xl shadow-primary/10 backdrop-blur-md max-w-[220px] sm:max-w-[250px]"
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-border/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 text-primary" /> main.tsx
            </span>
          </div>
          <div className="font-mono text-[11px] sm:text-xs text-foreground/90 leading-snug min-h-[34px] flex items-center">
            <span className="text-primary font-semibold mr-1">&gt;</span>
            <span className="text-foreground">{displayedText}</span>
            <span className="w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse inline-block" />
          </div>
        </motion.div>

        {/* Floating Tech Pill 1: Modern Tech Stacks */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [1.5, -2, 1.5],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          style={{ transform: "translateZ(85px)" }}
          className="absolute top-10 -right-2 sm:top-14 sm:-right-4 z-20 glass px-3.5 py-1.5 rounded-full border border-border/80 shadow-lg flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <Layers className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold text-foreground tracking-tight">
            Modern Tech Stacks
          </span>
        </motion.div>

        {/* Floating Tech Pill 2: Shipped Live Status */}
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -bottom-2 -right-2 sm:bottom-6 sm:-right-4 z-20 glass px-3.5 py-2 rounded-xl border border-primary/25 shadow-lg flex items-center gap-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Production
            </div>
            <div className="text-xs font-bold text-foreground">
              100% Optimized
            </div>
          </div>
        </motion.div>

        {/* Floating Tech Pill 3: Clean Architecture */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            x: [3, -3, 3],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-6 -left-2 sm:bottom-12 sm:-left-4 z-20 glass px-3.5 py-1.5 rounded-full border border-border/80 shadow-md flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-3 h-3" />
          </div>
          <span className="text-xs font-medium text-foreground">
            Type-Safe Architecture
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
