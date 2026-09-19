"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useThemeColor } from "@/components/theme/color-provider";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "01",
    title: "Websites",
    description: "Turn ideas into experiences.",
  },
  {
    id: "02",
    title: "Apps",
    description: "Useful. Fast. Intuitive.",
  },
  {
    id: "03",
    title: "Brands",
    description: "Make your identity unmistakable.",
  },
  {
    id: "04",
    title: "Digital Products",
    description: "From idea to something people use.",
  },
];

export function WhatWeBuild() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const { theme } = useThemeColor();

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            What can we make simple?
          </h2>
          <p className="text-xl text-muted-foreground">
            We turn complex ideas into clear, useful digital experiences.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {SERVICES.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                className={cn(
                  "group relative border-b border-border transition-colors duration-300 outline-none",
                  isActive ? "bg-muted/30" : "hover:bg-muted/10"
                )}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <div className="flex flex-col px-4 py-6 sm:py-8 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span
                      className={cn(
                        "text-sm font-mono tracking-widest transition-colors duration-300",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                      style={isActive ? { color: theme.primary } : undefined}
                    >
                      {service.id}
                    </span>
                    <h3
                      className={cn(
                        "text-2xl sm:text-4xl font-semibold tracking-tight transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-14 pt-4 pb-2 sm:pt-6">
                          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                            {service.description}
                          </p>
                          
                          {/* Visual Preview */}
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="w-full max-w-sm aspect-video rounded-md overflow-hidden relative shadow-xs border border-border/50"
                          >
                            <div className="absolute inset-0 bg-background" />
                            <motion.div
                              className="absolute inset-0 opacity-20"
                              style={{ backgroundColor: theme.primary }}
                            />
                            {/* Decorative geometric elements */}
                            <motion.div 
                              className="absolute bottom-0 left-4 right-4 h-1/2 rounded-t-sm opacity-50"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                              <div className="w-2 h-2 rounded-full bg-foreground/20" />
                              <div className="w-2 h-2 rounded-full bg-foreground/20" />
                              <div className="w-2 h-2 rounded-full bg-foreground/20" />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
