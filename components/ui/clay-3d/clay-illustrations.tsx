"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ClayIllustrationProps {
  className?: string;
  isHovered?: boolean;
}

// Helper unique ID generator to prevent SVG gradient collisions across cards
const uid = (prefix: string) => `${prefix}`;

/**
 * 1. WEBSITES ILLUSTRATION
 * Multi-layer 3D responsive browser canvas, floating cursor pointer, speed metric pill.
 */
export function WebsitesIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="web-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="100%" stopColor="var(--muted)" />
          </linearGradient>

          <linearGradient id="web-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.7) c h)" />
          </linearGradient>

          <linearGradient id="web-accent-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 1.15) c h)" />
          </linearGradient>

          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Floating Ambient Sphere */}
        <circle cx="270" cy="45" r="18" fill="url(#web-primary-grad)" opacity="0.35" filter="blur(1px)" />

        {/* Main Desktop Canvas Window */}
        <g filter="url(#soft-shadow)">
          <rect x="25" y="30" width="220" height="150" rx="16" fill="url(#web-bg)" stroke="var(--border)" strokeWidth="1.5" />
          {/* Header Bar */}
          <rect x="25" y="30" width="220" height="28" rx="16" fill="var(--muted)" opacity="0.75" />
          <path d="M 25 46 L 245 46" stroke="var(--border)" strokeWidth="1" />
          {/* Traffic Dots */}
          <circle cx="42" cy="44" r="4" fill="#FF5F56" />
          <circle cx="54" cy="44" r="4" fill="#FFBD2E" />
          <circle cx="66" cy="44" r="4" fill="#27C93F" />
          {/* URL address bar */}
          <rect x="85" y="38" width="100" height="12" rx="6" fill="var(--background)" stroke="var(--border)" strokeWidth="0.8" />
          <rect x="92" y="42" width="45" height="4" rx="2" fill="var(--primary)" opacity="0.7" />

          {/* Hero Content Wireframe */}
          <rect x="42" y="70" width="85" height="10" rx="5" fill="var(--foreground)" opacity="0.85" />
          <rect x="42" y="86" width="115" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.4" />
          <rect x="42" y="96" width="95" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.3" />

          {/* 3D Dynamic CTA Button */}
          <rect x="42" y="115" width="56" height="18" rx="7" fill="url(#web-primary-grad)" />
          <rect x="52" y="121" width="36" height="5" rx="2.5" fill="var(--primary-foreground)" />

          {/* Grid Layout Cards */}
          <rect x="150" y="70" width="80" height="85" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <rect x="158" y="78" width="64" height="40" rx="6" fill="url(#web-primary-grad)" opacity="0.18" />
          <rect x="158" y="126" width="48" height="5" rx="2.5" fill="var(--primary)" opacity="0.8" />
          <rect x="158" y="136" width="35" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.4" />
        </g>

        {/* Floating Mobile Device Overlay (Claymorphic) */}
        <g filter="url(#soft-shadow)">
          <rect x="200" y="85" width="90" height="135" rx="18" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
          {/* Mobile Notch */}
          <rect x="228" y="90" width="34" height="5" rx="2.5" fill="var(--muted)" />
          {/* Mobile Screen Elements */}
          <rect x="210" y="105" width="70" height="35" rx="8" fill="url(#web-primary-grad)" />
          {/* Card list inside mobile */}
          <rect x="210" y="148" width="70" height="20" rx="6" fill="var(--muted)" />
          <rect x="218" y="154" width="35" height="4" rx="2" fill="var(--primary)" />
          <rect x="218" y="161" width="50" height="3" rx="1.5" fill="var(--muted-foreground)" opacity="0.5" />

          <rect x="210" y="174" width="70" height="20" rx="6" fill="var(--muted)" />
          <rect x="218" y="180" width="40" height="4" rx="2" fill="var(--primary)" />
        </g>

        {/* 3D Performance Speed Badge */}
        <g filter="url(#soft-shadow)">
          <rect x="115" y="170" width="85" height="32" rx="16" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <circle cx="132" cy="186" r="8" fill="url(#web-primary-grad)" />
          {/* Lightning bolt inside badge */}
          <path d="M 132 181 L 129 187 L 133 187 L 131 192 L 135 186 L 131 186 Z" fill="var(--primary-foreground)" />
          <text x="145" y="190" fill="var(--foreground)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">99+ SEO</text>
        </g>

        {/* 3D Floating Mouse Cursor Pointer */}
        <g filter="url(#soft-shadow)">
          <path
            d="M 85 130 L 100 142 L 94 144 L 98 152 L 94 154 L 90 146 L 85 150 Z"
            fill="var(--foreground)"
            stroke="var(--background)"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. WEB APPLICATIONS ILLUSTRATION
 * Directly inspired by Cloudi5's signature Web Development 3D desktop workstation:
 * Soft 3D monitor, code editor window, user profile card, floating gear, charts, keyboard.
 */
