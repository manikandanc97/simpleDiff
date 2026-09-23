"use client";

import React from "react";

export function HeroGridAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none bg-[#FFFDFC]">
      {/* ── Main SVG Background with Radial Glows & Translucent Glass Waves ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="purpleGlow">
            <stop offset="0%" stopColor="#e8dafa" stopOpacity=".9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pinkGlow">
            <stop offset="0%" stopColor="#f4cddd" stopOpacity=".7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="topRightDisk">
            <stop offset="0%" stopColor="#6C1D54" />
            <stop offset="100%" stopColor="#4A0E38" />
          </radialGradient>

          <radialGradient id="topLeftGlow">
            <stop offset="0%" stopColor="#F3EBF9" stopOpacity=".9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <filter id="heroBlur">
            <feGaussianBlur stdDeviation="45" />
          </filter>

          <filter id="softBlur">
            <feGaussianBlur stdDeviation="65" />
          </filter>
        </defs>

        {/* Base warm white canvas */}
        <rect width="1920" height="900" fill="#fffdfc" />

        {/* Top-left soft lavender bloom */}
        <ellipse
          cx="80"
          cy="100"
          rx="450"
          ry="300"
          fill="url(#topLeftGlow)"
          filter="url(#softBlur)"
        />

        {/* Top-right prominent purple circle disk as seen in reference */}
        <circle cx="1920" cy="30" r="145" fill="url(#topRightDisk)" />

        {/* Purple Glow behind right visual area */}
        <ellipse
          cx="1450"
          cy="360"
          rx="650"
          ry="430"
          fill="url(#purpleGlow)"
          filter="url(#heroBlur)"
        />

        {/* Pink Glow near lower center */}
        <ellipse
          cx="1050"
          cy="780"
          rx="500"
          ry="200"
          fill="url(#pinkGlow)"
          filter="url(#heroBlur)"
        />

        {/* Bottom Left decorative gentle curve */}
        <path
          d="M0 620 C 180 580, 280 720, 480 840 C 580 900, 680 920, 800 900 L 0 900 Z"
          fill="#FAF0F6"
          opacity="0.45"
        />

        {/* Abstract Glass Wave 1 */}
        <path
          d="M780 260
             C1050 70 1370 110 1630 250
             C1470 300 1340 380 1300 500
             C1160 410 1010 350 780 260Z"
          fill="white"
          fillOpacity=".30"
          stroke="white"
          strokeOpacity=".75"
          strokeWidth="1.5"
        />

        {/* Second Glass Wave */}
        <path
          d="M850 300
             C1080 140 1360 150 1570 280
             C1430 320 1340 400 1300 475
             C1160 390 1010 350 850 300Z"
          fill="white"
          fillOpacity=".18"
          stroke="white"
          strokeOpacity=".55"
          strokeWidth="1.2"
        />
      </svg>

      {/* ── Dotted Pattern Grid on Upper Right ── */}
      <div
        className="hero-dots absolute top-12 right-0 w-[550px] lg:w-[700px] h-[480px] pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 75% 75% at 75% 35%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 75% 35%, black 25%, transparent 75%)",
        }}
      />
    </div>
  );
}

