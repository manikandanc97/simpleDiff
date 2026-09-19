import { WorkbenchHero } from "@/components/workbench/workbench-hero";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { Philosophy } from "@/components/sections/philosophy";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <WorkbenchHero />
      <WhatWeBuild />
      <Philosophy />
      <CTA />
    </div>
  );
}