export function WebAppsIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="app-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <linearGradient id="app-monitor-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="100%" stopColor="var(--muted)" />
          </linearGradient>

          <filter id="clay-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Floating 3D Gear (Cloudi5 style) */}
        <g filter="url(#clay-glow)">
          <circle cx="115" cy="40" r="16" fill="url(#app-primary-grad)" />
          <circle cx="115" cy="40" r="7" fill="var(--background)" />
          {/* Gear teeth */}
          <rect x="112" y="21" width="6" height="5" rx="2" fill="url(#app-primary-grad)" />
          <rect x="112" y="54" width="6" height="5" rx="2" fill="url(#app-primary-grad)" />
          <rect x="96" y="37" width="5" height="6" rx="2" fill="url(#app-primary-grad)" />
          <rect x="129" y="37" width="5" height="6" rx="2" fill="url(#app-primary-grad)" />
        </g>

        {/* 3D Monitor Base & Pedestal Stand */}
        <ellipse cx="160" cy="205" rx="55" ry="12" fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
        <path d="M 148 165 L 145 200 L 175 200 L 172 165 Z" fill="var(--border)" />

        {/* 3D Computer Display Chassis */}
        <g filter="url(#clay-glow)">
          <rect x="45" y="45" width="230" height="135" rx="20" fill="url(#app-primary-grad)" />
          <rect x="52" y="52" width="216" height="121" rx="14" fill="var(--card)" />
        </g>

        {/* Left App User Panel */}
        <g>
          <rect x="62" y="62" width="75" height="100" rx="10" fill="var(--muted)" opacity="0.65" />
          {/* User Avatar circle */}
          <circle cx="99.5" cy="85" r="14" fill="url(#app-primary-grad)" />
          <circle cx="99.5" cy="82" r="6" fill="var(--primary-foreground)" />
          <path d="M 91 95 C 91 90 108 90 108 95 Z" fill="var(--primary-foreground)" />
          {/* User details rows */}
          <rect x="72" y="108" width="55" height="5" rx="2.5" fill="var(--foreground)" opacity="0.75" />
          <rect x="72" y="118" width="45" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.4" />
          <rect x="72" y="127" width="50" height="4" rx="2" fill="var(--primary)" opacity="0.8" />
          {/* Mini Toggle Switch */}
          <rect x="72" y="140" width="24" height="10" rx="5" fill="url(#app-primary-grad)" />
          <circle cx="89" cy="145" r="3.5" fill="var(--primary-foreground)" />
        </g>

        {/* Right Code IDE & Terminal (Cloudi5 style) */}
        <g filter="url(#clay-glow)">
          <rect x="145" y="55" width="130" height="100" rx="12" fill="#18181B" stroke="var(--border)" strokeWidth="1" />
          {/* Terminal Dots */}
          <circle cx="158" cy="67" r="3" fill="#EF4444" />
          <circle cx="167" cy="67" r="3" fill="#F59E0B" />
          <circle cx="176" cy="67" r="3" fill="#10B981" />
          {/* Syntax Code lines */}
          <rect x="158" y="80" width="35" height="5" rx="2" fill="var(--primary)" />
          <rect x="198" y="80" width="45" height="5" rx="2" fill="#60A5FA" />
          <rect x="168" y="92" width="60" height="4" rx="2" fill="#A1A1AA" />
          <rect x="168" y="101" width="75" height="4" rx="2" fill="#34D399" />
          <rect x="168" y="110" width="40" height="4" rx="2" fill="var(--primary)" />
          <rect x="158" y="122" width="25" height="5" rx="2" fill="#F472B6" />
          <rect x="188" y="122" width="55" height="5" rx="2" fill="var(--primary-foreground)" />
          {/* Glowing cursor line */}
          <rect x="158" y="136" width="10" height="2" rx="1" fill="var(--primary)" />
        </g>

        {/* Floating 3D Pie Chart badge */}
        <g filter="url(#clay-glow)">
          <circle cx="270" cy="155" r="22" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <circle cx="270" cy="155" r="16" fill="url(#app-primary-grad)" />
          {/* Pie Slice */}
          <path d="M 270 155 L 270 139 A 16 16 0 0 1 286 155 Z" fill="#F59E0B" />
        </g>

        {/* Floating Code Badge </> */}
        <g filter="url(#clay-glow)">
          <rect x="20" y="85" width="38" height="32" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <text x="39" y="106" fill="var(--primary)" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">&lt;/&gt;</text>
        </g>

        {/* 3D Keyboard on Desk */}
        <rect x="95" y="195" width="130" height="16" rx="5" fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
        <rect x="105" y="199" width="110" height="8" rx="3" fill="var(--card)" />
        {/* Mouse */}
        <rect x="235" y="197" width="14" height="20" rx="7" fill="url(#app-primary-grad)" />
      </svg>
    </div>
  );
}

