import type { Metadata } from "next";
import { LabView } from "@/components/pages/lab-view";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Software prototypes, architectural experiments, and concept explorations developed by the SimpleThink engineering team.",
};

export default function LabPage() {
  return <LabView />;
}
