"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

const TESTIMONIALS = [
  {
    id: "01",
    name: "Arjun Mehta",
    title: "Co-Founder & CEO",
    company: "FinTrack Pro",
    industry: "FinTech",
    stars: 5,
    quote:
      "SimpleThink didn't just build our dashboard — they challenged every assumption we had about the product. The final result is something none of our internal team could have conceived. Three months in and our reconciliation time dropped by 68%.",
    initials: "AM",
  },
  {
    id: "02",
    name: "Priya Rajan",
    title: "Product Lead",
    company: "CareConnect",
    industry: "HealthTech",
    stars: 5,
    quote:
      "We'd worked with two agencies before. Both over-promised and under-delivered. SimpleThink was the opposite — realistic scope, weekly visible progress, and a product that our doctors actually enjoy using. Exceptional engineering discipline.",
    initials: "PR",
  },
  {
    id: "03",
    name: "Karan Shetty",
    title: "Founder",
    company: "Shopflow",
    industry: "E-Commerce",
    stars: 5,
    quote:
      "What blew me away was their attention to performance. Our old storefront was 6s load time. They rebuilt it and we now sit at 0.8s. Conversions jumped 2.1× in the first quarter post-launch. The ROI speaks for itself.",
    initials: "KS",
  },
  {
    id: "04",
    name: "Meera Nair",
    title: "VP Operations",
    company: "LogiDesk",
    industry: "Logistics",
    stars: 5,
    quote:
      "From onboarding to handover, everything was documented, tracked, and delivered on time. The dispatch system reduced manual ops by 60%. SimpleThink is the kind of technical partner you keep long-term, not just for a project.",
    initials: "MN",
  },
];

const SPRING = { type: "spring" as const, stiffness: 300, damping: 28 };

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 bg-background border-t border-border overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[100px]" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-3xl">
            <SectionDockSlot sectionId="testimonials" label="Client Voices · Reviews" className="mb-3" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            >
              What Clients <span className="text-primary">Say.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Outcomes first. Real words from founders and operators we&apos;ve built with.
            </motion.p>
          </div>
        </div>

        {/* Desktop: 2-column grid + featured */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...SPRING, delay: index * 0.09 }}
              className="group relative flex flex-col gap-5 p-6 rounded-3xl border border-border/70 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500 rounded-t-3xl" />

              {/* Stars + industry */}
              <div className="flex items-center justify-between">
                <StarRating count={t.stars} />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full">
                  {t.industry}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm text-foreground/80 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xs font-black font-mono select-none">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group flex flex-col gap-5 p-6 rounded-3xl border border-border/70 bg-card"
              >
                {(() => {
                  const t = TESTIMONIALS[activeIndex];
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <StarRating count={t.stars} />
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full">
                          {t.industry}
                        </span>
                      </div>
                      <blockquote className="flex-1 text-sm text-foreground/80 leading-relaxed italic">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xs font-black font-mono select-none">
                          {t.initials}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground leading-tight">
                            {t.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.title} · {t.company}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
