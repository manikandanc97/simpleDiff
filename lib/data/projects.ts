export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  kind: "concept" | "client";
  before: string[];
  after: string[];
  description: string;
  problem: string;
  solution: string;
  stack?: string[];
  outcome?: string;
  accent: string;
  image?: string;
  url?: string;
  year?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-valparai",
    number: "01",
    name: "Valparai Wanderer Tours",
    category: "Travel & Tourism Website",
    kind: "client",
    year: "2025",
    url: "https://valparaiwanderertours.com",
    problem: "A local Valparai tour operator with no online presence — bookings happened entirely over phone calls and WhatsApp with no way to show packages or capture leads.",
    solution: "A stunning full-screen editorial website with parallax hero, animated package cards, Google Reviews integration, and a WhatsApp-first lead flow.",
    description: "A local tour operator in Valparai needed to move beyond phone-only bookings. We built a visually immersive website that showcases the misty Western Ghats scenery, tour packages, and guides — turning curious visitors into confirmed bookings.",
    before: [
      "zero online presence — phone and WhatsApp only",
      "no way to display tour packages or pricing",
      "no lead capture beyond manual DMs",
      "competitors with generic templated sites",
    ],
    after: [
      "full-screen hero with parallax landscape shots",
      "animated package cards with pricing + CTA",
      "WhatsApp deep-link booking flow",
      "Google Reviews & stats strip for social proof",
    ],
    stack: ["Next.js", "Tailwind v4", "motion/react", "Cloudinary", "Vercel"],
    outcome: "Organic search presence established. WhatsApp bookings up 3× in the first month after launch.",
    accent: "oklch(0.55 0.15 150)", // Emerald green — tea estates
  },
  {
    id: "proj-grn",
    number: "02",
    name: "GRN Construction",
    category: "Construction & Builder Website",
    kind: "client",
    year: "2025",
    url: "https://grnconstruction.in",
    problem: "An established Udumalpet construction company with 10+ years of experience and 4.9★ Google rating — but no digital footprint to match their reputation.",
    solution: "A premium brand website with glassmorphism navigation, project showcase gallery, service cards, requirement form, and structured SEO targeting Udumalpet searches.",
    description: "GRN Construction had real credibility — decades of experience, happy clients, stellar Google rating — but their online presence didn't reflect any of it. We built a website that commands authority from the first scroll.",
    before: [
      "no website — only Google Business listing",
      "reputation buried behind competitors with sites",
      "no way to showcase completed project photos",
      "zero structured SEO or local search targeting",
    ],
    after: [
      "glassmorphism pill-nav with smooth scroll sections",
      "full project photo gallery with category filters",
      "service cards with pricing tiers & packages",
      "schema markup for local SEO in Udumalpet + Tiruppur",
    ],
    stack: ["Next.js", "Tailwind v4", "motion/react", "Cloudinary", "Vercel"],
    outcome: "Ranking on Page 1 for 'builders Udumalpet'. Lead form submissions within 48 hours of launch.",
    accent: "oklch(0.55 0.18 220)", // Teal — construction brand color
  },
  {
    id: "proj-fintech",
    number: "03",
    name: "Fintech App",
    category: "Mobile Application",
    kind: "concept",
    year: "2024",
    problem: "Banking apps are often cluttered, causing users to struggle with basic everyday tasks.",
    solution: "A hyper-minimal interface focusing strictly on daily transfer and balance needs.",
    description: "A concept study exploring how a mobile banking experience can feel as effortless and immediate as sending a simple text message.",
    before: [
      "cluttered multi-tab navigation",
      "promotional banners and up-sell cards",
      "complex multi-step transfer flows",
    ],
    after: [
      "instant single-tap transfers",
      "focused transaction activity feed",
      "sub-second app launch time",
    ],
    stack: ["React Native", "Tailwind", "Expo"],
    outcome: "Reduced key transaction steps from 6 screens down to 2.",
    accent: "oklch(0.6 0.15 150)", // Emerald
  },
  {
    id: "proj-retail",
    number: "04",
    name: "Retail Brand",
    category: "E-Commerce",
    kind: "concept",
    year: "2024",
    problem: "The brand identity was lost in a generic, slow-loading template with excessive plugins.",
    solution: "A custom headless architecture paired with a typography-first editorial design.",
    description: "A concept study exploring how an independent retail brand can stand out with distinctive art direction and instant page loads.",
    before: [
      "bloated monolithic theme code",
      "12+ conflicting tracking plugins",
      "3.8s mobile checkout load time",
    ],
    after: [
      "lean headless product catalog",
      "frictionless one-page checkout",
      "sub-500ms initial page load",
    ],
    stack: ["Next.js", "Stripe", "Tailwind"],
    outcome: "Clean visual distinction with instant mobile purchasing.",
    accent: "oklch(0.55 0.2 280)", // Violet
  },
  {
    id: "proj-ops",
    number: "05",
    name: "Operations Dashboard",
    category: "Web Application",
    kind: "concept",
    year: "2024",
    problem: "Operational data was scattered across complex spreadsheets and dense 50-column tables.",
    solution: "A clear dashboard that surfaces only actionable exceptions, hiding noise by default.",
    description: "A concept study exploring how complex operational data can be simplified into glanceable, decision-ready insights.",
    before: [
      "dense 50-column data tables",
      "manual CSV exports and spreadsheets",
      "overwhelming non-actionable graphs",
    ],
    after: [
      "clear high-level KPI trends",
      "automated anomaly alerts",
      "intuitive drill-down filters",
    ],
    stack: ["Next.js", "Supabase", "Tailwind v4"],
    outcome: "Immediate clarity on daily priorities without data fatigue.",
    accent: "oklch(0.6 0.2 20)", // Rose
  },
];