/**
 * 3. MOBILE APPS ILLUSTRATION
 * Inspired by Cloudi5's 3D Mobile App Development illustration:
 * 3D Smartphone chassis, target bullseye with dart, chat bubble, interactive app metrics.
 */
export function MobileAppsIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="mob-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <filter id="mob-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 3D Target Bullseye (Cloudi5 style) */}
        <g filter="url(#mob-shadow)">
          <circle cx="250" cy="55" r="32" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          <circle cx="250" cy="55" r="24" fill="url(#mob-primary-grad)" opacity="0.25" />
          <circle cx="250" cy="55" r="16" fill="var(--card)" />
          <circle cx="250" cy="55" r="8" fill="url(#mob-primary-grad)" />
          {/* Dart hitting bullseye */}
          <path d="M 275 30 L 254 51 L 248 45 Z" fill="#F59E0B" />
          <line x1="275" y1="30" x2="288" y2="17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Main 3D Smartphone (Center Claymorphic) */}
        <g filter="url(#mob-shadow)">
          {/* Outer Bezel */}
          <rect x="95" y="20" width="130" height="200" rx="26" fill="url(#mob-primary-grad)" />
          {/* Screen Inner */}
          <rect x="102" y="27" width="116" height="186" rx="20" fill="var(--card)" />
          {/* Speaker / Dynamic Island */}
          <rect x="140" y="34" width="40" height="7" rx="3.5" fill="var(--muted)" />

          {/* App Header Bar */}
          <circle cx="120" cy="54" r="8" fill="url(#mob-primary-grad)" />
          <rect x="135" y="50" width="55" height="6" rx="3" fill="var(--foreground)" opacity="0.8" />
          <rect x="135" y="59" width="35" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.5" />

          {/* App Feature Card */}
          <rect x="110" y="72" width="100" height="52" rx="10" fill="url(#mob-primary-grad)" />
          {/* Trend chart line inside card */}
          <path d="M 120 108 Q 135 90 150 102 T 180 82 T 200 88" fill="none" stroke="var(--primary-foreground)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="180" cy="82" r="3.5" fill="var(--primary-foreground)" />

          {/* List items in mobile */}
          <rect x="110" y="132" width="100" height="22" rx="6" fill="var(--muted)" />
          <rect x="118" y="138" width="10" height="10" rx="3" fill="url(#mob-primary-grad)" />
          <rect x="134" y="141" width="50" height="4" rx="2" fill="var(--foreground)" opacity="0.75" />

          <rect x="110" y="160" width="100" height="22" rx="6" fill="var(--muted)" />
          <rect x="118" y="166" width="10" height="10" rx="3" fill="#10B981" />
          <rect x="134" y="169" width="42" height="4" rx="2" fill="var(--foreground)" opacity="0.75" />

          {/* Home indicator */}
          <rect x="140" y="202" width="40" height="3" rx="1.5" fill="var(--muted-foreground)" opacity="0.4" />
        </g>

        {/* Floating Notification Chat Bubble (Left) */}
        <g filter="url(#mob-shadow)">
          <rect x="35" y="65" width="70" height="42" rx="12" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="45" y="76" width="50" height="5" rx="2.5" fill="url(#mob-primary-grad)" />
          <rect x="45" y="86" width="35" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.5" />
          {/* Small Speech Bubble Tip */}
          <polygon points="90,107 100,107 92,115" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        </g>

        {/* Floating Bar Chart Widget (Bottom Left) */}
        <g filter="url(#mob-shadow)">
          <rect x="30" y="140" width="55" height="55" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="40" y="170" width="6" height="15" rx="2" fill="var(--muted-foreground)" opacity="0.3" />
          <rect x="50" y="158" width="6" height="27" rx="2" fill="url(#mob-primary-grad)" opacity="0.6" />
          <rect x="60" y="148" width="6" height="37" rx="2" fill="url(#mob-primary-grad)" />
          <rect x="70" y="162" width="6" height="23" rx="2" fill="#10B981" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. SAAS PRODUCTS ILLUSTRATION
 * 3D isometric cloud vault, modular database nodes, recurring subscription toggle, MRR metrics.
 */
