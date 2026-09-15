# Smile Concept Rebuild Plan

Living reference for the wholesale rebuild of this repo's UI to match the **Smile Concept** prototype pixel-perfect.

- **Prototype (source of truth)**: https://smile-concept.vercel.app
- **Prototype local clone**: `/Users/mgg/Documents/code/temp/smile-concept/smile-concept`
- **Pixel-fidelity rule**: values come from prototype's `css/styles.css` + `smile-concept-type-scale.md`. No improvising sizes, fonts, or spacing. If matching seems to require a design change, stop and ask.

---

## Strategy

**Approach: wholesale replace Onyx with Smile Concept (1a).** All existing Onyx pages, sections, and assets get rewritten in place. Routes are renamed where the prototype names differ.

**Transition state**: as we work section-by-section, Onyx pages still in the routes will look stale (no `font-eb-garamond`, no `custom-*` palette) but won't crash — they fall back to the new body defaults. Final cleanup removes dead Onyx tokens + components after every page is rebuilt.

---

## Phase 0 — Foundation (DONE)

- [x] Inventory `src/`
- [x] Verify prototype clone at `/Users/mgg/Documents/code/temp/smile-concept/smile-concept`
- [x] Swap fonts globally → Playfair Display / Familjen Grotesk / Inclusive Sans loaded via Google Fonts `<link>` in `src/app/layout.tsx` `<head>` (matches the prototype)
  - **Why not next/font/google**: tried it first; next/font renames the family internally to avoid SSR mismatch, so the `--font-playfair` etc. variable chain has to resolve perfectly. The chain broke at `--font-body` ("not defined" on body in DevTools). Pivoted to Google Fonts `<link>` + literal `"Playfair Display"` / `"Familjen Grotesk"` / `"Inclusive Sans"` names. `src/app/fonts/custom-fonts.ts` is now unused — leave for Phase 5 cleanup.
- [x] Body defaults → `bg-white text-ink font-body antialiased`
- [x] Add `@theme` tokens in `src/app/globals.css`:
  - Colors: `--color-ink #15384f`, `--color-emphasize #d1e7f6`, `--color-surface #e2e1dd`
  - Fonts: `--font-display`, `--font-subhead`, `--font-body`
- [x] Add `@utility` typography classes: `h1-display`, `h2`, `h3-subheadline`, `h4`, `body-text`, `caption`, `button-large`, `button-small` (incl. mobile overrides at `max-width: 767px`)
- [x] Add `Shell` container component → `src/components/Shell.tsx` (`mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-[116px]`)

---

## Phase 1 — Shared chrome (DONE)

Things that frame every page. Built before sections so individual pages drop into them cleanly.

- [x] **Buttons** — added `@utility btn-primary` and `@utility btn-outline` in `src/app/globals.css`
  - Chose v4 `@utility` (not shadcn Button variants) so they compose naturally with `button-large` / `button-small` and work on both `<a>` and `<button>` per prototype usage
  - `.btn-primary`: ink bg, white text, rounded-full, hover `#0f2a3d` + `-1px` translate + drop shadow, focus-visible 2px outline
  - `.btn-outline`: 1.5px ink border, transparent bg, ink text, inverts on hover, focus-visible 2px outline
  - Existing shadcn `Button` left untouched for Onyx pages still in tree

- [x] **Navbar** — `src/components/Navbar.tsx` full rewrite, `NavbarSheet.tsx` deleted
  - Floating pill `fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[min(calc(100%-24px),1280px)] z-50`
  - Glassmorphism: `bg-white/[0.78] backdrop-blur-[14px] backdrop-saturate-[1.4]` + `border-white/60` + custom inset/drop shadow
  - Brand `/assets/smile-concept/Logo1.png` (h-8 mobile / h-10 ≥md)
  - 4 links via `min-[900px]:flex`: Treatments, Doctors, Promo (with `Discount.png` icon), Blog
  - Book Now `btn-primary button-small` hidden below `min-[560px]`
  - Animated hamburger (3 spans → +/× via translate+rotate on `open` state)
  - Mobile dropdown card below pill (`rounded-3xl bg-white/[0.92]` + custom shadow), 4 stacked links + full-width CTA — replaces old slide-in sheet

- [x] **Footer** — `src/components/Footer.tsx` full rewrite
  - `bg-ink text-white pt-16 pb-10`, uses `<Shell>` for container
  - Logo `/assets/smile-concept/Logo3.png` (h-14)
  - 3-col grid (`md:grid-cols-3`), stacks on mobile: Address + maps link / Reach us + socials / Footer nav
  - Inline Instagram + YouTube SVGs (matching prototype)
  - Wires `settings.contactInfo.phone`, `settings.mapUrl`, `settings.socials.instagram`, `settings.socials.youtube`; prototype defaults as fallback
  - Hardcoded for now: address lines, `hello@smileconcept.id` (no email field in `Setting`)
  - Centered `© {currentYear} Smile Concept`

### Phase 1 assets copied to `public/assets/smile-concept/`
- `Logo1.png` (nav brand), `Logo3.png` (footer logo), `Discount.png` (promo nav icon)

### Phase 1 known transitional issue
Floating nav is `fixed`; existing Onyx pages have no top-padding accounting for it. When Phase 2 hero lands (`pt-24 md:pt-28 lg:pt-[190px]`) this resolves. Until then nav overlaps Onyx page content visually.

---

## Phase 2 — Home sections (DONE)

All home sections live under `src/sections/home/`. Replace `Section1…Section6` + `hero.tsx` with semantically named files; update `src/app/page.tsx` to import them.

Prototype source for every section: `/Users/mgg/Documents/code/temp/smile-concept/smile-concept/index.html` + matching block in `css/styles.css`.

