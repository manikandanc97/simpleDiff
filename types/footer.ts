import { AnimatedIconName } from "@/components/ui/animated-icon";

export interface FooterCapabilityItem {
  label: string;
  icon: AnimatedIconName;
}

export interface FooterData {
  navIcons: Record<string, AnimatedIconName>;
  capabilities: FooterCapabilityItem[];
}
