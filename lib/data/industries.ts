import {
  BookOpen,
  Heart,
  Home,
  Landmark,
  Package,
  Scale,
  ShoppingCart,
  Truck,
  Tv,
  Zap,
} from "lucide-react";
import { Industry } from "@/types/industry";

export const INDUSTRIES: Industry[] = [
  {
    id: "fintech",
    label: "FinTech",
    icon: Landmark,
    description: "Payments, dashboards, lending",
  },
  {
    id: "healthtech",
    label: "HealthTech",
    icon: Heart,
    description: "Telehealth, EHR, patient apps",
  },
  {
    id: "edtech",
    label: "EdTech",
    icon: BookOpen,
    description: "LMS platforms, learning tools",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    description: "Storefronts, headless, OMS",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    description: "Fleet tracking, dispatch ops",
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Home,
    description: "Listing platforms, CRM tools",
  },
  {
    id: "legaltech",
    label: "Legal Tech",
    icon: Scale,
    description: "Document automation, portals",
  },
  {
    id: "saas",
    label: "B2B SaaS",
    icon: Package,
    description: "Multi-tenant, billing, APIs",
  },
  {
    id: "media",
    label: "Media & Content",
    icon: Tv,
    description: "Streaming, CMS, newsletters",
  },
  {
    id: "startups",
    label: "Startups",
    icon: Zap,
    description: "MVPs, 0→1, investor-ready builds",
  },
];
