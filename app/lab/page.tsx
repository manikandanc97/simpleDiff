import { LabView } from "@/components/pages/lab-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Software prototypes, architectural experiments, and concept explorations developed by the SimpleThink engineering team.",
};

export default function LabPage() {
  return <LabView />;
}
