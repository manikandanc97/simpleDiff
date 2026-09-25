import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { LeadProvider } from "@/components/leads/lead-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { CommandPalette } from "@/components/ui/command-palette";
import { NavigationProgress } from "@/components/ui/navigation-progress";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";


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
    default: "SimpleThink — Keep It Simple. Make It Luxury.",
    template: "%s · SimpleThink",
  },
  description:
    "SimpleThink is a premium digital studio that engineers custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
  openGraph: {
    title: "SimpleThink — Keep It Simple. Make It Luxury.",
    description:
      "Premium digital studio engineering custom software, scalable web applications, mobile apps, SaaS platforms, and enterprise solutions.",
    url: SITE.url,
    siteName: "SimpleThink",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleThink — Keep It Simple. Make It Luxury.",
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
      <head>
        <link rel="preload" href="/fonts/satoshi-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap"
          rel="stylesheet"
        />
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
          <LeadProvider>
            <MobileMenuProvider>
              <SiteNavbar />
              <CommandPalette />
              <NavigationProgress />

              <main id="main" className="flex-1 flex flex-col w-full pb-20 md:pb-0">
                {children}
              </main>

              <MobileBottomNav />
              <SiteFooter />
            </MobileMenuProvider>
          </LeadProvider>
        </MotionProvider>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
