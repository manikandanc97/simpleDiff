"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { mode, setMode } = useThemeColor();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      title="Toggle Theme"
      className="rounded-full"
    >
      {mode === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