export function SaaSProductsIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="saas-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <filter id="saas-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 3D Database Storage Cylinders (Cloudi5 backend style) */}
        <g filter="url(#saas-shadow)">
          {/* Cylinder Bottom */}
          <path d="M 50 145 C 50 135 110 135 110 145 L 110 165 C 110 175 50 175 50 165 Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
          <ellipse cx="80" cy="145" rx="30" ry="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <circle cx="65" cy="155" r="2.5" fill="#10B981" />

          {/* Cylinder Middle */}
          <path d="M 50 115 C 50 105 110 105 110 115 L 110 135 C 110 145 50 145 50 135 Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
          <ellipse cx="80" cy="115" rx="30" ry="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <circle cx="65" cy="125" r="2.5" fill="var(--primary)" />

          {/* Cylinder Top */}
          <path d="M 50 85 C 50 75 110 75 110 85 L 110 105 C 110 115 50 115 50 105 Z" fill="url(#saas-primary-grad)" />
          <ellipse cx="80" cy="85" rx="30" ry="8" fill="oklch(from var(--primary) calc(l * 1.15) c h)" />
          <circle cx="65" cy="95" r="2.5" fill="var(--primary-foreground)" />
        </g>

        {/* Connecting Data Pipeline Beam */}
        <path d="M 110 125 L 150 125" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="4 3" />

        {/* Main 3D SaaS Subscription Tier Card */}
        <g filter="url(#saas-shadow)">
          <rect x="140" y="45" width="145" height="150" rx="18" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          {/* Card Top Banner with Theme Gradient */}
          <rect x="140" y="45" width="145" height="42" rx="18" fill="url(#saas-primary-grad)" />
          <rect x="140" y="67" width="145" height="20" fill="url(#saas-primary-grad)" />
          <text x="155" y="72" fill="var(--primary-foreground)" fontSize="12" fontWeight="bold">PRO TIER</text>
          <text x="235" y="72" fill="var(--primary-foreground)" fontSize="11" opacity="0.9">$49/mo</text>

          {/* Feature Checklist */}
          <circle cx="158" cy="108" r="5" fill="#10B981" />
          <path d="M 156 108 L 157.5 110 L 160.5 106.5" stroke="#FFFFFF" strokeWidth="1.2" />
          <rect x="170" y="105" width="85" height="5" rx="2.5" fill="var(--foreground)" opacity="0.8" />

          <circle cx="158" cy="126" r="5" fill="#10B981" />
          <path d="M 156 126 L 157.5 128 L 160.5 124.5" stroke="#FFFFFF" strokeWidth="1.2" />
          <rect x="170" y="123" width="70" height="5" rx="2.5" fill="var(--foreground)" opacity="0.8" />

          <circle cx="158" cy="144" r="5" fill="#10B981" />
          <path d="M 156 144 L 157.5 146 L 160.5 142.5" stroke="#FFFFFF" strokeWidth="1.2" />
          <rect x="170" y="141" width="95" height="5" rx="2.5" fill="var(--foreground)" opacity="0.8" />

          {/* Action Button */}
          <rect x="155" y="162" width="115" height="22" rx="7" fill="url(#saas-primary-grad)" />
          <text x="212" y="177" fill="var(--primary-foreground)" fontSize="10" fontWeight="bold" textAnchor="middle">Scale Now</text>
        </g>

        {/* Floating MRR Growth Badge */}
        <g filter="url(#saas-shadow)">
          <rect x="85" y="32" width="75" height="28" rx="14" fill="var(--background)" stroke="var(--primary)" strokeWidth="1.5" />
          <text x="122" y="50" fill="var(--primary)" fontSize="11" fontWeight="bold" textAnchor="middle">+148% MRR</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 5. BRANDING & IDENTITY ILLUSTRATION
 * 3D clay creative artboard, dynamic color swatches, isometric logo mark, typography scale.
 */
