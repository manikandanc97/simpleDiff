"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useThemeColor } from "@/components/theme/color-provider";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { mode, setMode } = useThemeColor();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    let gPressed = false;
    let timeout: NodeJS.Timeout;

    const handleShortcuts = (e: KeyboardEvent) => {
      if (open) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        gPressed = true;
        clearTimeout(timeout);
        timeout = setTimeout(() => { gPressed = false; }, 1000);
        return;
      }

      if (gPressed) {
        switch (e.key) {
          case "w": router.push("/work"); break;
          case "s": router.push("/services"); break;
          case "l": router.push("/lab"); break;
          case "a": router.push("/about"); break;
        }
        gPressed = false;
      }
    };

    document.addEventListener("keydown", handleShortcuts);
    return () => document.removeEventListener("keydown", handleShortcuts);
  }, [open, router]);

  const COMMANDS = [
    { label: "Go to Workbench (~/home)", action: () => router.push("/") },
    { label: "Go to Commits (~/work)", action: () => router.push("/work") },
    { label: "Go to Branches (~/lab)", action: () => router.push("/lab") },
    { label: "Go to Modules (~/services)", action: () => router.push("/services") },
    { label: "Go to README.md (~/about)", action: () => router.push("/about") },
    { label: "Toggle Theme Mode", action: () => setMode(mode === "light" ? "dark" : "light") },
  ];

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input 
            placeholder="Type a command or search..." 
            className="flex h-12 w-full border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 shadow-none focus-visible:border-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
          {filtered.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">No results found.</p>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.label}
                className="flex items-center px-4 py-2 text-sm rounded-sm hover:bg-muted/50 transition-colors text-left w-full focus:bg-muted/50 focus:outline-none"
                onClick={() => {
                  cmd.action();
                  setOpen(false);
                  setQuery("");
                }}
              >
                {cmd.label}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
