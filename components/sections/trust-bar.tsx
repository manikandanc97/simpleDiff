"use client";

const TRUST_SIGNALS = [
  { text: "5+ Projects Shipped", dot: true },
  { text: "100% On-Time Delivery", dot: true },
  { text: "Enterprise-Grade Security", dot: true },
  { text: "Full-Stack Capability", dot: true },
  { text: "End-to-End Ownership", dot: true },
  { text: "Zero Unnecessary Overhead", dot: true },
  { text: "Design + Engineering, One Team", dot: true },
  { text: "Sub-500ms Core Web Vitals", dot: true },
  { text: "Scalable from Day One", dot: true },
  { text: "Transparent Milestones", dot: true },
];

const TECH_SIGNALS = [
  { text: "React & Next.js" },
  { text: "TypeScript" },
  { text: "React Native" },
  { text: "Node.js & Python" },
  { text: "PostgreSQL & Supabase" },
  { text: "Cloud Architecture" },
  { text: "REST & GraphQL APIs" },
  { text: "Microservices" },
  { text: "CI/CD Pipelines" },
  { text: "AI / LLM Systems" },
  { text: "App Store & Play Store" },
  { text: "Stripe & Billing" },
];

export function TrustBar() {
  const doubledTrust = [...TRUST_SIGNALS, ...TRUST_SIGNALS];
  const doubledTech = [...TECH_SIGNALS, ...TECH_SIGNALS];

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-muted/10 py-0">
      {/* Top row — Trust signals (forward) */}
      <div className="relative overflow-hidden py-2.5 border-b border-border/30">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          className="marquee-track flex gap-10 whitespace-nowrap animate-marquee"
          style={{ "--duration": "40s" } as React.CSSProperties}
        >
          {doubledTrust.map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-mono font-semibold uppercase tracking-widest text-foreground/70 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary inline-block shrink-0" />
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row — Tech signals (reverse) */}
      <div className="relative overflow-hidden py-2.5">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          className="marquee-track flex gap-10 whitespace-nowrap animate-marquee-reverse"
          style={{ "--duration": "36s" } as React.CSSProperties}
        >
          {doubledTech.map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-mono font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary/40 inline-block shrink-0" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
