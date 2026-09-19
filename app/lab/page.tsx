import type { Metadata } from "next";
import { LabView } from "@/components/pages/lab-view";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Ideas, prototypes, and concept experiments being explored by the SimpleDiff digital product studio.",
};

export default function LabPage() {
  return <LabView />;
}
