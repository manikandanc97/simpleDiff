import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LeadForm } from "@/components/leads/lead-form";
import {
  AnimatedMail,
  AnimatedMessageSquare,
  AnimatedSparkles,
  AnimatedCheck,
  AnimatedContact,
} from "@/components/ui/animated-icon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SimpleThink. Discuss your web application, mobile app, software architecture, or schedule a direct engineering consultation.",
};

const BENEFITS = [
  "Direct collaboration with senior software engineers",
  "Fixed pricing & realistic sprint milestones",
  "Zero bloated overhead or junior outsourcing",
  "Sub-second performance & clean, maintainable code",
];

const FAQS = [
  {
    question: "How fast can we kick off a build?",
    answer:
      "Most projects can begin within 3 to 7 business days following our initial technical scoping session and architectural sign-off.",
  },
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs)?",
    answer:
      "Yes, absolutely. We regularly sign mutual NDAs before reviewing proprietary requirements, codebases, or patent-pending architectures.",
  },
  {
    question: "How do you handle pricing and contracts?",
    answer:
      "We operate primarily on clear milestone-based fixed scope contracts or dedicated weekly engineering sprints, ensuring full transparency with zero hidden fees.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Header */}
      <div className="max-w-4xl mb-16 sm:mb-20">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <AnimatedContact size={14} className="text-primary" />
          Direct Engineering Line
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6">
          Let&apos;s build your system <span className="text-primary">right.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
          Whether you need an enterprise web application, mobile app, or modern design system, our team is ready to deliver. Reach out directly below.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Info & Communication Channels */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Direct Channels Card */}
          <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">Direct Communication</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {SITE.responseTime ? `Typical reply: ${SITE.responseTime}` : "We respond to all verified inquiries within 24 hours."}
              </p>
            </div>

            <div className="space-y-3">
              {SITE.email && (
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-background/60 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <AnimatedMail size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Direct Email</div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {SITE.email}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Write &rarr;
                  </span>
                </a>
              )}

              {SITE.whatsapp && (
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-background/60 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <AnimatedMessageSquare size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Instant Messenger</div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        WhatsApp Consultation
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Chat &rarr;
                  </span>
                </a>
              )}
            </div>

            {/* Operating Hours / Location Badge */}
            <div className="pt-2 border-t border-border/60 flex items-center gap-2.5 text-xs text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{SITE.availability || "Currently accepting select new projects"}</span>
            </div>
          </div>

          {/* What to Expect Card */}
          <div className="rounded-3xl border border-border/80 bg-muted/20 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <AnimatedSparkles size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">What You Get</h3>
            </div>
            <ul className="space-y-3">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <AnimatedCheck size={12} />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Project Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 sm:p-10 shadow-lg shadow-black/5">
            <div className="mb-6 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Start a <span className="text-primary">Conversation</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us about your product goals, timeline, and requirements. We&apos;ll review and reply with an initial technical assessment.
              </p>
            </div>

            <LeadForm />
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="mt-24 pt-16 border-t border-border max-w-4xl">
        <div className="mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-2">
            Scoping & FAQ
          </span>
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/70 bg-card/40 p-6 space-y-2.5 transition-all hover:border-primary/30"
            >
              <h3 className="text-base font-bold text-foreground">{faq.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
