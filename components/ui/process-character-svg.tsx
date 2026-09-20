'use client';

import React from 'react';

interface SVGProps {
  color: string;
  className?: string;
}

/** Darken a hex color by `amount` (0–255) */
function dk(hex: string, amount: number): string {
  const n = parseInt(hex.replace(/^#/, ''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) - amount));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) - amount));
  const b = Math.min(255, Math.max(0, (n & 0xff) - amount));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

/** Lighten a hex color by `amount` */
function lt(hex: string, amount: number): string {
  return dk(hex, -amount);
}

/* ─────────────────────────────────────────────────────────────────────────
   DISCOVERY — Two people at a planning whiteboard
───────────────────────────────────────────────────────────────────────── */
function DiscoverySVG({ color, className }: SVGProps) {
  const shade = dk(color, 45);
  const glow = lt(color, 40);
  const skin = '#F5C5A0';
  const skinD = '#D9A07A';
  const hair = '#1C1008';
  const hairM = '#2F1A0C';
  const pants = '#1A2740';
  const pantsL = '#253650';

  return (
    <svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#080D1A" />
          <stop offset="100%" stopColor="#101828" />
        </linearGradient>
        <linearGradient id="d-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <linearGradient id="d-wb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F2EC" />
          <stop offset="100%" stopColor="#E8E3DA" />
        </linearGradient>
        <filter id="d-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="d-floor" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#182035" />
          <stop offset="100%" stopColor="#0A0F1C" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="440" height="340" fill="url(#d-bg)" />

      {/* Floor */}
      <rect x="0" y="285" width="440" height="55" fill="url(#d-floor)" />
      <line x1="0" y1="285" x2="440" y2="285" stroke="#1E3048" strokeWidth="1.5" />

      {/* Back wall panels */}
      <rect x="0" y="0" width="440" height="285" fill="none" />
      <line x1="0" y1="0" x2="0" y2="285" stroke="#141E32" strokeWidth="1" />
      <rect x="370" y="30" width="60" height="180" rx="4" fill="#0D1525" stroke="#1A2845" strokeWidth="1" />

      {/* Window (back right) */}
      <rect x="330" y="25" width="90" height="160" rx="3" fill="#0A1830" stroke="#1A3060" strokeWidth="1.5" />
      {[20, 50, 80, 110, 140].map((i) => (
        <line key={i} x1="330" y1={25 + i} x2="420" y2={25 + i} stroke="#0F2040" strokeWidth="0.5" />
      ))}
      <rect x="375" y="25" width="1.5" height="160" fill="#1A3060" />
      {/* City lights in window */}
      {[340, 355, 370, 385, 395, 405].map((x, i) => (
        <rect key={x} x={x} y={90 + (i % 3) * 20} width="6" height={10 + (i % 2) * 8} rx="1"
          fill={`rgba(${i % 2 === 0 ? '255,200,80' : '180,220,255'},0.5)`} />
      ))}

      {/* ── WHITEBOARD ── */}
      <rect x="22" y="55" width="135" height="198" rx="5" fill="#8B7355" />
      <rect x="24" y="57" width="131" height="194" rx="4" fill="url(#d-wb)" />
      {/* Whiteboard stand */}
      <rect x="78" y="253" width="7" height="32" fill="#6B5535" />
      <rect x="52" y="282" width="58" height="7" rx="3" fill="#5A4428" />

      {/* Blueprint grid on whiteboard */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`v${i}`} x1={35 + i * 19} y1="68" x2={35 + i * 19} y2="240"
          stroke="#C8D8F0" strokeWidth="0.4" opacity="0.5" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={`h${i}`} x1="28" y1={72 + i * 21} x2="152" y2={72 + i * 21}
          stroke="#C8D8F0" strokeWidth="0.4" opacity="0.5" />
      ))}
      {/* Wireframe sketch: browser/app window */}
      <rect x="36" y="72" width="60" height="44" rx="2" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
      <line x1="36" y1="81" x2="96" y2="81" stroke="#3B82F6" strokeWidth="1.2" />
      <circle cx="42" cy="77" r="2.5" fill="#EF4444" />
      <circle cx="50" cy="77" r="2.5" fill="#F59E0B" />
      <circle cx="58" cy="77" r="2.5" fill="#22C55E" />
      {/* Wireframe box contents */}
      <rect x="40" y="86" width="20" height="20" rx="1" fill="#BFDBFE" opacity="0.6" />
      <rect x="64" y="86" width="25" height="8" rx="1" fill="#E2E8F0" opacity="0.5" />
      <rect x="64" y="97" width="18" height="5" rx="1" fill="#E2E8F0" opacity="0.4" />
      {/* Arrow pointing */}
      <path d="M100,93 L118,93" stroke="#64748B" strokeWidth="1.2" markerEnd="url(#arrow)" />
      {/* Second box */}
      <rect x="105" y="75" width="38" height="40" rx="2" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
      <rect x="109" y="80" width="30" height="14" rx="1" fill="#DDD6FE" opacity="0.5" />
      <rect x="109" y="97" width="20" height="4" rx="1" fill="#C4B5FD" opacity="0.5" />
      <rect x="109" y="104" width="26" height="4" rx="1" fill="#C4B5FD" opacity="0.4" />
      {/* Text lines */}
      <rect x="30" y="125" width="80" height="4" rx="2" fill="#64748B" opacity="0.7" />
      <rect x="30" y="133" width="60" height="4" rx="2" fill="#64748B" opacity="0.5" />
      <rect x="30" y="141" width="70" height="4" rx="2" fill="#64748B" opacity="0.5" />
      <rect x="30" y="149" width="45" height="4" rx="2" fill="#64748B" opacity="0.4" />
      {/* Flow arrows */}
      <path d="M38,165 L58,165 M54,160 L58,165 L54,170" fill="none" stroke="#3B82F6" strokeWidth="1.2" />
      <rect x="62" y="158" width="35" height="16" rx="2" fill="none" stroke="#3B82F6" strokeWidth="1.2" />
      <rect x="66" y="163" width="26" height="4" rx="1" fill="#93C5FD" opacity="0.5" />
      {/* Marker on whiteboard tray */}
      <rect x="32" y="243" width="18" height="5" rx="2" fill="#EF4444" />
      <rect x="54" y="243" width="18" height="5" rx="2" fill="#3B82F6" />

      {/* ── WOMAN CHARACTER ── */}
      {/* Neck */}
      <rect x="198" y="172" width="16" height="18" rx="5" fill={skinD} />
      {/* Shirt body */}
      <rect x="176" y="186" width="56" height="72" rx="12" fill="url(#d-shirt)" />
      {/* Shirt collar V-shape */}
      <path d="M192,186 L206,202 L220,186" fill={shade} stroke={shade} strokeWidth="1" strokeLinejoin="round" />
      {/* Left arm (pointing at board) */}
      <rect x="152" y="190" width="28" height="13" rx="6" fill={color} transform="rotate(-20,166,197)" />
      <ellipse cx="142" cy="188" rx="9" ry="7" fill={skin} />
      {/* Right arm */}
      <rect x="228" y="192" width="13" height="48" rx="6" fill={shade} />
      <ellipse cx="235" cy="243" rx="8" ry="6" fill={skin} />
      {/* Pants */}
      <rect x="180" y="253" width="20" height="76" rx="6" fill={pants} />
      <rect x="204" y="253" width="20" height="76" rx="6" fill={pantsL} />
      {/* Shoes */}
      <ellipse cx="190" cy="329" rx="14" ry="5.5" fill="#0F1728" />
      <ellipse cx="214" cy="329" rx="14" ry="5.5" fill="#0F1728" />
      {/* Head */}
      <circle cx="206" cy="146" r="29" fill={skin} />
      {/* Ear */}
      <ellipse cx="177" cy="148" rx="5" ry="7" fill={skinD} />
      <ellipse cx="235" cy="148" rx="5" ry="7" fill={skinD} />
      {/* Hair (bun style) */}
      <path d="M178,138 Q183,112 206,114 Q229,112 234,138 L234,148 Q206,143 178,148 Z" fill={hair} />
      <ellipse cx="206" cy="110" rx="15" ry="12" fill={hairM} />
      {/* Face */}
      <ellipse cx="197" cy="148" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="215" cy="148" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Eyelashes */}
      <line x1="193" y1="144" x2="191" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="197" y1="143" x2="197" y2="140" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="201" y1="144" x2="203" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="211" y1="144" x2="209" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="215" y1="143" x2="215" y2="140" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="219" y1="144" x2="221" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      {/* Smile */}
      <path d="M198,161 Q206,169 214,161" fill="none" stroke="#B87060" strokeWidth="1.8" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="188" cy="157" rx="7" ry="4" fill="#FFB0A0" opacity="0.35" />
      <ellipse cx="224" cy="157" rx="7" ry="4" fill="#FFB0A0" opacity="0.35" />

      {/* ── MAN CHARACTER ── */}
      {/* Neck */}
      <rect x="295" y="162" width="18" height="22" rx="5" fill={skinD} />
      {/* Shirt */}
      <rect x="272" y="178" width="62" height="80" rx="12" fill="url(#d-shirt)" />
      <path d="M290,178 L303,195 L316,178" fill={shade} stroke={shade} strokeWidth="1" strokeLinejoin="round" />
      {/* Left arm (down, holding something) */}
      <rect x="257" y="186" width="16" height="54" rx="7" fill={shade} />
      <ellipse cx="265" cy="243" rx="9" ry="7" fill={skin} />
      {/* Right arm (raised, pointing) */}
      <rect x="330" y="183" width="16" height="38" rx="7" fill={shade} transform="rotate(-28,338,202)" />
      <ellipse cx="349" cy="170" rx="9" ry="7" fill={skin} transform="rotate(-10,349,170)" />
      {/* Pants */}
      <rect x="278" y="253" width="22" height="76" rx="6" fill={pants} />
      <rect x="304" y="253" width="22" height="76" rx="6" fill={pantsL} />
      <ellipse cx="289" cy="329" rx="15" ry="5.5" fill="#0F1728" />
      <ellipse cx="315" cy="329" rx="15" ry="5.5" fill="#0F1728" />
      {/* Head */}
      <circle cx="304" cy="136" r="30" fill={skin} />
      <ellipse cx="274" cy="138" rx="5" ry="7" fill={skinD} />
      <ellipse cx="334" cy="138" rx="5" ry="7" fill={skinD} />
      {/* Hair */}
      <path d="M274,128 Q283,102 304,106 Q325,102 334,128 L334,140 Q304,134 274,140 Z" fill={hair} />
      {/* Eyes */}
      <ellipse cx="295" cy="138" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="313" cy="138" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Eyebrows */}
      <path d="M290,132 Q295,129 300,132" fill="none" stroke={hair} strokeWidth="2" strokeLinecap="round" />
      <path d="M308,132 Q313,129 318,132" fill="none" stroke={hair} strokeWidth="2" strokeLinecap="round" />
      {/* Smile */}
      <path d="M296,151 Q304,159 312,151" fill="none" stroke="#B87060" strokeWidth="1.8" strokeLinecap="round" />
      {/* Light beard shadow */}
      <path d="M282,148 Q304,165 326,148 Q326,158 304,162 Q282,158 282,148 Z" fill="#C8956A" opacity="0.25" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DESIGN — Designer at workstation with dual screens
