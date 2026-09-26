import React from "react";
import { Globe, LayoutGrid, Smartphone } from "lucide-react";
import {
  NextJsIcon,
  TypeScriptIcon,
  TailwindIcon,
  MotionIcon,
  NodeJsIcon,
  WhatsAppIcon,
  PrismaIcon,
  PostgresIcon,
  SupabaseIcon,
  ShopifyIcon,
  ReactIcon,
} from "./tech-icons";

export interface MetricItem {
  value: string;
  label: string;
  iconType: "chart" | "users" | "star" | "shield";
}

export interface TechItem {
  name: string;
  icon: React.FC<{ className?: string }>;
}

export interface EnhancedProjectDetails {
  kicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  gallery: string[];
  metrics: MetricItem[];
  overview: string;
  techStack: TechItem[];
  duration: string;
}

export const PROJECT_ENHANCEMENTS: Record<string, EnhancedProjectDetails> = {
  "proj-valparai": {
    kicker: "TRAVEL & TOURISM",
    heroHeadline: "Valparai Wanderer Tours",
    heroSubheadline:
      "An experiential travel & tour booking platform for Valparai tour packages, misty Western Ghats jungle safaris, and tea estate explorations.",
    gallery: [
      "/images/projects/valparai_scenic_hero.jpg",
      "/images/projects/valparai_waterfall.jpg",
      "/images/projects/valparai_sunset.jpg",
    ],
    metrics: [
      { value: "+3600%", label: "Month 1 Bookings", iconType: "chart" },
      { value: "10K+", label: "Happy Travelers", iconType: "users" },
      { value: "4.9", label: "Traveler Rating", iconType: "star" },
      { value: "100%", label: "Secure & Reliable", iconType: "shield" },
    ],
    overview:
      "A complete travel and tour booking experience designed for Valparai, connecting travelers with curated tour packages, local guides, and authentic experiences. Features live WhatsApp-first booking, interactive route showcases, and a seamless mobile experience.",
    techStack: [
      { name: "Next.js", icon: NextJsIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "motion/react", icon: MotionIcon },
      { name: "Node.js", icon: NodeJsIcon },
      { name: "WhatsApp API", icon: WhatsAppIcon },
    ],
    duration: "2 min",
  },
  "proj-grn": {
    kicker: "ARCHITECTURE & CONSTRUCTION",
    heroHeadline: "GRN Construction",
    heroSubheadline:
      "Brand website with architectural project portfolio, milestone estimation, and lead capture for high-ticket residential & commercial builds.",
    gallery: [
      "/images/projects/grn_villa_thumb.jpg",
      "/images/projects/grn_live.webp",
      "/images/projects/grn.jpg",
    ],
    metrics: [
      { value: "#1 Rank", label: "Google SEO Ranking", iconType: "chart" },
      { value: "100+", label: "Projects Delivered", iconType: "users" },
      { value: "4.9★", label: "Client Rating", iconType: "star" },
      { value: "100%", label: "Turnkey Quality", iconType: "shield" },
    ],
    overview:
      "An established construction firm with 10+ years of civil engineering excellence. Features floating glassmorphism navigation, architectural portfolio gallery with category filters, transparent pricing tiers, and local SEO schema.",
    techStack: [
      { name: "Next.js", icon: NextJsIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "motion/react", icon: MotionIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "Node.js", icon: NodeJsIcon },
    ],
    duration: "1.5 min",
  },
  "proj-viha": {
    kicker: "E-COMMERCE & HERITAGE",
    heroHeadline: "Viha Handicrafts",
    heroSubheadline:
      "Authentic generational Chettinad heritage e-commerce storefront with brass idol craftsmanship, Tanjore gold foil art, and sacred wooden artifacts.",
    gallery: [
      "/images/projects/viha_pot_thumb.jpg",
      "/images/projects/viha_live.png",
      "/images/projects/viha.jpg",
    ],
    metrics: [
      { value: "Pan-India", label: "Order Reach", iconType: "chart" },
      { value: "500+", label: "Artisan Artifacts", iconType: "users" },
      { value: "4.9★", label: "Customer Rating", iconType: "star" },
      { value: "100%", label: "Authentic Brass", iconType: "shield" },
    ],
    overview:
      "An editorial heritage e-commerce storefront with warm ivory & terracotta aesthetics, categorized artisan collections, Vastu placement guidance, and direct WhatsApp consultations.",
    techStack: [
      { name: "Next.js", icon: NextJsIcon },
      { name: "Shopify", icon: ShopifyIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "WhatsApp API", icon: WhatsAppIcon },
    ],
    duration: "2.5 min",
  },
  "proj-clixprocrm": {
    kicker: "CUSTOMER RELATIONSHIP MANAGEMENT",
    heroHeadline: "ClixPro CRM",
    heroSubheadline:
      "Universal CRM for Indian SMBs with AI-driven automation, keyboard-first navigation, and real-time sales pipeline tracking.",
    gallery: ["/images/projects/clixpro_crm.jpg"],
    metrics: [
      { value: "10x", label: "Workflow Velocity", iconType: "chart" },
      { value: "5K+", label: "Active Pipelines", iconType: "users" },
      { value: "4.8★", label: "User Rating", iconType: "star" },
      { value: "99.9%", label: "Uptime SLA", iconType: "shield" },
    ],
    overview:
      "A modern, unified CRM dashboard focused on speed, keyboard accessibility, and intelligent pipeline management for high-velocity sales teams.",
    techStack: [
      { name: "Next.js", icon: NextJsIcon },
      { name: "Prisma", icon: PrismaIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
    ],
    duration: "3 min",
  },
  "proj-grn-app": {
    kicker: "ARCHITECTURE & CONSTRUCTION",
    heroHeadline: "GRN Construction App",
    heroSubheadline:
      "Field management mobile application for construction teams, live milestone tracking, and daily photo progress feeds.",
    gallery: ["/images/projects/grn_app.jpg", "/images/projects/grn.jpg"],
    metrics: [
      { value: "Real-Time", label: "Milestone Sync", iconType: "chart" },
      { value: "1K+", label: "Daily Site Updates", iconType: "users" },
      { value: "4.8★", label: "Mobile App Rating", iconType: "star" },
      { value: "100%", label: "Offline Sync Support", iconType: "shield" },
    ],
    overview:
      "A dedicated mobile app with live timeline tracking, daily photo uploads from the site, and instant communication between homeowners, site engineers, and project managers.",
    techStack: [
      { name: "React Native", icon: ReactIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "Node.js", icon: NodeJsIcon },
    ],
    duration: "2 min",
  },
};

export const FILTER_SERVICES = [
  { id: "all", label: "All Works", icon: null, serviceType: null },
  { id: "websites", label: "Websites", icon: Globe, serviceType: "Websites" },
  { id: "web-apps", label: "Web Apps", icon: LayoutGrid, serviceType: "Web Apps" },
  { id: "mobile-apps", label: "Mobile Apps", icon: Smartphone, serviceType: "Mobile Apps" },
] as const;
