"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";
import { ArrowRight, MessageSquare } from "lucide-react";

interface CTAProps {
  onStartProject?: () => void;
}

const FLOATING_WORDS = [
  "Websites", "Web Apps", "Mobile", "SaaS",
  "Branding", "AI", "Next.js", "React",
  "Motion", "Design", "Simple", "Different",
];

export function CTA({ onStartProject }: CTAProps) {
  const { openLead } = useLead();

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else openLead({ source: "cta" });
  };

  return (
    <section className="py-32 bg-background border-t border-border relative overflow-hidden">
      {/* ── Layered background effects ── */}
      <div className="pointer-events-none absolute inset-0 mesh-bg" />

      {/* Large central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/8 pointer-events-none blur-3xl transition-colors duration-700" />

      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[0, 0.5, 1].map((delay) => (
          <motion.div
            key={delay}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{
              duration: 3,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          />
        ))}
      </div>

      {/* Floating word cloud — decorative background text */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {FLOATING_WORDS.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.04 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.8 }}
            animate={{
              y: [0, i % 2 === 0 ? -8 : 8, 0],
            }}
            style={{
              position: "absolute",
              left: `${(i * 13 + 5) % 90}%`,
              top: `${(i * 17 + 8) % 85}%`,
              fontSize: `${1.5 + (i % 3) * 0.8}rem`,
              animationDelay: `${i * 0.3}s`,
            }}
            className="font-bold text-foreground whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ready to build?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4 leading-[1.05]"
        >
          Got something
          <br />
          <span className="text-gradient">in mind?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl leading-relaxed"
        >
          Let&apos;s make it simple.
          <br />
          Let&apos;s make it different.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleStart}
            id="cta-start-project"
            className="group relative inline-flex items-center gap-2 w-full sm:w-auto px-8 h-14 text-lg rounded-xl bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            Start a Project
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto px-8 h-14 text-lg transition-all hover:-translate-y-1 active:translate-y-0 duration-200"
            )}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            See Our Work
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-sm text-muted-foreground"
        >
          No sales pitch. Just a quick conversation to understand your project.
        </motion.p>
      </div>
    </section>
  );
}
