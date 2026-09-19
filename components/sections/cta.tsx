"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/components/theme/color-provider";

export function CTA() {
  const { theme } = useThemeColor();

  return (
    <section className="py-32 bg-background border-t border-border relative overflow-hidden">
      {/* Abstract geometric background hint */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none blur-3xl transition-colors duration-700"
        style={{ backgroundColor: theme.primary }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6"
        >
          Got something in mind?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
        >
          Let&apos;s make it simple.<br />
          Let&apos;s make it different.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-8 h-14 text-lg shadow-lg transition-transform hover:-translate-y-1"
          >
            Start a Project &rarr;
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto px-8 h-14 text-lg transition-colors"
          >
            Explore Our Work
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