export function BrandingIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="brand-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <filter id="brand-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Main 3D Artboard Canvas */}
        <g filter="url(#brand-shadow)">
          <rect x="40" y="30" width="200" height="160" rx="18" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          {/* Subtle Grid marks */}
          <circle cx="55" cy="45" r="1.5" fill="var(--muted-foreground)" opacity="0.4" />
          <circle cx="75" cy="45" r="1.5" fill="var(--muted-foreground)" opacity="0.4" />
          <circle cx="95" cy="45" r="1.5" fill="var(--muted-foreground)" opacity="0.4" />
          <circle cx="115" cy="45" r="1.5" fill="var(--muted-foreground)" opacity="0.4" />

          {/* Interlocking 3D Geometric Mark in Theme Color */}
          <polygon points="120,60 155,80 120,100 85,80" fill="url(#brand-primary-grad)" />
          <polygon points="85,80 120,100 120,140 85,120" fill="oklch(from var(--primary) calc(l * 0.7) c h)" />
          <polygon points="120,100 155,80 155,120 120,140" fill="oklch(from var(--primary) calc(l * 0.5) c h)" />

          {/* Typography Scale Guide */}
          <rect x="60" y="155" width="45" height="14" rx="4" fill="var(--muted)" />
          <text x="82" y="166" fill="var(--foreground)" fontSize="9" fontWeight="bold" textAnchor="middle">Aa 64pt</text>

          <rect x="115" y="155" width="80" height="14" rx="4" fill="var(--muted)" opacity="0.6" />
          <rect x="122" y="160" width="65" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.4" />
        </g>

        {/* Dynamic Theme Color Swatch Fan (Right) */}
        <g filter="url(#brand-shadow)">
          {/* Swatch 1: Deep */}
          <rect x="220" y="55" width="65" height="34" rx="10" fill="oklch(from var(--primary) calc(l * 0.45) c h)" stroke="#FFFFFF" strokeWidth="2" transform="rotate(10 220 55)" />
          {/* Swatch 2: Primary */}
          <rect x="230" y="95" width="65" height="34" rx="10" fill="url(#brand-primary-grad)" stroke="#FFFFFF" strokeWidth="2" transform="rotate(5 230 95)" />
          {/* Swatch 3: Light tint */}
          <rect x="235" y="138" width="65" height="34" rx="10" fill="oklch(from var(--primary) calc(l * 1.25) c h)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="285" cy="155" r="5" fill="#FFFFFF" />
        </g>

        {/* Floating 3D Vector Pen Nib (Cloudi5 style) */}
        <g filter="url(#brand-shadow)">
          <path d="M 55 110 L 70 145 L 60 150 L 45 115 Z" fill="var(--foreground)" />
          <circle cx="58" cy="135" r="3" fill="var(--primary)" />
          <path d="M 70 145 L 75 155 L 65 153 Z" fill="url(#brand-primary-grad)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 6. AI AUTOMATION ILLUSTRATION
 * Inspired by Cloudi5's SEO / AI 3D image:
 * 3D rocket launching with theme smoke plume, AI neural node, prompt terminal, automation gears.
 */