───────────────────────────────────────────────────────────────────────── */
function DesignSVG({ color, className }: SVGProps) {
  const shade = dk(color, 45);
  const glow = lt(color, 40);
  const skin = '#F5C5A0';
  const skinD = '#D9A07A';
  const hair = '#1C1008';
  const pants = '#1A2740';
  const pantsL = '#253650';

  return (
    <svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ds-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#080D1A" />
          <stop offset="100%" stopColor="#0F1624" />
        </linearGradient>
        <linearGradient id="ds-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <linearGradient id="ds-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1530" />
          <stop offset="100%" stopColor="#060C1E" />
        </linearGradient>
        <linearGradient id="ds-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1F14" />
          <stop offset="100%" stopColor="#1A1008" />
        </linearGradient>
        <radialGradient id="ds-screenglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="440" height="340" fill="url(#ds-bg)" />

      {/* Screen glow on background */}
      <ellipse cx="220" cy="160" rx="200" ry="120" fill="url(#ds-screenglow)" />

      {/* Floor */}
      <rect x="0" y="290" width="440" height="50" fill="#080D18" />
      <line x1="0" y1="290" x2="440" y2="290" stroke="#1A2845" strokeWidth="1" />

      {/* Back wall - subtle texture */}
      <rect x="0" y="0" width="440" height="290" fill="none" />
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={88*i} y1="0" x2={88*i} y2="290" stroke="#0D1525" strokeWidth="0.5" opacity="0.6" />
      ))}

      {/* ── MAIN MONITOR ── */}
      {/* Monitor stand */}
      <rect x="188" y="230" width="14" height="28" rx="2" fill="#1A2035" />
      <rect x="168" y="255" width="54" height="6" rx="3" fill="#141C2E" />
      {/* Monitor frame */}
      <rect x="60" y="52" width="280" height="185" rx="8" fill="#141C30" stroke="#1E2D4A" strokeWidth="2" />
      {/* Monitor screen */}
      <rect x="66" y="58" width="268" height="173" rx="5" fill="url(#ds-screen)" />

      {/* ── DESIGN TOOL UI ON SCREEN ── */}
      {/* Figma-like left sidebar */}
      <rect x="66" y="58" width="42" height="173" rx="5" fill="#0A1020" />
      {/* Sidebar icons */}
      {[70, 90, 110, 130, 150, 175, 200].map((y, i) => (
        <rect key={i} x="73" y={y} width="28" height="14" rx="3"
          fill={i === 0 ? color : '#1E2D4A'} opacity={i === 0 ? 0.9 : 0.6} />
      ))}
      {/* Layers panel */}
      <rect x="108" y="58" width="58" height="173" rx="0" fill="#0D1528" />
      <rect x="112" y="64" width="50" height="8" rx="2" fill="#1E3050" />
      {[76, 88, 100, 112, 124, 136, 148, 160, 172, 184, 196, 208].map((y, i) => (
        <rect key={i} x={112 + (i % 3) * 6} y={y} width={44 - (i % 3) * 6} height="8" rx="2"
          fill={i % 4 === 0 ? color : '#1A2840'} opacity={0.5 + (i % 3) * 0.15} />
      ))}
      {/* Canvas area */}
      <rect x="166" y="62" width="164" height="165" rx="2" fill="#0C1422" />
      {/* Canvas content — UI mockup */}
      {/* Phone frame */}
      <rect x="195" y="72" width="60" height="105" rx="8" fill="#1A2540" stroke="#2A3D60" strokeWidth="1.5" />
      <rect x="199" y="78" width="52" height="88" rx="4" fill="#0A1020" />
      {/* Phone status bar */}
      <rect x="199" y="78" width="52" height="10" rx="4" fill="#111928" />
      {/* Phone app UI */}
      <rect x="202" y="91" width="46" height="16" rx="3" fill={color} opacity="0.85" />
      <rect x="202" y="111" width="30" height="6" rx="2" fill="#2A3D60" />
      <rect x="202" y="121" width="46" height="6" rx="2" fill="#1E2D45" />
      <rect x="202" y="131" width="38" height="6" rx="2" fill="#1E2D45" />
      <rect x="202" y="145" width="22" height="12" rx="6" fill={color} opacity="0.7" />
      {/* Home indicator */}
      <rect x="218" y="174" width="18" height="3" rx="1.5" fill="#2A3D60" />
      {/* Design elements around phone */}
      <rect x="265" y="80" width="58" height="40" rx="4" fill="#111928" stroke="#1E2D45" strokeWidth="1" />
      <rect x="270" y="85" width="48" height="28" rx="2" fill={color} opacity="0.2" />
      {/* Color swatches */}
      {[color, shade, '#6366F1', '#EC4899', '#F59E0B'].map((c, i) => (
        <circle key={i} cx={270 + i * 11} cy={130} r="4.5" fill={c} />
      ))}
      {/* Typography samples */}
      <rect x="265" y="140" width="58" height="5" rx="2" fill="#2A3D60" />
      <rect x="265" y="149" width="40" height="4" rx="2" fill="#1E2D45" />
      <rect x="265" y="157" width="50" height="4" rx="2" fill="#1E2D45" />
      {/* Grid/align tools */}
      {[4, 14, 24].map((i) => (
        <line key={i} x1={168 + i * 4} y1="215" x2={168 + i * 4} y2="225" stroke="#1E3050" strokeWidth="1" />
      ))}

      {/* ── DESK ── */}
      <rect x="0" y="258" width="440" height="32" rx="3" fill="url(#ds-desk)" />
      <rect x="0" y="258" width="440" height="4" rx="2" fill="#3A2A18" />

      {/* Keyboard */}
      <rect x="130" y="264" width="130" height="18" rx="4" fill="#1A2035" stroke="#202C45" strokeWidth="1" />
      {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
        <rect key={i} x={135 + i * 11} y="268" width="8" height="5" rx="1.5" fill="#263048" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <rect key={i} x={138 + i * 11} y="277" width="8" height="4" rx="1.5" fill="#263048" />
      ))}
      {/* Mouse */}
      <rect x="270" y="264" width="22" height="28" rx="11" fill="#1A2035" stroke="#202C45" strokeWidth="1" />
      <line x1="281" y1="264" x2="281" y2="280" stroke="#263048" strokeWidth="1" />
      {/* Tablet */}
      <rect x="32" y="260" width="78" height="22" rx="4" fill="#111928" stroke="#1E2D45" strokeWidth="1" />
      <rect x="36" y="263" width="70" height="14" rx="2" fill="#0A1020" />
      {/* Tablet pen */}
      <rect x="115" y="263" width="4" height="20" rx="2" fill="#334155" transform="rotate(-15,117,273)" />

      {/* ── WOMAN DESIGNER CHARACTER ── (seated, left side of desk) */}
      {/* Chair back */}
      <rect x="64" y="188" width="30" height="80" rx="6" fill="#141C2E" stroke="#1E2D45" strokeWidth="1" />
      {/* Chair seat */}
      <rect x="55" y="256" width="48" height="16" rx="4" fill="#141C2E" stroke="#1E2D45" strokeWidth="1" />
      {/* Legs (sitting) */}
      <rect x="62" y="268" width="15" height="22" rx="5" fill={pants} />
      <rect x="82" y="268" width="15" height="22" rx="5" fill={pantsL} />
      <ellipse cx="70" cy="290" rx="12" ry="5" fill="#0C1220" />
      <ellipse cx="89" cy="290" rx="12" ry="5" fill="#0C1220" />
      {/* Torso */}
      <rect x="57" y="196" width="54" height="66" rx="12" fill="url(#ds-shirt)" />
      {/* Collar */}
      <path d="M74,196 L84,212 L94,196" fill={shade} strokeLinejoin="round" />
      {/* Left arm (toward keyboard) */}
      <rect x="107" y="226" width="45" height="13" rx="6" fill={shade} transform="rotate(15,130,232)" />
      <ellipse cx="148" cy="250" rx="9" ry="7" fill={skin} />
      {/* Right arm (on tablet) */}
      <rect x="20" y="230" width="42" height="13" rx="6" fill={shade} transform="rotate(-10,41,236)" />
      <ellipse cx="18" cy="240" rx="8" ry="7" fill={skin} />
      {/* Neck */}
      <rect x="74" y="180" width="16" height="20" rx="5" fill={skinD} />
      {/* Head */}
      <circle cx="82" cy="156" r="28" fill={skin} />
      <ellipse cx="54" cy="158" rx="5" ry="7" fill={skinD} />
      <ellipse cx="110" cy="158" rx="5" ry="7" fill={skinD} />
      {/* Hair — long with side part */}
      <path d="M55,147 Q62,118 82,120 Q102,118 109,147 L110,175 Q95,182 82,182 Q69,182 54,175 Z" fill={hair} />
      <path d="M55,147 Q60,135 82,133" fill="none" stroke="#2D1A0C" strokeWidth="2" />
      {/* Eyes */}
      <ellipse cx="74" cy="158" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="90" cy="158" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Lashes */}
      <line x1="70" y1="154" x2="68" y2="151" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="74" y1="153" x2="74" y2="150" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="78" y1="154" x2="80" y2="151" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="86" y1="154" x2="84" y2="151" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="90" y1="153" x2="90" y2="150" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="94" y1="154" x2="96" y2="151" stroke="#1A0F0A" strokeWidth="1" />
      {/* Smile */}
      <path d="M75,171 Q82,178 89,171" fill="none" stroke="#B87060" strokeWidth="1.8" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="63" cy="167" rx="7" ry="4" fill="#FFB0A0" opacity="0.35" />
      <ellipse cx="101" cy="167" rx="7" ry="4" fill="#FFB0A0" opacity="0.35" />
      {/* Screen glow on face */}
      <ellipse cx="82" cy="152" rx="22" ry="18" fill={color} opacity="0.08" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ENGINEER — Developer at dual monitors in dark room
