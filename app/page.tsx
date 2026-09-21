import { WorkbenchHero } from "@/components/workbench/workbench-hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { SelectedWork } from "@/components/sections/selected-work";
import { HowWeWork } from "@/components/sections/how-we-work";
import { WhySimpleThink } from "@/components/sections/philosophy";
import { Industries } from "@/components/sections/industries";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* 02 — HERO */}
      <WorkbenchHero />

      {/* 03 — TRUST / CAPABILITIES */}
      <TrustBar />

      {/* 04 — WHAT WE BUILD */}
      <WhatWeBuild />

      {/* 05 — SELECTED WORK */}
      <SelectedWork />

      {/* 06 — HOW WE WORK */}
      <HowWeWork />

      {/* 07 — Why SimpleThink */}
      <WhySimpleThink />

      {/* 08 — INDUSTRIES */}
      <Industries />

      {/* 09 — TECHNOLOGY */}
      <TechStack />

      {/* 10 — TESTIMONIALS */}
      {/* <Testimonials /> */}

      {/* 11 — FAQ */}
      <FAQ />

      {/* 12 — FINAL CTA */}
      <CTA />

      {/* 01 Navbar + 13 Footer are in layout.tsx */}
    </div>
  );
}
