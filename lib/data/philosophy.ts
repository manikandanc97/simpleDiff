import { Box, Briefcase, Database, Layers, Lightbulb, Target, TrendingUp, Users, Zap } from 'lucide-react';

// ─── Left Column: Process Steps ─────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Clarity",
    desc: "Clear goals.",
    subDesc: "No confusion.",
    active: true,
  },
  {
    num: "02",
    icon: Zap,
    title: "Speed",
    desc: "Move fast.",
    subDesc: "Ship early.",
    active: false,
  },
  {
    num: "03",
    icon: Layers,
    title: "Craft",
    desc: "Pixel perfect.",
    subDesc: "Production ready.",
    active: false,
  },
  {
    num: "04",
    icon: Users,
    title: "Ownership",
    desc: "Direct access.",
    subDesc: "We stand with you.",
    active: false,
  },
];

// ─── Center Panel: Flow Nodes ───────────────────────────────────────────────
export const FLOW_NODES = {
  topLeft: {
    id: "direct-access",
    badge: "IDEA",
    badgeColor: "rose",
    title: "Direct access",
    desc: "Work directly with the team building your product.",
    icon: Lightbulb,
  },
  topRight: {
    id: "weekly-progress",
    badge: "PLAN",
    badgeColor: "purple",
    title: "Weekly progress",
    desc: "Transparent updates and real milestones every week.",
    icon: TrendingUp,
  },
  bottomLeft: {
    id: "production-quality",
    badge: "BUILD",
    badgeColor: "rose",
    title: "Production quality",
    desc: "Modern tech, clean designs, and scalable architecture.",
    icon: Box,
  },
  bottomRight: {
    id: "clear-ownership",
    badge: "DELIVER",
    badgeColor: "purple",
    title: "Clear ownership",
    desc: "No handoff friction. We take responsibility end to end.",
    icon: Users,
  },
};

// ─── Right Panel: Outcomes ──────────────────────────────────────────────────
export const REAL_OUTCOMES = [
  {
    value: 5,
    suffix: "+",
    label: "Projects shipped",
    icon: Briefcase,
  },
  {
    value: 3,
    suffix: "×",
    label: "Faster iteration",
    icon: Zap,
  },
  {
    value: 100,
    suffix: "%",
    label: "Milestone visibility",
    icon: Target,
  },
  {
    value: 500,
    prefix: "<",
    suffix: "ms",
    label: "Performance target",
    icon: Database,
  },
];