───────────────────────────────────────────────────────────────────────── */
function EngineerSVG({ color, className }: SVGProps) {
  const shade = dk(color, 45);
  const glow = lt(color, 30);
  const skin = '#E8B896';
  const skinD = '#C8906A';
  const hair = '#1A0E06';
  const beard = '#2A1810';
  const pants = '#1A2740';
  const pantsL = '#253650';

  return (
    <svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="en-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#060A14" />
          <stop offset="100%" stopColor="#0C1020" />
        </linearGradient>
        <linearGradient id="en-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <linearGradient id="en-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070E1C" />
          <stop offset="100%" stopColor="#040810" />
        </linearGradient>
        <linearGradient id="en-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221508" />
          <stop offset="100%" stopColor="#160E04" />
        </linearGradient>
        <radialGradient id="en-monoglow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="en-cityglow" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="440" height="340" fill="url(#en-bg)" />

      {/* City night window (right side) */}
      <rect x="310" y="15" width="115" height="220" rx="4" fill="#060C18" stroke="#0F1A30" strokeWidth="1.5" />
      {/* City skyline silhouette */}
      <path d="M310,235 L310,160 L325,160 L325,140 L330,140 L330,130 L335,130 L335,145 
               L345,145 L345,120 L348,120 L348,115 L352,115 L352,120 L355,120 L355,110 
               L358,110 L358,100 L364,100 L364,90 L368,90 L368,100 L373,100 L373,85 
               L377,85 L377,75 L382,75 L382,85 L388,85 L388,80 L394,80 L394,95 
               L400,95 L400,85 L405,85 L405,235 Z"
        fill="#080D1A" />
      {/* City lights */}
      {[
        [320, 145, '#FFE680'], [338, 125, '#FFD040'], [356, 105, '#FFCC30'],
        [348, 160, '#80C0FF'], [366, 93, '#FFE080'], [380, 78, '#FFA040'],
        [395, 98, '#FFD070'], [363, 130, '#80DDFF'], [376, 150, '#FFEE90'],
        [392, 140, '#FFB050'], [410, 120, '#FFD080'],
      ].map(([x, y, c], i) => (
        <rect key={i} x={Number(x)} y={Number(y)} width="5" height={6 + (i % 3) * 4}
          rx="1" fill={String(c)} opacity={0.5 + (i % 3) * 0.2} />
      ))}
      <rect x="313" y="235" width="112" height="1" fill="#0F1A30" />
      {/* Window frame center divide */}
      <line x1="367" y1="15" x2="367" y2="235" stroke="#0F1A30" strokeWidth="1.5" />

      {/* Monitor glow on ceiling */}
      <ellipse cx="190" cy="0" rx="180" ry="80" fill="url(#en-monoglow)" />

      {/* ── DUAL MONITORS ── */}
      {/* Left monitor stand */}
      <rect x="82" y="222" width="11" height="28" rx="2" fill="#131C30" />
      <rect x="66" y="248" width="42" height="5" rx="2" fill="#0F1628" />
      {/* Left monitor frame */}
      <rect x="22" y="52" width="152" height="175" rx="7" fill="#0E1628" stroke="#182238" strokeWidth="2" />
      {/* Left monitor screen */}
      <rect x="27" y="57" width="142" height="165" rx="4" fill="url(#en-screen)" />
      {/* Left screen - code editor */}
      <rect x="27" y="57" width="28" height="165" rx="4" fill="#070C18" />
      {/* Line numbers */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
        <rect key={i} x="31" y={62 + i * 10} width="18" height="3" rx="1" fill="#1E2D45" opacity="0.6" />
      ))}
      {/* Code lines */}
      {[
        { x: 60, w: 85, c: '#569CD6' }, { x: 60, w: 60, c: '#4EC9B0' },
        { x: 60, w: 40, c: color }, { x: 60, w: 95, c: '#569CD6' },
        { x: 68, w: 70, c: '#9CDCFE' }, { x: 68, w: 50, c: '#4EC9B0' },
        { x: 68, w: 80, c: color }, { x: 60, w: 40, c: '#569CD6' },
        { x: 68, w: 65, c: '#CE9178' }, { x: 68, w: 45, c: '#9CDCFE' },
        { x: 60, w: 55, c: color }, { x: 68, w: 75, c: '#569CD6' },
        { x: 60, w: 90, c: '#4EC9B0' }, { x: 68, w: 30, c: '#CE9178' },
        { x: 60, w: 70, c: '#569CD6' },
      ].map((l, i) => (
        <rect key={i} x={l.x} y={62 + i * 10} width={l.w} height="4" rx="2" fill={l.c} opacity="0.85" />
      ))}
      {/* Cursor blink */}
      <rect x="155" y="142" width="3" height="9" rx="1" fill={color} opacity="0.9" />

      {/* Right monitor stand */}
      <rect x="257" y="222" width="11" height="28" rx="2" fill="#131C30" />
      <rect x="241" y="248" width="42" height="5" rx="2" fill="#0F1628" />
      {/* Right monitor frame */}
      <rect x="196" y="52" width="152" height="175" rx="7" fill="#0E1628" stroke="#182238" strokeWidth="2" />
      {/* Right monitor screen */}
      <rect x="201" y="57" width="142" height="165" rx="4" fill="url(#en-screen)" />
      {/* Terminal on right screen */}
      <rect x="201" y="57" width="142" height="18" rx="4" fill="#0A1220" />
      <circle cx="210" cy="66" r="3.5" fill="#EF4444" />
      <circle cx="221" cy="66" r="3.5" fill="#F59E0B" />
      <circle cx="232" cy="66" r="3.5" fill="#22C55E" />
      {/* Terminal text */}
      {[
        { c: '#22C55E', text: 75, prefix: 10 },
        { c: '#60A5FA', text: 85, prefix: 10 },
        { c: '#FBBF24', text: 65, prefix: 10 },
        { c: '#34D399', text: 92, prefix: 10 },
        { c: '#A78BFA', text: 45, prefix: 10 },
        { c: '#F87171', text: 78, prefix: 10 },
        { c: '#22C55E', text: 88, prefix: 10 },
        { c: color, text: 55, prefix: 10 },
      ].map((l, i) => (
        <g key={i}>
          <rect x="206" y={80 + i * 14} width={l.prefix} height="4" rx="1" fill="#2A3D55" />
          <rect x="218" y={80 + i * 14} width={l.text} height="4" rx="1" fill={l.c} opacity="0.9" />
        </g>
      ))}
      {/* Blinking prompt */}
      <rect x="206" y="196" width="30" height="4" rx="1" fill="#22C55E" opacity="0.7" />
      <rect x="238" y="196" width="3" height="8" rx="1" fill={color} opacity="0.9" />

      {/* ── DESK ── */}
      <rect x="0" y="252" width="440" height="40" fill="url(#en-desk)" />
      <rect x="0" y="252" width="440" height="4" rx="2" fill="#3A2008" />
      {/* Keyboard */}
      <rect x="125" y="258" width="155" height="20" rx="5" fill="#0F1525" stroke="#1A2540" strokeWidth="1" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i} x={130 + i * 12} y="262" width="9" height="5" rx="1.5" fill="#1A2840" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <rect key={i} x={132 + i * 12} y="271" width="9" height="4" rx="1.5" fill="#1A2840" />
      ))}
      {/* Spacebar with theme color backlight */}
      <rect x="178" y="279" width="60" height="4" rx="2" fill="#1A2840" />
      <rect x="196" y="280" width="24" height="2" rx="1" fill={color} opacity="0.4" />
      {/* Mouse */}
      <rect x="295" y="259" width="24" height="30" rx="12" fill="#0F1525" stroke="#1A2540" strokeWidth="1" />
      <line x1="307" y1="259" x2="307" y2="278" stroke="#1A2840" strokeWidth="1" />
      {/* Coffee mug */}
      <rect x="44" y="248" width="24" height="28" rx="4" fill="#1A2035" />
      <path d="M68,256 Q78,262 68,270" fill="none" stroke="#1A2035" strokeWidth="3" strokeLinecap="round" />
      <rect x="47" y="248" width="18" height="8" rx="2" fill={color} opacity="0.6" />
      {/* Steam */}
      <path d="M52,245 Q50,238 54,232" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M60,245 Q58,237 62,231" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Headphones */}
      <path d="M46,253 Q46,238 56,238 Q56,252 50,252 Z" fill="#1A2035" />

      {/* ── ENGINEER CHARACTER ── (seated, right side) */}
      {/* Chair */}
      <rect x="340" y="190" width="38" height="95" rx="8" fill="#0C1320" stroke="#141E32" strokeWidth="1" />
      <rect x="332" y="260" width="54" height="18" rx="5" fill="#0C1320" stroke="#141E32" strokeWidth="1" />
      {/* Chair wheels */}
      {[-18, -6, 6, 18].map(x => (
        <ellipse key={x} cx={359 + x} cy={306} rx="5" ry="4" fill="#08101E" />
      ))}
      {/* Sitting legs */}
      <rect x="342" y="270" width="16" height="25" rx="5" fill={pants} />
      <rect x="362" y="270" width="16" height="25" rx="5" fill={pantsL} />
      <ellipse cx="350" cy="295" rx="12" ry="5" fill="#080D18" />
      <ellipse cx="370" cy="295" rx="12" ry="5" fill="#080D18" />
      {/* Torso — POLO SHIRT */}
      <rect x="330" y="188" width="62" height="80" rx="12" fill="url(#en-shirt)" />
      {/* Polo collar */}
      <path d="M348,188 L361,202 L374,188" fill={shade} strokeLinejoin="round" />
      <rect x="355" y="188" width="12" height="16" rx="2" fill={shade} opacity="0.7" />
      {/* Collar strip */}
      <path d="M348,188 Q361,184 374,188" fill="none" stroke={glow} strokeWidth="2" strokeLinecap="round" />
      {/* Left arm (toward keyboard) */}
      <rect x="280" y="232" width="54" height="14" rx="7" fill={shade} transform="rotate(8,307,239)" />
      <ellipse cx="282" cy="252" rx="10" ry="8" fill={skin} />
      {/* Right arm (toward keyboard) */}
      <rect x="388" y="230" width="40" height="13" rx="6" fill={shade} transform="rotate(-5,408,236)" />
      <ellipse cx="425" cy="250" rx="9" ry="7" fill={skin} />
      {/* Neck */}
      <rect x="349" y="174" width="18" height="18" rx="5" fill={skinD} />
      {/* Head */}
      <circle cx="358" cy="148" r="30" fill={skin} />
      <ellipse cx="328" cy="150" rx="5" ry="7" fill={skinD} />
      <ellipse cx="388" cy="150" rx="5" ry="7" fill={skinD} />
      {/* Hair (messy dev hair) */}
      <path d="M328,140 Q336,108 358,112 Q380,108 388,140 L388,150 Q358,144 328,150 Z" fill={hair} />
      {/* Extra tuft on top */}
      <path d="M345,112 Q358,100 371,112 Q365,107 358,106 Q351,107 345,112Z" fill={hair} />
      {/* Glasses */}
      <rect x="337" y="146" rx="5" ry="5" width="20" height="13" fill="none" stroke="#4A5568" strokeWidth="2.5" />
      <rect x="361" y="146" rx="5" ry="5" width="20" height="13" fill="none" stroke="#4A5568" strokeWidth="2.5" />
      <line x1="357" y1="152" x2="361" y2="152" stroke="#4A5568" strokeWidth="2.5" />
      <line x1="328" y1="152" x2="337" y2="152" stroke="#4A5568" strokeWidth="2" />
      <line x1="381" y1="152" x2="388" y2="152" stroke="#4A5568" strokeWidth="2" />
      {/* Eyes behind glasses */}
      <ellipse cx="347" cy="152" rx="3" ry="3.5" fill="#1A0F0A" />
      <ellipse cx="371" cy="152" rx="3" ry="3.5" fill="#1A0F0A" />
      {/* Beard */}
      <path d="M330,162 Q358,178 386,162 Q386,174 358,180 Q330,174 330,162Z" fill={beard} opacity="0.85" />
      <path d="M330,162 Q344,157 358,159 Q372,157 386,162" fill={beard} opacity="0.5" />
      {/* Mustache */}
      <path d="M346,162 Q358,167 370,162" fill={beard} opacity="0.7" />
      {/* Mouth */}
      <path d="M348,168 Q358,175 368,168" fill="none" stroke="#8B5E45" strokeWidth="1.5" strokeLinecap="round" />
      {/* Monitor glow on face */}
      <ellipse cx="358" cy="145" rx="26" ry="20" fill={color} opacity="0.07" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LAUNCH — Team celebration with high-five
