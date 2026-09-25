"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MockupWrapper } from "./mockup-wrapper";

type Layout = "list" | "grid" | "card" | "split";

const LAYOUTS: Layout[] = ["list", "grid", "card", "split"];
const LAYOUT_DURATION: Record<Layout, number> = {
  list:  2000,
  grid:  2000,
  card:  2200,
  split: 2200,
};
const LAYOUT_META: Record<Layout, { icon: string; label: string; color: string }> = {
  list:  { icon: "☰", label: "List",  color: "#7C3AED" },
  grid:  { icon: "⊞", label: "Grid",  color: "#0891B2" },
  card:  { icon: "▭", label: "Card",  color: "#D23D78" },
  split: { icon: "⊟", label: "Split", color: "#059669" },
};

// ── Shared skeleton atoms ──────────────────────────────────
const Bar = ({ w, h = "h-1.5", color = "bg-slate-200" }: { w: string; h?: string; color?: string }) => (
  <div className={`${w} ${h} rounded-full ${color}`} />
);
const Avatar = ({ color }: { color: string }) => (
  <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
);

// ── List Layout ────────────────────────────────────────────
function ListLayout() {
  const rows = [
    { accent: "#7C3AED", w1: "w-20", w2: "w-14" },
    { accent: "#D23D78", w1: "w-16", w2: "w-12" },
    { accent: "#0891B2", w1: "w-24", w2: "w-10" },
  ];
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col gap-2 w-full"
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="flex items-center gap-2 bg-white/80 rounded-xl px-2.5 py-2 border border-black/[0.05] shadow-xs"
        >
          <Avatar color={row.accent} />
          <div className="flex-1 flex flex-col gap-1">
            <Bar w={row.w1} color="bg-slate-300" h="h-1.5" />
            <Bar w={row.w2} color="bg-slate-200" h="h-1" />
          </div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.accent }} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Grid Layout ────────────────────────────────────────────
