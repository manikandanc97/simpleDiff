import dynamic from "next/dynamic";
import { WorkbenchHero } from "@/components/workbench/workbench-hero";

// Lazy-loaded sections to reduce initial JS bundle size
const WhatWeBuild = dynamic(() => import("@/components/sections/what-we-build").then((mod) => mod.WhatWeBuild));
const SelectedWork = dynamic(() => import("@/components/sections/selected-work").then((mod) => mod.SelectedWork));
const HowWeWork = dynamic(() => import("@/components/sections/how-we-work").then((mod) => mod.HowWeWork));
const WhySimplePrime = dynamic(() => import("@/components/sections/philosophy").then((mod) => mod.WhySimplePrime));
const Industries = dynamic(() => import("@/components/sections/industries").then((mod) => mod.Industries));
const TechStack = dynamic(() => import("@/components/sections/tech-stack").then((mod) => mod.TechStack));
// const Testimonials = dynamic(() => import("@/components/sections/testimonials").then((mod) => mod.Testimonials));
const FAQ = dynamic(() => import("@/components/sections/faq").then((mod) => mod.FAQ));
const CTA = dynamic(() => import("@/components/sections/cta").then((mod) => mod.CTA));

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* 02 — HERO */}
      <WorkbenchHero />

      {/* 03 — WHAT WE BUILD */}
      <WhatWeBuild />

      {/* 05 — SELECTED WORK */}
      <SelectedWork />

      {/* 06 — HOW WE WORK */}
      <HowWeWork />

      {/* 07 — Why SimplePrime */}
      <WhySimplePrime />

      {/* 08 — INDUSTRIES */}
      {/* <Industries /> */}

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
