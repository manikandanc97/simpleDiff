import { Home, Briefcase, Layers, Lightbulb, Info, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  route: string;
  icon: LucideIcon;
  commandName: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", route: "/", icon: Home, commandName: "Go to Home" },
  { label: "Work", route: "/work", icon: Briefcase, commandName: "Go to Work" },
  { label: "Services", route: "/services", icon: Layers, commandName: "Go to Services" },
  { label: "Ideas", route: "/lab", icon: Lightbulb, commandName: "Go to Ideas" },
  { label: "About", route: "/about", icon: Info, commandName: "Go to About" },
];