function GridLayout() {
  const cells = [
    { bg: "from-[#7C3AED]/15 to-[#7C3AED]/30", accent: "#7C3AED" },
    { bg: "from-[#D23D78]/15 to-[#D23D78]/30", accent: "#D23D78" },
    { bg: "from-[#0891B2]/15 to-[#0891B2]/30", accent: "#0891B2" },
    { bg: "from-[#059669]/15 to-[#059669]/30", accent: "#059669" },
  ];
  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-2 gap-2 w-full"
    >
      {cells.map((cell, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 400, damping: 24 }}
          className={`rounded-xl bg-gradient-to-br ${cell.bg} border border-white/60 p-2 flex flex-col gap-1.5 aspect-square`}
        >
          <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: `${cell.accent}40` }} />
          <Bar w="w-full" color="bg-white/60" />
          <Bar w="w-3/4" color="bg-white/40" />
          <div className="mt-auto self-start px-1.5 py-0.5 rounded-md text-[6px] font-bold text-white" style={{ backgroundColor: cell.accent }}>
            View
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Card Layout ────────────────────────────────────────────
function CardLayout() {
  return (
    <motion.div
      key="card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col gap-2 w-full"
    >
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="w-full rounded-2xl overflow-hidden border border-white/60 shadow-sm"
        style={{ background: "linear-gradient(135deg, #7C3AED, #D23D78)" }}
      >
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Bar w="w-20" color="bg-white/60" h="h-2" />
            <div className="w-5 h-5 rounded-full bg-white/20" />
          </div>
          <Bar w="w-full" color="bg-white/30" h="h-1.5" />
          <Bar w="w-3/4" color="bg-white/20" h="h-1.5" />
          <div className="flex gap-1.5">
            <div className="px-2 py-0.5 rounded-md bg-white text-[6px] font-bold text-[#7C3AED]">Primary</div>
            <div className="px-2 py-0.5 rounded-md bg-white/20 text-[6px] font-semibold text-white">Secondary</div>
          </div>
        </div>
        {/* Image area */}
        <div className="h-8 bg-black/10 flex items-center justify-center">
          <div className="flex gap-2 opacity-40">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-4 rounded bg-white/50" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Small cards row */}
      <div className="grid grid-cols-3 gap-1.5">
        {["#7C3AED", "#D23D78", "#0891B2"].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="rounded-xl bg-white border border-black/[0.04] p-2 flex flex-col gap-1 shadow-xs"
          >
            <div className="w-4 h-4 rounded-lg" style={{ backgroundColor: `${c}25` }}>
              <div className="w-2 h-2 rounded-sm m-1" style={{ backgroundColor: `${c}80` }} />
            </div>
            <Bar w="w-full" color="bg-slate-200" h="h-1" />
            <Bar w="w-2/3" color="bg-slate-100" h="h-1" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Split Layout ───────────────────────────────────────────
function SplitLayout() {
  const items = ["Dashboard", "Analytics", "Settings", "Users"];
  return (
    <motion.div
      key="split"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex gap-2 w-full h-full"
    >
      {/* Sidebar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-1 bg-[#1B1B2F] rounded-xl p-2 flex-shrink-0"
        style={{ width: 56 }}
      >
        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#D23D78]" />
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={`rounded-lg px-1.5 py-1 flex items-center gap-1 ${i === 0 ? "bg-[#7C3AED]" : "bg-white/5"}`}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 0 ? "white" : "rgba(255,255,255,0.3)" }} />
            <span className="text-[5px] font-medium" style={{ color: i === 0 ? "white" : "rgba(255,255,255,0.5)" }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Top stat row */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Active", val: "4.2k", color: "#7C3AED" },
            { label: "Revenue", val: "₹1.2L", color: "#059669" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-white rounded-xl p-2 border border-black/[0.04] shadow-xs"
            >
              <div className="text-[5px] text-[#68666C] font-medium">{s.label}</div>
              <div className="text-[10px] font-black" style={{ color: s.color }}>{s.val}</div>
            </motion.div>
          ))}
        </div>

        {/* Content area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex-1 bg-white rounded-xl border border-black/[0.04] shadow-xs p-2 flex flex-col gap-1.5"
        >
          <Bar w="w-16" color="bg-slate-300" h="h-1.5" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/40 flex-shrink-0" />
              <Bar w={["w-full", "w-4/5", "w-5/6"][i]} color="bg-slate-100" h="h-1.5" />
            </div>
          ))}
          {/* Mini chart */}
          <div className="flex items-end gap-0.5 h-8 mt-auto">
            {[30, 50, 40, 70, 90, 60, 80, 55, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                className="flex-1 rounded-t"
                style={{ background: i === 4 ? "linear-gradient(#7C3AED, #D23D78)" : "#ede9fe" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main UIUXMockup ────────────────────────────────────────
export function UIUXMockup({ isActive }: { isActive?: boolean }) {
  const [layout, setLayout] = useState<Layout>("list");

  useEffect(() => {
    if (!isActive) { setLayout("list"); return; }
    let idx = LAYOUTS.indexOf(layout);
    const timer = setTimeout(() => {
      idx = (idx + 1) % LAYOUTS.length;
      setLayout(LAYOUTS[idx]);
    }, LAYOUT_DURATION[layout]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, isActive]);

  const meta = LAYOUT_META[layout];

  return (
    <MockupWrapper
      isActive={isActive}
      gradientClass="bg-gradient-to-tr from-[#EDE9FE]/60 via-[#F5F3FF]/50 to-[#FDF2F8]/60"
      innerClassName="max-w-72 p-3.5 gap-3"
      floatDuration={4.5}
    >
        {/* Toolbar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.05]">
          <div className="flex gap-1.5">
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Layout switcher pills */}
          <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
            {LAYOUTS.map((l) => (
              <motion.div
                key={l}
                animate={{
                  backgroundColor: l === layout ? meta.color : "transparent",
                  color: l === layout ? "white" : "#68666C",
                }}
                transition={{ duration: 0.25 }}
                className="w-6 h-5 rounded-md flex items-center justify-center text-[9px] font-bold cursor-pointer"
              >
                {LAYOUT_META[l].icon}
              </motion.div>
            ))}
          </div>

          {/* Current layout label */}
          <motion.div
            key={layout}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-1.5 py-0.5 rounded-md text-[7px] font-bold text-white"
            style={{ backgroundColor: meta.color }}
          >
            {meta.label}
          </motion.div>
        </div>

        {/* Canvas — layout transitions here */}
        <div className="relative overflow-hidden" style={{ minHeight: 120 }}>
          <AnimatePresence mode="wait">
            {layout === "list"  && <ListLayout  key="list"  />}
            {layout === "grid"  && <GridLayout  key="grid"  />}
            {layout === "card"  && <CardLayout  key="card"  />}
            {layout === "split" && <SplitLayout key="split" />}
          </AnimatePresence>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between pt-1 border-t border-black/[0.04]">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ backgroundColor: [meta.color, `${meta.color}aa`, meta.color] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-[7px] text-[#68666C] font-medium">Layout preview</span>
          </div>
          <div className="flex gap-1">
            {LAYOUTS.map((l, i) => (
              <motion.div
                key={i}
                animate={{
                  width: l === layout ? 14 : 5,
                  backgroundColor: l === layout ? meta.color : "#e2e8f0",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="h-1 rounded-full"
              />
            ))}
          </div>
        </div>
    </MockupWrapper>
  );
}


