"use client";

const MARQUEE_ITEMS = [
  "React & Next.js",
  "TypeScript",
  "React Native",
  "Node.js & Python",
  "PostgreSQL",
  "Cloud Architecture",
  "REST & GraphQL APIs",
  "Microservices",
  "CI/CD Pipelines",
  "AI / LLM Systems",
  "Enterprise Security",
  "App Store & Play Store",
];

export function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-3 border-y border-border/50 bg-muted/20">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />
      <div
        className="marquee-track flex gap-10 whitespace-nowrap animate-marquee"
        style={{ "--duration": "32s" } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2.5"
          >
            <span className="w-1 h-1 rounded-full bg-primary/70 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

