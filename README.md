HEAD
# Sahil Brahmankar — AI Engineer Portfolio

Premium interactive portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis.

## shadcn / TypeScript setup

This repo is configured for **shadcn-style** UI components:

| Path | Purpose |
|------|---------|
| `src/components/ui/` | shadcn components (e.g. `elegant-dark-pattern.tsx`) |
| `src/lib/utils.ts` | `cn()` helper (`clsx` + `tailwind-merge`) |
| `components.json` | shadcn CLI config |
| `@/*` | Path alias → `src/*` (see `vite.config.js`, `tsconfig.json`) |

To add more shadcn components from the CLI (after [Node 20.19+](https://nodejs.org/) if needed):

```bash
npx shadcn@latest init   # only if you reset config; aliases already match
npx shadcn@latest add button
```

**Why `components/ui`?** The shadcn CLI and docs assume primitives live under `components/ui`, separate from app-specific sections in `components/sections`. That keeps generated UI copy-pasteable and upgrades predictable.

Existing portfolio sections remain **JavaScript** (`.jsx`); new shadcn pieces can be **TypeScript** (`.tsx`) side by side.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Resume PDF

Place your resume at **`public/resume.pdf`**. All “Download Resume” buttons link to `/resume.pdf`.

## Update content

Edit structured data in `src/data/`:

- `profile.js` — name, links, summary
- `projects.js` — projects (add `github` / `demo` URLs when available)
- `skills.js` — skills and constellation links
- `experience.js` — internship and jobs
- `education.js` — degree
- `certifications.js` — credentials

## Deploy

Deploy the `dist` folder to Vercel, Netlify, Cloudflare Pages, or GitHub Pages (with SPA fallback).

# portfolio
origin/main
