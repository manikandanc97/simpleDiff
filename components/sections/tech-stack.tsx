"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SectionDockSlot } from "@/components/theme/section-dock-slot";

// ─── Tech Data ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Web",
  "Mobile",
  "Database",
  "Cloud/DevOps",
  "AI/ML",
  "CMS/eCommerce",
  "Tools",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Tech {
  name: string;
  logo: string;
  categories: Category[];
}

const TECH_STACK: Tech[] = [
  // Web
  { name: "React", logo: "react", categories: ["Web", "Mobile"] },
  { name: "Next.js", logo: "nextdotjs", categories: ["Web"] },
  { name: "Vue.js", logo: "vuedotjs", categories: ["Web"] },
  { name: "TypeScript", logo: "typescript", categories: ["Web", "Mobile", "Tools"] },
  { name: "Tailwind CSS", logo: "tailwindcss", categories: ["Web"] },
  { name: "Node.js", logo: "nodedotjs", categories: ["Web", "Database"] },
  { name: "Nest.js", logo: "nestjs", categories: ["Web"] },
  { name: "GraphQL", logo: "graphql", categories: ["Web", "Tools"] },
  // Mobile
  { name: "React Native", logo: "react", categories: ["Mobile"] },
  { name: "Flutter", logo: "flutter", categories: ["Mobile"] },
  { name: "Expo", logo: "expo", categories: ["Mobile"] },
  // Database
  { name: "PostgreSQL", logo: "postgresql", categories: ["Database"] },
  { name: "MongoDB", logo: "mongodb", categories: ["Database"] },
  { name: "Redis", logo: "redis", categories: ["Database"] },
  { name: "Supabase", logo: "supabase", categories: ["Database", "Tools"] },
  { name: "Prisma", logo: "prisma", categories: ["Database"] },
  // Cloud / DevOps
  { name: "AWS", logo: "amazonaws", categories: ["Cloud/DevOps"] },
  { name: "Vercel", logo: "vercel", categories: ["Cloud/DevOps"] },
  { name: "Docker", logo: "docker", categories: ["Cloud/DevOps"] },
  { name: "GitHub Actions", logo: "githubactions", categories: ["Cloud/DevOps"] },
  { name: "Cloudflare", logo: "cloudflare", categories: ["Cloud/DevOps"] },
  // AI / ML
  { name: "OpenAI", logo: "openai", categories: ["AI/ML"] },
  { name: "LangChain", logo: "langchain", categories: ["AI/ML"] },
  { name: "Python", logo: "python", categories: ["AI/ML", "Tools"] },
  { name: "Hugging Face", logo: "huggingface", categories: ["AI/ML"] },
  // CMS / eCommerce
  { name: "Sanity", logo: "sanity", categories: ["CMS/eCommerce"] },
  { name: "Shopify", logo: "shopify", categories: ["CMS/eCommerce"] },
  { name: "Contentful", logo: "contentful", categories: ["CMS/eCommerce"] },
  { name: "Stripe", logo: "stripe", categories: ["CMS/eCommerce", "Tools"] },
  // Tools
  { name: "Figma", logo: "figma", categories: ["Tools"] },
  { name: "Git", logo: "git", categories: ["Tools"] },
  { name: "VS Code", logo: "visualstudiocode", categories: ["Tools"] },
];

const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };

// Colour overrides per logo slug
const LOGO_COLORS: Record<string, string> = {
  react: "61DAFB",
  vuedotjs: "4FC08D",
  typescript: "3178C6",
  tailwindcss: "06B6D4",
  nodedotjs: "339933",
  nestjs: "E0234E",
  graphql: "E10098",
  flutter: "02569B",
  postgresql: "4169E1",
  mongodb: "47A248",
  redis: "FF4438",
  supabase: "3ECF8E",
  amazonaws: "FF9900",
  docker: "2496ED",
  githubactions: "2088FF",
  cloudflare: "F6821F",
  python: "3776AB",
  huggingface: "FFD21E",
  sanity: "F03E2F",
  shopify: "96BF48",
  contentful: "2478CC",
  stripe: "635BFF",
  figma: "F24E1E",
  git: "F05032",
  visualstudiocode: "007ACC",
};

function TechIcon({ tech, index }: { tech: Tech; index: number }) {
  const colorHex = LOGO_COLORS[tech.logo];
  const iconUrl = colorHex
    ? `https://cdn.simpleicons.org/${tech.logo}/${colorHex}`
    : `https://cdn.simpleicons.org/${tech.logo}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -8 }}
      transition={{ ...SPRING, delay: index * 0.04 }}
      className="group flex flex-col items-center gap-3 cursor-default"
    >
      {/* Icon Card */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-border/70 bg-card flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1.5 group-hover:bg-primary/5 overflow-hidden">
        {/* Top accent on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />
        <img
          src={iconUrl}
          alt={tech.name}
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent && !parent.querySelector(".fallback-text")) {
              const span = document.createElement("span");
              span.className = "fallback-text text-base font-bold text-primary font-mono select-none";
              span.textContent = tech.name.slice(0, 2).toUpperCase();
              parent.appendChild(span);
            }
          }}
        />
      </div>
      {/* Label */}
      <span className="text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight max-w-[72px] sm:max-w-[84px] truncate">
        {tech.name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("Web");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const filtered = TECH_STACK.filter((t) =>
    t.categories.includes(activeCategory)
  );

  return (
    <section
      id="tech-stack"
      className="py-20 sm:py-28 bg-background border-t border-border relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-50" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Tools &amp; Technologies
              </span>
            </motion.div>

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

          {/* Section Theme Dock Slot */}
          <div className="shrink-0">
            <SectionDockSlot sectionId="tech-stack" label="Tech Stack" />
          </div>
        </div>

        {/* Category Tab Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Technology categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                id={`tech-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isActive
                    ? "text-primary-foreground shadow-lg shadow-primary/25"
                    : "border border-border/70 text-muted-foreground bg-card hover:border-primary/40 hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tech-active-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ zIndex: -1 }}
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tech Icons Grid */}
        <div
          role="tabpanel"
          aria-label={`${activeCategory} technologies`}
          className="min-h-[220px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-x-4 gap-y-8"
            >
              {filtered.map((tech, i) => (
                <TechIcon key={`${activeCategory}-${tech.name}`} tech={tech} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 pt-8 border-t border-border/60 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            We choose tools that fit your project — not the other way around.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
