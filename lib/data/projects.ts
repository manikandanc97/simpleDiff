export interface ProjectPreviewTheme {
  primaryColor: string;
  badgeBg: string;
  badgeText: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  metricBadge: string;
  previewBg: string;
  navLinks: string[];
}

export interface Project {
  id: string;
  number: string;
  name: string;
  domain: string;
  category: string;
  kind: "client";
  year: string;
  url: string;
  badge: string;
  result: string;
  description: string;
  problem: string;
  solution: string;
  before: string[];
  after: string[];
  stack: string[];
  tags: string[];
  outcome: string;
  accent: string;
  accentGradient: string;
  featured?: boolean;
  previewTheme: ProjectPreviewTheme;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL FREELANCE PROJECTS REPOSITORY
 * ─────────────────────────────────────────────────────────────────────────────
 * To add a new website in the future:
 * Simply add a new project object to this `PROJECTS` array.
 * Both the "Selected Work" section on the Home page and the "/work" page
 * will automatically map and render the new website with its browser view!
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const PROJECTS: Project[] = [
  {
    id: "proj-valparai",
    number: "01",
    name: "Valparai Wanderer Tours",
    domain: "valparaiwanderertours.com",
    category: "Travel & Tourism · Tour Booking Platform",
    kind: "client",
    year: "2025",
    url: "https://valparaiwanderertours.com",
    badge: "Live Client Site",
    result: "+300% Month 1 Bookings",
    description:
      "An experiential travel & tour booking platform for Valparai tour packages, misty Western Ghats jungle safaris, and tea estate explorations. Features live WhatsApp-first booking and interactive route showcases.",
    problem:
      "A local Valparai tour operator with no online presence — bookings happened entirely over scattered phone calls with no way to showcase scenic packages, reviews, or capture organic travelers.",
    solution:
      "A responsive website with parallax tea estate vistas, interactive tour package cards, Google Reviews integration, and a direct 1-click WhatsApp booking flow.",
    before: [
      "zero online presence — bookings strictly via manual phone calls",
      "no visual showcase for scenic tour packages or pricing",
      "no lead capture or digital itinerary distribution",
      "competitors dominating regional Western Ghats tourism search",
    ],
    after: [
      "full-screen hero with lush tea valley landscape visuals",
      "animated package cards with pricing & instant WhatsApp booking",
      "curated customer reviews & 4.9★ rating proof",
      "established organic search presence for Valparai tour packages",
    ],
    stack: ["Next.js", "Tailwind CSS", "motion/react", "Cloudinary", "Vercel"],
    tags: ["Next.js", "Tailwind CSS", "motion/react", "WhatsApp API", "Cloudinary"],
    outcome:
      "Organic search presence established across South India. WhatsApp bookings increased 3× in the first month following launch.",
    accent: "oklch(0.55 0.15 150)",
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featured: true,
    previewTheme: {
      primaryColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeText: "Explore Valparai Like a Local",
      headline: "Discover Valparai like never before",
      subheadline:
        "Misty Western Ghats roads, hidden waterfalls & guided tea estate safaris.",
      ctaText: "Plan My Valparai Trip",
      metricBadge: "4.9★ Google Reviews",
      previewBg:
        "linear-gradient(135deg, #091a13 0%, #0d281e 50%, #05120c 100%)",
      navLinks: ["Home", "Packages", "About", "Gallery", "Contact"],
    },
  },
  {
    id: "proj-grn",
    number: "02",
    name: "GRN Construction",
    domain: "grnconstruction.in",
    category: "Architecture & Construction · Brand Website",
    kind: "client",
    year: "2025",
    url: "https://grnconstruction.in",
    badge: "Live Client Site",
    result: "Page 1 Google SEO Ranking",
    description:
      "A corporate brand website for Udumalpet's premier builders. Features glassmorphism navigation, project portfolio gallery, BOQ estimation, and structured local SEO targeting builders in Tamil Nadu.",
    problem:
      "An established construction firm with 10+ years of civil engineering excellence and a 4.9★ Google rating, yet had zero professional website to showcase completed architectural projects to high-ticket clients.",
    solution:
      "A brand website with floating glassmorphism navigation, architectural portfolio gallery with category filters, transparent pricing tiers, and local SEO schema.",
    before: [
      "reputation confined to word-of-mouth with no digital footprint",
      "no way for prospective villa & commercial clients to view project galleries",
      "zero structured SEO for high-intent 'builders in Udumalpet' queries",
    ],
    after: [
      "modern dark luxury brand aesthetic with architectural gridlines",
      "interactive completed project portfolio with category filters",
      "milestone-based pricing cards and instant estimate inquiry form",
      "Page 1 Google ranking for key local construction terms",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO Schema", "motion/react"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Local SEO", "motion/react"],
    outcome:
      "Achieved Page 1 Google ranking for regional building queries. Generated qualified turnkey villa inquiries within 48 hours of go-live.",
    accent: "oklch(0.55 0.18 220)",
    accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#06b6d4",
      badgeBg: "rgba(6, 182, 212, 0.15)",
      badgeText: "Udumalpet's Trusted Builders Since 2018",
      headline: "Building Dreams Into Reality",
      subheadline:
        "Premium residential villas, commercial hubs & turnkey civil engineering.",
      ctaText: "Get a Free Estimate",
      metricBadge: "10+ Years · 100+ Handed Over",
      previewBg:
        "linear-gradient(135deg, #0a131f 0%, #0f1f33 50%, #060c14 100%)",
      navLinks: ["Home", "About", "Services", "Projects", "Packages", "Contact"],
    },
  },
  {
    id: "proj-viha",
    number: "03",
    name: "Viha Handicrafts",
    domain: "vihahandicrafts.com",
    category: "E-Commerce & Heritage · Artisan Showcase",
    kind: "client",
    year: "2025",
    url: "https://vihahandicrafts.com",
    badge: "Live Client Site",
    result: "Pan-India Direct Orders",
    description:
      "A Chettinad heritage showcase platform celebrating traditional South Indian art. Features brass idol collections, Tanjore paintings, wooden panel showcases, and a direct WhatsApp purchasing flow.",
    problem:
      "Authentic generational Chettinad artisans struggled to reach customers outside regional craft exhibitions, lacking a digital showcase for handcrafted brass idols and Tanjore art.",
    solution:
      "An editorial heritage e-commerce storefront with warm ivory & terracotta aesthetics, categorized artisan collections, Vastu placement guidance, and direct WhatsApp consultations.",
    before: [
      "sales limited to local handicraft exhibitions and walk-ins",
      "no platform to showcase intricate brass casting & Tanjore gold foil details",
      "customers lacked Vastu and sizing guidance before purchasing sacred idols",
    ],
    after: [
      "authentic Chettinad aesthetic with brass and terracotta color palettes",
      "10+ categorized artisan collections with detailed craftsmanship notes",
      "integrated Spiritual Guidance section for idol placement and Vastu",
      "frictionless WhatsApp direct inquiry & custom sizing orders",
    ],
    stack: ["Next.js", "Tailwind CSS", "motion/react", "E-Commerce", "Vercel"],
    tags: ["Next.js", "Tailwind CSS", "motion/react", "E-Commerce", "Artisan UI"],
    outcome:
      "Expanded client reach pan-India. Converted sacred idol and custom Tanjore painting inquiries into steady weekly orders.",
    accent: "oklch(0.6 0.18 45)",
    accentGradient: "from-amber-600/20 via-rose-600/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeText: "Chettinad Heritage Preserved",
      headline: "Authentic Chettinad Handicrafts",
      subheadline:
        "Generational brass statues, gold-foil Tanjore art & sacred wooden artifacts.",
      ctaText: "Explore Collection",
      metricBadge: "100% Handcrafted · Pan-India Delivery",
      previewBg:
        "linear-gradient(135deg, #1f120c 0%, #30170f 50%, #120905 100%)",
      navLinks: ["Home", "About", "Products", "Gallery", "Contact Us"],
    },
  },
];
