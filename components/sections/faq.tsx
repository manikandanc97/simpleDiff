"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Mail,
  ShieldCheck,
  Clock,
  Code2,
} from "lucide-react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { useLead } from "@/components/leads/lead-provider";

// ─── 5 Curated FAQs (Essential Client Questions Only) ──────────────────────────

const FAQS = [
  {
    id: "faq-pricing",
    num: "01",
    category: "Pricing & Scope",
    icon: ShieldCheck,
    question: "How do you scope and price a project?",
    answer:
      "We scope every project individually based on architectural complexity, deliverable milestones, and dedicated team allocation — never unpredictable hourly rates. You receive a clear, transparent, and itemized proposal before any code is written, ensuring zero hidden costs or billing surprises.",
    highlights: [
      "Fixed Milestone Billing",
      "Itemized Scope Proposal",
      "Zero Hidden Fees",
    ],
  },
  {
    id: "faq-timeline",
    num: "02",
    category: "Delivery & Speed",
    icon: Clock,
    question: "How long does a typical build take from kickoff to launch?",
    answer:
      "A focused, production-ready MVP typically ships in 6–10 weeks. Comprehensive platforms or complex multi-tenant systems take 3–5 months. We set realistic sprint roadmaps during discovery and ship testable preview builds every single week so you see continuous progress.",
    highlights: [
      "6–10 Week MVP Cycle",
      "Weekly Testable Builds",
      "Transparent Sprint Tracking",
    ],
  },
  {
    id: "faq-ownership",
    num: "03",
    category: "Code & IP Ownership",
    icon: Code2,
    question: "Will we own 100% of the code and intellectual property?",
    answer:
      "Absolutely. Every line of clean code, architecture diagram, design system token, cloud infrastructure script, and asset belongs entirely to your company upon milestone completion. We retain zero rights, zero royalties, and zero proprietary lock-in.",
    highlights: [
      "100% IP Transfer",
      "Zero Vendor Lock-in",
      "Clean Git Repository",
    ],
  },
  {
    id: "faq-support",
    num: "04",
    category: "Post-Launch & Warranty",
    icon: Sparkles,
    question: "What happens after launch? Do you provide ongoing maintenance?",
    answer:
      "Every project includes a 30-day post-launch warranty with dedicated bug fixing and telemetry monitoring at zero extra cost. Following that, we offer flexible retainers for continuous feature iterations, DevOps scaling, and guaranteed SLA response times.",
    highlights: [
      "30-Day Included Warranty",
      "Active Telemetry Monitoring",
      "Flexible Growth Retainers",
    ],
  },
  {
    id: "faq-kickoff",
    num: "05",
    category: "Kickoff & Onboarding",
    icon: MessageSquare,
    question: "How quickly can we get started, and what does onboarding look like?",
    answer:
      "Click 'Start a project' or brief us with your vision. Within 48 hours, our technical architects schedule a discovery call to understand your business goals, evaluate feasibility, and deliver a comprehensive technical roadmap and proposal.",
    highlights: [
      "48-Hour Response Time",
      "Architect-Led Discovery",
      "Fast Technical Roadmap",
    ],
  },
];

const SPRING = { type: "spring" as const, stiffness: 320, damping: 28 };

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>("faq-pricing");
  const { openLead } = useLead();


  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background border-t border-border overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-25" />
      <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-30" />

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">

        {/* Section Layout: Split Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column (Sticky Hub & Direct Consultation Card) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <SectionDockSlot sectionId="faq" label="Questions · Answers" className="mb-3" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            >
              Frequently Asked <span className="text-primary">Questions.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Honest answers to the critical questions every founder and engineering leader asks before building with us.
            </motion.p>

            {/* Interactive Consultation Card */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-6 sm:p-7 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md overflow-hidden shadow-xl shadow-primary/5 group"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Status indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Live Response · Replies within 2 hours
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1.5">
                Have a unique technical question?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Schedule a 15-minute architecture discovery with our lead engineers. We&apos;ll evaluate your scope with zero sales pressure.
              </p>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <button
                  type="button"
                  onClick={() => openLead({ description: "FAQ - Technical Consultation" })}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer shadow-md shadow-primary/20 group/btn"
                >


                  <span>Talk to an Architect</span>
                  <AnimatedArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </button>

                <a
                  href="mailto:hello@simplethink.in"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-border/70 bg-muted/20 hover:bg-muted/40 hover:border-border text-foreground text-xs sm:text-sm font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>hello@simplethink.in</span>
                </a>
              </div>

              {/* Trust Guarantees */}
              <div className="mt-6 pt-5 border-t border-border/60 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs font-bold text-foreground">100%</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Scope Clarity</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Weekly</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Testable Demos</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Zero</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Vendor Lock-in</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Interactive Modern FAQ Bento Stack) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openId === faq.id;
              const Icon = faq.icon;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...SPRING, delay: index * 0.08 }}
                  className={`group relative rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                    isOpen
                      ? "border-primary/50 bg-card shadow-xl shadow-primary/5"
                      : "border-border/60 bg-card/65 hover:border-primary/40 hover:bg-card/90"
                  }`}
                >
                  {/* Active Top Ambient Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                      isOpen ? "opacity-100 bg-primary" : "opacity-0"
                    }`}
                  />

                  {/* Header Button */}
                  <button
                    id={faq.id}
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-start sm:items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Step Number Pill */}
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-lg shrink-0 transition-colors ${
                          isOpen
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "bg-muted/40 text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {faq.num}
                      </span>

                      <div>
                        {/* Domain Tag */}
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className={`w-3 h-3 ${isOpen ? "text-primary" : "text-muted-foreground/60"}`} />
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                            {faq.category}
                          </span>
                        </div>

                        {/* Question */}
                        <h3
                          className={`text-sm sm:text-base font-bold transition-colors duration-200 leading-snug ${
                            isOpen
                              ? "text-primary"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon Indicator */}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 mt-1 sm:mt-0 ${
                        isOpen
                          ? "border-primary/50 bg-primary/10 text-primary rotate-180"
                          : "border-border/70 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/5"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0">
                          {/* Answer Body */}
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Key Takeaway Badges */}
                          <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                            {faq.highlights.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-primary/25 bg-primary/[0.04] text-foreground"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span>{item}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Bottom Editorial Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border/60 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            Have a custom requirement? Brief us at{" "}
            <a
              href="mailto:hello@simplethink.in"
              className="text-primary hover:underline font-semibold"
            >
              hello@SimpleThink.in
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