- [x] **hero** → `src/sections/home/hero.tsx` (full rewrite, default export now `HomeHero`)
  - CSS ref: `styles.css` "Hero" (~144–303)
  - Section: `relative isolate overflow-hidden bg-white md:min-h-[680px]`
  - Layer 1 (`-z-[3]`): bg image via `next/image` `fill` + `object-cover object-center`, `priority`
  - Layer 2 (`-z-[2]`): white side-fade overlay (336°-direction on desktop, top→bottom on `max-md`) as arbitrary linear-gradient utilities
  - Layer 3 (`-z-[1]`): emphasize-blue tint, 336° on desktop, 180° on mobile
  - Woman desktop: `<img>` absolute `right-16 top-[87px] h-[124%] w-auto`, hidden below `lg`
  - Woman mobile: inline `<img>` inside content shell, bleeds Shell padding via `w-[calc(100%+48px)] -mx-6 h-[340px] overflow-hidden`, image `w-3/5 h-full object-cover object-[center_top] mx-auto`, `order-2` so it sits below para
  - Content shell uses `<Shell>` + `flex flex-col pt-24 md:pt-28 lg:pt-[190px] pb-0 md:pb-14 lg:pb-[80px]`
  - Headline group: `gap-3 md:max-w-[620px]`; eyebrow `h3-subheadline`; h1 uses `h1-display` with `space-between` on desktop / `flex-start gap-5` on mobile, inline swoosh SVG `w-[65px] max-md:w-[clamp(28px,7vw,44px)]`
  - Body para `body-text mt-10 max-w-[680px]` with mobile override to 18px/1.4/0.02em (prototype caps it below `body-text`'s 24px)
  - CTA `btn-primary button-large mt-10 self-start`, hidden on mobile (`max-md:hidden`) — moves to statsbar per prototype
  - `page.tsx` import renamed `HeroVideoResponsive → HomeHero`
  - Assets copied: `hero-bg.png`, `woman-hero.png`

- [x] **stats bar** → `src/sections/home/stats-bar.tsx`
  - CSS ref: `styles.css` "Stats Bar" (~539–611)
  - `<section className="bg-emphasize py-10 max-md:py-4">` wraps `<Shell>`
  - Mobile-only WhatsApp CTA (`btn-primary button-large w-full mb-5 md:hidden`) — replaces hero CTA at `max-md`
  - 4 stat items in a single `<ul>`: `flex items-center` desktop, `max-md:grid max-md:grid-cols-2 max-md:gap-y-6` mobile
  - Dividers are `<li aria-hidden>` with `flex-1 self-stretch relative` + `after:` pseudo (1px vertical line, `after:bg-ink`) — hidden on mobile (`max-md:hidden`)
  - Items use `h3-subheadline` (value) + `caption` (label), `flex-col gap-1 shrink-0 text-left`
  - Mobile reorder via `max-md:order-3` (Satisfied patients) + `max-md:order-2` (Doctor's experience) → renders as `Google rating / Insurance partners // Doctor's experience / Satisfied patients` in 2-col grid
  - Wires `settings.link_whatsapp` for CTA href with `https://wa.me/` fallback
  - `page.tsx`: imported `StatsBar`, removed `Section1` import (replaced); dropped invalid nested-main `<PageWrapper>` (was `motion.main` with Onyx `bg-custom-primary`) — body's `bg-white` now shows through correctly per prototype

- [x] **treatments (image switcher)** → `src/sections/home/treatments.tsx`
  - CSS ref: `styles.css` "Treatments" (~617–784)
  - Client component with `useState` for active index
  - Section: `bg-white pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]`, wraps `<Shell>`
  - Title: `h2 text-ink mb-20 max-md:mb-8`
  - Body: `flex items-start gap-14 max-md:flex-col max-md:gap-8`
  - Media panel: `w-[42%] shrink-0 max-md:w-full`; wrap is `relative overflow-hidden rounded-[20px] bg-surface aspect-[3/4] max-md:aspect-square`
  - 3 `next/image` `fill` images stacked absolute, opacity-0 → opacity-100 on `i === active`, `transition-opacity duration-500`, `object-cover object-top`; first image is `priority`
  - Sidebar: `flex flex-1 flex-col items-start gap-16 pt-2`
  - List: `flex flex-col gap-4 w-full`, items `flex flex-col gap-1.5 rounded-3xl px-6 py-5 cursor-pointer transition-colors hover:bg-emphasize`; active gets `bg-emphasize`
  - Item title uses `.h4` utility + `text-ink font-medium`; subtitle is plain `font-body text-[16px] leading-[1.5] text-ink/75` (prototype's `treatments__item-sub` size — smaller than caption)
  - Keyboard: items are `role="button" tabIndex=0`, `Enter`/`Space` activates; `aria-pressed` reflects active state
  - **Interactions** (matches prototype `js/main.js`):
    - 4-second auto-rotate via `setInterval` in a `useEffect` keyed on `isPaused` + `resetTick`
    - Hover on item: pauses auto-advance + sets active to that item
    - Mouse leave from item OR from sidebar wrapper: resumes auto-advance
    - Click / Enter / Space: sets active + bumps `resetTick` so the effect tears down and restarts a fresh 4s timer
  - CTA: `<Link href="/treatments" className="btn-outline button-large max-md:w-full max-md:justify-center">` with inline arrow SVG
  - Did NOT add the bottom swoosh — prototype HTML omits it on home (it's defined in CSS but the `index.html` doesn't render it); skipping unless we spot it in the live site
  - `page.tsx`: imported `Treatments` after `StatsBar`, removed `Section2` (Onyx)
  - Assets copied: `ModelTreatment1.png`, `ModelTreatment2.png`, `ModelTreatment3.png`

- [x] **doctors** → `src/sections/home/doctors.tsx` (server component)
  - CSS ref: `styles.css` "Doctors" (~790–890)
  - Section: `bg-surface pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]`
  - Shell as `flex flex-col` with cross-breakpoint reorder via Tailwind `order-*` utilities:
    - Header: default `order-0` (DOM first)
    - Photo: `order-2 md:order-3`
    - Features: `order-3 md:order-2`
    - Mobile CTA: `order-4 md:hidden`
    - Resulting flow: desktop `header → features → photo`; mobile `header → photo → features → mobile CTA`
  - Header: `flex items-center justify-between gap-6 mb-20 max-md:mb-8 max-md:flex-wrap`; desktop CTA `btn-outline button-large max-md:hidden`
  - Features grid: `grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-7`; each item uses `h4 text-ink mb-2` title + `caption text-ink` description
  - Mobile CTA: `btn-outline button-large mt-8 justify-center md:hidden`
  - Photo: `next/image` width 1440×720, `w-full h-auto rounded-[20px]`
  - Decorative corner SVGs (`doctors__deco--tl/br`) defined in prototype CSS but NOT rendered in `index.html` — skipping (same pattern as the treatments swoosh)
  - `page.tsx`: imported `Doctors` after `Treatments`, removed `Section3` (Onyx)
  - Asset copied: `Doctors.png`

- [x] **transformations carousel** → `src/sections/home/transformations.tsx` (client component)
  - CSS ref: `styles.css` "Transformations" (~1199–1325), JS ref `js/main.js` lines 100–230
  - Section: `bg-[#f3f3f1] pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]`
  - Title `h2 text-ink mb-20 max-md:mb-8`
  - Uses shadcn `Carousel` + `CarouselContent` + `CarouselItem` (Embla-based) from `@/components/ui/carousel`
  - **Spacing override**: shadcn's `CarouselContent` defaults to `-ml-4`, `CarouselItem` to `pl-4` (16px visual gap). Overrode to `ml-0 gap-5` on Content + `pl-0` on Item to get a real CSS gap of 20px and clean basis math
  - **Responsive basis** (matches prototype's `--cards-visible` formula `(100% - (n-1)*20px) / n`):
    - `basis-full` (n=1, max-md)
    - `md:basis-[calc((100%-20px)/2)]` (n=2, 768–1023)
    - `lg:basis-[calc((100%-46px)/3.3)]` (n=3.3, lg+)
  - Embla opts: `{ align: 'start', loop: false, containScroll: 'trimSnaps', slidesToScroll: 1 }`
  - 5 cards (all reusing `Before_after.png`); each card has `next/image w-full aspect-[4/5] object-cover rounded-[20px]` + `.h4 mt-3.5` title + `.caption mt-1.5` desc
  - **Custom controls** (no shadcn `CarouselPrevious`/`Next` — they're absolute-positioned, prototype wants inline below):
    - Built via `setApi` callback + `useState` for `selected`, `snapPoints`, `canPrev`, `canNext`; subscribed to Embla `select` + `reInit` events
    - Dots row + arrows row in `mt-7 flex items-center justify-between`
    - Dots: `size-1.5 rounded-full bg-ink/20`, active = `bg-ink scale-[1.15]` via `data-[active=true]:` variants
    - Arrows: `size-9 rounded-full border-ink/15 bg-white/65`, hover `bg-emphasize/80 border-ink/30`, disabled `opacity-[0.45]`; inline chevron SVGs matching prototype paths exactly
  - `page.tsx`: imported `Transformations` after `Doctors`, removed `Section4` (Onyx)
  - Asset copied: `Before_after.png`

- [x] **promo (cards + insurance marquee)** → `src/sections/home/promo.tsx` (server component)
  - CSS ref: `styles.css` "Promo" (~897–1193)
  - Section: `bg-surface pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]`, `<Shell as="div" className="flex flex-col">`
  - Header: `flex items-center justify-between gap-6 mb-20 max-md:mb-8`; "See all promos" CTA `btn-outline button-large max-md:hidden`
  - Grid: `grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4`
  - **Card** (`<article>`): `flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white`
    - Img wrap: `relative aspect-[4/3] shrink-0 overflow-hidden bg-[#d4d3cf]` + `next/image fill object-cover object-top`
    - Badge: `caption absolute top-4 left-4 rounded-full bg-emphasize text-ink px-3.5 py-1.5 [box-shadow:0_2px_8px_rgba(0,0,0,0.10)]`
    - Body: `flex flex-1 flex-col p-6` — `h4 text-ink mb-3` title; perks `ul.caption flex-col gap-1 flex-1` with `before:content-['·']` bullets; pricing `mt-5 mb-4 flex flex-col gap-0.5`: original `font-body text-[15px] text-ink/50 line-through`, current `font-subhead text-[24px] font-semibold leading-[1.2] text-ink`; CTA `btn-primary button-small w-full text-white` with `data-cta` matching prototype tags
  - Divider: `<hr className="m-0 mt-16 mb-12 border-0 border-t border-ink/20">`
  - Insurance: `flex flex-col gap-10`; label `font-subhead text-[24px] font-medium leading-[1.2]`
  - **Marquee** (CSS animation, no JS):
    - Added `@keyframes promo-marquee` + `.promo-marquee-track` (`animation: promo-marquee 60s linear infinite`) + `.promo-mask` (mask-image fade) to `globals.css`
    - Mobile mask narrower (48px vs 72px edge fade)
    - Two `InsuranceList`s rendered inside the track — second has `aria-hidden` for seamless duplicate
    - `prefers-reduced-motion`: animation off, track wraps, hides aria-hidden duplicate, mask off — all in the CSS file
    - Logo: `<img>` (plain, eslint-disable) `block h-12 w-auto max-w-[140px] object-contain max-md:h-9`
    - **Deviation from prototype**: each list uses `pr-10 max-md:pr-6` (40/24px right pad) instead of the prototype's `padding: 0 20px 0 0` (20px). The prototype's smaller right-pad creates a tighter gap (20px) between the last logo of list 1 and the first logo of list 2 vs the 40px gap between interior logos, which reads as a visible "stutter" mid-cycle. Matching the right-pad to the internal gap keeps the rhythm consistent across the loop seam. translateX(-50%) math still works because the two lists are identical width.
  - Wires `settings.link_whatsapp` for card CTA hrefs (fallback `https://wa.me/`)
  - `page.tsx`: imported `Promo` after `Transformations`, removed `Section5` (Onyx); passes `settings.data`
  - Assets copied (9): `promo-card-img1–3.png`, `Allianz.png`, `Zurich.png`, `BCA.png`, `CHUBB.png`, `AdMedika.png`, `AIA.png`

- [x] **facility carousel** → `src/sections/home/facility.tsx` (client component)
  - CSS ref: `styles.css` "Facility" (~1331–1448)
  - Same structure as transformations.tsx (shadcn `Carousel` + custom dots/arrows via `setApi`), with these differences:
    - Section bg: none (inherits body `bg-white`); pt-20 pb-[100px] (max-md: pt-14 pb-[72px])
    - Gap: 12px (`gap-3`) instead of 20px
    - Image: `aspect-[4/3]` instead of `aspect-[4/5]`, `rounded-[14px]` instead of `rounded-[20px]`
    - Arrow buttons: `size-7` (28px) instead of `size-9` (36px); `bg-white/60` instead of `/65`
    - Dot bg: `bg-ink/25` instead of `bg-ink/20`
    - Controls bar: `mt-6` instead of `mt-7`
    - Responsive basis matches prototype's `(100% - (n-1)*12px) / n`:
      - `basis-full` (n=1, max-md)
      - `md:basis-[calc((100%-12px)/2)]` (n=2, 768–1023)
      - `lg:basis-[calc((100%-27.6px)/3.3)]` (n=3.3, lg+)
    - 6 cards: Facility1/2/3 + 3 Placeholder
  - `page.tsx`: imported `Facility` after `Promo`, removed `Section6` (Onyx)
  - Assets copied: `Facility1.png`, `Facility2.png`, `Facility3.png`, `Placeholder.png`
  - Did NOT extract a shared `<CardCarousel>` helper with transformations — too many small dimension differences (gap, aspect, radius, arrow size, dot color, controls mt) that'd turn into a long prop list. Easier to read as two parallel files.

- [x] **testimonial** → `src/sections/home/testimonial.tsx` (server component)
  - CSS ref: `styles.css` "Testimonial" (~1454–1549)
  - Section: `bg-white pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]`
  - Title `h2 text-ink mb-20 max-md:mb-8`
  - Card: `flex overflow-hidden rounded-[20px] bg-surface min-h-[420px]` desktop, `max-md:flex-col max-md:min-h-0`
  - Image wrap: `relative shrink-0 basis-[45%]` desktop; `max-md:basis-auto max-md:aspect-[4/3]` mobile
  - Image: `next/image fill object-cover object-top`, `max-md:rounded-t-[20px]` for the top corners when stacked
  - Stars cluster: absolute `bottom-6 left-8 flex gap-1.5` desktop, `max-md:bottom-4 max-md:left-5`; 5× inline 20×20 SVG with fill `#F5C518`, exact prototype path
  - Content: `flex flex-1 flex-col justify-center gap-8 px-[60px] py-[56px]` desktop; `max-md:gap-6 max-md:px-6 max-md:py-8`
  - Quote: `body-text text-ink m-0`
  - Author: `flex flex-col gap-1`; name `h4 text-ink`, role `caption text-ink block`
  - `page.tsx`: imported `Testimonial` after `Facility` (Onyx `<Cta>` still trailing — replaced by CTA block next)
  - Asset copied: `Testimony.png`

- [x] **CTA block** → `src/sections/home/cta-block.tsx` (server component)
  - CSS ref: `styles.css` "CTA Block" (~1555–1650)
  - Section: `relative isolate flex items-center overflow-hidden min-h-[680px]` desktop; `max-md:min-h-0 max-md:flex-col max-md:items-stretch`
  - Layer 1 (`-z-[2]`): bg via `next/image fill`, `object-cover object-center`
  - Layer 2 (`-z-[1]`): emphasize-blue overlay — `linear-gradient(to right, …)` desktop (right-to-left fade), `max-md:` overrides with `linear-gradient(to bottom, …)` for vertical fade
  - Woman (Reception.png): single `<img>` with default `absolute right-0 bottom-0 h-full w-auto` (desktop), `max-md:relative max-md:right-auto max-md:bottom-auto max-md:order-2 max-md:block max-md:h-auto max-md:w-full` (mobile inline at bottom)
  - Content: `<Shell>` with `relative z-[1] flex flex-col items-start gap-9 py-20`; `max-md:order-1 max-md:gap-6 max-md:pt-12 max-md:pb-8`
  - Title: `h2 text-ink` with `<br />` between lines
  - CTA: `btn-primary button-large self-start`, wires `settings.link_whatsapp`, `data-cta="ctablock-whatsapp"`
  - `page.tsx`: replaced trailing Onyx `<Cta>` with `<CtaBlock settings={settings.data} />`; removed `Cta` import
  - Assets copied: `Background_CTA.png`, `Reception.png`

After every section: visual diff vs https://smile-concept.vercel.app at 375 / 768 / 1280 / 1440 widths. Report deltas before moving on.

---

## Phase 3 — Pages (DONE)

### Decisions (locked 2026-06-05)
- **Data approach: keep CMS dynamic.** Reskin existing pages, preserve data wiring. In practice: blog stays on the real API (`getBlogs` → `api.onyxdentalcenter.id`); `getSettings` stays for WhatsApp CTA links. Treatments/doctors actually read **local data files** (`lib/data/treatment.ts`, `lib/data/doctor.ts`), not the API — but the prototype's treatments page uses a *different* shape (3 categories each with named link-items) that doesn't map to the flat Onyx model, so that content is defined as a local typed structure in/near the page (the prototype hardcodes it too). Pixel-perfect layout is the priority; data stays editable.
- **Orphan Onyx pages (`/philosophy`, `/experience`, `/proven-result`): keep for now.** Revisit in Phase 5. They remain stale-Onyx-styled and may have dangling `/treatment` links after the rename (acceptable transitional state).
- **CtaBlock reuse**: prototype reuses the home CTA block verbatim on treatments (and others). Importing `@/sections/home/cta-block` rather than duplicating. If it spreads to many pages, consider moving to `@/components`.


Renames map prototype filenames to App Router routes. Existing Onyx pages get rewritten in place.

| Prototype file       | Target route                  | Existing route to repurpose   |
| -------------------- | ----------------------------- | ----------------------------- |
| `index.html`         | `/`                           | `src/app/page.tsx`            |
| `treatments.html`    | `/treatments`                 | rename `src/app/treatment/` → `src/app/treatments/` |
| `braces.html`        | `/treatments/braces`          | uses `src/app/treatments/[slug]/page.tsx` (renamed) |
| `doctors.html`       | `/doctors`                    | rename `src/app/ourteam/` → `src/app/doctors/` |
| `kalya.html`         | `/doctors/kalya`              | uses `src/app/doctors/[slug]/page.tsx` (renamed) |
| `promo.html`         | `/promo`                      | new route                     |
| `blog.html`          | `/blog`                       | rename `src/app/blogs/` → `src/app/blog/` |
| `blog-braces.html`   | `/blog/braces`                | uses `src/app/blog/[slug]/page.tsx` (renamed) |

Per-page CSS refs live in `/Users/mgg/Documents/code/temp/smile-concept/smile-concept/css/`:

- `treatments-page.css` → treatments listing
- `treatment-detail.css` → braces detail
- `doctors-page.css` → doctors listing
- `doctor-detail.css` → kalya detail
- `promo-page.css` → promo listing
- `blog-page.css` → blog listing + blog-braces article

### Page tasks

- [x] `/` — done in Phase 2 (all home sections + CtaBlock, legacy `<Cta>` dropped)
- [x] `/treatments` + `/treatments/[slug]` (braces) — **DONE**
  - Folder renamed `src/app/treatment/` → `src/app/treatments/` via `git mv` (carries `[slug]/`)
  - `treatments/page.tsx` rewritten to match `treatments.html`: `bg-surface` page hero (`h2` title + `caption` para, `pt-40 pb-16`), 3 `CategorySection`s alternating image L/R via `grid-cols-[1fr_2fr]` / `[2fr_1fr]` + mobile order swap, 2-col `tx-item` grid (bordered pills, `font-subhead 24` name + `font-body 18 ink/60` sub, hover `border-ink bg-emphasize -translate-y-px`, arrow opacity 50→100), reuses `<CtaBlock>`
  - Content is a local `CATEGORIES` const (prototype hardcodes it; doesn't map to flat `lib/data/treatment.ts`). "Braces" → `/treatments/braces` (internal); all others → WhatsApp (`settings.link_whatsapp`)
  - **Detail page is dynamic `[slug]`**, not braces-only. New data file `src/lib/data/treatment-detail.ts` keyed by slug (`braces` populated from prototype; add more slugs as authored). Type: `{ slug, title, description, tags[], heroImage, heroImageAlt, ctaLabel, results[] }`
  - `[slug]/page.tsx` rewritten to `braces.html` layout: `td-hero` 2-col grid (`md:grid-cols-2 md:min-h-[640px]`, content left with asymmetric mobile-first paddings `pt-30 px-6 pb-12` → `md:pt-[140px] md:pl-12 md:pr-10 md:pb-[72px]` → `lg:pt-[148px] lg:pl-[116px] lg:pr-14 lg:pb-20`, full-bleed image right via `next/image fill`, mobile `h-80`), then `bg-emphasize` "Proven results" (`h3-subheadline` + 3-col card grid, rounded-2xl image + `font-body 18` label). Tags are emphasize pills with shadow. CTA wires `settings.link_whatsapp`. No CtaBlock (prototype detail omits it)
  - `generateStaticParams` from `Object.keys(treatmentDetails)`; unknown slug → `notFound()` (dynamicParams default true)
  - Old `lib/data/treatment.ts` (Onyx flat model) now **orphaned** — no imports remain; leave for Phase 5 cleanup
  - Assets copied: `Braces.png` (Before_after.png already present)
- [x] `/doctors` + `/doctors/[slug]` (kalya) — **DONE**
  - Folder renamed `src/app/ourteam/` → `src/app/doctors/` via `git mv` (carries `[slug]/`)
  - New data file `src/lib/data/doctor-list.ts`: 11 SC doctors (`{ name, specialty, image, alt, slug? }`); only Kalya has `slug: "kalya"` (→ `/doctors/kalya`), rest → WhatsApp
  - `doctors/page.tsx` rewritten to `doctors.html`: `bg-surface` hero (`h2` "Our caring doctors", `pt-40 pb-16`), `bg-white` grid section (`grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1`, gap-6/4), reuses `<CtaBlock>`
  - `DoctorCard`: `bg-emphasize rounded-[20px]`, 280px image (`next/image fill object-top`) with bottom `bg-gradient-to-b from-transparent to-emphasize` fade, `font-subhead 24` name + `font-body 16 ink/60` specialty, outline pill CTA (`mt-auto`, full-width, `border-ink/30` hover `border-ink bg-ink/[0.07]`) with `after:inset-0` making the whole card clickable
  - Fixed moved `[slug]/page.tsx` metadata `path` `/ourteam` → `/doctors` (still Onyx-styled/content + Onyx `doctor.ts` slugs — reskin as kalya detail next)
  - **Detail page is dynamic `[slug]`** (kalya is the one populated example). New data file `src/lib/data/doctor-detail.ts` keyed by slug. Type: `{ slug, name, specialty, image, imageAlt, schedule[{day,time}], education[], expertise[], ctaLabel }`
  - `[slug]/page.tsx` rewritten to `kalya.html`: `dd-hero` (bg-white `pt-30 pb-10 md:pt-[148px] md:pb-14`; `h2` name, `font-body 18 ink/60` specialty, schedule slots `flex gap-12 max-md:gap-8` with `font-body 18 ink/60` day + `font-subhead 24` time), then `dd-profile` card (`bg-emphasize rounded-[20px]` 2-col grid `md:grid-cols-2 md:min-h-[480px] md:max-h-[600px]`, photo left via `next/image fill` / mobile `h-80`, content right `flex flex-col gap-7` with responsive padding `px-6 pt-7 pb-8 → md:px-8 md:py-9 → lg:pt-12 lg:pr-12 lg:pb-12 lg:pl-11`). `Section` helper renders Pendidikan/Speciality lists with `before:content-['·']` bullets (`font-subhead 20/600` heading, `font-body 16` items). CTA `btn-primary button-large mt-auto self-start` (mobile full-width), wires `settings.link_whatsapp`. No CtaBlock (prototype detail omits it)
  - `generateStaticParams` from `Object.keys(doctorDetails)`; unknown → `notFound()`
  - Old `lib/data/doctor.ts` (Onyx) now **orphaned** (only `doctor-list`/`doctor-detail` imported); dead `section1.tsx` still links `/ourteam` (not imported anywhere) → Phase 5 cleanup
  - Asset: `Kalya.png` already copied with the listing
- [x] `/promo` — **DONE** (API-driven per request)
  - New route `src/app/promo/page.tsx` (no folder to rename): `bg-surface` hero (`h2` "Promo available", `pt-40 pb-16`) + `bg-white` grid section (`grid-cols-3 max-md:grid-cols-1`, gap-5/4)
  - **API wiring**: added `getPromos()` to `lib/api/index.ts` — fetches `${BASE_URL}/promos` (tag `promos`, 1h revalidate), falls back to static list on error OR empty payload (mirrors `getSettings`/`getBlogsForSitemap` resilience). Page calls `getPromos()` + `getSettings()` in `Promise.all`
  - **Types/data**: new global `Promo` type (`src/lib/types/Promo.d.ts`); static fallback `src/lib/data/promo.ts` = the 9 promos from `promo.html`
  - **Reuse**: extracted shared `src/components/PromoCard.tsx` (the `.promo-card` markup, takes `{ promo: Promo, bookHref }`). Refactored `src/sections/home/promo.tsx` to import it + use global `Promo` type; home keeps its own 3 inline cards (index.html values differ from promo.html — e.g. Damon 21.999.000/3 perks on home vs 22.000.000/4 perks on the promo page — so home is NOT switched to `getPromos().slice(0,3)`)
  - Note: real `/promos` API endpoint doesn't exist yet → page renders the 9 static fallback promos today, consumes the API automatically once it's live
  - Asset: promo-card images already copied with the home section
- [x] `/blog` + `/blog/[slug]` (+ `/blog/id`, `/blog/en`) — **DONE** (real `getBlogs` API)
  - Folder renamed `src/app/blogs/` → `src/app/blog/` via `git mv` (carries `[slug]/`, `id/`, `en/`)
  - Shared `src/components/BlogCard.tsx`: bordered `rounded-[20px]` card, 16:9 `next/image` (hover `scale-[1.03]`), date (`font-body 14 ink/50`), title (`font-subhead 22/500`), excerpt (`font-body 16 ink/65`), "Read more" + arrow, whole card clickable via `after:inset-0`. Date via `date-fns format`. **All cards active** (every CMS post has a detail page — the prototype's active/inactive split was only because it shipped one article)
  - `/blog/page.tsx` reskinned to `blog.html`: `bg-surface` hero (`h2` "Blog"), `bg-white` grid (`grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1`), `getBlogs()`, `revalidate=60`. **Language switcher dropped** (prototype has none)
  - `/blog/id` + `/blog/en` reskinned to the same layout via shared `BlogCard` (`getBlogsId`/`getBlogsEn`). Now unlinked from nav (no switcher) but still valid routes — Phase 5 decides keep/remove
  - `/blog/[slug]/page.tsx` reskinned to `blog-braces.html`: `article-hero` (`bg-surface`, date + `h2` title), full-bleed cover (`h-[480px] max-md:h-[280px]` `next/image fill`), `article-body` (`max-w-[720px] mx-auto`) rendering CMS HTML inside **`.article-prose`** (new globals.css class replicating prototype's `.article-body__inner` h2/p/ul/`·` typography), inline CTA wrap (border-top, `font-subhead 22` label + `btn-primary button-large`). Kept `JsonLd`; **dropped** `TableOfContents`, Onyx `<Cta>`, `PageWrapper`, `BlogContent` (its hardcoded Onyx classes — render HTML directly in `.article-prose` instead)
  - CTA wires `post.cta.url` → `settings.link_whatsapp` fallback; button/label localized by `post.language`
  - `next-sitemap.config.mjs`: `/blogs/${slug}` → `/blog/${slug}`. No `/blogs` refs remain anywhere; Navbar/Footer already pointed to `/blog`
  - `BlogContent.tsx` + `TableOfContents.tsx` now likely orphaned → Phase 5 audit
- [ ] `/philosophy`, `/experience`, `/proven-result` → **keep for now** (decision locked above), revisit Phase 5

---

## Build & environment notes (verified 2026-06-06)

`npm run build` passes; all 14 routes compile. Verified live via `npm run dev` that the blog renders real API posts.

- **Build fix**: `Navbar.tsx` `NAV_LINKS` was `as const`, so TS only saw `icon` on the Promo entry and rejected `link.icon` on the others → build type error. Fixed with an explicit `NavLinkItem[] = { label, href, icon? }` type (dropped `as const`).
- **Why `/blog` appeared broken locally**: the dev/build machine reaches `api.onyxdentalcenter.id` through a **TLS-intercepting proxy**, so Node's `fetch` rejects the chain with `SELF_SIGNED_CERT_IN_CHAIN`. `getSettings`/`getPromos` already swallowed errors (fallbacks) so other pages survived; `getBlogs` had **no** try/catch → it threw → the whole `/blog` route crashed. (`curl` works because it uses a different trust path; the API itself is healthy — confirmed `GET /api/public/posts` + `/posts/{slug}` both 200 with real data.)
- **Blog resilience**: `getBlogs()` now wraps the fetch in try/catch and returns `{ data: [] }` on failure (same pattern as the other endpoints); `/blog/page.tsx` shows an empty state ("No articles yet…") instead of crashing. Covers `/blog/id` + `/blog/en` too (they call `getBlogs`).
- **Local fetch fix**: `src/instrumentation.ts` (new) — Next startup hook that sets `NODE_TLS_REJECT_UNAUTHORIZED=0` **only** when `NODE_ENV==='development'` and `NEXT_RUNTIME==='nodejs'`. Lets `npm run dev` load real API data through the proxy. Production `build`/`start` (NODE_ENV=production) are untouched. Committable + safe; no insecure flag in any npm script.
- **Cold-start timeout**: first cold `getBlogs` through the proxy can exceed the fetcher's default 10s and fall back to empty (then works on refresh). Bumped the blog list fetch to `timeout: 20000` so the first load doesn't graze the abort. (`fetcher` supports a per-call `timeout`.)
- **Article body (RESOLVED)**: CMS `content` HTML ships **inline styles** (`<p style="…">`) that beat `.article-prose` by specificity. Decision (user): match the prototype → strip them. `src/lib/utils/html.ts` `stripInlineStyles()` removes `style="…"`/`style='…'` attributes (regex), applied in `/blog/[slug]/page.tsx` before `dangerouslySetInnerHTML`. Keeps all content/structure (tags, bold, links, lists), so `.article-prose` typography now wins. Build verified.
- `images.unoptimized: true` in `next.config.ts` → remote CMS thumbnails render as plain `<img>` and need no `remotePatterns` whitelisting. Some `thumbnailUrl`s have a harmless double slash (`…id//storage/…`).

---

## Phase 4 — Assets (DONE — favicon flagged)

- [x] Copy prototype assets → `public/assets/smile-concept/`. All **used** assets present (copied incrementally per section). Intentionally skipped (unreferenced by any built page): `All_doctor.png`, `Glass1.png`, `Glass2.png`, and `swoosh.svg` (the hero swoosh is inlined as JSX in `hero.tsx`, so the file isn't needed).
- [x] Verified `<img>`/`next/image` srcs: **all active SC pages/components reference only `/assets/smile-concept/*`** (grepped home + treatments/doctors/promo/blog + all home sections + shared components → clean). Fixed the one stray: `src/app/page.tsx` home metadata still had Onyx OG image + "Onyx Dental Center" title/description → updated to SC ("Smile Concept — Personalized care…", `hero-bg.png`).
- [x] Removed dead Onyx root logos (zero references — Navbar/Footer use SC `Logo1.png`/`Logo3.png`): `git rm public/logo.svg public/logo.png public/logo-footer.svg`.
- [~] **Favicon — flagged gap.** `public/favicon.png` is still the Onyx 96×96 favicon, linked in `layout.tsx`. The only SC brand asset is `Logo1.png` (749×257 wordmark) — wrong aspect ratio for a favicon, and I won't fabricate a square mark. **Needs a client-provided square Smile Concept favicon/app-icon.** Left the existing file in place to avoid a 404 until then. (`src/app/__favicon.ico` is inert — the `__` prefix means Next ignores it.)
- Deferred to Phase 5: pruning `public/assets/{images,icons,videos}` (Onyx) — still used by the **kept** orphan pages (`/experience`, `/philosophy`, `/proven-result`) and dead `section1–6`. Can't delete until those are resolved. Next-template SVGs (`file/globe/next/vercel/window.svg`) are harmless boilerplate, also Phase 5.

---

## Phase 5 — Cleanup (DONE)

Orphan-pages decision (user, 2026-06-06): **delete** `/philosophy`, `/experience`, `/proven-result`.
Final `npm run build` passes — **11 routes** (was 14), all static pages generated.

- [x] **Deleted orphan pages**: `git rm -r src/app/{philosophy,experience,proven-result}`
- [x] **Deleted dead home sections**: `section1.tsx`–`section6.tsx` + `src/sections/philosophi/` (all superseded by the 9 SC home sections; not imported by `page.tsx`)
- [x] **Deleted orphaned components** (verified zero real imports first): `Cta.tsx`, `custom-carousel.tsx`, `Icon.tsx`, `BlogContent.tsx`, `TableOfContents.tsx`, `Banner.tsx`, `Animation.tsx` (incl. `PageWrapper`), `PromoBar.tsx`, `BeforeAfter.tsx`, and the unused `components/index.ts` barrel (nothing imported `@/components` — live components are imported directly: `@/components/Navbar`, `/Footer`, `/Shell`, `/PromoCard`, `/BlogCard`). Remaining components: `Navbar`, `Footer`, `Shell`, `PromoCard`, `BlogCard`, `ui/`
- [x] **Deleted orphaned data**: `lib/data/treatment.ts`, `lib/data/doctor.ts` (Onyx flat models; replaced by `treatment-detail.ts`/`doctor-list.ts`/`doctor-detail.ts`/`promo.ts`)
- [x] **Deleted fonts**: `src/app/fonts/` removed entirely (`Helvetica.ttf`, `GothamBlack.otf`, `custom-fonts.ts` — all unused since the Google-Fonts `<link>` switch)
- [x] **globals.css tokens**: removed all Onyx `@theme inline` mappings (`--color-blue-primary`…`--color-custom-cream`) and all `:root` Onyx vars (`--blue-primary`…`--footer`, `--custom-*`). Kept shadcn base tokens (background/foreground/sidebar/chart/ring/radius) — still used by `ui/` primitives. Verified no `bg-custom-*`/`text-heading-*`/etc. utility usage remains in `src`
- [x] **tailwind.config.ts**: removed `fontFamily` (`helvetica`, `ebGaramond`) and the `slideShow` keyframe/animation. Kept the typography `--tw-prose-bold` tweak + `@tailwindcss/typography` plugin
- [x] **Tracking removed**: deleted GA (`G-5P470BH13Q`), GTM (`GTM-M685TJBG`), and FB Pixel (`3800209303610125`) scripts/noscript from `layout.tsx` (Onyx's IDs; no SC IDs provided — removed rather than ship someone else's analytics). Deleted the now-dead `PixelProviders` (`lib/utils/pixel.tsx`) + its `Suspense` wrapper. `layout.tsx` is now lean (fonts + Navbar/main/Footer)
- [x] **Pruned Onyx assets** (~36 MB): `git rm -r public/assets/{images,icons,videos}` + Next-template SVGs (`file/globe/next/vercel/window.svg`). Verified zero `src` references first. `public/` now: `assets/smile-concept/`, `favicon.png`, `robots.txt`
- [x] `next-sitemap.config.mjs` already updated in Phase 3 (`/blogs/` → `/blog/`)
- [x] `metaData()` titles/descriptions: all SC pages set in Phases 2–4 (home fixed in Phase 4)

### Still open (not blockers)
- [ ] **Favicon** — `public/favicon.png` still Onyx; needs a client-provided square SC favicon (see Phase 4 note). `src/app/__favicon.ico` is inert.
- [ ] `hooks/` (`use-boolean`, `use-mobile`) left in place — generic utilities, not Onyx cruft; harmless if unused.
- [ ] Build warning `no-page-custom-font` (from the Google-Fonts `<link>`) — expected/by design; not an error.
- [x] ~~Onyx API base (`api.onyxdentalcenter.id`) still backs blog/settings~~ → **resolved in Phase 6**: swapped to `cms.tumbuhsehat.id`.

---

## Phase 6 — Integrasi CMS (DONE — 2026-09-11)

API baru: **`https://cms.tumbuhsehat.id/api`** (Laravel). Menggantikan `api.onyxdentalcenter.id`.
Empat resource dinamis yang dikonfirmasi user; selebihnya tetap statis.

### Endpoint terverifikasi (di-hit langsung, bukan dari dokumentasi)

| Endpoint | Hasil |
|---|---|
| `GET /posts` | 200 — 1 post published, **tanpa** field `content` |
| `GET /posts/{identifier}` | 200 — menambah `content`, `alternates`, `related_posts`, `structured_data`, `comments` |
| `GET /promos` | 200 — `data: []`, ada `meta` pagination + `structured_data` |
| `GET /promos/{identifier}` | tersedia, belum bisa diuji (belum ada promo) |
| `GET /settings` | 200 — shape **berbeda total** dari `Setting` milik Onyx |
| `/doctors`, `/treatments`, `/services`, `/facilities`, `/testimonials`, `/pages`, `/media` | 404 — tidak ada |
| prefix `/api/public/*` (pola Onyx) | 404 — prefix `public` dihapus di CMS baru |

### Temuan penting

- **Rate limit 5 req/menit/IP** (`x-ratelimit-limit: 5`). Enam probe beruntun langsung kena 429.
  Ini yang mendikte desain caching di bawah.
- **Filter bahasa pakai `?lang=`, bukan `?language=`.** `?language=id` diterima tanpa error
  tapi diabaikan (mengembalikan seluruh post) — jebakan halus, mudah dikira sudah jalan.
  Yang benar `?lang=id` / `?lang=en`; terverifikasi `lang=id` → 1 post, `lang=en` → 0.
  (Kesalahan ini sempat lolos: percobaan pertama memakai `?language=` warisan Onyx, dan
  karena hanya ada 1 post hasilnya identik dengan list penuh. Dikoreksi setelah user menegur.)
- **Promo kosong** → bentuk payload promo tidak pernah terlihat. Di-handle lewat adapter, lihat bawah.
- **`APP_DEBUG=true` di produksi** — respons error membocorkan stack trace + path server.
- Data `/settings` masih demo (`demo@clinic.com`, alamat Malang, socials `null`).

### Yang dikerjakan

- [x] **Type baru** → `src/lib/types/cms.d.ts`. Menghapus `Post.d.ts`, `Promo.d.ts`, `Setting.d.ts`
  (model Onyx). Ambient/global, mengikuti konvensi folder ini. Berisi `CmsResponse<T>`,
  `CmsMedia`, `CmsCta`, `CmsMetaRobots`, `CmsAuthor`, `CmsTag`, `Post`, `PostDetail`,
  `CmsPromo`, `Promo` (view model), `Setting`. Setiap field yang tidak terverifikasi diberi
  komentar ⚠️ eksplisit — tidak ada tebakan yang diam-diam.
- [x] **`src/lib/api/index.ts` ditulis ulang total.** Base URL dari `NEXT_PUBLIC_CMS_API_URL`.
  Fungsi: `getPosts(language?)`, `getPostsId`, `getPostsEn`, `getPostBySlug`,
  `getPostsForSitemap`, `getPromos`, `getPromoBySlug`, `getSettings`, `toPromoView`.
  - `getSettings` dibungkus React `cache()` — layout + page dalam satu render berbagi satu
    request. Tanpa ini satu render bisa menghabiskan 2 dari 5 jatah/menit.
  - Semua fetch pakai `next.revalidate` (bukan `no-store`) supaya satu build = satu request
    per resource, bukan satu per halaman.
  - **JWT bearer token asli yang ter-hardcode di komentar (3 tempat) ikut terhapus.**
    Rotate di sisi backend masih perlu dilakukan.
- [x] **Adapter `toPromoView()`** — satu-satunya tempat yang tahu bentuk mentah promo.
  Semua field `CmsPromo` opsional; perks menerima array maupun string ber-newline. Karena
  CMS kosong, `getPromos()` jatuh ke `lib/data/promo.ts` (promo statis prototype) saat
  `data` kosong ATAU error. Saat promo asli sudah ada: perbaiki type + adapter, komponen tak berubah.
- [x] **Konsumen diperbarui ke shape baru**:
  - `BlogCard` → `description` (bukan `excerpt`), `thumbnail.url` (bukan `thumbnailUrl`),
    fallback `Placeholder.png`
  - `/blog/[slug]` → `getPostBySlug`, `thumbnail.url`, `cta.button` (bukan `cta.textButton`),
    plus `cta.subtitle` dirender. `generateMetadata` dibungkus try/catch (sebelumnya bisa
    melempar dan menggagalkan render metadata)
  - `/blog/id` + `/blog/en` → `getPostsId()` / `getPostsEn()` (filter server-side lewat
    `?lang=`) + empty state (sebelumnya grid telanjang)
  - `/promo` + `PromoCard` → empty state; badge dan harga jadi conditional (promo CMS boleh
    tak punya harga); `promo.ctaUrl` dari CMS menang atas WhatsApp global
  - `Footer` → `settings.phone` / `.email` / `.address.{street,city}` / `.maps` /
    `.social_media.{instagram,youtube}`. Helper `socialUrl()` menormalkan handle vs URL penuh.
    Fallback alamat/kontak prototype tetap dipakai saat CMS kosong
  - `JsonLd` → field `Post` baru + publisher "Smile Concept" (sebelumnya "TumbuhSehat" +
    `url: 'your-logo-url'`)
  - Navbar, hero, stats-bar, promo section, cta-block, treatments, doctors → **tidak berubah**.
    Semuanya hanya butuh `settings.link_whatsapp`, dan field turunan itu dipertahankan
- [x] **`metaData()`** → `SITE_URL` diekspor, dari `NEXT_PUBLIC_SITE_URL`
  (default `https://smileconcept.id` — masih tebakan, perlu dipastikan). `siteName` jadi
  "Smile Concept Dental Clinic", default `language` `"en-id"` → `"id"`
- [x] **`/api/sitemap` ditulis ulang** — sebelumnya hardcode 20+ URL Onyx (`ourteam/…`,
  `treatment/…`, `philosophy`, halaman yang sudah dihapus). Sekarang menurunkan URL dokter
  dari `doctorList` dan treatment dari `treatmentDetails`, pakai `SITE_URL`, dan `lastmod`
  post memakai `updated_at` asli
- [x] **`next-sitemap.config.mjs`** — `siteUrl` + API dari env, `blog.updatedAt` →
  `blog.updated_at` (field lama tidak pernah ada → `lastmod` selalu undefined). Catatan:
  file ini **tidak pernah berjalan**, tak ada script `postbuild`
- [x] **`.env.example`** dibuat + `.gitignore` diberi `!.env.example` (pola `.env*`
  sebelumnya ikut mengabaikannya)

### Verifikasi

`npx tsc --noEmit` bersih. `npm run lint` hanya menyisakan warning `no-page-custom-font`
yang memang by design. `npm run build` lolos, 11 routes.

Build di mesin ini tidak bisa menjangkau CMS (proxy TLS; `instrumentation.ts` hanya
melonggarkan TLS di development) sehingga build memakai fallback — **bukan** masalah API.
Verifikasi sesungguhnya lewat `npm run dev`, semua 200 dengan data CMS asli:

| Halaman | Hasil |
|---|---|
| `/blog` | judul + deskripsi + thumbnail `cms.tumbuhsehat.id` dari post asli |
| `/blog/edukasi-gigi` | body ter-render, inline style tersapu bersih (0 sisa), CTA CMS ("Booking Sekarang Juga!", href `https://www.google.com/`) |
| `/blog/id` | 1 post (filter bahasa jalan) |
| `/blog/en` | empty state (benar — belum ada post EN) |
| `/promo` | fallback statis (CMS kosong) |
| `/` | `wa.me/628123456789` — nomor dari CMS, pesan Smile Concept |
| `/api/sitemap` | 10 URL, semua `smileconcept.id`, termasuk `/blog/edukasi-gigi` |

---

## Open questions / parked decisions

- **Prisma backend**: schema still not present in tree, and Phase 6 made it largely moot — content comes from the external Laravel CMS, not a local DB. `@prisma/client` + `prisma` remain in `package.json` unused; decide whether to drop them.
- **Treatments / doctors as CMS content**: the CMS has no endpoint for either (404). They stay static in `src/lib/data/`. If they should become editable, backend has to build the endpoints first — the existing TS types there are a usable contract.
- **Tracking pixels**: Onyx's GA/GTM/FB pixel were removed in Phase 5. Still waiting on Smile Concept's own IDs (or a decision to ship without tracking).
- ~~**`PageWrapper` import in `src/app/page.tsx`**~~ Resolved while building stats bar: defined in `Animation.tsx`, re-exported via `export * from "./Animation"`. Dropped from `page.tsx` (created nested `<main>` and forced Onyx `bg-custom-primary`). Still used by Onyx pages — will be removed in Phase 5 cleanup when `Animation.tsx` itself is audited.

---

## Conventions

- TS everywhere; type all props.
- Server Components by default; `"use client"` only for `useState`/Embla/interactivity.
- Use `cn()` from `@/lib/utils` for class merging.
- Use `<Shell>` for every section's outer wrapper, never repeat the `max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[116px]` string.
- Use typography utilities (`h1-display`, `h2`, etc.) for text — never hand-tune `text-[60px]` for hierarchy.
- Arbitrary values (`px-[116px]`, `rounded-[20px]`, `min-h-[680px]`) are fine when needed to hit exact prototype numbers.
- Mobile breakpoint for type/layout overrides: `max-md` (Tailwind default 768px) ≈ prototype's `max-width: 767px`.

---

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
