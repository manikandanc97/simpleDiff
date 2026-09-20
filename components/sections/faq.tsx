"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

const FAQS = [
  {
    id: "faq-01",
    question: "How do you price a project?",
    answer:
      "We scope every project individually after a discovery session. Pricing is based on complexity, timeline, and team size — not hourly rates. You'll receive a clear, itemized proposal before anything starts. No hidden costs, no billing surprises.",
  },
  {
    id: "faq-02",
    question: "How long does a typical project take?",
    answer:
      "A focused MVP typically takes 6–10 weeks. Enterprise-grade platforms or complex multi-platform builds are 3–6 months. We set realistic timelines in discovery, not optimistic ones to win the deal.",
  },
  {
    id: "faq-03",
    question: "Do you work with early-stage startups or only established companies?",
    answer:
      "Both. We've built 0→1 MVPs for first-time founders and scaled systems for established teams. What matters is that the problem is real and there's a clear vision — not the company size.",
  },
  {
    id: "faq-04",
    question: "What happens after launch?",
    answer:
      "Every project includes a 30-day post-launch support window at no extra cost. After that, we offer flexible retainer arrangements for ongoing maintenance, feature development, and monitoring.",
  },
  {
    id: "faq-05",
    question: "Who will actually be working on my project?",
    answer:
      "Senior engineers and designers — not juniors supervised by a lead. You'll always know who is building what. We don't offshore or outsource any part of the core build without your knowledge.",
  },
  {
    id: "faq-06",
    question: "Can you work with our existing codebase?",
    answer:
      "Yes. We do thorough code reviews before committing to any legacy project. If the existing codebase creates risks, we tell you upfront — including honest recommendations on what to refactor vs. what to retain.",
  },
  {
    id: "faq-07",
    question: "Do you handle design and UX, or just engineering?",
    answer:
      "We do both, under one roof. Design and engineering work together from day one — which means fewer handoff errors, faster iteration, and a consistent product vision end-to-end.",
  },
  {
    id: "faq-08",
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack is React, Next.js, TypeScript, Node.js, and React Native. We also work with Python, PostgreSQL, Supabase, AWS, and various AI/LLM frameworks. We choose tools that fit your requirements — not the other way around.",
  },
  {
    id: "faq-09",
    question: "Will I own the code and IP?",
    answer:
      "Absolutely. All code, assets, and intellectual property transfer to you upon final payment. We retain no rights, no backdoors, no dependencies on SimpleDiff-specific infrastructure.",
  },
  {
    id: "faq-10",
    question: "How do we get started?",
    answer:
      "Hit \u2018Start a project\u2019 anywhere on this page. You\u2019ll fill a brief form and we\u2019ll schedule a no-pressure discovery call within 48 hours to understand your goals, timelines, and budget \u2014 then send a scoped proposal.",
  },
];

const SPRING = { type: "spring" as const, stiffness: 280, damping: 26 };

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING, delay: index * 0.05 }}
      className={`border-b border-border/50 ${index === 0 ? "border-t" : ""}`}
    >
      <button
        id={faq.id}
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-mono text-muted-foreground/40 group-hover:text-primary/50 transition-colors select-none shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {faq.question}
          </span>
        </div>
        <div
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border/60 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="minus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>("faq-01");

  const toggle = (id: string) => setOpenId((curr) => (curr === id ? null : id));

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background border-t border-border overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-20" />
      <div className="pointer-events-none absolute -top-8 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Questions · Answers
              </span>
            </motion.div>

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
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Honest answers to the questions every client asks before they commit.
            </motion.p>
          </div>

          <div className="shrink-0">
            <SectionDockSlot sectionId="faq" label="FAQ" />
          </div>
        </div>

        {/* Two-column layout on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div>
            {FAQS.slice(0, 5).map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
          <div>
            {FAQS.slice(5).map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i + 5}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border/60 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            Still have questions?{" "}
            <span className="text-primary">hello@simplediff.in</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
