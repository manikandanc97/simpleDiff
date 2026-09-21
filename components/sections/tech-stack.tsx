"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Search, X, ShieldCheck, Zap, Lock } from "lucide-react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";


// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "All",
  "Frontend & Web",
  "Mobile",
  "Backend & APIs",
  "Database & Cloud",
  "AI & Automation",
  "Design & Tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface TechItem {
  name: string;
  slug: string;
  category: Exclude<Category, "All">;
  role: string;
  badge: string;
  accentColor: string;
  invertInDark?: boolean;
}

// ─── Curated Tech Stack (Zero Redundancy — Exactly 1 Category Each) ───────────

export const TECH_STACK: TechItem[] = [
  // Frontend & Web (6)
  {
    name: "React",
    slug: "react",
    category: "Frontend & Web",
    role: "Component UI Engine",
    badge: "Framework",
    accentColor: "#61DAFB",
  },
  {
    name: "Next.js",
    slug: "nextjs",
    category: "Frontend & Web",
    role: "Fullstack React Framework",
    badge: "Core Stack",
    accentColor: "#000000",
    invertInDark: true,
  },
  {
    name: "Vue.js",
    slug: "vuejs",
    category: "Frontend & Web",
    role: "Progressive Framework",
    badge: "Reactive UI",
    accentColor: "#4FC08D",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    category: "Frontend & Web",
    role: "Type-Safe JavaScript",
    badge: "Language",
    accentColor: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    category: "Frontend & Web",
    role: "Utility-First Styling",
    badge: "Design System",
    accentColor: "#06B6D4",
  },
  {
    name: "Vite",
    slug: "vite",
    category: "Frontend & Web",
    role: "Next-Gen Bundler & Tooling",
    badge: "Tooling",
    accentColor: "#646CFF",
  },

  // Mobile (5)
  {
    name: "React Native",
    slug: "reactnative",
    category: "Mobile",
    role: "Cross-Platform Mobile",
    badge: "iOS & Android",
    accentColor: "#61DAFB",
  },
  {
    name: "Flutter",
    slug: "flutter",
    category: "Mobile",
    role: "Multi-Platform UI Kit",
    badge: "Dart Runtime",
    accentColor: "#02569B",
  },
  {
    name: "Swift",
    slug: "swift",
    category: "Mobile",
    role: "Native Apple Ecosystem",
    badge: "iOS Native",
    accentColor: "#F05138",
  },
  {
    name: "Kotlin",
    slug: "kotlin",
    category: "Mobile",
    role: "Modern Android Native",
    badge: "Android Native",
    accentColor: "#7F52FF",
  },
  {
    name: "Expo",
    slug: "expo",
    category: "Mobile",
    role: "Universal React Native Tooling",
    badge: "Ecosystem",
    accentColor: "#000020",
    invertInDark: true,
  },

  // Backend & APIs (5)
  {
    name: "Node.js",
    slug: "nodejs",
    category: "Backend & APIs",
    role: "Event-Driven Runtime",
    badge: "Backend",
    accentColor: "#339933",
  },
  {
    name: "Nest.js",
    slug: "nestjs",
    category: "Backend & APIs",
    role: "Enterprise Node Framework",
    badge: "Modular API",
    accentColor: "#E0234E",
  },
  {
    name: "Python",
    slug: "python",
    category: "Backend & APIs",
    role: "General Purpose & ML Services",
    badge: "Backend / ML",
    accentColor: "#3776AB",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    category: "Backend & APIs",
    role: "High-Performance Async APIs",
    badge: "Microservices",
    accentColor: "#05998B",
  },
  {
    name: "GraphQL",
    slug: "graphql",
    category: "Backend & APIs",
    role: "Declarative API Query Language",
    badge: "Data Layer",
    accentColor: "#E10098",
  },

  // Database & Cloud (9)
  {
    name: "PostgreSQL",
    slug: "postgresql",
    category: "Database & Cloud",
    role: "Advanced Relational Database",
    badge: "SQL",
    accentColor: "#4169E1",
  },
  {
    name: "Supabase",
    slug: "supabase",
    category: "Database & Cloud",
    role: "Serverless Postgres & Auth",
    badge: "BaaS",
    accentColor: "#3ECF8E",
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "Database & Cloud",
    role: "Flexible Document Store",
    badge: "NoSQL",
    accentColor: "#47A248",
  },
  {
    name: "Redis",
    slug: "redis",
    category: "Database & Cloud",
    role: "In-Memory Cache & Pub/Sub",
    badge: "In-Memory",
    accentColor: "#FF4438",
  },
  {
    name: "Prisma",
    slug: "prisma",
    category: "Database & Cloud",
    role: "Next-Generation Type-Safe ORM",
    badge: "ORM",
    accentColor: "#2D3748",
    invertInDark: true,
  },
  {
    name: "AWS",
    slug: "aws",
    category: "Database & Cloud",
    role: "Global Cloud Infrastructure",
    badge: "Cloud Infra",
    accentColor: "#FF9900",
  },
  {
    name: "Docker",
    slug: "docker",
    category: "Database & Cloud",
    role: "Containerized Deployments",
    badge: "DevOps",
    accentColor: "#2496ED",
  },
  {
    name: "Vercel",
    slug: "vercel",
    category: "Database & Cloud",
    role: "Edge Compute & Frontend Cloud",
    badge: "Serverless",
    accentColor: "#000000",
    invertInDark: true,
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    category: "Database & Cloud",
    role: "Global Edge Network & Workers",
    badge: "Security & CDN",
    accentColor: "#F6821F",
  },

  // AI & Automation (5)
  {
    name: "OpenAI",
    slug: "openai",
    category: "AI & Automation",
    role: "GPT & Multimodal LLM APIs",
    badge: "LLM / AI",
    accentColor: "#10A37F",
    invertInDark: true,
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    category: "AI & Automation",
    role: "Claude Reasoning Engine",
    badge: "Frontier AI",
    accentColor: "#D97706",
  },
  {
    name: "Hugging Face",
    slug: "huggingface",
    category: "AI & Automation",
    role: "Open Model Hub & Datasets",
    badge: "Open Source",
    accentColor: "#FFD21E",
  },
  {
    name: "LangChain",
    slug: "langchain",
    category: "AI & Automation",
    role: "Agentic AI Orchestration",
    badge: "Framework",
    accentColor: "#1C3C3C",
    invertInDark: true,
  },
  {
    name: "PyTorch",
    slug: "pytorch",
    category: "AI & Automation",
    role: "Deep Learning Tensor Engine",
    badge: "ML Ops",
    accentColor: "#EE4C2C",
  },

  // Design & Tools (11)
  {
    name: "Figma",
    slug: "figma",
    category: "Design & Tools",
    role: "Collaborative UI/UX Design",
    badge: "Design",
    accentColor: "#F24E1E",
  },
  {
    name: "Photoshop",
    slug: "photoshop",
    category: "Design & Tools",
    role: "Creative Image Editing & Assets",
    badge: "Creative Suite",
    accentColor: "#31A8FF",
  },
  {
    name: "Illustrator",
    slug: "illustrator",
    category: "Design & Tools",
    role: "Vector Graphics & Brand Identity",
    badge: "Vector Design",
    accentColor: "#FF9A00",
  },
  {
    name: "Canva",
    slug: "canva",
    category: "Design & Tools",
    role: "Visual Content & Collateral",
    badge: "Graphic Design",
    accentColor: "#00C4CC",
  },
  {
    name: "Antigravity",
    slug: "antigravity",
    category: "Design & Tools",
    role: "Agentic AI IDE & Development",
    badge: "AI IDE",
    accentColor: "#3186FF",
  },
  {
    name: "Git",
    slug: "git",
    category: "Design & Tools",
    role: "Distributed Version Control",
    badge: "VCS",
    accentColor: "#F05032",
  },
  {
    name: "VS Code",
    slug: "vscode",
    category: "Design & Tools",
    role: "Core Developer IDE",
    badge: "Development",
    accentColor: "#007ACC",
  },
  {
    name: "Postman",
    slug: "postman",
    category: "Design & Tools",
    role: "API Testing & Documentation",
    badge: "API Ops",
    accentColor: "#FF6C37",
  },
  {
    name: "Stripe",
    slug: "stripe",
    category: "Design & Tools",
    role: "Global Payments & Billing",
    badge: "FinTech",
    accentColor: "#635BFF",
  },
  {
    name: "Razorpay",
    slug: "razorpay",
    category: "Design & Tools",
    role: "Payments & Banking Gateway",
    badge: "FinTech",
    accentColor: "#2B84EA",
  },
  {
    name: "GitHub Actions",
    slug: "githubactions",
    category: "Design & Tools",
    role: "Automated CI/CD Workflows",
    badge: "Automation",
    accentColor: "#2088FF",
  },
];


