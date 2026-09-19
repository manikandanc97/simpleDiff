export type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  primaryForeground: string;
  ring: string;
  textOnLight: string;
  textOnDark: string;
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "violet",
    name: "Violet",
    primary: "oklch(0.55 0.2 280)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.55 0.2 280 / 0.5)",
    textOnLight: "oklch(0.45 0.22 280)",
    textOnDark: "oklch(0.75 0.18 280)",
  },
  {
    id: "blue",
    name: "Blue",
    primary: "oklch(0.55 0.2 250)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.55 0.2 250 / 0.5)",
    textOnLight: "oklch(0.45 0.22 250)",
    textOnDark: "oklch(0.75 0.18 250)",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "oklch(0.6 0.15 150)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.6 0.15 150 / 0.5)",
    textOnLight: "oklch(0.42 0.17 150)",
    textOnDark: "oklch(0.78 0.15 150)",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "oklch(0.6 0.2 20)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.6 0.2 20 / 0.5)",
    textOnLight: "oklch(0.45 0.22 20)",
    textOnDark: "oklch(0.75 0.19 20)",
  },
  {
    id: "amber",
    name: "Amber",
    primary: "oklch(0.7 0.15 70)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.7 0.15 70 / 0.5)",
    textOnLight: "oklch(0.42 0.16 65)",
    textOnDark: "oklch(0.82 0.16 75)",
  },
];
