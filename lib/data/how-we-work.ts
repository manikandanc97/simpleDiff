import { Clock, Code2, FileText, Layers, Lightbulb, Pencil, Rocket, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';

interface StepFeature {
  icon: typeof Users;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
}

interface StepConfig {
  id: string;
  number: string;
  stepKicker: string;
  title: string;
  subtitle: string;
  icon: typeof Lightbulb;
  headlineFirst: string;
  headlineAccent: string;
  summary: string;
  features: StepFeature[];
  nextStepName: string;
  imageSrc?: string;
}

export const STEPS: StepConfig[] = [
  {
    id: "discover",
    number: "01",
    stepKicker: "STEP 01 / 04",
    title: "Discover",
    subtitle: "Understand & Plan",
    icon: Lightbulb,
    headlineFirst: "Understand",
    headlineAccent: "before we build.",
    summary:
      "We take time to understand your business, users and goals. This helps us create a clear roadmap and technical blueprint for a successful product.",
    features: [
      {
        icon: Users,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Business Goals",
        desc: "Understand your vision and market opportunity.",
      },
      {
        icon: Target,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "User Research",
        desc: "Identify user needs and key problem areas.",
      },
      {
        icon: FileText,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Project Scope",
        desc: "Define features, timeline and required resources.",
      },
      {
        icon: Layers,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Technical Blueprint",
        desc: "Plan architecture and scalability for the future.",
      },
    ],
    nextStepName: "Design",
    imageSrc: "/assets/discover.png",
  },
  {
    id: "design",
    number: "02",
    stepKicker: "STEP 02 / 04",
    title: "Design",
    subtitle: "UI/UX & Prototype",
    icon: Pencil,
    headlineFirst: "Clarity before",
    headlineAccent: "we code.",
    summary:
      "Interactive Figma prototypes and a production token library. You test and validate the screens and interactions before development begins.",
    features: [
      {
        icon: Layers,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Interactive Flows",
        desc: "Clickable prototypes validating real user journeys.",
      },
      {
        icon: Sparkles,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Design Tokens",
        desc: "Strict color, typography, and spacing system.",
      },
      {
        icon: Target,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Design Systems",
        desc: "Reusable component library with accessibility built-in.",
      },
      {
        icon: Users,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Usability Testing",
        desc: "Pre-code feedback loops with real stakeholder testing.",
      },
    ],
    nextStepName: "Develop",
    imageSrc: "/assets/design-develop.png",
  },
  {
    id: "develop",
    number: "03",
    stepKicker: "STEP 03 / 04",
    title: "Develop",
    subtitle: "Build & Integrate",
    icon: Code2,
    headlineFirst: "Code built",
    headlineAccent: "to scale.",
    summary:
      "Next.js App Router, TailwindCSS, TypeScript, and serverless backend architecture. Demo deployments let you watch the product come alive.",
    features: [
      {
        icon: Code2,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Modern Stack",
        desc: "Next.js 15, TypeScript, Tailwind, and serverless backend.",
      },
      {
        icon: Clock,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Weekly Staging Builds",
        desc: "Live demo environments to test sprint deliverables.",
      },
      {
        icon: ShieldCheck,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Clean Architecture",
        desc: "Secure endpoints, structured databases, and clean code.",
      },
      {
        icon: Rocket,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "CI/CD Pipelines",
        desc: "Automated test suites and zero-downtime deployments.",
      },
    ],
    nextStepName: "Launch",
    imageSrc: "/assets/design-develop.png",
  },
  {
    id: "launch",
    number: "04",
    stepKicker: "STEP 04 / 04",
    title: "Launch",
    subtitle: "Deploy & Grow",
    icon: Rocket,
    headlineFirst: "Launch is just",
    headlineAccent: "the beginning.",
    summary:
      "DNS cutover, SEO indexing check, telemetry dashboards, and post-launch support to ensure a smooth transition to production.",
    features: [
      {
        icon: Rocket,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Production Cutover",
        desc: "Secure SSL, DNS propagation, and edge caching.",
      },
      {
        icon: Target,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "SEO & Analytics",
        desc: "Sitemaps, structured data, and real-time tracking.",
      },
      {
        icon: ShieldCheck,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "Performance Audits",
        desc: "Sub-second load times and 95+ Core Web Vitals.",
      },
      {
        icon: Users,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        title: "Post-Launch Warranty",
        desc: "30 days dedicated support and ongoing maintenance.",
      },
    ],
    nextStepName: "Start Project",
    imageSrc: "/assets/launch.png",
  },
];
