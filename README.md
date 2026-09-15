# Smile Concept — Clinic Profile Site

Website profile for the **Smile Concept** dental clinic, rebuilt pixel-perfect from the
[smile-concept.vercel.app](https://smile-concept.vercel.app) prototype using Next.js App Router +
Tailwind CSS v4 + shadcn/ui.

## Stack

- **Next.js 15.2.8** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** — color/font tokens live in the `@theme` block of `src/app/globals.css`
  (not `tailwind.config.ts`; that file is nearly empty)
- **shadcn/ui** + **Embla Carousel** + **framer-motion**
- **External CMS**: `https://cms.tumbuhsehat.id/api` (settings, posts, promos)

## Getting started

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build
npm run lint
```

No `.env` file is required — both variables have code defaults. Copy `.env.example` → `.env.local`
only if you want to override one:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CMS_API_URL` | `https://cms.tumbuhsehat.id/api` | CMS base URL, no trailing slash |
| `NEXT_PUBLIC_SITE_URL` | `https://smileconcept.id` | site origin — canonical URLs, OG tags, sitemap |

⚠️ The `NEXT_PUBLIC_SITE_URL` default is still a **guess**; change it once the production domain
is confirmed.

## Routes

```
/                        home (9 sections)
/treatments              listing · /treatments/[slug] detail
/doctors                 listing · /doctors/[slug] detail
/promo                   promos from the CMS (static fallback while the CMS is empty)
/blog · /blog/id · /blog/en · /blog/[slug]
/api/sitemap             sitemap route handler
```

## Important notes

- **CMS rate limit is 5 req/min/IP.** All fetches go through the Next Data Cache with long
  `revalidate` windows. Do not switch to `cache: "no-store"`.
- **Typography & layout must go through the existing utilities**: `h1-display`, `h2`,
  `h3-subheadline`, `h4`, `body-text`, `caption`, `btn-primary`, `btn-outline` (defined as
  `@utility` in `globals.css`) plus the `<Shell>` component. Do not hand-tune sizes per element.
- **Pixel-perfect rule**: visuals must match the prototype exactly. Do not improvise the design —
  see `CLAUDE.md`.
- Static content (treatments, doctors, home sections) lives in `src/lib/data/` and
  `src/sections/home/`; only settings/posts/promos are CMS-driven.

## Further documentation

| File | Contents |
|---|---|
| `HANDOFF.md` | Handover status: CMS integration, setup, pitfalls, remaining work |
| `CONTENT-CHECKLIST.md` | Content checkpoint: done vs brief, what remains |
| `PLAN.md` | Build log per phase + rationale for every technical decision |
| `CLAUDE.md` | Working rules (fidelity, conventions, commands) |