const SPRING = { type: "spring" as const, stiffness: 320, damping: 26 };

// ─── Single Tech Card ────────────────────────────────────────────────────────

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.92 }}
      transition={{ ...SPRING, delay: Math.min(index * 0.02, 0.25) }}
      className="group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border border-border/60 bg-card/75 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Top ambient brand glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${tech.accentColor}, transparent)`,
        }}
      />

      {/* Subtle radial corner glow */}
      <div
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: tech.accentColor }}
      />

      {/* Official Brand Logo Container */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-border/70 bg-muted/25 flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-primary/[0.04] shadow-xs">
        <Image
          src={`/images/tech-stack/${tech.slug}.svg`}
          alt={`${tech.name} logo`}
          width={40}
          height={40}
          className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${
            tech.invertInDark ? "dark:invert dark:brightness-125" : ""
          }`}
        />

      </div>

      {/* Tech Name */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 w-full">
        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
          {tech.name}
        </h3>
      </div>

      {/* Purpose / Role */}
      <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 line-clamp-1 leading-tight w-full">
        {tech.role}
      </p>

      {/* Domain Badge */}
      <span className="mt-3 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border border-border/60 text-muted-foreground/90 bg-muted/20 group-hover:border-primary/30 group-hover:text-foreground transition-colors">
        {tech.badge}
      </span>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: TECH_STACK.length };
    for (const tech of TECH_STACK) {
      counts[tech.category] = (counts[tech.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return TECH_STACK.filter((tech) => {
      const matchesCategory =
        activeCategory === "All" || tech.category === activeCategory;
      const matchesSearch =
        !query ||
        tech.name.toLowerCase().includes(query) ||
        tech.role.toLowerCase().includes(query) ||
        tech.badge.toLowerCase().includes(query) ||
        tech.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="tech-stack"
      className="py-20 sm:py-28 bg-background border-t border-border relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-30" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-40" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <SectionDockSlot sectionId="tech-stack" label="Tools & Technologies" className="mb-3" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            >
              Our Tech <span className="text-primary">Stack.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Battle-tested tools chosen for reliability, performance, and long-term maintainability — not just trends.
            </motion.p>
          </div>

          {/* Quick Search Filter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative w-full lg:w-72"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${TECH_STACK.length}+ tools...`}
              aria-label="Search technologies"
              className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-border/70 bg-card/60 backdrop-blur-md placeholder:text-muted-foreground/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Category Pill Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-2.5 mb-10"
          role="tablist"
          aria-label="Technology categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                id={`tech-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex items-center gap-2 ${
                  isActive
                    ? "text-primary-foreground shadow-lg shadow-primary/20"
                    : "border border-border/70 text-muted-foreground bg-card/70 hover:border-primary/40 hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tech-active-pill"
                    className="absolute inset-0 rounded-xl bg-primary"
                    style={{ zIndex: -1 }}
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isActive
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tech Grid Showcase */}
        <div
          role="tabpanel"
          aria-label={`${activeCategory} technologies`}
          className="min-h-[280px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
              >
                {filtered.map((tech, i) => (
                  <TechCard key={tech.slug} tech={tech} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border/80 rounded-2xl bg-card/40"
              >
                <Search className="w-8 h-8 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-foreground">
                  No matching technology found for &quot;{searchQuery}&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Try searching for a different framework, language, or clear your query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Engineering Principles & Architecture Standards Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-14 pt-10 border-t border-border/70"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/50 bg-card/40">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Zero Vendor Lock-in</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Engineered with portable open standards and decoupled architectures so you retain complete control over your code and data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/50 bg-card/40">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Sub-Second Latency</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Optimized bundles, edge CDN routing, server-rendered components, and high-performance database indexing for instant UX.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/50 bg-card/40">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Enterprise Type Safety</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Strict TypeScript contracts from database schemas to API routes, paired with automated CI/CD validation on every push.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              We select tools that fit your unique project — not the other way around.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
