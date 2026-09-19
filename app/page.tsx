import { Hero } from "@/components/sections/hero";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { BuiltDifferent } from "@/components/sections/built-different/built-different";
import { SimpleDiffLab } from "@/components/sections/lab/simplediff-lab";
import { BuildYourIdea } from "@/components/sections/build-your-idea/build-your-idea";
import { Philosophy } from "@/components/sections/philosophy";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 w-full">
      <Hero />
      <WhatWeBuild />
      <BuiltDifferent />
      <SimpleDiffLab />
      <BuildYourIdea />
      <Philosophy />
      <CTA />
    </main>
  );
}