export function AIAutomationIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" fill="none">
        <defs>
          <linearGradient id="ai-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <linearGradient id="smoke-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </linearGradient>

          <filter id="ai-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Neural Circuit Grid (Backdrop) */}
        <g opacity="0.3">
          <circle cx="60" cy="50" r="4" fill="var(--primary)" />
          <circle cx="260" cy="60" r="4" fill="var(--primary)" />
          <line x1="60" y1="50" x2="120" y2="90" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="260" y1="60" x2="200" y2="100" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* Laptop / Automation Terminal base */}
        <g filter="url(#ai-shadow)">
          <rect x="65" y="105" width="190" height="110" rx="16" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          {/* Header */}
          <rect x="65" y="105" width="190" height="24" rx="16" fill="var(--muted)" />
          <circle cx="80" cy="117" r="3" fill="#EF4444" />
          <circle cx="90" cy="117" r="3" fill="#F59E0B" />
          <circle cx="100" cy="117" r="3" fill="#10B981" />
          {/* Agent Status Pill */}
          <rect x="180" y="111" width="65" height="12" rx="6" fill="url(#ai-primary-grad)" />
          <text x="212" y="120" fill="var(--primary-foreground)" fontSize="8" fontWeight="bold" textAnchor="middle">AGENT ACTIVE</text>

          {/* Terminal prompt lines */}
          <rect x="80" y="140" width="100" height="6" rx="3" fill="var(--foreground)" opacity="0.8" />
          <rect x="80" y="152" width="140" height="5" rx="2.5" fill="var(--primary)" opacity="0.9" />
          <rect x="80" y="163" width="120" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.4" />
          <rect x="80" y="174" width="85" height="5" rx="2.5" fill="#10B981" />
        </g>

        {/* 3D Rocket Launching through Screen (Cloudi5 signature) */}
        <g filter="url(#ai-shadow)">
          {/* Flame & Smoke Plume */}
          <ellipse cx="160" cy="115" rx="22" ry="30" fill="url(#smoke-glow)" />
          <circle cx="148" cy="120" r="14" fill="#F59E0B" opacity="0.8" />
          <circle cx="172" cy="120" r="14" fill="#F59E0B" opacity="0.8" />
          <circle cx="160" cy="126" r="18" fill="url(#ai-primary-grad)" opacity="0.9" />

          {/* Rocket Body */}
          {/* Fins */}
          <path d="M 136 78 C 122 84 120 102 120 102 L 138 92 Z" fill="url(#ai-primary-grad)" />
          <path d="M 184 78 C 198 84 200 102 200 102 L 182 92 Z" fill="url(#ai-primary-grad)" />
          {/* Fuselage */}
          <path d="M 160 20 C 145 42 140 70 140 92 L 180 92 C 180 70 175 42 160 20 Z" fill="#F4F4F5" stroke="var(--border)" strokeWidth="1" />
          {/* Nose Cone Tip */}
          <path d="M 160 20 C 152 32 148 44 148 48 L 172 48 C 172 44 168 32 160 20 Z" fill="url(#ai-primary-grad)" />
          {/* Porthole Window */}
          <circle cx="160" cy="58" r="9" fill="url(#ai-primary-grad)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="160" cy="58" r="4.5" fill="#60A5FA" />
        </g>

        {/* Floating Megaphone Badge (Cloudi5 style) */}
        <g filter="url(#ai-shadow)">
          <circle cx="48" cy="140" r="20" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
          {/* Mini megaphone cone */}
          <path d="M 42 136 L 54 130 L 54 150 L 42 144 Z" fill="url(#ai-primary-grad)" />
          <rect x="36" y="137" width="6" height="6" rx="1.5" fill="var(--foreground)" />
        </g>

        {/* Floating Magnifier / Analytics Node (Right) */}
        <g filter="url(#ai-shadow)">
          <circle cx="270" cy="130" r="18" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
          <circle cx="270" cy="130" r="11" fill="url(#ai-primary-grad)" opacity="0.3" />
          <line x1="283" y1="143" x2="295" y2="155" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 7. LAUNCH / CTA 3D ILLUSTRATION
 * Large dynamic 3D clay milestone rocket with team collaboration and theme glow.
 */
