"use client";

import { motion } from "motion/react";
import { useThemeColor } from "@/components/theme/color-provider";

const PRINCIPLES = [
  {
    id: "01",
    title: "Clarity",
    description: "We remove unnecessary complexity.",
  },
  {
    id: "02",
    title: "Purpose",
    description: "Every feature should have a reason.",
  },
  {
    id: "03",
    title: "Difference",
    description: "Simple solutions can still feel remarkable.",
  },
];

export function Philosophy() {
  const { theme } = useThemeColor();

  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-medium tracking-tight text-muted-foreground mb-4"
          >
            Simple doesn&apos;t mean basic.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]"
          >
            It means nothing unnecessary.
          </motion.p>
        </div>

        {/* Principles Stack */}
        <div className="flex flex-col border-t border-border">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group border-b border-border py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 hover:bg-muted/10 transition-colors duration-500"
            >
              <div 
                className="text-lg font-mono font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: theme.primary }}
              >
                {principle.id} &mdash;
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground md:w-1/3">
                {principle.title}
              </h3>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
