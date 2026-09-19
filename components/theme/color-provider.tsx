"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { COLOR_THEMES, ColorTheme } from "@/lib/colors";

interface ThemeColorContextType {
  theme: ColorTheme;
  setTheme: (id: string) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ 
  children, 
  initialThemeId, 
  initialMode 
}: { 
  children: React.ReactNode;
  initialThemeId: string;
  initialMode: "light" | "dark";
}) {
  const [theme, setThemeState] = useState<ColorTheme>(() => 
    COLOR_THEMES.find(t => t.id === initialThemeId) || COLOR_THEMES[0]
  );
  const [mode, setModeState] = useState<"light" | "dark">(initialMode);

  const setTheme = (id: string) => {
    const found = COLOR_THEMES.find((t) => t.id === id);
    if (found) {
      setThemeState(found);
      document.cookie = `simplediff-theme=${id}; path=/; max-age=31536000`;
      
      const root = document.documentElement;
      root.style.setProperty("--primary", found.primary);
      root.style.setProperty("--primary-foreground", found.primaryForeground);
      root.style.setProperty("--ring", found.ring);
    }
  };

  const setMode = (newMode: "light" | "dark") => {
    setModeState(newMode);
    document.cookie = `simplediff-mode=${newMode}; path=/; max-age=31536000`;
    
    const root = document.documentElement;
    if (newMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <ThemeColorContext.Provider value={{ theme, setTheme, mode, setMode }}>
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
