export type ServiceType = "Websites" | "Web Apps" | "Mobile Apps";

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
  serviceType: ServiceType;
  category: string;
  kind: "client";
  year: string;
  url: string;
  image?: string;
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
 * CENTRAL PROJECTS REPOSITORY
 * ─────────────────────────────────────────────────────────────────────────────
 * Grouped into our 3 primary services:
 * - Websites: Live client websites engineered end-to-end
 * - Web Apps: Fullstack software, ERPs, dashboards & B2B platforms
 * - Mobile Apps: iOS & Android cross-platform mobile applications
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const PROJECTS: Project[] = [
  // ─── 01. WEBSITES (Live Client Projects) ───────────────────────────────────
  {
    id: "proj-valparai",
    number: "01",
    name: "Valparai Wanderer Tours",
    domain: "valparaiwanderertours.com",
    serviceType: "Websites",
    category: "Travel & Tourism · Tour Booking Platform",
    kind: "client",
    year: "2025",
    url: "https://valparaiwanderertours.com",
    badge: "Live Client Site",
    image: "/images/projects/valparai_live.jpg",
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
    serviceType: "Websites",
    category: "Architecture & Construction · Brand Website",
    kind: "client",
    year: "2025",
    url: "https://grnconstruction.in",
    badge: "Live Client Site",
    image: "/images/projects/grn_live.webp",
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
    serviceType: "Websites",
    category: "E-Commerce & Heritage · Artisan Showcase",
    kind: "client",
    year: "2025",
    url: "https://vihahandicrafts.com",
    badge: "Live Client Site",
    image: "/images/projects/viha_live.png",
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

  // ─── 02. WEB APPLICATIONS ──────────────────────────────────────────────────
  
  {
    id: "proj-clixprocrm",
    number: "07",
    name: "ClixPro CRM",
    domain: "clixprocrm.vercel.app",
    serviceType: "Web Apps",
    category: "Customer Relationship Management",
    kind: "client",
    year: "2025",
    url: "https://clixprocrm.vercel.app/",
    badge: "Forging in Lab 🚀",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    result: "Work in Progress",
    description: "A next-generation CRM platform designed for high-velocity sales teams. Currently undergoing active engineering and beta testing.",
    problem: "Traditional CRMs are bloated and slow down high-performing sales teams with unnecessary friction.",
    solution: "A modern, unified CRM dashboard focused on speed, keyboard accessibility, and intelligent pipeline management.",
    before: ["Cluttered interfaces", "Slow load times", "Scattered lead data"],
    after: ["Lightning fast dashboard", "AI-powered lead scoring", "Unified pipeline view"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    tags: ["Next.js", "CRM", "SaaS", "In Development"],
    outcome: "Currently forging in our lab. Preparing for an upcoming beta launch.",
    accent: "oklch(0.55 0.2 280)",
    accentGradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    featured: true,
    previewTheme: {
      primaryColor: "#4f46e5",
      badgeBg: "rgba(79, 70, 229, 0.15)",
      badgeText: "Under Active Development",
      headline: "The Future of Sales CRM",
      subheadline: "Next-gen pipeline management and lead tracking.",
      ctaText: "Sneak Peek",
      metricBadge: "Beta Phase",
      previewBg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)",
      navLinks: ["Dashboard", "Leads", "Pipeline", "Reports"],
    },
  },

  // ─── 03. MOBILE APPS ───────────────────────────────────────────────────────
  
  {
    id: "proj-grn-app",
    number: "10",
    name: "GRN Construction App",
    domain: "grnconstruction.in",
    serviceType: "Mobile Apps",
    category: "Architecture & Construction Mobile App",
    kind: "client",
    year: "2025",
    url: "https://grnconstruction.in",
    badge: "Building in Stealth 🛠️",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    result: "Coming Soon",
    description: "A comprehensive mobile application for GRN Construction clients to track project milestones, view blueprints, and receive live site updates.",
    problem: "Clients want real-time transparency and mobile-first access to their construction project timelines and daily site progress.",
    solution: "A dedicated mobile app with live timeline tracking, daily photo uploads from the site, and instant communication with project managers.",
    before: ["Updates scattered across WhatsApp", "No central repository for blueprints", "Unclear project milestones"],
    after: ["Live milestone tracking", "Centralized blueprint viewer", "Daily site progress feed"],
    stack: ["React Native", "Expo", "Firebase", "Tailwind CSS"],
    tags: ["React Native", "Construction", "Client Portal", "In Development"],
    outcome: "Currently under active development. Aiming to revolutionize client-contractor transparency.",
    accent: "oklch(0.55 0.18 220)",
    accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    featured: true,
    previewTheme: {
      primaryColor: "#06b6d4",
      badgeBg: "rgba(6, 182, 212, 0.15)",
      badgeText: "In Active Development",
      headline: "Track Your Dream Home",
      subheadline: "Live site updates, milestone tracking, and blueprint viewing.",
      ctaText: "Preview",
      metricBadge: "Coming Soon",
      previewBg: "linear-gradient(135deg, #0a131f 0%, #0f1f33 50%, #060c14 100%)",
      navLinks: ["Home", "Milestones", "Gallery", "Support"],
    },
  },
];
