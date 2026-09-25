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
  kind: "client" | "internal";
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
