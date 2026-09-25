import { LucideIcon } from "lucide-react";

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
  
  // Added for what-we-build section compatibility
  shortTagline?: string;
  deliverables?: string[];
  brandColor?: string; 
}
