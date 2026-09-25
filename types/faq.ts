import { LucideIcon } from "lucide-react";

export interface FAQHighlight {
  text: string;
  icon: LucideIcon;
}

export interface FAQItem {
  id: string;
  num: string;
  category: string;
  icon: LucideIcon;
  question: string;
  answer: string;
  highlights?: FAQHighlight[];
}
