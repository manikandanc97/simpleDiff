"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { COLOR_THEMES, createCustomColorTheme, type ColorTheme } from "@/lib/colors";

interface ThemeColorContextType {
  theme: ColorTheme;
  setTheme: (id: string) => void;
  setCustomColor: (hex: string) => void;
  customColor: string;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): string {
  try {
    return localStorage.getItem("SimpleThink-theme") || "blue";
  } catch {
    return "blue";
  }
}

function getCustomColorSnapshot(): string {
  try {
    return (localStorage.getItem("SimpleThink-custom-color") || "#2563eb").toLowerCase();
  } catch {
    return "#2563eb";
  }
}

function getModeSnapshot(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("SimpleThink-mode");
    if (stored === "light" || stored === "dark") return stored;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  } catch {
    return "dark";
  }
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSyncExternalStore(subscribe, getThemeSnapshot, () => "blue");
  const customColor = useSyncExternalStore(subscribe, getCustomColorSnapshot, () => "#2563eb");
  const mode = useSyncExternalStore<"light" | "dark">(subscribe, getModeSnapshot, () => "dark");

  const theme: ColorTheme =
    themeId === "custom"
      ? createCustomColorTheme(customColor)
      : COLOR_THEMES.find((t) => t.id === themeId) || COLOR_THEMES[0];

  const applyThemeToDOM = (t: ColorTheme) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--primary-foreground", t.primaryForeground);
    root.style.setProperty("--ring", t.ring);
    const isDark = root.classList.contains("dark");
    root.style.setProperty("--primary-text", isDark ? t.textOnDark : t.textOnLight);
  };

  // Keep DOM styles synchronized on mount and whenever theme changes
  React.useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = (id: string) => {
    const found = COLOR_THEMES.find((t) => t.id === id);
    if (found) {
      try {
        localStorage.setItem("SimpleThink-theme", id);
      } catch {}

      applyThemeToDOM(found);

      for (const listener of listeners) {
        listener();
      }
    }
  };

  const setCustomColor = (hex: string) => {
    try {
      localStorage.setItem("SimpleThink-theme", "custom");
      localStorage.setItem("SimpleThink-custom-color", hex);
    } catch {}

    const customTheme = createCustomColorTheme(hex);
    applyThemeToDOM(customTheme);

    for (const listener of listeners) {
      listener();
    }
  };

  const setMode = (newMode: "light" | "dark") => {
    try {
      localStorage.setItem("SimpleThink-mode", newMode);
    } catch {}

    const root = document.documentElement;
    if (newMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.setProperty(
      "--primary-text",
      newMode === "dark" ? theme.textOnDark : theme.textOnLight
    );

    for (const listener of listeners) {
      listener();
    }
  };

  return (
    <ThemeColorContext.Provider
      value={{ theme, setTheme, setCustomColor, customColor, mode, setMode }}
    >
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
