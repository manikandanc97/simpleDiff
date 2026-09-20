import type { Metadata } from "next";
import { ServicesView } from "@/components/pages/services-view";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web apps, mobile apps, SaaS products, branding, and automation by SimpleThink. Pick what you need and define your scope.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
