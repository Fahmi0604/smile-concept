# CLAUDE.md — clinic-profile-onyx

## Goal

Build the **Smile Concept** dental-clinic site inside THIS existing repo, reproducing the
prototype **pixel-perfect**, but written idiomatically with **Tailwind v4 utilities + shadcn/ui**
(NOT by copying the prototype's CSS).

## Sources

- Design prototype (source of truth for visuals): https://github.com/gilangilma/smile-concept
  (live: https://smile-concept.vercel.app). Clone locally and reference it at:
  `/Users/mgg/Documents/code/temp/smile-concept/smile-concept`
- This app: Next.js 15 + React 19 + TS, Tailwind v4, shadcn/ui, Prisma, Embla, framer-motion.

## Existing stack (use what's here — do NOT reinvent)

- Next.js **15.2.8** (App Router), React **19**, TypeScript 5, source in `src/`.
- **Tailwind CSS v4** (`tailwindcss@4`, `@tailwindcss/postcss`). Tokens live in CSS `@theme`,
  NOT in a v3-style `tailwind.config.ts` object.
- **shadcn/ui** is installed (`components.json`; Radix accordion/dialog/dropdown/popover/label/slot;
  `cn()` via clsx + tailwind-merge; `lucide-react`). Prefer adding/using shadcn primitives.
- **embla-carousel-react** + **embla-carousel-autoplay** → use for the prototype's sliders
  (Transformations, Facility). Prefer shadcn's Carousel (Embla-based) if present.
- **framer-motion** → for animations/scroll effects.
- **Prisma** (`@prisma/client`, `prisma`) → backing store for the CMS.
- `next-sitemap`, `@svgr/webpack` (import SVGs as components), `@tailwindcss/typography`.

> First action: inventory `src/` to see what already exists (pages, components, lib, prisma
> schema, globals.css, shadcn setup) BEFORE building anything. Don't duplicate existing work.

## CRITICAL RULE: Pixel-Perfect Fidelity

The public site MUST match the prototype EXACTLY (layout, spacing, sizing, colors, fonts,
radius, shadows, breakpoints).

- We rebuild in Tailwind utilities, but the VALUES must come from the prototype.
- Read the prototype's `css/styles.css` + `smile-concept-type-scale.md` and extract exact
  numbers; translate them to Tailwind utilities or arbitrary values (e.g. `px-[116px]`,
  `min-h-[680px]`) so the result is identical.
- Do NOT improvise spacing/type. Do NOT swap fonts. Do NOT "improve" the design.
- If matching seems to require a design change, STOP and ask.

## Design Tokens → Tailwind v4 `@theme` (in globals.css)

Load fonts with `next/font/google`, expose them as CSS variables, then map in `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #15384f;
  --color-emphasize: #d1e7f6;
  --color-surface: #e2e1dd;

  --font-display: var(--font-playfair), serif; /* Playfair Display 400,500 */
  --font-subhead:
    var(--font-familjen), sans-serif; /* Familjen Grotesk 400,500,600 */
  --font-body: var(--font-inclusive), sans-serif; /* Inclusive Sans */
}
```

Body default: `bg-white text-ink`.
Shell width 1440px: register a token if it cleanly yields `max-w-shell`, otherwise just use
`max-w-[1440px]`. Verify against the actual v4 config in this repo.

## Typography scale

The prototype defines roles: `h1-display`, `h2`, `h3-subheadline`, `h4`, `body-text`, `caption`.
Read `smile-concept-type-scale.md` + `styles.css` for exact size/weight/line-height per role,
then encode each role ONCE (as small typography React components, or v4 `@utility` classes) and
reuse — do not hand-tune font sizes per element.

## Reusable layout pattern

Every section in the prototype wraps content in:
`max-w-shell mx-auto px-6 md:px-12 lg:px-[116px]`
Make a `Shell`/`Container` component for this and reuse it everywhere.

## Pages to build

`index` (home), `treatments`, `doctors`, `promo`, `blog`, `blog-braces`, `braces`, `kalya`.
Use App Router routes under `src/app/`.

## Home sections (build in this order)

hero → stats bar → treatments (image switcher) → doctors → transformations (carousel) →
promo (cards + insurance marquee) → facility (carousel) → testimonial → CTA block → footer.

## Interactions (map to existing libs, as client components)

- Mobile nav toggle (hamburger + drawer, manage `aria-expanded`) → `"use client"` + `useState`.
- Treatments image switcher (click list item → swap active image) → `useState`.
- Transformations carousel + Facility carousel → **shadcn Carousel / Embla** (dots + prev/next).
- Insurance logo marquee → CSS animation (or framer-motion); keep duplicated track for seamless loop.

## Icons & images

- Prototype uses inline SVGs (arrows, social, stars). Reuse as components, or swap for
  `lucide-react` equivalents where identical. Keep visual result the same.
- Copy `assets/` → `public/`. Use `next/image` where it doesn't change layout; keep exact
  dimensions/aspect ratios. If unsure, keep `<img>` to guarantee fidelity.

## Verification

After each section, compare against https://smile-concept.vercel.app at mobile / tablet /
desktop. Report pixel diffs instead of silently restyling.

## Conventions

- TypeScript everywhere; type props. Server Components by default; `"use client"` only when needed.
- Use the existing `cn()` helper. Don't add dependencies without asking.
- Match the prototype's breakpoints (its Tailwind defaults: `sm/md/lg`).

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
