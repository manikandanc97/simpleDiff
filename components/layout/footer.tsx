"use client";

import Link from "next/link";
import { useThemeColor } from "@/components/theme/color-provider";
import { motion } from "motion/react";

const NAV_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Websites", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "Brands", href: "#" },
      { label: "Digital Products", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "#" },
      { label: "Services", href: "#" },
      { label: "Lab", href: "#" },
      { label: "About", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "#" },
      { label: "Process", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const FEATURED = [
  { id: "01", title: "Websites", text: "Turn ideas into experiences." },
  { id: "02", title: "Mobile Apps", text: "Useful. Fast. Intuitive." },
  { id: "03", title: "Brands", text: "Make your identity unmistakable." },
  { id: "04", title: "Digital Products", text: "From idea to something people use." },
];

export function Footer() {
  const { theme } = useThemeColor();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 overflow-hidden pt-24 relative selection:bg-zinc-800">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* TOP FOOTER - NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-6">
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              SimpleDiff
            </Link>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Keep It Simple.<br />
              Make It Different.
            </p>
          </div>

          {/* Navigation Columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-base text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FEATURED ROW */}
        <div className="border-t border-zinc-800 pt-16 mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {FEATURED.map((item) => (
              <div key={item.id} className="flex flex-col gap-3">
                <span className="text-xs font-mono font-medium text-zinc-600">
                  {item.id} &mdash;
                </span>
                <h4 className="text-xl font-medium text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM UTILITY ROW */}
        <div className="border-t border-zinc-800 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="text-sm text-zinc-500 order-3 lg:order-1 text-center lg:text-left">
            &copy; {currentYear} SimpleDiff. All rights reserved.
          </div>

          <div className="flex items-center gap-8 order-2 text-sm">
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Sitemap</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Cookies</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Accessibility</Link>
          </div>

          <div className="flex items-center gap-6 order-1 lg:order-3">
            <Link href="#" aria-label="LinkedIn" className="text-zinc-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" aria-label="Instagram" className="text-zinc-400 hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="#" aria-label="GitHub" className="text-zinc-400 hover:text-white transition-colors">
              GitHub
            </Link>
            <Link href="#" aria-label="X (Twitter)" className="text-zinc-400 hover:text-white transition-colors">
              X
            </Link>
          </div>
        </div>
      </div>

      {/* OVERSIZED BRAND WORDMARK */}
      {/* 
        This is intentionally wrapped in a container that allows the text to bleed 
        off the edges on very large screens, while ensuring no horizontal scrolling on the page.
      */}
      <div className="w-full overflow-hidden flex justify-center items-end mt-12 bg-zinc-950 select-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center pb-4 sm:pb-8"
        >
          <h1 
            className="font-bold tracking-tighter whitespace-nowrap leading-[0.8] mb-0 pb-0"
            style={{ 
              fontSize: "clamp(5rem, 16vw, 22rem)",
              letterSpacing: "-0.04em"
            }}
          >
            <span className="text-zinc-100">Simple</span>
            <span 
              className="transition-colors duration-500 hover:opacity-80 cursor-default"
              style={{ color: theme.primary }}
            >
              Diff
            </span>
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}
