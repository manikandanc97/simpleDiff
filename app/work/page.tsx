import { WorkView } from "@/components/pages/work-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work and concept studies by SimpleThink. See how we strip away complexity to build focused digital products.",
};

export default function WorkPage() {
  return <WorkView />;
}
