export type GoogleFontCategory =
  | "all"
  | "sans-serif"
  | "serif"
  | "display"
  | "monospace"
  | "handwriting";

export interface GoogleFont {
  name: string;
  category: "sans-serif" | "serif" | "display" | "monospace" | "handwriting";
  weights?: string; // Query weights for Google Fonts API
  popular?: boolean;
  description: string;
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // ── Sans-Serif ──────────────────────────────────────────────
  {
    name: "Inter",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    popular: true,
    description: "Carefully crafted for computer screens, high readability",
  },
  {
    name: "Plus Jakarta Sans",
    category: "sans-serif",
    weights: "wght@400;500;600;700;800",
    popular: true,
    description: "Modern clean geometric neo-grotesque for premium SaaS",
  },
  {
    name: "Outfit",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800;900",
    popular: true,
    description: "Contemporary geometric display sans with rounded edges",
  },
  {
    name: "Poppins",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    popular: true,
    description: "Geometric sans-serif with friendly, open curves",
  },
  {
    name: "Roboto",
    category: "sans-serif",
    weights: "wght@300;400;500;700;900",
    popular: true,
    description: "Google's versatile neo-grotesque standard workhorse",
  },
  {
    name: "Montserrat",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    popular: true,
    description: "Inspired by vintage signage in Buenos Aires",
  },
  {
    name: "DM Sans",
    category: "sans-serif",
    weights: "wght@400;500;700",
    popular: true,
    description: "Low-contrast geometric sans tailored for UI design",
  },
  {
    name: "Space Grotesk",
    category: "sans-serif",
    weights: "wght@400;500;600;700",
    popular: true,
    description: "Futuristic tech sans derived from Space Mono",
  },
  {
    name: "Manrope",
    category: "sans-serif",
    weights: "wght@400;500;600;700;800",
    popular: true,
    description: "Modern semi-rounded geometric sans with great balance",
  },
  {
    name: "Syne",
    category: "sans-serif",
    weights: "wght@400;600;700;800",
    popular: true,
    description: "Design-forward, expressive typography for creative tech",
  },
  {
    name: "Sora",
    category: "sans-serif",
    weights: "wght@300;400;600;700",
    popular: true,
    description: "Designed for screen clarity and UI micro-spacing",
  },
  {
    name: "Urbanist",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    popular: true,
    description: "Low-contrast geometric neo-grotesque with sharp details",
  },
  {
    name: "Figtree",
    category: "sans-serif",
    weights: "wght@400;500;600;700;800",
    popular: true,
    description: "Clean, friendly modern geometric sans by Erik Spiekermann",
  },
  {
    name: "Open Sans",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    description: "Humanist sans with open shapes and neutral friendly appearance",
  },
  {
    name: "Lato",
    category: "sans-serif",
    weights: "wght@300;400;700;900",
    description: "Warm semi-rounded humanist sans with classical proportions",
  },
  {
    name: "Raleway",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700;800",
    description: "Elegant sans with stylish alternates and high crossbars",
  },
  {
    name: "Work Sans",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700",
    description: "Optimized for on-screen text sizing and technical diagrams",
  },
  {
    name: "Rubik",
    category: "sans-serif",
    weights: "wght@400;500;600;700;800",
    description: "Subtly rounded corners with solid geometric framework",
  },
  {
    name: "Quicksand",
    category: "sans-serif",
    weights: "wght@400;500;600;700",
    description: "Rounded geometric sans for approachable and playful branding",
  },
  {
    name: "Nunito",
    category: "sans-serif",
    weights: "wght@300;400;600;700;800",
    description: "Well-balanced rounded terminal sans-serif",
  },
  {
    name: "Jost",
    category: "sans-serif",
    weights: "wght@400;500;600;700",
    description: "Futura-inspired modernist geometric typography",
  },
  {
    name: "Public Sans",
    category: "sans-serif",
    weights: "wght@300;400;500;600;700",
    description: "Neutral, robust sans built for interfaces and clear systems",
  },
  {
    name: "Karla",
    category: "sans-serif",
    weights: "wght@400;500;700",
    description: "Quirky grotesque sans with distinctive personality",
  },
  {
    name: "Bricolage Grotesque",
    category: "sans-serif",
    weights: "wght@400;600;700;800",
    description: "French modern grotesque with punchy expressive curves",
  },
  {
    name: "Lexend",
    category: "sans-serif",
    weights: "wght@400;500;600;700",
    description: "Engineered specifically to reduce visual reading fatigue",
  },

