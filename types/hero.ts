import { LucideIcon } from "lucide-react";

export interface HeroStat {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface HeroContent {
  headlineLine1: string;
  headlineLine2Prefix: string;
  headlineHighlight: string;
  description: string;
  stats: HeroStat[];
}
