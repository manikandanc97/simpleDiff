export type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  primaryForeground: string;
  ring: string;
  textOnLight: string;
  textOnDark: string;
  isCustom?: boolean;
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "red",
    name: "Crimson Red",
    primary: "oklch(0.60 0.24 25)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.60 0.24 25 / 0.5)",
    textOnLight: "oklch(0.42 0.24 25)",
    textOnDark: "oklch(0.80 0.20 25)",
  },
  {
    id: "green",
    name: "Vibrant Green",
    primary: "oklch(0.65 0.20 145)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.65 0.20 145 / 0.5)",
    textOnLight: "oklch(0.40 0.20 145)",
    textOnDark: "oklch(0.82 0.18 145)",
  },
  {
    id: "blue",
    name: "Electric Blue",
    primary: "oklch(0.60 0.23 250)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.60 0.23 250 / 0.5)",
    textOnLight: "oklch(0.40 0.22 250)",
    textOnDark: "oklch(0.80 0.18 250)",
  },
  {
    id: "violet",
    name: "Violet",
    primary: "oklch(0.62 0.24 285)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.62 0.24 285 / 0.5)",
    textOnLight: "oklch(0.42 0.24 285)",
    textOnDark: "oklch(0.80 0.18 285)",
  },
  {
    id: "amber",
    name: "Sunset Amber",
    primary: "oklch(0.74 0.19 65)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.74 0.19 65 / 0.5)",
    textOnLight: "oklch(0.38 0.18 60)",
    textOnDark: "oklch(0.86 0.18 70)",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "oklch(0.65 0.19 155)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.65 0.19 155 / 0.5)",
    textOnLight: "oklch(0.40 0.18 150)",
    textOnDark: "oklch(0.82 0.16 150)",
  },
  {
    id: "cyan",
    name: "Cyan",
    primary: "oklch(0.72 0.17 215)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.72 0.17 215 / 0.5)",
    textOnLight: "oklch(0.40 0.18 215)",
    textOnDark: "oklch(0.85 0.16 215)",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "oklch(0.65 0.24 20)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.65 0.24 20 / 0.5)",
    textOnLight: "oklch(0.42 0.24 20)",
    textOnDark: "oklch(0.80 0.19 20)",
  },
  {
    id: "fuchsia",
    name: "Fuchsia",
    primary: "oklch(0.64 0.25 325)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.64 0.25 325 / 0.5)",
    textOnLight: "oklch(0.42 0.24 325)",
    textOnDark: "oklch(0.80 0.19 325)",
  },
];

export function createCustomColorTheme(hex: string): ColorTheme {
  // Normalize hex
  let cleanHex = hex.trim();
  if (!cleanHex.startsWith("#")) {
    cleanHex = `#${cleanHex}`;
  }
  if (cleanHex.length === 4) {
    cleanHex = `#${cleanHex[1]}${cleanHex[1]}${cleanHex[2]}${cleanHex[2]}${cleanHex[3]}${cleanHex[3]}`;
  }

  // Calculate perceived brightness
  const r = parseInt(cleanHex.slice(1, 3), 16) || 0;
  const g = parseInt(cleanHex.slice(3, 5), 16) || 0;
  const b = parseInt(cleanHex.slice(5, 7), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const foreground = luminance > 0.65 ? "oklch(0.145 0 0)" : "oklch(0.985 0 0)";
  const ring = `color-mix(in srgb, ${cleanHex} 50%, transparent)`;
  const textOnLight = luminance > 0.45 ? `color-mix(in srgb, ${cleanHex} 85%, black)` : cleanHex;
  const textOnDark = luminance < 0.6 ? `color-mix(in srgb, ${cleanHex} 85%, white)` : cleanHex;

  return {
    id: "custom",
    name: "Custom",
    primary: cleanHex,
    primaryForeground: foreground,
    ring,
    textOnLight,
    textOnDark,
    isCustom: true,
  };
}
