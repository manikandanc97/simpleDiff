export interface Experiment {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  patternType: "grid" | "dots" | "waves" | "geometric" | "abstract";
  spanClass?: string; // Optional CSS class to control grid span
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "exp-1",
    number: "01",
    title: "Generative UI Engine",
    category: "AI Experiments",
    description: "Exploring real-time interface generation based on user intent models.",
    patternType: "grid",
    spanClass: "md:col-span-2 lg:col-span-2", // Makes this one stand out by spanning larger
  },
  {
    id: "exp-2",
    number: "02",
    title: "Fluid Navigation",
    category: "UI Experiments",
    description: "A spatial navigation concept that adapts to viewport physics.",
    patternType: "geometric",
  },
  {
    id: "exp-3",
    number: "03",
    title: "Scroll Dynamics",
    category: "Motion Experiments",
    description: "Investigating scroll-linked animation curves for editorial layouts.",
    patternType: "waves",
  },
  {
    id: "exp-4",
    number: "04",
    title: "Minimal Commerce",
    category: "Product Concepts",
    description: "A checkout flow stripped down to the absolute mathematical minimum.",
    patternType: "dots",
  },
  {
    id: "exp-5",
    number: "05",
    title: "Typographic Data",
    category: "Creative Web",
    description: "Visualizing complex datasets using only font weight and variable axes.",
    patternType: "abstract",
    spanClass: "md:col-span-2 lg:col-span-2", // Asymmetric balance
  },
];
