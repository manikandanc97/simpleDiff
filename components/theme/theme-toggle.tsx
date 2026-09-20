"use client";

import { AnimatedMoon, AnimatedSun } from "@/components/ui/animated-icon";
import { useThemeColor } from "@/components/theme/color-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { mode, setMode } = useThemeColor();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      title="Toggle Theme"
      className="group rounded-full cursor-pointer hover:bg-muted/80 active:scale-90 transition-all"
    >
      {mode === "light" ? (
        <AnimatedMoon size={16} className="text-foreground" />
      ) : (
        <AnimatedSun size={16} className="text-amber-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
