import {
  Cpu,
  Globe,
  Layers,
  LayoutDashboard,
  Package2,
  Palette,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "Client Interface" | "Core Systems" | "Foundation";

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  icon: LucideIcon;
  outcome: string;
  category: ServiceCategory;
  pillars: [string, string, string, string];
  includes: [string, string, string];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "websites",
    number: "01",
    name: "Websites",
    icon: Globe,
    category: "Client Interface",
    outcome: "Clear digital experiences built to turn visitors into customers.",
    pillars: ["Strategy", "Design", "Development", "Performance"],
    includes: [
      "Custom responsive design & design systems",
      "Conversion-optimized content architecture",
      "SEO, Core Web Vitals & accessibility tuning",
    ],
  },
  {
    id: "web-apps",
    number: "02",
    name: "Web applications",
    category: "Client Interface",
    icon: LayoutDashboard,
    outcome: "Focused software built around how your business actually works.",
    pillars: ["Architecture", "Product UX", "Fullstack", "Real-time"],
    includes: [
      "Modern React & Next.js application architecture",
      "Secure authentication & database integration",
      "Interactive dashboards & business automations",
    ],
  },
  {
    id: "mobile-apps",
    number: "03",
    name: "Mobile apps",
    category: "Client Interface",
    icon: Smartphone,
    outcome: "Useful mobile experiences built for real-world customers.",
    pillars: ["Cross-Platform", "Native Feel", "Offline First", "App Store"],
    includes: [
      "Cross-platform iOS & Android development (React Native)",
      "Offline-ready data synchronization & push notifications",
      "App Store & Google Play submission and launch",
    ],
  },
  {
    id: "saas",
    number: "04",
    name: "SaaS products",
    category: "Core Systems",
    icon: Package2,
    outcome: "From first release to scalable product systems.",
    pillars: ["Monetization", "Multi-Tenancy", "Onboarding", "Scalability"],
    includes: [
      "Frictionless self-serve customer onboarding",
      "Stripe subscriptions, metered billing & customer portals",
      "Workspaces, role-based access control & audits",
    ],
  },
  {
    id: "branding",
    number: "05",
    name: "Branding & identity",
    category: "Foundation",
    icon: Palette,
    outcome: "A visual identity that makes the business recognizable.",
    pillars: ["Brand Voice", "Typography", "Color Systems", "Guidelines"],
    includes: [
      "Primary, secondary & responsive logo systems",
      "Curated color palettes & typography standards",
      "Comprehensive digital asset kit & brand guidelines",
    ],
  },
  {
    id: "ui-ux",
    number: "06",
    name: "UI/UX design",
    category: "Foundation",
    icon: Layers,
    outcome: "Intuitive product design that eliminates user friction and confusion.",
    pillars: ["User Journeys", "Wireframes", "Prototypes", "Design Tokens"],
    includes: [
      "User research, mental models & journey mapping",
      "High-fidelity interactive prototypes in Figma",
      "Production-ready design component tokens",
    ],
  },
  {
    id: "automation",
    number: "07",
    name: "AI automation",
    category: "Core Systems",
    icon: Sparkles,
    outcome: "Practical automation that removes repetitive work.",
    pillars: ["Workflows", "LLM Agents", "Pipelines", "Integrations"],
    includes: [
      "Production-ready LLM assistants & custom agents",
      "Automated document processing, categorization & triage",
      "Deep integrations with everyday tools (Slack, CRMs, APIs)",
    ],
  },
  {
    id: "custom-software",
    number: "08",
    name: "Custom software",
    category: "Core Systems",
    icon: Cpu,
    outcome: "Tailored software solutions engineered for specific business operations.",
    pillars: ["Discovery", "API Bridges", "Databases", "Legacy Modernization"],
    includes: [
      "Internal operational tools & admin management portals",
      "Custom REST/GraphQL APIs & third-party system bridges",
      "Robust relational database design & performance tuning",
    ],
  },
];

export const CATEGORY_ORDER: ServiceCategory[] = [
  "Client Interface",
  "Core Systems",
  "Foundation",
];