───────────────────────────────────────────────────────────────────────── */
function LaunchSVG({ color, className }: SVGProps) {
  const shade = dk(color, 40);
  const glow = lt(color, 50);
  const skin1 = '#F5C5A0';
  const skin1D = '#D9A07A';
  const skin2 = '#C8865A';
  const skin2D = '#A06840';
  const skin3 = '#E0A880';
  const skin3D = '#C08858';
  const hair1 = '#1A0E06';
  const hair2 = '#4A2810';
  const hair3 = '#0A0A14';
  const pants = '#1A2740';
  const pantsL = '#253650';

  return (
    <svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="l-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1020" />
          <stop offset="100%" stopColor="#080D18" />
        </linearGradient>
        <linearGradient id="l-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <radialGradient id="l-celebrate" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="440" height="340" fill="url(#l-bg)" />
      {/* Celebration glow */}
      <ellipse cx="220" cy="300" rx="220" ry="120" fill="url(#l-celebrate)" />

      {/* Floor */}
      <rect x="0" y="292" width="440" height="48" fill="#060A14" />
      <line x1="0" y1="292" x2="440" y2="292" stroke="#1A2845" strokeWidth="1" />

      {/* Back wall */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={88*i} y1="0" x2={88*i} y2="292" stroke="#0D1525" strokeWidth="0.5" opacity="0.5" />
      ))}
      {/* Windows */}
      <rect x="10" y="20" width="100" height="130" rx="4" fill="#080F1E" stroke="#1020380" strokeWidth="1" />
      <line x1="60" y1="20" x2="60" y2="150" stroke="#102038" strokeWidth="1" />
      <line x1="10" y1="85" x2="110" y2="85" stroke="#102038" strokeWidth="1" />
      {/* City in window */}
      <path d="M10,150 L10,100 L20,100 L20,80 L25,80 L25,70 L30,70 L30,80 L40,80 L40,60 L44,60 L44,55 L48,55 L48,60 L54,60 L54,45 L58,45 L58,150 Z" fill="#060C18" />
      {[14,22,30,38,46,52].map((x,i) => (
        <rect key={x} x={x} y={70+(i%3)*15} width="4" height={8+(i%2)*5} rx="0.5" fill="#FFD070" opacity="0.5" />
      ))}
      <rect x="330" y="20" width="100" height="130" rx="4" fill="#080F1E" stroke="#102038" strokeWidth="1" />
      <line x1="380" y1="20" x2="380" y2="150" stroke="#102038" strokeWidth="1" />
      <line x1="330" y1="85" x2="430" y2="85" stroke="#102038" strokeWidth="1" />
      <path d="M330,150 L330,90 L342,90 L342,75 L346,75 L346,65 L350,65 L350,75 L360,75 L360,55 L364,55 L364,48 L368,48 L368,55 L376,55 L376,40 L380,40 L380,150Z" fill="#060C18" />
      {[334,344,354,364,374].map((x,i) => (
        <rect key={x} x={x} y={60+(i%3)*12} width="4" height={8+(i%2)*4} rx="0.5" fill="#80C0FF" opacity="0.4" />
      ))}

      {/* ── CONFETTI ── */}
      {[
        [60, 40, color, -10], [90, 25, '#F59E0B', 15], [140, 35, '#EF4444', -5],
        [180, 20, glow, 20], [230, 50, '#8B5CF6', -15], [280, 30, color, 10],
        [340, 45, '#F59E0B', -20], [380, 22, '#22C55E', 5], [420, 38, glow, -8],
        [110, 60, '#EF4444', 25], [260, 15, '#8B5CF6', -5], [310, 55, color, 15],
        [70, 80, '#F59E0B', -12], [170, 70, glow, 18], [360, 65, '#EF4444', -10],
      ].map(([x, y, c, r], i) => (
        <rect key={i} x={Number(x)} y={Number(y)} width="8" height="5" rx="1"
          fill={String(c)} opacity="0.8" transform={`rotate(${r},${Number(x)+4},${Number(y)+2.5})`} />
      ))}
      {[
        [50, 55, color], [120, 42, '#F59E0B'], [200, 62, '#EF4444'],
        [300, 38, glow], [400, 58, '#8B5CF6'],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={Number(x)} cy={Number(y)} r="4" fill={String(c)} opacity="0.7" />
      ))}

      {/* ── HIGH-FIVE HANDS (between char 2 and char 3) ── */}
      {/* Char 2 right hand up */}
      <ellipse cx="218" cy="112" rx="12" ry="10" fill={skin1} transform="rotate(-15,218,112)" />
      {/* Char 3 left hand up */}
      <ellipse cx="238" cy="108" rx="12" ry="10" fill={skin2} transform="rotate(10,238,108)" />
      {/* Impact star */}
      {[-30,-15,0,15,30].map((a, i) => (
        <line key={i} x1="228" y1="110" x2={228 + Math.cos(a * Math.PI/180) * 18} y2={110 + Math.sin(a * Math.PI/180) * 18}
          stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      ))}

      {/* ────────────────────────────────────
          CHARACTER 1 — Guy with cap (left)
      ──────────────────────────────────── */}
      {/* Neck */}
      <rect x="68" y="176" width="16" height="20" rx="5" fill={skin1D} />
      {/* Shirt */}
      <rect x="48" y="190" width="56" height="75" rx="12" fill="url(#l-shirt)" />
      <path d="M64,190 L76,204 L88,190" fill={shade} strokeLinejoin="round" />
      {/* Arms */}
      <rect x="34" y="198" width="16" height="50" rx="7" fill={shade} />
      <ellipse cx="42" cy="251" rx="9" ry="7" fill={skin1} />
      <rect x="100" y="195" width="16" height="40" rx="7" fill={shade} transform="rotate(25,108,215)" />
      <ellipse cx="116" cy="232" rx="9" ry="7" fill={skin1} />
      {/* Pants */}
      <rect x="54" y="260" width="20" height="72" rx="6" fill={pants} />
      <rect x="78" y="260" width="20" height="72" rx="6" fill={pantsL} />
      <ellipse cx="64" cy="332" rx="14" ry="5" fill="#060A14" />
      <ellipse cx="88" cy="332" rx="14" ry="5" fill="#060A14" />
      {/* Head */}
      <circle cx="76" cy="150" r="27" fill={skin1} />
      <ellipse cx="49" cy="152" rx="4.5" ry="6" fill={skin1D} />
      <ellipse cx="103" cy="152" rx="4.5" ry="6" fill={skin1D} />
      {/* Hair under cap */}
      <path d="M50,148 Q55,132 76,134 Q97,132 102,148" fill={hair1} />
      {/* Baseball cap */}
      <path d="M49,145 Q76,128 103,145 L103,148 Q76,142 49,148 Z" fill="#1A2035" />
      <rect x="49" y="140" width="54" height="8" rx="4" fill="#141C2E" />
      {/* Cap brim */}
      <path d="M49,148 Q30,152 32,155 Q36,158 49,148 Z" fill="#1A2035" />
      {/* Eyes */}
      <ellipse cx="68" cy="154" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="84" cy="154" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Eyebrows */}
      <path d="M63,148 Q68,145 73,148" fill="none" stroke={hair1} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M79,148 Q84,145 89,148" fill="none" stroke={hair1} strokeWidth="1.8" strokeLinecap="round" />
      {/* Big grin */}
      <path d="M66,165 Q76,174 86,165" fill="none" stroke="#B87060" strokeWidth="2" strokeLinecap="round" />
      <path d="M68,166 Q76,172 84,166 L84,170 Q76,175 68,170 Z" fill="#A05045" opacity="0.3" />

      {/* ────────────────────────────────────
          CHARACTER 2 — Girl in middle (left of high-five)
      ──────────────────────────────────── */}
      {/* Neck */}
      <rect x="163" y="170" width="16" height="20" rx="5" fill={skin3D} />
      {/* Shirt */}
      <rect x="143" y="184" width="56" height="76" rx="12" fill="url(#l-shirt)" />
      <path d="M159,184 L171,198 L183,184" fill={shade} strokeLinejoin="round" />
      {/* Right arm (raised for high-five) */}
      <rect x="195" y="148" width="14" height="42" rx="7" fill={shade} transform="rotate(15,202,169)" />
      {/* Left arm (down) */}
      <rect x="130" y="194" width="14" height="50" rx="7" fill={shade} />
      <ellipse cx="137" cy="247" rx="8" ry="6" fill={skin3} />
      {/* Pants */}
      <rect x="149" y="256" width="20" height="76" rx="6" fill={pants} />
      <rect x="173" y="256" width="20" height="76" rx="6" fill={pantsL} />
      <ellipse cx="159" cy="332" rx="14" ry="5" fill="#060A14" />
      <ellipse cx="183" cy="332" rx="14" ry="5" fill="#060A14" />
      {/* Head */}
      <circle cx="171" cy="145" r="27" fill={skin3} />
      <ellipse cx="144" cy="147" rx="4.5" ry="6" fill={skin3D} />
      <ellipse cx="198" cy="147" rx="4.5" ry="6" fill={skin3D} />
      {/* Hair — long curly */}
      <path d="M145,137 Q151,112 171,114 Q191,112 197,137 L197,160 Q189,175 171,177 Q153,175 145,160 Z" fill={hair2} />
      {/* Hair strands */}
      <path d="M145,137 Q142,155 146,175" fill="none" stroke={hair2} strokeWidth="8" strokeLinecap="round" />
      <path d="M197,137 Q200,155 196,175" fill="none" stroke={hair2} strokeWidth="8" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="163" cy="148" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="179" cy="148" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Lashes */}
      <line x1="159" y1="144" x2="157" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="163" y1="143" x2="163" y2="140" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="167" y1="144" x2="169" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="175" y1="144" x2="173" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="179" y1="143" x2="179" y2="140" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="183" y1="144" x2="185" y2="141" stroke="#1A0F0A" strokeWidth="1" />
      <path d="M163,161 Q171,169 179,161" fill="none" stroke="#B87060" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="153" cy="158" rx="6" ry="3.5" fill="#FFB0A0" opacity="0.4" />
      <ellipse cx="189" cy="158" rx="6" ry="3.5" fill="#FFB0A0" opacity="0.4" />

      {/* ────────────────────────────────────
          CHARACTER 3 — Guy with glasses (high-five, right)
      ──────────────────────────────────── */}
      {/* Neck */}
      <rect x="258" y="168" width="18" height="22" rx="5" fill={skin2D} />
      {/* Shirt */}
      <rect x="236" y="182" width="62" height="82" rx="12" fill="url(#l-shirt)" />
      <path d="M254,182 L267,197 L280,182" fill={shade} strokeLinejoin="round" />
      {/* Left arm (raised for high-five) */}
      <rect x="222" y="140" width="16" height="50" rx="7" fill={shade} transform="rotate(-20,230,165)" />
      {/* Right arm (slightly raised, enthusiastic) */}
      <rect x="294" y="188" width="16" height="50" rx="7" fill={shade} transform="rotate(20,302,213)" />
      <ellipse cx="312" cy="235" rx="9" ry="7" fill={skin2} />
      {/* Pants */}
      <rect x="242" y="258" width="22" height="72" rx="6" fill={pants} />
      <rect x="268" y="258" width="22" height="72" rx="6" fill={pantsL} />
      <ellipse cx="253" cy="330" rx="15" ry="5" fill="#060A14" />
      <ellipse cx="279" cy="330" rx="15" ry="5" fill="#060A14" />
      {/* Head */}
      <circle cx="267" cy="140" r="29" fill={skin2} />
      <ellipse cx="238" cy="142" rx="5" ry="7" fill={skin2D} />
      <ellipse cx="296" cy="142" rx="5" ry="7" fill={skin2D} />
      {/* Hair (short) */}
      <path d="M238,132 Q246,106 267,110 Q288,106 296,132 L296,144 Q267,138 238,144 Z" fill={hair3} />
      {/* Glasses */}
      <rect x="246" y="138" width="20" height="14" rx="5" fill="none" stroke="#4A5568" strokeWidth="2.5" />
      <rect x="270" y="138" width="20" height="14" rx="5" fill="none" stroke="#4A5568" strokeWidth="2.5" />
      <line x1="266" y1="145" x2="270" y2="145" stroke="#4A5568" strokeWidth="2.5" />
      <line x1="238" y1="145" x2="246" y2="145" stroke="#4A5568" strokeWidth="2" />
      <line x1="290" y1="145" x2="296" y2="145" stroke="#4A5568" strokeWidth="2" />
      {/* Eyes */}
      <ellipse cx="256" cy="145" rx="3" ry="3.5" fill="#1A0F0A" />
      <ellipse cx="280" cy="145" rx="3" ry="3.5" fill="#1A0F0A" />
      {/* Eyebrows */}
      <path d="M249,132 Q256,129 263,132" fill="none" stroke={hair3} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M271,132 Q278,129 285,132" fill="none" stroke={hair3} strokeWidth="1.8" strokeLinecap="round" />
      {/* Big open smile */}
      <path d="M256,160 Q267,170 278,160" fill="none" stroke="#B87060" strokeWidth="2" strokeLinecap="round" />
      <path d="M258,161 Q267,169 276,161 L276,165 Q267,172 258,165 Z" fill="#A05045" opacity="0.35" />
      {/* Teeth hint */}
      <path d="M260,162 Q267,167 274,162 L274,165 Q267,168 260,165 Z" fill="#FAFAFA" opacity="0.8" />

      {/* ────────────────────────────────────
          CHARACTER 4 — Woman (right)
      ──────────────────────────────────── */}
      {/* Neck */}
      <rect x="358" y="170" width="16" height="22" rx="5" fill={skin1D} />
      {/* Shirt */}
      <rect x="338" y="184" width="56" height="78" rx="12" fill="url(#l-shirt)" />
      <path d="M354,184 L366,198 L378,184" fill={shade} strokeLinejoin="round" />
      {/* Left arm (down/gesturing) */}
      <rect x="324" y="192" width="16" height="48" rx="7" fill={shade} transform="rotate(-10,332,216)" />
      <ellipse cx="323" cy="240" rx="9" ry="7" fill={skin1} />
      {/* Right arm (raised, waving) */}
      <rect x="390" y="178" width="16" height="42" rx="7" fill={shade} transform="rotate(20,398,199)" />
      <ellipse cx="408" cy="215" rx="9" ry="7" fill={skin1} />
      {/* Pants */}
      <rect x="344" y="257" width="20" height="75" rx="6" fill={pants} />
      <rect x="368" y="257" width="20" height="75" rx="6" fill={pantsL} />
      <ellipse cx="354" cy="332" rx="14" ry="5" fill="#060A14" />
      <ellipse cx="378" cy="332" rx="14" ry="5" fill="#060A14" />
      {/* Head */}
      <circle cx="366" cy="143" r="28" fill={skin1} />
      <ellipse cx="338" cy="145" rx="5" ry="6.5" fill={skin1D} />
      <ellipse cx="394" cy="145" rx="5" ry="6.5" fill={skin1D} />
      {/* Hair — elegant straight */}
      <path d="M339,136 Q346,112 366,114 Q386,112 393,136 L394,155 Q386,170 366,172 Q346,170 338,155 Z" fill={hair1} />
      {/* Side curtains */}
      <path d="M339,136 Q336,150 340,172 Q344,178 348,172 Q346,155 340,140 Z" fill={hair1} />
      <path d="M393,136 Q396,150 392,172 Q388,178 384,172 Q386,155 392,140 Z" fill={hair1} />
      {/* Eyes */}
      <ellipse cx="358" cy="146" rx="3.5" ry="4" fill="#1A0F0A" />
      <ellipse cx="374" cy="146" rx="3.5" ry="4" fill="#1A0F0A" />
      {/* Lashes */}
      <line x1="354" y1="142" x2="352" y2="139" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="358" y1="141" x2="358" y2="138" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="362" y1="142" x2="364" y2="139" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="370" y1="142" x2="368" y2="139" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="374" y1="141" x2="374" y2="138" stroke="#1A0F0A" strokeWidth="1" />
      <line x1="378" y1="142" x2="380" y2="139" stroke="#1A0F0A" strokeWidth="1" />
      {/* Warm smile */}
      <path d="M358,160 Q366,168 374,160" fill="none" stroke="#B87060" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="348" cy="155" rx="6" ry="3.5" fill="#FFB0A0" opacity="0.35" />
      <ellipse cx="384" cy="155" rx="6" ry="3.5" fill="#FFB0A0" opacity="0.35" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export type ProcessStep = 'discovery' | 'design' | 'engineer' | 'launch';

interface ProcessCharacterSVGProps {
  step: ProcessStep;
  color: string;
  className?: string;
}

export function ProcessCharacterSVG({ step, color, className }: ProcessCharacterSVGProps) {
  const props = { color, className };
  switch (step) {
    case 'discovery': return <DiscoverySVG {...props} />;
    case 'design':    return <DesignSVG {...props} />;
    case 'engineer':  return <EngineerSVG {...props} />;
    case 'launch':    return <LaunchSVG {...props} />;
    default:          return null;
  }
}
