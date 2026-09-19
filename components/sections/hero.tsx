"use client";

import { motion } from "motion/react";
import { ColorPicker } from "@/components/theme/color-picker";
import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/components/theme/color-provider";

export function Hero() {
  const { theme } = useThemeColor();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden py-20 px-6">
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 dark:opacity-10 pointer-events-none"
        animate={{ backgroundColor: theme.primary }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Color Picker placed in Hero area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <ColorPicker />
        </motion.div>

        {/* Headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground mb-6"
        >
          Keep It Simple. <br />
          Make It{" "}
          <span className="text-primary transition-colors duration-300 relative inline-block">
            Different.
            <motion.span
              layoutId="hero-underline"
              className="absolute -bottom-2 left-0 right-0 h-[0.1em] bg-primary opacity-30 rounded-sm"
              style={{ backgroundColor: theme.primary }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium"
        >
          We build websites, apps, brands and digital products without unnecessary complexity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 transition-all">
            Start a Project &rarr;
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 transition-colors">
            See Our Work
          </Button>
        </motion.div>

        {/* Interactive Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 flex items-center justify-center gap-4 text-sm font-semibold tracking-widest text-muted-foreground"
        >
          <span>IDEA</span>
          <motion.div
            className="w-12 h-px bg-border"
            animate={{ width: ["48px", "72px", "48px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>SIMPLE</span>
          <motion.div
            className="w-12 h-px bg-border"
            animate={{ width: ["48px", "72px", "48px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <span className="text-primary transition-colors duration-300">DIFFERENT</span>
        </motion.div>
      </div>
    </section>
  );
}