  // ── Serif ───────────────────────────────────────────────────
  {
    name: "Playfair Display",
    category: "serif",
    weights: "wght@400;500;600;700;800",
    popular: true,
    description: "High-contrast transitional serif influenced by Enlightenment era",
  },
  {
    name: "Lora",
    category: "serif",
    weights: "wght@400;500;600;700",
    popular: true,
    description: "Contemporary serif with brushed curves and poetic rhythm",
  },
  {
    name: "Cinzel",
    category: "serif",
    weights: "wght@400;600;700;800",
    popular: true,
    description: "Inspired by classical Roman 1st-century monumental inscriptions",
  },
  {
    name: "Merriweather",
    category: "serif",
    weights: "wght@300;400;700;900",
    popular: true,
    description: "Engineered for optimal readability across long digital screens",
  },
  {
    name: "Cormorant Garamond",
    category: "serif",
    weights: "wght@400;500;600;700",
    popular: true,
    description: "Graceful traditional Garamond revival with slender elegance",
  },
  {
    name: "DM Serif Display",
    category: "serif",
    weights: "wght@400",
    popular: true,
    description: "High-impact editorial serif with refined delicate serifs",
  },
  {
    name: "Fraunces",
    category: "serif",
    weights: "wght@400;600;700;800",
    description: "Wonky old-style serif bursting with warmth and eccentricity",
  },
  {
    name: "EB Garamond",
    category: "serif",
    weights: "wght@400;500;600;700",
    description: "Faithful classical revival of Claude Garamont's 1592 specimen",
  },
  {
    name: "Libre Baskerville",
    category: "serif",
    weights: "wght@400;700",
    description: "Optimized web variant of traditional Baskerville typeface",
  },
  {
    name: "Bodoni Moda",
    category: "serif",
    weights: "wght@400;600;700;800",
    description: "Ultra-high contrast Didone luxury and haute-couture fashion",
  },
  {
    name: "Spectral",
    category: "serif",
    weights: "wght@300;400;600;700",
    description: "Serif font designed specifically for screen-first document reading",
  },
  {
    name: "Newsreader",
    category: "serif",
    weights: "wght@400;500;600;700",
    description: "Engineered for editorial longform digital reading experiences",
  },
  {
    name: "Prata",
    category: "serif",
    weights: "wght@400",
    description: "Elegant Didone styling with teardrop terminals",
  },
  {
    name: "Bitter",
    category: "serif",
    weights: "wght@400;600;700",
    description: "Contemporary slab-serif designed for comfortable reading",
  },

  // ── Display ─────────────────────────────────────────────────
  {
    name: "Bebas Neue",
    category: "display",
    weights: "wght@400",
    popular: true,
    description: "Bold condensed all-caps display font with punchy presence",
  },
  {
    name: "Oswald",
    category: "display",
    weights: "wght@400;500;600;700",
    popular: true,
    description: "Reworking of classic Alternate Gothic for digital displays",
  },
  {
    name: "Righteous",
    category: "display",
    weights: "wght@400",
    popular: true,
    description: "Grid-based retro art-deco display typeface with sci-fi flair",
  },
  {
    name: "Abril Fatface",
    category: "display",
    weights: "wght@400",
    popular: true,
    description: "Dramatic Didone slab with extreme contrast and 19th-century soul",
  },
  {
    name: "Alfa Slab One",
    category: "display",
    weights: "wght@400",
    popular: true,
    description: "Extreme black weight slab-serif with ultra-heavy serifs",
  },
  {
    name: "Unbounded",
    category: "display",
    weights: "wght@400;600;700;800",
    popular: true,
    description: "Ultrawide geometric display font designed for Web3 and gaming",
  },
  {
    name: "Lobster",
    category: "display",
    weights: "wght@400",
    description: "Bold condensed script with automatic ligature variations",
  },
  {
    name: "Anton",
    category: "display",
    weights: "wght@400",
    description: "Rework of traditional advertising sans with tall compact proportions",
  },
  {
    name: "Archivo Black",
    category: "display",
    weights: "wght@400",
    description: "Heavyweight grotesque meant for bold high-contrast headlines",
  },
  {
    name: "Shrikhand",
    category: "display",
    weights: "wght@400",
    description: "Expressive Indian street-sign inspired hand-painted display",
  },
  {
    name: "Titan One",
    category: "display",
    weights: "wght@400",
    description: "Heavy rounded display font with cheerful punchy personality",
  },
  {
    name: "Bungee",
    category: "display",
    weights: "wght@400",
    description: "Celebrates urban vertical street signage and art-deco architecture",
  },

  // ── Monospace ───────────────────────────────────────────────
  {
    name: "Fira Code",
    category: "monospace",
    weights: "wght@400;500;600;700",
    popular: true,
    description: "Beloved programming font with rich ligatures for developers",
  },
  {
    name: "JetBrains Mono",
    category: "monospace",
    weights: "wght@400;500;700;800",
    popular: true,
    description: "Designed specifically for code developers with tall lowercase",
  },
  {
    name: "Space Mono",
    category: "monospace",
    weights: "wght@400;700",
    popular: true,
    description: "Retro-futuristic fixed-width font developed for Editorial design",
  },
  {
    name: "Source Code Pro",
    category: "monospace",
    weights: "wght@400;600;700",
    description: "Adobe's clean humanist monospace designed for terminal and code",
  },
  {
    name: "Roboto Mono",
    category: "monospace",
    weights: "wght@400;500;700",
    description: "Monospace companion to Roboto with equal letter spacing",
  },
  {
    name: "IBM Plex Mono",
    category: "monospace",
    weights: "wght@400;500;600;700",
    description: "Engineered for IBM's industrial design language and code systems",
  },
  {
    name: "Inconsolata",
    category: "monospace",
    weights: "wght@400;600;700",
    description: "High-legibility humanist monospace created by Raph Levien",
  },
  {
    name: "Courier Prime",
    category: "monospace",
    weights: "wght@400;700",
    description: "Screenplay-ready typewriter monospace perfected for reading",
  },

