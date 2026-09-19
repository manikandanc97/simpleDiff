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
    name: "Electric Blue",
    primary: "oklch(0.55 0.2 250)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.55 0.2 250 / 0.5)",
    textOnLight: "oklch(0.45 0.22 250)",
    textOnDark: "oklch(0.75 0.18 250)",
  },
  {
    id: "cyan",
    name: "Cyan",
    primary: "oklch(0.65 0.18 215)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.65 0.18 215 / 0.5)",
    textOnLight: "oklch(0.42 0.18 215)",
    textOnDark: "oklch(0.8 0.16 215)",
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
    id: "amber",
    name: "Amber",
    primary: "oklch(0.7 0.15 70)",
    primaryForeground: "oklch(0.145 0 0)",
    ring: "oklch(0.7 0.15 70 / 0.5)",
    textOnLight: "oklch(0.42 0.16 65)",
    textOnDark: "oklch(0.82 0.16 75)",
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
    id: "fuchsia",
    name: "Fuchsia",
    primary: "oklch(0.58 0.22 325)",
    primaryForeground: "oklch(0.985 0 0)",
    ring: "oklch(0.58 0.22 325 / 0.5)",
    textOnLight: "oklch(0.44 0.22 325)",
    textOnDark: "oklch(0.76 0.18 325)",
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
