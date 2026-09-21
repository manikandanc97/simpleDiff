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
    id: "proj-pulseops",
    number: "04",
    name: "PulseOps Cloud ERP",
    domain: "pulseops.io",
    serviceType: "Web Apps",
    category: "Operations & Inventory Management Platform",
    kind: "client",
    year: "2025",
    url: "https://pulseops.io",
    badge: "Enterprise Web App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    result: "40% Faster Order Processing",
    description:
      "Multi-tenant inventory, automated billing, and live warehouse telemetry dashboard engineered for high-throughput supply chains.",
    problem:
      "Fragmented desktop software and manual spreadsheet entry led to billing discrepancies and severe stockout delays across multi-branch facilities.",
    solution:
      "A real-time Next.js web application with role-based access control, barcode scanning integrations, instant GST invoicing, and live telemetry charts.",
    before: [
      "isolated offline desktop software with daily manual tallying",
      "stockout miscalculations causing delayed order fulfillment",
      "slow end-of-month reporting taking up to 4 days",
    ],
    after: [
      "unified cloud dashboard with sub-second inventory sync",
      "automated WhatsApp & email dispatch receipts with PDF invoices",
      "instant executive profit/loss and turnover analytics",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Real-Time Telemetry"],
    outcome:
      "Reduced order fulfillment cycles from 4 hours to 18 minutes. Streamlined inventory audits across 4 regional fulfillment centers.",
    accent: "oklch(0.55 0.18 250)",
    accentGradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    featured: true,
    previewTheme: {
      primaryColor: "#6366f1",
      badgeBg: "rgba(99, 102, 241, 0.15)",
      badgeText: "Enterprise Operations Engine",
      headline: "Unified Cloud Inventory & Real-Time ERP",
      subheadline: "Sub-second stock synchronization, automated billing, and supply chain telemetry.",
      ctaText: "Launch Dashboard",
      metricBadge: "99.98% Uptime · Multi-Branch",
      previewBg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)",
      navLinks: ["Overview", "Inventory", "Invoices", "Analytics", "Settings"],
    },
  },
  {
    id: "proj-agrosync",
    number: "05",
    name: "AgroSync Procurement Portal",
    domain: "agrosync.co",
    serviceType: "Web Apps",
    category: "B2B Supply Chain & Mandi Trade Platform",
    kind: "client",
    year: "2025",
    url: "https://agrosync.co",
    badge: "B2B Web Portal",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    result: "₹2.4Cr Monthly Traded Volume",
    description:
      "B2B agricultural trading portal connecting regional farmers with wholesale buyers, featuring dynamic spot pricing and digital contracts.",
    problem:
      "Opaque broker markups and delayed payments caused distrust and slow procurement cycles for bulk agricultural commodity trades.",
    solution:
      "A transparent B2B trading web app with real-time commodity price tickers, automated quality grading BOQs, and digital escrow payouts.",
    before: [
      "broker-controlled prices with no direct price discovery",
      "paper-based transit receipts lost during farm gate pickups",
      "payment settlement taking 14-21 business days",
    ],
    after: [
      "live transparent spot market price engine updated hourly",
      "digital weighing slip generation with GPS transit tracking",
      "instant digital escrow release on buyer delivery acceptance",
    ],
    stack: ["Next.js", "Node.js", "Supabase", "Redis", "motion/react"],
    tags: ["Next.js", "Node.js", "Supabase", "WebSockets", "B2B Fintech"],
    outcome:
      "Onboarded 350+ wholesale buyers and facilitated over ₹2.4Cr in volume in the first quarter.",
    accent: "oklch(0.55 0.16 140)",
    accentGradient: "from-emerald-500/20 via-lime-500/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeText: "Fair Trade Agri-Procurement",
      headline: "Direct Farm-to-Buyer Trading Portal",
      subheadline: "Transparent spot pricing, automated grading BOQ, and instant escrow settlement.",
      ctaText: "Trade Now",
      metricBadge: "350+ Buyers · Instant Escrow",
      previewBg: "linear-gradient(135deg, #062817 0%, #0b3d24 50%, #03140a 100%)",
      navLinks: ["Live Mandi", "Orders", "Contracts", "Wallet", "Support"],
    },
  },
  {
    id: "proj-carestream",
    number: "06",
    name: "CareStream Patient EHR",
    domain: "carestreamhealth.app",
    serviceType: "Web Apps",
    category: "Healthcare & Clinical Records Portal",
    kind: "client",
    year: "2025",
    url: "https://carestreamhealth.app",
    badge: "Healthcare Portal",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    result: "8,000+ Consultations Hosted",
    description:
      "End-to-end clinic management portal with interactive calendar booking, encrypted telemedicine video consultation, and digital prescriptions.",
    problem:
      "Multi-specialty clinics struggled with paper files, lost prescription histories, and double-booked specialist consultations.",
    solution:
      "A high-performance web app with zero-latency video calls, synchronized prescription pads, and automated SMS appointment reminders.",
    before: [
      "physical files requiring manual indexing and storage",
      "high patient no-show rate due to lack of automated reminders",
      "teleconsultations conducted over unencrypted generic meeting apps",
    ],
    after: [
      "searchable electronic health records accessible in 2 clicks",
      "65% drop in no-shows via automated WhatsApp appointment confirmations",
      "HIPAA-grade encrypted browser-based video consultation room",
    ],
    stack: ["Next.js", "WebRTC", "PostgreSQL", "Tailwind CSS", "Twilio API"],
    tags: ["Next.js", "WebRTC", "PostgreSQL", "Tailwind CSS", "HIPAA Ready"],
    outcome:
      "Cut patient wait times by 40% and successfully transitioned 3 outpatient clinics to 100% paperless consultations.",
    accent: "oklch(0.55 0.18 200)",
    accentGradient: "from-sky-500/20 via-teal-500/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#0284c7",
      badgeBg: "rgba(2, 132, 199, 0.15)",
      badgeText: "Clinical Operating Suite",
      headline: "Modern Outpatient Clinical Care",
      subheadline: "Instant EHR search, zero-latency video consultation, and automated reminders.",
      ctaText: "Doctor Portal",
      metricBadge: "HIPAA Compliant · Zero Paper",
      previewBg: "linear-gradient(135deg, #082f49 0%, #0369a1 50%, #031e30 100%)",
      navLinks: ["Appointments", "Patients", "Prescriptions", "Billing", "Reports"],
    },
  },

  // ─── 03. MOBILE APPS ───────────────────────────────────────────────────────
  {
    id: "proj-kisandirect",
    number: "07",
    name: "KisanDirect Mandi App",
    domain: "kisandirect.app",
    serviceType: "Mobile Apps",
    category: "Agri-Marketplace Mobile Platform",
    kind: "client",
    year: "2025",
    url: "https://kisandirect.app",
    badge: "iOS & Android",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop",
    result: "50,000+ Active Downloads",
    description:
      "Cross-platform mobile application empowering rural farmers with voice-assisted crop listing, real-time APMC market prices, and 1-tap buyer calling.",
    problem:
      "Farmers in rural regions faced low digital literacy barriers with complex form fields and missed out on prevailing regional commodity rates.",
    solution:
      "A streamlined React Native app designed with large tactile buttons, regional Tamil & Hindi voice prompts, offline caching, and direct WhatsApp buyer messaging.",
    before: [
      "farmers reliant on local intermediaries without price transparency",
      "apps required tedious manual English text input",
      "crashes in low-connectivity rural 2G/3G networks",
    ],
    after: [
      "vernacular voice-first commodity listing in under 30 seconds",
      "live mandi price feed cached offline for uninterrupted access",
      "verified buyer profiles with direct WhatsApp calling",
    ],
    stack: ["React Native", "Expo", "FastAPI", "SQLite Offline", "Firebase"],
    tags: ["React Native", "Expo", "Voice AI", "Offline First", "Firebase"],
    outcome:
      "Over 50,000 active farmers across South India. Rated 4.8★ on Google Play Store.",
    accent: "oklch(0.58 0.16 130)",
    accentGradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    featured: true,
    previewTheme: {
      primaryColor: "#16a34a",
      badgeBg: "rgba(22, 163, 74, 0.15)",
      badgeText: "4.8★ Google Play Store",
      headline: "Fair Agri Marketplace in Your Pocket",
      subheadline: "Voice search, real-time mandi prices, and direct wholesale buyer connections.",
      ctaText: "Download APK",
      metricBadge: "50K+ Downloads · Tamil & Hindi",
      previewBg: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #021a0c 100%)",
      navLinks: ["Home", "Mandi Rates", "My Crops", "Buyer Calls", "Profile"],
    },
  },
  {
    id: "proj-fitflow",
    number: "08",
    name: "FitFlow Pro Tracker",
    domain: "fitflowpro.app",
    serviceType: "Mobile Apps",
    category: "Health, Habit & Nutrition Mobile App",
    kind: "client",
    year: "2025",
    url: "https://fitflowpro.app",
    badge: "iOS & Android",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    result: "84% 30-Day Retention",
    description:
      "Minimalist habit and biometric tracking mobile app with interactive streak widgets, Apple HealthKit sync, and personalized recovery scores.",
    problem:
      "Bloated fitness apps with aggressive ads, complex meal logging, and confusing charts caused high user churn within the first week.",
    solution:
      "A dark-mode first, gesture-driven mobile app built with haptic feedback, 1-tap macro logging, and seamless Apple Watch/HealthKit sync.",
    before: [
      "overwhelming cluttered interfaces causing user burnout",
      "manual calorie arithmetic without barcode instant scan",
      "poor retention with zero streak rewards or home widgets",
    ],
    after: [
      "clean dark aesthetic with fluid 60fps micro-animations",
      "AI photo meal scanner that calculates macros in 2 seconds",
      "interactive iOS lock screen and home screen streak widgets",
    ],
    stack: ["React Native", "HealthKit SDK", "TypeScript", "Tailwind", "Supabase"],
    tags: ["React Native", "HealthKit", "Gesture Handler", "Supabase", "Dark UI"],
    outcome:
      "Featured on Product Hunt #2 Product of the Day. Achieved an industry-leading 84% 30-day user retention rate.",
    accent: "oklch(0.6 0.18 310)",
    accentGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#a855f7",
      badgeBg: "rgba(168, 85, 247, 0.15)",
      badgeText: "Top Rated Fitness App",
      headline: "Master Your Daily Health Flow",
      subheadline: "Zero clutter, instant meal AI scan, and Apple HealthKit integration.",
      ctaText: "Get on App Store",
      metricBadge: "84% Retention · 60fps Fluid",
      previewBg: "linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #15032a 100%)",
      navLinks: ["Today", "Workouts", "Nutrition", "Sleep", "Settings"],
    },
  },
  {
    id: "proj-routify",
    number: "09",
    name: "Routify Courier Partner",
    domain: "routifydriver.app",
    serviceType: "Mobile Apps",
    category: "Hyperlocal Logistics & Dispatch Mobile App",
    kind: "client",
    year: "2025",
    url: "https://routifydriver.app",
    badge: "Driver App",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop",
    result: "32% Faster Deliveries",
    description:
      "Hyperlocal delivery partner mobile application with turn-by-turn route batching, OTP proof-of-delivery, and instant earnings payout.",
    problem:
      "Delivery fleet drivers wasted time backtracking due to unoptimized delivery queues and suffered delayed cash remittance reconciliations.",
    solution:
      "A high-contrast driver mobile app with dynamic Dijkstra waypoint optimization, camera barcode proof-of-delivery, and instant UPI driver payouts.",
    before: [
      "manual address sorting resulting in frequent backtracking",
      "paper delivery signatures lost during transit",
      "weekly delayed pay cycles causing high driver attrition",
    ],
    after: [
      "automated multi-stop route optimization saving 2.5 hours daily",
      "digital OTP and camera photo delivery proof uploaded instantly",
      "instant daily end-of-shift wallet withdrawal to bank accounts",
    ],
    stack: ["React Native", "Mapbox GL", "Background Geolocation", "Node.js", "Redis"],
    tags: ["React Native", "Mapbox", "Geolocation", "UPI Payouts", "High Performance"],
    outcome:
      "Reduced average delivery time by 32% across 12,000 monthly hyperlocal dispatches.",
    accent: "oklch(0.6 0.18 45)",
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    featured: false,
    previewTheme: {
      primaryColor: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeText: "Field Proven · 12K+ Trips",
      headline: "Smart Route Logistics for Drivers",
      subheadline: "Dynamic multi-stop dispatch, photo proof-of-delivery, and instant UPI payouts.",
      ctaText: "Driver Sign In",
      metricBadge: "32% Faster · Zero Paper",
      previewBg: "linear-gradient(135deg, #2a1506 0%, #3d1f08 50%, #150a02 100%)",
      navLinks: ["Route", "Pickups", "Deliveries", "Earnings", "Help"],
    },
  },
];
