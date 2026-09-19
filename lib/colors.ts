export type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  primaryForeground: string;
  ring: string;
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "violet",
    name: "Violet",
    // Base UI/shadcn OKLCH equivalent for violet
    primary: "oklch(0.55 0.2 280)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.55 0.2 280 / 0.5)",
  },
  {
    id: "blue",
    name: "Blue",
    primary: "oklch(0.55 0.2 250)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.55 0.2 250 / 0.5)",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "oklch(0.6 0.15 150)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.6 0.15 150 / 0.5)",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "oklch(0.6 0.2 20)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.6 0.2 20 / 0.5)",
  },
  {
    id: "amber",
    name: "Amber",
    primary: "oklch(0.7 0.15 70)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.7 0.15 70 / 0.5)",
  },
];
