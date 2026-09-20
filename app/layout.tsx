import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeColorProvider } from "@/components/theme/color-provider";
import { FontProvider } from "@/components/theme/font-provider";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingColorDock } from "@/components/theme/floating-color-dock";
import { DockProvider } from "@/components/theme/dock-context";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
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
  description:
    "SimpleDiff is a software development company that engineers custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise digital solutions.",
  openGraph: {
    title: "SimpleDiff — Keep It Simple. Make It Different.",
    description:
      "Software development company engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
    url: SITE.url,
    siteName: "SimpleDiff",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleDiff — Keep It Simple. Make It Different.",
    description:
      "Software development company engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
  },
};

const THEME_SCRIPT = `(function(){try{var allowedThemes={red:{primary:'oklch(0.60 0.24 25)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.60 0.24 25 / 0.5)',textLight:'oklch(0.42 0.24 25)',textDark:'oklch(0.80 0.20 25)'},green:{primary:'oklch(0.65 0.20 145)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.65 0.20 145 / 0.5)',textLight:'oklch(0.40 0.20 145)',textDark:'oklch(0.82 0.18 145)'},blue:{primary:'oklch(0.60 0.23 250)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.60 0.23 250 / 0.5)',textLight:'oklch(0.40 0.22 250)',textDark:'oklch(0.80 0.18 250)'},violet:{primary:'oklch(0.62 0.24 285)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.62 0.24 285 / 0.5)',textLight:'oklch(0.42 0.24 285)',textDark:'oklch(0.80 0.18 285)'},amber:{primary:'oklch(0.74 0.19 65)',foreground:'oklch(0.145 0 0)',ring:'oklch(0.74 0.19 65 / 0.5)',textLight:'oklch(0.38 0.18 60)',textDark:'oklch(0.86 0.18 70)'},emerald:{primary:'oklch(0.65 0.19 155)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.65 0.19 155 / 0.5)',textLight:'oklch(0.40 0.18 150)',textDark:'oklch(0.82 0.16 150)'},cyan:{primary:'oklch(0.72 0.17 215)',foreground:'oklch(0.145 0 0)',ring:'oklch(0.72 0.17 215 / 0.5)',textLight:'oklch(0.40 0.18 215)',textDark:'oklch(0.85 0.16 215)'},rose:{primary:'oklch(0.65 0.24 20)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.65 0.24 20 / 0.5)',textLight:'oklch(0.42 0.24 20)',textDark:'oklch(0.80 0.19 20)'},fuchsia:{primary:'oklch(0.64 0.25 325)',foreground:'oklch(0.985 0 0)',ring:'oklch(0.64 0.25 325 / 0.5)',textLight:'oklch(0.42 0.24 325)',textDark:'oklch(0.80 0.19 325)'}};var storedMode=localStorage.getItem('simplediff-mode');var mode=(storedMode==='light'||storedMode==='dark')?storedMode:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var storedTheme=localStorage.getItem('simplediff-theme');var doc=document.documentElement;if(mode==='dark'){doc.classList.add('dark');}else{doc.classList.remove('dark');}if(storedTheme==='custom'){var customHex=localStorage.getItem('simplediff-custom-color')||'#2563EB';doc.style.setProperty('--primary',customHex);doc.style.setProperty('--primary-foreground','oklch(0.985 0 0)');doc.style.setProperty('--ring','color-mix(in srgb, '+customHex+' 50%, transparent)');doc.style.setProperty('--primary-text',customHex);}else{var themeId=(storedTheme&&allowedThemes[storedTheme])?storedTheme:'blue';var t=allowedThemes[themeId];doc.style.setProperty('--primary',t.primary);doc.style.setProperty('--primary-foreground',t.foreground);doc.style.setProperty('--ring',t.ring);doc.style.setProperty('--primary-text',mode==='dark'?t.textDark:t.textLight);}var storedFont=localStorage.getItem('simplediff-font');if(storedFont&&storedFont!=='Geist'&&storedFont!=='default'){var safeId='google-font-'+storedFont.toLowerCase().replace(/[^a-z0-9]/g,'-');var fontLink=document.createElement('link');fontLink.id=safeId;fontLink.rel='stylesheet';fontLink.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(storedFont)+':wght@400;500;600;700;800;900&display=swap';document.head.appendChild(fontLink);var fontCss='"'+storedFont+'", system-ui, sans-serif';doc.style.setProperty('--font-sans',fontCss);doc.style.setProperty('--font-geist-sans',fontCss);doc.style.fontFamily=fontCss;}}catch(e){}})();`;

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
            <FontProvider>
              <LeadProvider>
                <DockProvider>
                  <MobileMenuProvider>
                    <SiteNavbar />
                    <CommandPalette />

                    <main id="main" className="flex-1 flex flex-col w-full pt-16 md:pt-20 pb-20 md:pb-0">
                      {children}
                    </main>

                    <MobileBottomNav />
                    <FloatingColorDock />
                    <SiteFooter />
                  </MobileMenuProvider>
                </DockProvider>
              </LeadProvider>
            </FontProvider>
          </ThemeColorProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