export function LaunchIllustration({ className }: ClayIllustrationProps) {
  return (
    <div className={cn("relative w-full max-w-sm aspect-square flex items-center justify-center select-none", className)}>
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)]" fill="none">
        <defs>
          <linearGradient id="launch-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(from var(--primary) calc(l * 0.65) c h)" />
          </linearGradient>

          <radialGradient id="launch-glow-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>

          <filter id="launch-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Ambient Glow Field */}
        <circle cx="150" cy="150" r="130" fill="url(#launch-glow-radial)" />

        {/* Floating 3D Orbs */}
        <circle cx="50" cy="80" r="14" fill="url(#launch-primary-grad)" opacity="0.6" filter="blur(1px)" />
        <circle cx="250" cy="210" r="18" fill="url(#launch-primary-grad)" opacity="0.4" filter="blur(1px)" />
        <circle cx="240" cy="90" r="8" fill="#F59E0B" />

        {/* Launchpad Platform Base */}
        <ellipse cx="150" cy="245" rx="90" ry="24" fill="var(--muted)" stroke="var(--border)" strokeWidth="1.5" />
        <ellipse cx="150" cy="240" rx="75" ry="18" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
        {/* Launchpad lights */}
        <circle cx="95" cy="242" r="3" fill="var(--primary)" />
        <circle cx="120" cy="248" r="3" fill="#10B981" />
        <circle cx="150" cy="250" r="3" fill="var(--primary)" />
        <circle cx="180" cy="248" r="3" fill="#10B981" />
        <circle cx="205" cy="242" r="3" fill="var(--primary)" />

        {/* Smoke Plume Cloud */}
        <ellipse cx="150" cy="205" rx="55" ry="30" fill="var(--muted)" opacity="0.8" />
        <ellipse cx="150" cy="190" rx="40" ry="22" fill="#F59E0B" opacity="0.85" />
        <ellipse cx="150" cy="180" rx="28" ry="16" fill="url(#launch-primary-grad)" />

        {/* Main 3D Rocket Body */}
        <g filter="url(#launch-shadow)">
          {/* Fins */}
          <path d="M 115 130 C 95 140 90 170 90 170 L 118 155 Z" fill="url(#launch-primary-grad)" />
          <path d="M 185 130 C 205 140 210 170 210 170 L 182 155 Z" fill="url(#launch-primary-grad)" />

          {/* Main Fuselage */}
          <path d="M 150 45 C 128 75 120 115 120 150 L 180 150 C 180 115 172 75 150 45 Z" fill="#FAFAFA" stroke="var(--border)" strokeWidth="1.5" />

          {/* Nosecone */}
          <path d="M 150 45 C 138 62 132 80 132 85 L 168 85 C 168 80 162 62 150 45 Z" fill="url(#launch-primary-grad)" />

          {/* Porthole */}
          <circle cx="150" cy="105" r="14" fill="url(#launch-primary-grad)" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="150" cy="105" r="7" fill="#60A5FA" />

          {/* Side speed stripes */}
          <line x1="135" y1="125" x2="135" y2="142" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="165" y1="125" x2="165" y2="142" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Stars */}
        <path d="M 75 110 L 77 115 L 82 117 L 77 119 L 75 124 L 73 119 L 68 117 L 73 115 Z" fill="#F59E0B" />
        <path d="M 225 130 L 227 134 L 231 136 L 227 138 L 225 142 L 223 138 L 219 136 L 223 134 Z" fill="var(--primary)" />
      </svg>
    </div>
  );
}
