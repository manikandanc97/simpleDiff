import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

import {
  AnimatedMail,
  AnimatedMessageSquare,
  AnimatedArrowRight,
} from "@/components/ui/animated-icon";

export const metadata: Metadata = {
  title: "About",
  description:
    "About SimpleThink — A premier software development company built on the belief that custom software and digital systems should be simple, focused, and high-performance.",
};

const PRINCIPLES = [
  {
    number: "01",
    tag: "CLARITY",
    title: "Clarity over cleverness",
    description:
      "Code should be easy to read. Interfaces should be effortless to use. We don't build things to show off technical trivia; we build them to solve real customer and business problems efficiently. If a concept cannot be explained plainly, it is too complex.",
  },
  {
    number: "02",
    tag: "PURPOSE",
    title: "Purpose-driven scope",
    description:
      "Every feature must earn its place in the build. If it doesn't serve the primary reason someone uses the product, it gets cut. This discipline prevents scope bloat, accelerates time-to-market, and protects you from endless maintenance debt.",
  },
  {
    number: "03",
    tag: "DETAIL",
    title: "Difference is in the details",
    description:
      "Simplicity never means generic or boring. By stripping away visual clutter and extraneous controls, we create space for refined typography, fluid motion, sub-second performance, and a distinctive identity that commands respect.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Header */}
      <div className="max-w-5xl mb-24 sm:mb-32">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          About SimpleThink
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-8">
          We believe digital products don&apos;t need to be complicated to be{" "}
          <span className="text-primary">powerful.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
          Modern web apps, software, and websites have become overloaded with bloat. We design and engineer clean, focused products that deliver outsized business impact.
        </p>
      </div>

      {/* Section 1: Who We Are */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-2">
              Our Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Who We <span className="text-primary">Are</span>
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium text-xl sm:text-2xl leading-relaxed">
              We are a dedicated software development company working directly with founders, business owners, and engineering leaders who value architectural precision over bureaucratic overhead.
            </p>
            <p>
              When you collaborate with SimpleThink, you don&apos;t get handed off through account managers, junior coordinators, or outsourced layers. You work directly with the senior software engineers crafting your system.
            </p>
            <p>
              Our methodology combines deep brand taste with modern fullstack engineering — ensuring that every website, web application, mobile app, and SaaS system we launch looks world-class and performs under pressure.
            </p>
            {SITE.location && (
              <div className="pt-4 flex items-center gap-2 text-sm font-mono text-foreground font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Operating from {SITE.location} &bull; Serving clients globally</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Our Principles */}
      <section className="py-20 sm:py-28 border-t border-border">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-2">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
            Our <span className="text-primary">Principles</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            The three core tenets that guide every architectural decision, layout, and line of code we write.
          </p>
        </div>

        {/* 3 Large Horizontal Principle Rows */}
        <div className="border-t border-border divide-y divide-border">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline group hover:bg-primary/[0.02] transition-colors -mx-4 px-4 rounded-xl"
            >
              {/* Index & Tag */}
              <div className="lg:col-span-3 flex items-baseline gap-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-muted-foreground/30 group-hover:text-primary transition-colors select-none">
                  {principle.number}
                </span>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase">
                  {principle.tag}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {(() => {
                    const words = principle.title.split(" ");
                    const last = words.pop();
                    return (
                      <>
                        {words.join(" ")} <span className="text-primary">{last}</span>
                      </>
                    );
                  })()}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-5">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Connect With Our Engineering Team */}
      <section className="py-16 sm:py-24 border-t border-border bg-card/40 rounded-3xl p-8 sm:p-14 border border-border/80">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
            Direct Engineering Line
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Let&apos;s build something exceptional <span className="text-primary">together.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Have an upcoming project, a product to revamp, or an idea to validate? We are available for select client engagements.
          </p>
          {SITE.responseTime && (
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              Typical response time: {SITE.responseTime}
            </p>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            {SITE.email && (
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <AnimatedMail size={16} />
                <span>Email {SITE.email}</span>
              </a>
            )}
            {SITE.whatsapp && (
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border bg-background hover:border-primary/50 text-foreground font-semibold text-sm transition-all"
              >
                <AnimatedMessageSquare size={16} className="text-primary" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-primary hover:underline font-semibold text-sm"
            >
              <span>Explore services</span>
              <AnimatedArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
