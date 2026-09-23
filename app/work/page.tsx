import type { Metadata } from "next";
import { WorkView } from "@/components/pages/work-view";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work and concept studies by SimplePrime. See how we strip away complexity to build focused digital products.",
};

export default function WorkPage() {
  return <WorkView />;
}
