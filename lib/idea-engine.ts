export type CategoryId =
  | "website"
  | "ecommerce"
  | "mobile-app"
  | "web-app"
  | "saas"
  | "branding"
  | "automation"
  | "other";

export type Blueprint = {
  category: CategoryId;
  type: string;
  mvpScope: string[];
  complexityCut: string[];
  indicativeTimeline: string;
  stats: {
    cut: number;
    kept: number;
  };
};

interface CategoryDefinition {
  id: CategoryId;
  type: string;
  indicativeTimeline: string;
  mvpScope: string[];
  complexityCut: string[];
  // Patterns evaluated with word boundaries
  patterns: RegExp[];
}

// Ordered list for tie-breaking: website -> ecommerce -> mobile-app -> web-app -> saas -> branding -> automation -> other
const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "website",
    type: "Website & Landing Page",
    indicativeTimeline: "2–4 weeks",
    mvpScope: [
      "Clear value proposition and messaging hierarchy",
      "Fast, responsive layout tuned for all device sizes",
      "Direct enquiry or lead capture form",
      "Core proof points, portfolio work, or service details",
    ],
    complexityCut: [
      "Heavy JavaScript animation libraries and bloat",
      "Over-complicated multi-level navigation structures",
      "Excessive third-party tracking scripts that slow load times",
      "Premature client portals when a simple form suffices",
    ],
    patterns: [
      /\bwebsite\b/i,
      /\blanding page\b/i,
      /\bbrochure\b/i,
      /\bportfolio site\b/i,
      /\bclinic website\b/i,
      /\brestaurant website\b/i,
      /\bschool website\b/i,
      /\bhomepage\b/i,
      /\bweb page\b/i,
    ],
  },
  {
    id: "ecommerce",
    type: "E-Commerce Experience",
    indicativeTimeline: "4–8 weeks",
    mvpScope: [
      "Focused product showcase with clear photography",
      "Frictionless checkout with modern card and wallet payments",
      "Reliable order notifications and simple inventory management",
      "Mobile-first shopping experience with fast page transitions",
    ],
    complexityCut: [
      "Complex multi-vendor marketplace logic",
      "Bloated store apps and legacy plugins",
      "Heavy recommendation engines before having real order volume",
      "Complicated loyalty point schemes on launch",
    ],
    // Handles e-commerce, ecommerce, online store, web shop.
    // Negative lookbehind ensures 'workshop' is NOT matched by 'shop'.
    patterns: [
      /\be-commerce\b/i,
      /\becommerce\b/i,
      /\bonline store\b/i,
      /\bweb shop\b/i,
      /\bwebstore\b/i,
      /\bshopify\b/i,
      /\b(?<!work)shop\b/i,
      /\b(?<!work)shopping\b/i,
      /\bcart\b/i,
      /\bcheckout\b/i,
    ],
  },
  {
    id: "mobile-app",
    type: "Mobile Application",
    indicativeTimeline: "6–10 weeks",
    mvpScope: [
      "Smooth, native-feeling workflows on iOS and Android",
      "Fast offline-capable screens for essential actions",
      "Push notifications for critical user updates",
      "Biometric login and simplified account access",
    ],
    complexityCut: [
      "Non-essential secondary settings and menus",
      "Over-complicated custom gesture navigations",
      "Premature support for obscure operating system versions",
      "Heavy background sync jobs that drain battery",
    ],
    patterns: [
      /\bmobile app\b/i,
      /\bios\b/i,
      /\bandroid\b/i,
      /\biphone\b/i,
      /\bnative app\b/i,
      /\bflutter\b/i,
      /\breact native\b/i,
      /\bipad\b/i,
    ],
  },
  {
    id: "web-app",
    type: "Web Application",
    indicativeTimeline: "6–10 weeks",
    mvpScope: [
      "Focused core user workflows and interactive forms",
      "Reliable data persistence and real-time status updates",
      "Role-based access control for team members",
      "Clean dashboard view of key records and tasks",
    ],
    complexityCut: [
      "Over-engineered microservice architectures",
      "Premature custom reporting engines",
      "Excessive third-party webhook integrations on day one",
      "Endless customization preferences that delay launch",
    ],
    patterns: [
      /\bweb app\b/i,
      /\bweb application\b/i,
      /\bportal\b/i,
      /\bdashboard\b/i,
      /\bbooking\b/i,
      /\bappointment\b/i,
      /\bclinic\b/i,
      /\bschool\b/i,
      /\brestaurant\b/i,
      /\bfactory\b/i,
      /\binternal tool\b/i,
      /\bcrm\b/i,
      /\berp\b/i,
    ],
  },
  {
    id: "saas",
    type: "SaaS Product",
    indicativeTimeline: "8–12 weeks",
    mvpScope: [
      "Frictionless onboarding and signup for self-serve users",
      "Core software utility that solves the primary customer pain point",
      "Automated subscription billing and tier management with Stripe",
      "Account and workspace settings for team collaboration",
    ],
    complexityCut: [
      "Complex enterprise multi-tenant configuration on day one",
      "Custom invoice generators and manual payment workflows",
      "Secondary feature requests before finding product-market fit",
      "Premature API marketplace and external plugin architecture",
    ],
    // Explicitly requires SaaS or subscription concepts, NOT bare 'tool'
    patterns: [
      /\bsaas\b/i,
      /\bsubscription\b/i,
      /\bsoftware as a service\b/i,
      /\bb2b software\b/i,
      /\bmulti-tenant\b/i,
      /\bmicro-saas\b/i,
    ],
  },
  {
    id: "branding",
    type: "Branding & Visual Identity",
    indicativeTimeline: "2–4 weeks",
    mvpScope: [
      "Distinctive primary logo, icon mark, and favicon",
      "Curated typography pairings and harmonious color palette",
      "Actionable style guide for digital and physical use",
      "Ready-to-use vector assets and social media kit",
    ],
    complexityCut: [
      "100-page brand guidelines that nobody reads",
      "Overly abstract design rationale presentations",
      "Dozens of divergent logo variations that dilute clarity",
      "Unnecessary collateral templates for channels you don't use",
    ],
    patterns: [
      /\bbranding\b/i,
      /\bbrand identity\b/i,
      /\blogo\b/i,
      /\bvisual identity\b/i,
      /\bstyle guide\b/i,
      /\bdesign system\b/i,
    ],
  },
  {
    id: "automation",
    type: "AI & Workflow Automation",
    indicativeTimeline: "3–6 weeks",
    mvpScope: [
      "Targeted integration connecting your primary business tools",
      "Structured prompts and guardrails for dependable output",
      "Human-in-the-loop review interface for exceptions",
      "Real-time notifications and audit log of automated actions",
    ],
    complexityCut: [
      "Costly model fine-tuning before validating standard LLMs",
      "Over-autonomous agent loops that fail unpredictably",
      "Complex multi-step pipelines without reliable error handling",
      "Building a custom chat UI when email or Slack integration is faster",
    ],
    patterns: [
      /\bautomate\b/i,
      /\bautomation\b/i,
      /\bworkflow\b/i,
      /\bai\b/i,
      /\bchatbot\b/i,
      /\bllm\b/i,
      /\bgpt\b/i,
      /\bopenai\b/i,
      /\bbot\b/i,
      /\bautomating\b/i,
    ],
  },
];

