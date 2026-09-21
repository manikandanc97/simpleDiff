"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  GOOGLE_FONTS,
  type GoogleFontCategory,
  preloadFontPreviewBatch,
  loadGoogleFontToDOM,
} from "@/lib/fonts";
import { useFont } from "@/components/theme/font-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Type,
  Search,
  Check,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import {
  AnimatedType,
  AnimatedRotateCcw,
  AnimatedX,
  AnimatedCheck,
  AnimatedSparkles,
} from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: GoogleFontCategory; label: string }[] = [
  { id: "all", label: "All Fonts" },
  { id: "sans-serif", label: "Sans Serif" },
  { id: "serif", label: "Serif" },
  { id: "display", label: "Display" },
  { id: "monospace", label: "Monospace" },
  { id: "handwriting", label: "Handwriting" },
];

const PRESET_PREVIEWS = [
  { label: "Company Name", text: "SimpleThink — Keep It Simple. Think It Different." },
  { label: "Sentence", text: "The quick brown fox jumps over the lazy dog." },
  { label: "Alphabet & Numbers", text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789" },
];

export function FontPicker({ onSelect }: { onSelect?: () => void }) {
  const { font: currentFont, setFont, resetFont, isDefault } = useFont();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<GoogleFontCategory>("all");
  const [previewText, setPreviewText] = useState(PRESET_PREVIEWS[0].text);

  // Preload preview batches when FontPicker mounts
  useEffect(() => {
    preloadFontPreviewBatch(GOOGLE_FONTS);
  }, []);

  const filteredFonts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GOOGLE_FONTS.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const handleSelectFont = (fontName: string) => {
    setFont(fontName);
    if (onSelect) onSelect();
  };

  const handleApplyCustomFont = (customName: string) => {
    if (!customName.trim()) return;
    loadGoogleFontToDOM(customName.trim());
    setFont(customName.trim());
    if (onSelect) onSelect();
  };

  return (
    <div className="flex flex-col gap-4 text-foreground">
      {/* Top Banner: Current active font and Reset button */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/70 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shrink-0 shadow-xs">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Font
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-xs">
                {currentFont}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {isDefault
                ? "Default system typography (Geist Sans)"
                : `Active Google Font applied site-wide`}
            </p>
          </div>
        </div>

        {!isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFont}
            className="group/button rounded-full text-xs h-8 gap-1.5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors cursor-pointer flex items-center"
          >
            <AnimatedRotateCcw size={13} />
            <span>Reset to Default</span>
          </Button>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search 65+ Google fonts (e.g., Poppins, Playfair, Fira Code, Outfit)..."
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted/30 hover:bg-muted/50 focus:bg-background border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
            }}
            className="group absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <AnimatedX size={14} />
          </button>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer border",
                isActive
                  ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                  : "bg-muted/40 text-muted-foreground border-border/70 hover:text-foreground hover:bg-muted/80"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Live Preview Sample Text Switcher */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground px-0.5">
          <span className="flex items-center gap-1 font-medium">
            <SlidersHorizontal className="w-3 h-3" /> Preview Text
          </span>
          <div className="flex items-center gap-1.5">
            {PRESET_PREVIEWS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPreviewText(p.text)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer",
                  previewText === p.text
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type custom preview text here..."
          className="w-full h-8 px-3 rounded-lg bg-muted/20 border border-border/60 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/50"
        />
      </div>

      {/* Custom Font Quick Load Option (When user typed a name) */}
      {search.trim().length > 1 &&
        !GOOGLE_FONTS.some(
          (f) => f.name.toLowerCase() === search.trim().toLowerCase()
        ) && (
          <div className="p-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Load custom Google Font: &quot;{search.trim()}&quot;
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Fetch and apply any font directly from Google Fonts CDN
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => handleApplyCustomFont(search.trim())}
              className="group/button h-7.5 px-3 text-xs rounded-full cursor-pointer flex items-center gap-1.5"
            >
              <AnimatedCheck size={13} />
              <span>Apply Font</span>
            </Button>
          </div>
        )}

      {/* Font Cards Grid List */}
      <div className="relative">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2 px-1">
          <span>
            Showing {filteredFonts.length}{" "}
            {filteredFonts.length === 1 ? "font" : "fonts"}
          </span>
          <span className="text-[10px] opacity-70">
            Font sizes & spacing remain locked
          </span>
        </div>

        <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-2.5 rounded-lg">
          {/* Default Font Option Card (Geist) */}
          {(!search || "geist default system".includes(search.toLowerCase())) &&
            category === "all" && (
              <div
                onClick={resetFont}
                className={cn(
                  "group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col gap-1.5",
                  isDefault
                    ? "bg-primary/10 border-primary/60 shadow-sm"
                    : "bg-muted/20 border-border/70 hover:border-foreground/30 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-tight text-foreground">
                      Geist Sans (Default)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border/70">
                      System Original
                    </span>
                  </div>
                  {isDefault && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  Original SimpleThink high-contrast modern geometric sans-serif
                </p>
                <p className="text-sm text-foreground/90 font-sans mt-0.5 truncate">
                  {previewText}
                </p>
              </div>
            )}

          {/* Google Fonts List */}
          {filteredFonts.map((item) => {
            const isSelected =
              currentFont.toLowerCase() === item.name.toLowerCase();

            return (
              <div
                key={item.name}
                onClick={() => handleSelectFont(item.name)}
                className={cn(
                  "group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col gap-1.5",
                  isSelected
                    ? "bg-primary/10 border-primary/60 shadow-sm ring-1 ring-primary/40"
                    : "bg-muted/20 border-border/70 hover:border-foreground/30 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold tracking-tight text-foreground"
                      style={{ fontFamily: `"${item.name}", sans-serif` }}
                    >
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted/60 text-muted-foreground border border-border/60 uppercase tracking-wider">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Popular
                      </span>
                    )}
                  </div>

                  {isSelected ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1 font-medium">
                      Apply &rarr;
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-1">
                  {item.description}
                </p>

                {/* Font Preview Line in its actual Google Font */}
                <p
                  className="text-sm text-foreground font-normal mt-0.5 truncate"
                  style={{ fontFamily: `"${item.name}", sans-serif` }}
                >
                  {previewText}
                </p>
              </div>
            );
          })}

          {filteredFonts.length === 0 && (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-border/80">
              <p className="text-sm font-semibold text-foreground">
                No matching fonts found for &quot;{search}&quot;
              </p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                You can apply &quot;{search}&quot; directly from Google Fonts
                CDN using the button above.
              </p>
              {search.trim() && (
                <Button
                  size="sm"
                  onClick={() => handleApplyCustomFont(search.trim())}
                  className="group/button rounded-full text-xs h-8 flex items-center gap-1.5"
                >
                  <AnimatedSparkles size={13} />
                  <span>Load & Apply &quot;{search.trim()}&quot;</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FontPickerDialogProps {
  trigger?: React.ReactNode;
}

export function FontPickerDialog({ trigger }: FontPickerDialogProps) {
  const [open, setOpen] = useState(false);
  const { font } = useFont();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              className="group rounded-full text-muted-foreground hover:text-foreground cursor-pointer relative active:scale-90 transition-all"
              title={`Change font (current: ${font})`}
            >
              <AnimatedType size={16} />
              <span className="sr-only">Change font</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-hidden flex flex-col p-6">
        <DialogHeader className="pb-2 border-b border-border/70">
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <AnimatedType size={18} className="text-primary" />
              Typography & Fonts
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Explore 65+ curated Google Fonts. Only font families update; your
            font sizes, layout, and contrast remain perfectly preserved.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pt-4 pr-1">
          <FontPicker onSelect={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
