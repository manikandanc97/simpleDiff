import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { TopBar } from "@/components/layout/top-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CommandPalette } from "@/components/ui/command-palette";
import { NavigationProgress } from "@/components/ui/navigation-progress";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LeadProvider } from "@/components/leads/lead-provider";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SimplePrime — Think Simple. Build Premium.",
    template: "%s · SimplePrime",
  },
  description:
    "SimplePrime is a premium digital studio that engineers custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
  openGraph: {
    title: "SimplePrime — Think Simple. Build Premium.",
    description:
      "Premium digital studio engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
    url: SITE.url,
    siteName: "SimplePrime",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SimplePrime — Think Simple. Build Premium.",
    description:
      "Premium digital studio engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased scroll-smooth", inter.variable, manrope.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* Skip to main content for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-primary focus:rounded-md focus:shadow-md"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <MotionProvider>
            <LeadProvider>
              <MobileMenuProvider>
                <TopBar />
                <SiteNavbar />
                <CommandPalette />
                <NavigationProgress />

                <main id="main" className="flex-1 flex flex-col w-full pt-24 md:pt-28 pb-20 md:pb-0">
                  {children}
                </main>

                <MobileBottomNav />
                <SiteFooter />
              </MobileMenuProvider>
            </LeadProvider>
          </MotionProvider>
        </ThemeProvider>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
