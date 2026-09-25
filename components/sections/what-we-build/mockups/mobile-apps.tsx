"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MockupWrapper } from "./mockup-wrapper";

type Screen = "home" | "feed" | "profile" | "activity";
const SCREENS: Screen[] = ["home", "feed", "profile", "activity"];
const DURATIONS: Record<Screen, number> = { home: 2000, feed: 2000, profile: 2200, activity: 2200 };

// ── Bottom Tab Bar ─────────────────────────────────────────
const TABS = [
  { icon: "⊞", label: "Home" },
  { icon: "◎", label: "Explore" },
  { icon: "♡", label: "Saved" },
  { icon: "◷", label: "Activity" },
] as const;

function TabBar({ active }: { active: number }) {
  return (
    <div className="flex items-center justify-around border-t border-black/[0.05] pt-2 pb-0.5 bg-white">
      {TABS.map((tab, i) => (
        <motion.div
          key={i}
          animate={{ color: i === active ? "#922F55" : "#9ca3af" }}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-sm leading-none">{tab.icon}</span>
          <span className="text-[6px] font-semibold">{tab.label}</span>
          {i === active && (
            <motion.div layoutId="tab-dot" className="w-1 h-1 rounded-full bg-[#922F55]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── Home Screen ────────────────────────────────────────────
function HomeScreen() {
  return (
    <motion.div key="home" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden">
      {/* Top greeting */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[8px] text-[#68666C] font-medium">Good morning 👋</div>
          <div className="text-[11px] font-extrabold text-[#121114] tracking-tight">Hi, Arjun!</div>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#922F55] to-[#D23D78] flex items-center justify-center">
          <span className="text-[7px] text-white font-bold">AK</span>
        </div>
      </div>

      {/* Hero card */}
      <div className="w-full rounded-2xl p-3 flex flex-col gap-2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #922F55, #D23D78 60%, #6C2BB8)" }}>
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }} className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
        <span className="text-[7px] text-white/70 font-semibold">PREMIUM PLAN</span>
        <span className="text-[10px] text-white font-black leading-tight">Unlock all Pro Features</span>
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-0.5 bg-white rounded-full text-[7px] font-bold text-[#922F55]">Upgrade Now</div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Orders", value: "24", color: "#0891B2" },
          { label: "Points", value: "1.2k", color: "#7C3AED" },
          { label: "Saved", value: "₹480", color: "#059669" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }} className="bg-slate-50 border border-black/[0.04] rounded-xl p-2 flex flex-col gap-0.5 items-center">
            <span className="text-[11px] font-black" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[6px] text-[#68666C]">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Feed Screen ────────────────────────────────────────────
function FeedScreen() {
  const posts = [
    { user: "Priya K.", time: "2m ago", dot: "#D23D78", text: "Just launched the new app! 🚀" },
    { user: "Rahul S.", time: "5m ago", dot: "#0891B2", text: "Check out this feature update 💡" },
  ];
  return (
    <motion.div key="feed" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col gap-2 overflow-hidden">
      <div className="text-[10px] font-extrabold text-[#121114] tracking-tight">Feed</div>
      {posts.map((post, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="bg-slate-50 border border-black/[0.04] rounded-xl p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: post.dot }} />
            <div>
              <div className="text-[8px] font-bold text-[#121114]">{post.user}</div>
              <div className="text-[6px] text-[#68666C]">{post.time}</div>
            </div>
          </div>
          <div className="text-[8px] text-[#2D2B32] leading-snug">{post.text}</div>
          {/* Image placeholder */}
          <div className="w-full h-8 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200" />
          <div className="flex items-center gap-2">
            {["♡ 48", "◎ 12", "↑ Share"].map((a, j) => (
              <span key={j} className="text-[6px] text-[#68666C] font-medium">{a}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Profile Screen ─────────────────────────────────────────
function ProfileScreen() {
  return (
    <motion.div key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col gap-2.5 items-center overflow-hidden">
      {/* Avatar */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="w-12 h-12 rounded-full bg-gradient-to-br from-[#922F55] to-[#6C2BB8] flex items-center justify-center shadow-md">
        <span className="text-sm text-white font-black">AK</span>
      </motion.div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[11px] font-extrabold text-[#121114]">Arjun Kumar</span>
        <span className="text-[7px] text-[#68666C]">@arjun · Pro Member</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {[["142", "Posts"], ["2.1k", "Followers"], ["318", "Following"]].map(([v, l], i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.07 }} className="flex flex-col items-center gap-0.5">
            <span className="text-[11px] font-black text-[#121114]">{v}</span>
            <span className="text-[6px] text-[#68666C]">{l}</span>
          </motion.div>
        ))}
      </div>

      {/* Edit profile button */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full py-1.5 rounded-xl border border-[#922F55] flex items-center justify-center">
        <span className="text-[8px] font-bold text-[#922F55]">Edit Profile</span>
      </motion.div>

      {/* Mini grid */}
      <div className="grid grid-cols-3 gap-1 w-full">
        {[
          "from-[#922F55]/20 to-[#D23D78]/30",
          "from-[#0891B2]/20 to-[#0891B2]/30",
          "from-[#7C3AED]/20 to-[#7C3AED]/30",
        ].map((g, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.06 }} className={`aspect-square rounded-lg bg-gradient-to-br ${g}`} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Activity Screen ────────────────────────────────────────
function ActivityScreen() {
  const activities = [
    { icon: "♡", label: "Priya liked your post", time: "2m", color: "#D23D78" },
    { icon: "✦", label: "New follower: Rahul S.", time: "8m", color: "#7C3AED" },
    { icon: "◎", label: "Your post got 48 views", time: "1h", color: "#0891B2" },
  ];
  return (
    <motion.div key="activity" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col gap-2 overflow-hidden">
      <div className="text-[10px] font-extrabold text-[#121114]">Activity</div>
      {activities.map((a, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2 bg-slate-50 border border-black/[0.04] rounded-xl px-2.5 py-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]" style={{ backgroundColor: `${a.color}18`, color: a.color }}>{a.icon}</div>
          <span className="text-[8px] text-[#2D2B32] flex-1 leading-snug">{a.label}</span>
          <span className="text-[7px] text-[#68666C] flex-shrink-0">{a.time}</span>
        </motion.div>
      ))}

      {/* Progress bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="bg-slate-50 border border-black/[0.04] rounded-xl p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-semibold text-[#121114]">Profile completion</span>
          <span className="text-[7px] font-bold text-[#922F55]">82%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #922F55, #D23D78)" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Mockup ────────────────────────────────────────────
export function MobileAppsMockup({ isActive }: { isActive?: boolean }) {
  const [screen, setScreen] = useState<Screen>("home");

  useEffect(() => {
    if (!isActive) { setScreen("home"); return; }
    let idx = SCREENS.indexOf(screen);
    const timer = setTimeout(() => {
      idx = (idx + 1) % SCREENS.length;
      setScreen(SCREENS[idx]);
    }, DURATIONS[screen]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, isActive]);

  const tabIndex = SCREENS.indexOf(screen);

  return (
    <MockupWrapper
      isActive={isActive}
      gradientClass="bg-gradient-to-tr from-[#FCE7F3]/60 via-[#FDF2F8]/50 to-[#EDE9FE]/60"
      innerClassName="max-w-64 p-2 overflow-hidden"
    >
        {/* Status bar */}
        <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1 bg-white">
          <span className="text-[8px] font-bold text-[#121114]">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px] items-end h-2.5">
              {[3, 5, 7, 9].map((h, i) => <div key={i} className="w-[2px] rounded-full bg-[#121114]" style={{ height: h }} />)}
            </div>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#121114" strokeWidth="2"><path d="M1 6s4-4 11-4 11 4 11 4M5 10s2.5-2 7-2 7 2 7 2M9 14s1-1 3-1 3 1 3 1M11 18h2"/></svg>
            <div className="flex items-center gap-0.5">
              <div className="w-4 h-2 rounded-[2px] border border-[#121114]/50 p-[1px]">
                <div className="h-full w-4/5 rounded-[1px] bg-[#121114]/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content — fixed height so card never resizes */}
        <div className="px-3.5 py-2 relative overflow-hidden" style={{ height: 176 }}>
          <AnimatePresence mode="wait">
            {screen === "home"     && <HomeScreen />}
            {screen === "feed"     && <FeedScreen />}
            {screen === "profile"  && <ProfileScreen />}
            {screen === "activity" && <ActivityScreen />}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        <TabBar active={tabIndex} />
      </MockupWrapper>
  );
}


