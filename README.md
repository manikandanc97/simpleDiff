# SimpleDiff

> **Keep It Simple. Make It Different.**

SimpleDiff is a software development company that designs, engineers, and deploys custom software, web applications, mobile apps, SaaS platforms, and enterprise solutions for businesses, startups, and founders.

We eliminate boilerplate, over-engineering, and technical bloat to ship clean, fast, and high-impact digital products.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: Radix / Base UI / shadcn primitives
- **Motion**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Backend / DB**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) for lead capture and secure storage
- **Font**: Geist Sans and Geist Mono

---

## 📁 Repository Structure

```
├── app/
│   ├── layout.tsx              # Root layout with zero-flicker theme script & metadataBase
│   ├── page.tsx                # Home page (Hero, WhatWeBuild, Philosophy, CTA)
│   ├── services/               # Services page (8 client services + interactive scoping)
│   ├── work/                   # Work & concept studies with interactive before/after diffs
│   ├── lab/                    # Ideas & experiments page
│   ├── about/                  # About page (who we are, principles, honest studio profile)
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # Robots.txt generator
│   └── sitemap.ts              # Sitemap generator
├── components/
│   ├── layout/                 # Sidebar, Topbar, Status-bar
│   ├── leads/                  # Lead dialog, form, and provider (real lead capture)
│   ├── pages/                  # Page-level client views (work, services, lab)
│   ├── sections/               # Home sections (what-we-build, philosophy, cta, build-your-idea)
│   ├── theme/                  # Theme toggle, color picker, and color provider
│   ├── ui/                     # UI components (dialog, button, command-palette, etc.)
│   └── workbench/              # Interactive hero workbench and blueprint card
├── lib/
│   ├── site.ts                 # Centralized studio configuration (owner details, contacts)
│   ├── nav.ts                  # Shared navigation items
│   ├── colors.ts               # Theme palettes with WCAG-compliant high-contrast text
│   ├── idea-engine.ts          # Deterministic idea classification and scope generator
│   ├── idea-engine.test-cases.ts # Classification unit test suite
│   ├── leads/                  # Lead schema (anti-spam, honeypot) & Server Actions
│   └── data/                   # Projects and experiments data
└── supabase/
    └── leads.sql               # Database schema with RLS for lead storage
```

---

## ⚙️ Getting Started

### 1. Prerequisites

- Node.js 20+
- npm, pnpm, or bun

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure the following variables:

```env
# Public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (Server-side only — used for lead capture)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

> **Note**: In development, if Supabase credentials are not provided, lead submissions will safely log to the server console as a fallback instead of throwing an error.

### 4. Database Setup (Supabase)

To enable lead capture storage:
1. Create a project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Run the SQL script located at [`supabase/leads.sql`](supabase/leads.sql).
4. Row Level Security (RLS) is enabled with no public read/write access. Only the server-side service role key can insert records.

### 5. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🧪 Verification & Testing

### TypeScript Check
```bash
npx tsc --noEmit
```

### ESLint Check
```bash
npm run lint
```

### Production Build
```bash
npm run build
```
*All routes are fully static (`○`) for maximum performance and instant CDN edge delivery.*

### Idea Engine Tests
```bash
npx tsx lib/idea-engine.test-cases.ts
```

---

## 🎨 Owner Customization

All studio identity details are centralized in [`lib/site.ts`](lib/site.ts). Update this file to configure:
- Studio email and telephone
- Physical/virtual location
- Social profile links
- Availability status indicator
- Starting pricing benchmarks

---

## 📄 License

Private & proprietary — SimpleDiff.
