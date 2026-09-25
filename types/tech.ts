export const TECH_CATEGORIES = [
  "Frontend & Web",
  "Mobile",
  "Backend & APIs",
  "Database & Cloud",
  "AI & Automation",
  "Design & Tools",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export interface TechItem {
  name: string;
  slug: string;
  category: TechCategory;
  description: string;
  badge: string;
  dotColor: string;
  accentColor: string;
  learnMoreUrl: string;
  invertInDark?: boolean;
}
