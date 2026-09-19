export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  description: string;
  image?: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    number: "01",
    name: "Fintech App",
    category: "Mobile Application",
    problem: "Banking apps are often cluttered, causing users to struggle with basic tasks.",
    solution: "A hyper-minimal interface focusing strictly on daily transaction needs.",
    description: "We redesigned the core banking experience to be as simple as sending a text message. By removing unnecessary features and focusing on speed, we created an app people actually want to use.",
    accent: "oklch(0.6 0.15 150)", // Emerald-ish
  },
  {
    id: "proj-2",
    number: "02",
    name: "Retail Brand",
    category: "E-Commerce",
    problem: "The brand identity was lost in a generic, slow-loading Shopify template.",
    solution: "A custom headless architecture paired with a brutalist, typography-first design.",
    description: "We rebuilt the entire shopping experience from the ground up. The new architecture is blazing fast, and the design language clearly communicates their premium positioning.",
    accent: "oklch(0.55 0.2 280)", // Violet-ish
  },
  {
    id: "proj-3",
    number: "03",
    name: "SaaS Platform",
    category: "Web Application",
    problem: "Data analysis tools are typically overwhelming for non-technical users.",
    solution: "A dashboard that surfaces only actionable insights, hiding raw data by default.",
    description: "By rethinking how data is presented, we transformed a complex analytics tool into a clear, story-driven dashboard that anyone on the team can understand and use to make decisions.",
    accent: "oklch(0.6 0.2 20)", // Rose-ish
  }
];