  // ── Handwriting ─────────────────────────────────────────────
  {
    name: "Caveat",
    category: "handwriting",
    weights: "wght@400;600;700",
    popular: true,
    description: "Playful handwritten cursive with natural rhythm",
  },
  {
    name: "Dancing Script",
    category: "handwriting",
    weights: "wght@400;600;700",
    popular: true,
    description: "Lively informal script where letters bounce gently in baseline",
  },
  {
    name: "Pacifico",
    category: "handwriting",
    weights: "wght@400",
    popular: true,
    description: "Original brush script font inspired by 1950s American surf culture",
  },
  {
    name: "Satisfy",
    category: "handwriting",
    weights: "wght@400",
    description: "Casual brush script with a timeless mid-century elegance",
  },
  {
    name: "Great Vibes",
    category: "handwriting",
    weights: "wght@400",
    description: "Flowing beautifully connected calligraphy script",
  },
  {
    name: "Shadows Into Light",
    category: "handwriting",
    weights: "wght@400",
    description: "Neat, clean personal handwriting with feminine delicate touch",
  },
  {
    name: "Kalam",
    category: "handwriting",
    weights: "wght@400;700",
    description: "Handwritten calligraphy style modeled on Devanagari felt pen script",
  },
  {
    name: "Indie Flower",
    category: "handwriting",
    weights: "wght@400",
    description: "Charming, carefree handwriting with bubbly open loops",
  },
];

export const DEFAULT_FONT_NAME = "Geist";

export function getFontFallback(category?: string): string {
  switch (category) {
    case "serif":
      return 'Georgia, Cambria, "Times New Roman", Times, serif';
    case "monospace":
      return 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Monaco, Consolas, monospace';
    case "handwriting":
    case "display":
      return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    case "sans-serif":
    default:
      return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
}

export function buildGoogleFontUrl(font: GoogleFont | { name: string; weights?: string }): string {
  const family = encodeURIComponent(font.name);
  if (font.weights) {
    return `https://fonts.googleapis.com/css2?family=${family}:${font.weights}&display=swap`;
  }
  return `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
}

/**
 * Loads a Google Font stylesheet into the document <head> if not already loaded.
 */
export function loadGoogleFontToDOM(font: GoogleFont | string): void {
  if (typeof document === "undefined") return;

  const fontName = typeof font === "string" ? font : font.name;
  if (!fontName || fontName === DEFAULT_FONT_NAME || fontName.toLowerCase() === "default") {
    return;
  }

  const safeId = `google-font-${fontName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  if (document.getElementById(safeId)) return;

  const existingFont = typeof font === "object" ? font : GOOGLE_FONTS.find(
    (f) => f.name.toLowerCase() === fontName.toLowerCase()
  );

  const url = existingFont
    ? buildGoogleFontUrl(existingFont)
    : `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700;800;900&display=swap`;

  const link = document.createElement("link");
  link.id = safeId;
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Applies a font to document root and body while strictly preserving font size and line height.
 */
export function applyFontToDOM(fontName: string): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (!fontName || fontName === DEFAULT_FONT_NAME || fontName.toLowerCase() === "default") {
    root.style.removeProperty("--font-sans");
    root.style.removeProperty("--font-geist-sans");
    root.style.removeProperty("font-family");
    if (document.body) {
      document.body.style.removeProperty("font-family");
    }
    return;
  }

  // Ensure the font is loaded in <head>
  loadGoogleFontToDOM(fontName);

  const matched = GOOGLE_FONTS.find((f) => f.name.toLowerCase() === fontName.toLowerCase());
  const fallback = getFontFallback(matched?.category);
  const fontCss = `"${fontName}", ${fallback}`;

  root.style.setProperty("--font-sans", fontCss);
  root.style.setProperty("--font-geist-sans", fontCss);
  root.style.fontFamily = fontCss;
  if (document.body) {
    document.body.style.fontFamily = fontCss;
  }
}

/**
 * Preloads fonts in compact batches for live previews in the picker.
 */
export function preloadFontPreviewBatch(fonts: GoogleFont[]): void {
  if (typeof document === "undefined") return;

  const chunkSize = 25;
  for (let i = 0; i < fonts.length; i += chunkSize) {
    const chunkId = `simplediff-preview-batch-${i}`;
    if (document.getElementById(chunkId)) continue;

    const chunk = fonts.slice(i, i + chunkSize);
    const params = chunk
      .map((f) => `family=${f.name.trim().replace(/\s+/g, "+")}`)
      .join("&");

    const link = document.createElement("link");
    link.id = chunkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    document.head.appendChild(link);
  }
}

