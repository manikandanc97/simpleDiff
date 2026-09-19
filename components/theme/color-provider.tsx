"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { COLOR_THEMES, type ColorTheme } from "@/lib/colors";

interface ThemeColorContextType {
  theme: ColorTheme;
  setTheme: (id: string) => void;
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
    return localStorage.getItem("simplediff-theme") || "violet";
  } catch {
    return "violet";
  }
}

function getModeSnapshot(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("simplediff-mode");
    if (stored === "light" || stored === "dark") return stored;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  } catch {
    return "dark";
  }
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSyncExternalStore(subscribe, getThemeSnapshot, () => "violet");
  const mode = useSyncExternalStore<"light" | "dark">(subscribe, getModeSnapshot, () => "dark");

  const theme = COLOR_THEMES.find((t) => t.id === themeId) || COLOR_THEMES[0];

  const setTheme = (id: string) => {
    const found = COLOR_THEMES.find((t) => t.id === id);
    if (found) {
      try {
        localStorage.setItem("simplediff-theme", id);
      } catch {}

      const root = document.documentElement;
      root.style.setProperty("--primary", found.primary);
      root.style.setProperty("--primary-foreground", found.primaryForeground);
      root.style.setProperty("--ring", found.ring);
      const isDark = root.classList.contains("dark");
      root.style.setProperty("--primary-text", isDark ? found.textOnDark : found.textOnLight);

      for (const listener of listeners) {
        listener();
      }
    }
  };

  const setMode = (newMode: "light" | "dark") => {
    try {
      localStorage.setItem("simplediff-mode", newMode);
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
