"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { applyFontToDOM, DEFAULT_FONT_NAME, loadGoogleFontToDOM } from "@/lib/fonts";

interface FontContextType {
  font: string;
  setFont: (fontName: string) => void;
  resetFont: () => void;
  isDefault: boolean;
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

function getFontSnapshot(): string {
  try {
    return localStorage.getItem("simplediff-font") || DEFAULT_FONT_NAME;
  } catch {
    return DEFAULT_FONT_NAME;
  }
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const font = useSyncExternalStore(subscribe, getFontSnapshot, () => DEFAULT_FONT_NAME);

  useEffect(() => {
    applyFontToDOM(font);
  }, [font]);

  const setFont = (fontName: string) => {
    const trimmed = fontName.trim();
    try {
      if (!trimmed || trimmed === DEFAULT_FONT_NAME || trimmed.toLowerCase() === "default") {
        localStorage.removeItem("simplediff-font");
      } else {
        localStorage.setItem("simplediff-font", trimmed);
      }
    } catch {}

    loadGoogleFontToDOM(trimmed);
    applyFontToDOM(trimmed);

    for (const listener of listeners) {
      listener();
    }
  };

  const resetFont = () => {
    setFont(DEFAULT_FONT_NAME);
  };

  return (
    <FontContext.Provider
      value={{
        font,
        setFont,
        resetFont,
        isDefault: !font || font === DEFAULT_FONT_NAME || font.toLowerCase() === "default",
      }}
    >
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