const DEFAULT_CATEGORY: CategoryDefinition = {
  id: "other",
  type: "Custom Digital Product",
  indicativeTimeline: "4–8 weeks",
  mvpScope: [
    "Single clearest user journey from first visit to outcome",
    "Fast, lightweight interface with clear visual hierarchy",
    "Reliable backend database and straightforward data model",
    "Basic metrics tracking to measure real adoption",
  ],
  complexityCut: [
    "Unvalidated secondary features and speculative roadmaps",
    "Heavy dependencies that complicate deployment",
    "Premature performance optimizations for hypothetical scale",
    "Over-engineered configuration options that confuse users",
  ],
  patterns: [],
};

export function classifyIdea(idea: string): CategoryDefinition {
  let highestScore = 0;
  let winningCategory: CategoryDefinition = DEFAULT_CATEGORY;

  for (const def of CATEGORY_DEFINITIONS) {
    let score = 0;
    for (const pattern of def.patterns) {
      if (pattern.test(idea)) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      winningCategory = def;
    }
  }

  return winningCategory;
}

export function generateBlueprint(idea: string): Blueprint {
  const categoryDef = classifyIdea(idea);

  return {
    category: categoryDef.id,
    type: categoryDef.type,
    mvpScope: categoryDef.mvpScope,
    complexityCut: categoryDef.complexityCut,
    indicativeTimeline: categoryDef.indicativeTimeline,
    stats: {
      cut: categoryDef.complexityCut.length,
      kept: categoryDef.mvpScope.length,
    },
  };
}
