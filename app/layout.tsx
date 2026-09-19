import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeColorProvider } from "@/components/theme/color-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatusBar } from "@/components/layout/status-bar";
import { CommandPalette } from "@/components/ui/command-palette";
import { cookies } from "next/headers";
import { COLOR_THEMES } from "@/lib/colors";
import { MotionProvider } from "@/components/providers/motion-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimpleDiff - Keep It Simple. Make It Different.",
  description: "A modern digital development studio.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const themeId = cookieStore.get("simplediff-theme")?.value || "violet";
  const mode = cookieStore.get("simplediff-mode")?.value || "dark";
  
  const foundTheme = COLOR_THEMES.find((t) => t.id === themeId) || COLOR_THEMES[0];

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geistSans.variable, geistMono.variable, "font-sans", mode)}
      style={{
        "--primary": foundTheme.primary,
        "--primary-foreground": foundTheme.primaryForeground,
        "--ring": foundTheme.ring,
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <MotionProvider>
          <ThemeColorProvider initialThemeId={foundTheme.id} initialMode={mode as "light" | "dark"}>
            <Sidebar />
            <Topbar />
            <CommandPalette />
            
            <div className="flex-1 md:pl-16 pt-14 pb-16 sm:pb-10">
              {children}
            </div>
            
            <StatusBar />
          </ThemeColorProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
