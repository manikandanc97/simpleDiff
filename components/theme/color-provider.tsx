"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { COLOR_THEMES, ColorTheme } from "@/lib/colors";

interface ThemeColorContextType {
  theme: ColorTheme;
  setTheme: (id: string) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("simplediff-theme");
    if (saved) {
      const found = COLOR_THEMES.find((t) => t.id === saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setThemeState(found);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-foreground", theme.primaryForeground);
    // Also use it for accent if needed
    root.style.setProperty("--accent", theme.primary);
    root.style.setProperty("--accent-foreground", theme.primaryForeground);
    root.style.setProperty("--ring", theme.ring);

    localStorage.setItem("simplediff-theme", theme.id);
  }, [theme, mounted]);

  const setTheme = (id: string) => {
    const found = COLOR_THEMES.find((t) => t.id === id);
    if (found) {
      setThemeState(found);
    }
  };

  return (
    <ThemeColorContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider");
  }
  return context;
}
