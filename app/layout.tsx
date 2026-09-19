import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeColorProvider } from "@/components/theme/color-provider";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingColorDock } from "@/components/theme/floating-color-dock";
import { DockProvider } from "@/components/theme/dock-context";
import { CommandPalette } from "@/components/ui/command-palette";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LeadProvider } from "@/components/leads/lead-provider";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SimpleDiff — Keep It Simple. Make It Different.",
    template: "%s · SimpleDiff",
  },
  // FLAG(copy): "digital product studio" → consider "software development company" or "engineering & product studio"
  // (also update hero badge, OG tags, and Twitter card below)
  description:
    "SimpleDiff is a digital product studio that designs and builds websites, web apps, mobile apps, SaaS products, and branding for businesses and founders.",
  openGraph: {
    title: "SimpleDiff — Keep It Simple. Make It Different.",
    // FLAG(copy): same note — "Digital product studio" → "Software development company"
    description:
      "Digital product studio that builds websites, web apps, mobile apps, SaaS products, and branding for businesses and founders.",
    url: SITE.url,
    siteName: "SimpleDiff",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleDiff — Keep It Simple. Make It Different.",
    description:
      "Digital product studio that builds websites, web apps, mobile apps, SaaS products, and branding for businesses and founders.",
  },
};

const THEME_SCRIPT = `(function(){try{var allowedThemes={violet:{primary:'oklch(0.55 0.2 280)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.55 0.2 280 / 0.5)',textLight:'oklch(0.45 0.22 280)',textDark:'oklch(0.75 0.18 280)'},blue:{primary:'oklch(0.55 0.2 250)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.55 0.2 250 / 0.5)',textLight:'oklch(0.45 0.22 250)',textDark:'oklch(0.75 0.18 250)'},cyan:{primary:'oklch(0.65 0.18 215)',foreground:'oklch(0.145 0 0)',ring:'oklch(0.65 0.18 215 / 0.5)',textLight:'oklch(0.42 0.18 215)',textDark:'oklch(0.8 0.16 215)'},emerald:{primary:'oklch(0.6 0.15 150)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.6 0.15 150 / 0.5)',textLight:'oklch(0.42 0.17 150)',textDark:'oklch(0.78 0.15 150)'},amber:{primary:'oklch(0.7 0.15 70)',foreground:'oklch(0.145 0 0)',ring:'oklch(0.7 0.15 70 / 0.5)',textLight:'oklch(0.42 0.16 65)',textDark:'oklch(0.82 0.16 75)'},rose:{primary:'oklch(0.6 0.2 20)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.6 0.2 20 / 0.5)',textLight:'oklch(0.45 0.22 20)',textDark:'oklch(0.75 0.19 20)'},fuchsia:{primary:'oklch(0.58 0.22 325)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.58 0.22 325 / 0.5)',textLight:'oklch(0.44 0.22 325)',textDark:'oklch(0.76 0.18 325)'}};var storedMode=localStorage.getItem('simplediff-mode');var mode=(storedMode==='light'||storedMode==='dark')?storedMode:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var storedTheme=localStorage.getItem('simplediff-theme');var doc=document.documentElement;if(mode==='dark'){doc.classList.add('dark');}else{doc.classList.remove('dark');}if(storedTheme==='custom'){var customHex=localStorage.getItem('simplediff-custom-color')||'#8B5CF6';doc.style.setProperty('--primary',customHex);doc.style.setProperty('--primary-foreground','oklch(0.985 0 0)');doc.style.setProperty('--ring','color-mix(in srgb, '+customHex+' 50%, transparent)');doc.style.setProperty('--primary-text',customHex);}else{var themeId=allowedThemes[storedTheme]?storedTheme:'violet';var t=allowedThemes[themeId];doc.style.setProperty('--primary',t.primary);doc.style.setProperty('--primary-foreground',t.foreground);doc.style.setProperty('--ring',t.ring);doc.style.setProperty('--primary-text',mode==='dark'?t.textDark:t.textLight);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geistSans.variable, geistMono.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* Skip to main content for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-primary focus:rounded-md focus:shadow-md"
        >
          Skip to content
        </a>

        <MotionProvider>
          <ThemeColorProvider>
            <LeadProvider>
              <DockProvider>
                <SiteNavbar />
                <CommandPalette />

                <main id="main" className="flex-1 flex flex-col w-full pt-16 md:pt-20">
                  {children}
                </main>

                <FloatingColorDock />
                <SiteFooter />
              </DockProvider>
            </LeadProvider>
          </ThemeColorProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
