"use client";

import { useEffect, useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useLead } from "@/components/leads/lead-provider";

import { AnimatedIcon, type AnimatedIconName } from "@/components/ui/animated-icon";

const CMD_NAV_ICONS: Record<string, AnimatedIconName> = {
  "/": "home",
  "/work": "briefcase",
  "/services": "layers",
  "/lab": "lightbulb",
  "/about": "info",
};

interface CommandPaletteProps {
  onStartProject?: () => void;
}

export function CommandPalette({ onStartProject }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { mode, setMode } = useThemeColor();
  const { openLead } = useLead();
  const listboxId = useId();

  // Handle open/close and query reset
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  };

  // Keyboard shortcut: Cmd/Ctrl + K only
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const commands: { id: string; label: string; iconName: AnimatedIconName; action: () => void }[] = [
    ...NAV_ITEMS.map((item) => ({
      id: `nav-${item.route.replace("/", "") || "home"}`,
      label: item.commandName,
      iconName: CMD_NAV_ICONS[item.route] || "sparkles",
      action: () => router.push(item.route),
    })),
    {
      id: "cmd-start-project",
      label: "Start a project",
      iconName: "sparkles",
      action: () => {
        if (onStartProject) onStartProject();
        else openLead({ source: "topbar" });
      },
    },
    {
      id: "cmd-toggle-theme",
      label: "Toggle theme",
      iconName: mode === "light" ? "moon" : "sun",
      action: () => setMode(mode === "light" ? "dark" : "light"),
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd: (typeof commands)[number]) => {
    cmd.action();
    handleOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filtered[selectedIndex];
      if (current) {
        executeCommand(current);
      }
    }
  };

  const activeDescendantId = filtered[selectedIndex]?.id;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          <Input
            id="command-palette-input"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={activeDescendantId}
            placeholder="Type a command or search..."
            className="flex h-12 w-full border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 shadow-none focus-visible:border-0"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          id={listboxId}
          role="listbox"
          aria-label="Commands"
          className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1"
        >
          {filtered.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">No results found.</p>
          ) : (
            filtered.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  id={cmd.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => executeCommand(cmd)}
                  className={cn(
                    "group flex items-center px-4 py-2 text-sm rounded-sm transition-colors text-left w-full cursor-pointer select-none gap-2.5",
                    isSelected ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <AnimatedIcon
                    name={cmd.iconName}
                    size={15}
                    className={cn(
                      "shrink-0 transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span>{cmd.label}</span>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
