export type Blueprint = {
  type: string;
  mvpScope: string[];
  complexityCut: string[];
  timeline: string;
  stack: string[];
  stats: {
    added: number;
    removed: number;
  };
};

export function generateBlueprint(idea: string): Blueprint {
  const lowercaseIdea = idea.toLowerCase();

  // Default values
  let type = "Digital Product";
  let mvpScope = [
    "Core User Authentication",
    "Primary Dashboard",
    "Data Persistence",
  ];
  let complexityCut = [
    "Over-engineered microservices",
    "Unnecessary third-party integrations",
    "Bloated admin panel",
  ];
  let timeline = "4-6 weeks";
  let stack = ["Next.js", "Tailwind", "Supabase"];
  let added = 42;
  let removed = 156;

  if (lowercaseIdea.includes("ecommerce") || lowercaseIdea.includes("shop") || lowercaseIdea.includes("store")) {
    type = "E-Commerce Experience";
    mvpScope = ["Product Catalog", "Seamless Checkout", "Order Management"];
    complexityCut = ["Complex multi-vendor logic", "Legacy payment gateways", "AI recommendations out of the gate"];
    timeline = "6-8 weeks";
    stack = ["Next.js", "Stripe", "Shopify Headless"];
    added = 56;
    removed = 210;
  } else if (lowercaseIdea.includes("portfolio") || lowercaseIdea.includes("agency") || lowercaseIdea.includes("brand")) {
    type = "Brand Identity & Site";
    mvpScope = ["High-Impact Hero", "Case Studies Grid", "Contact Flow"];
    complexityCut = ["Heavy JS animations", "Cluttered navigation", "Generic templates"];
    timeline = "3-5 weeks";
    stack = ["Next.js", "Framer Motion", "Tailwind"];
    added = 24;
    removed = 112;
  } else if (lowercaseIdea.includes("saas") || lowercaseIdea.includes("tool") || lowercaseIdea.includes("dashboard")) {
    type = "SaaS Platform";
    mvpScope = ["User Onboarding", "Core Tool Utility", "Subscription Billing"];
    complexityCut = ["Feature bloat", "Complex RBAC initially", "Custom analytics engine"];
    timeline = "8-10 weeks";
    stack = ["Next.js", "Supabase", "Stripe"];
    added = 89;
    removed = 340;
  }

  // Adjust stats slightly based on string length to make it feel dynamic
  const lengthFactor = Math.min(idea.length, 100);
  added += Math.floor(lengthFactor / 5);
  removed += Math.floor(lengthFactor / 2);

  if (idea.trim() === "") {
    // Empty state
    added = 0;
    removed = 0;
    mvpScope = [];
    complexityCut = [];
  }

  return { type, mvpScope, complexityCut, timeline, stack, stats: { added, removed } };
}
