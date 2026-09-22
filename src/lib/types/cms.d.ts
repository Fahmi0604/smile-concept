/**
 * Type definitions for the Smile Concept CMS API (https://cms.tumbuhsehat.id/api).
 *
 * Verified against the live API on 2026-09-11 by hitting each endpoint:
 *   GET /api/posts                  → Post[]        (no `content` field)
 *   GET /api/posts/{identifier}     → PostDetail    (adds content/alternates/related/comments)
 *   GET /api/promos                 → CmsPromo[]    ⚠️ returned [] — shape NOT verified, see below
 *   GET /api/promos/{identifier}    → CmsPromo      ⚠️ same
 *   GET /api/settings               → Setting
 *
 * These are ambient (global) declarations, matching the convention already used
 * in this folder — no import needed at the point of use.
 */

/* ---------------------------------------------------------------- envelopes */

/** Every CMS response is wrapped in this envelope. */
declare type CmsResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  /** JSON-LD emitted by the CMS. Present on list + detail endpoints. */
  structured_data?: CmsStructuredData;
  /** Pagination. Present on list endpoints; `null` on /posts. */
  meta?: CmsPageMeta | null;
};

declare type CmsPageMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

/** schema.org payload — shape varies per endpoint, so kept loose on purpose. */
declare type CmsStructuredData = Record<string, unknown>;

/* ------------------------------------------------------------ shared pieces */

declare type CmsMedia = {
  url: string;
  alt: string | null;
  title: string | null;
  caption: string | null;
};

/** Call-to-action block authored per post/promo in the CMS. */
declare type CmsCta = {
  title: string | null;
  subtitle: string | null;
  button: string | null;
  url: string | null;
};

declare type CmsMetaRobots = {
  indexing: "index" | "noindex" | (string & {});
  following: "follow" | "nofollow" | (string & {});
  archive: "archive" | "noarchive" | (string & {});
};

declare type CmsAuthor = {
  id: string;
  name: string;
};

declare type CmsTag = {
  name: string;
  slug: string;
};

/** Language code as stored by the CMS — observed values: "id", "en". */
declare type CmsLanguage = "id" | "en" | (string & {});

declare type CmsStatus = "published" | "draft" | (string & {});

/* -------------------------------------------------------------------- posts */

/** A blog post as returned by the LIST endpoint. Has no `content`. */
declare type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: CmsStatus;
  language: CmsLanguage;
  /** Groups translations of the same article together. */
  translation_group_id: string | null;
  redirect_url: string | null;
  canonical_url: string | null;
  meta_robots: CmsMetaRobots;
  cta: CmsCta | null;
  thumbnail: CmsMedia | null;
  author: CmsAuthor | null;
  tags: CmsTag[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** A translation of a post in another language. */
declare type CmsAlternate = {
  language: CmsLanguage;
  slug: string;
  title?: string;
  url?: string;
};

/**
 * A blog post as returned by the DETAIL endpoint.
 *
 * `alternates`, `related_posts` and `comments` came back as empty arrays on the
 * only published post, so their element shapes are a best-effort reading of the
 * CMS conventions — re-verify once the CMS has richer content.
 */
declare type PostDetail = Post & {
  /** Rich-text HTML. Ships with inline styles — run through `stripInlineStyles()`. */
  content: string;
  alternates: CmsAlternate[];
  related_posts: Post[];
  structured_data: CmsStructuredData;
  comments: unknown[];
};

/* ------------------------------------------------------------------- promos */

/**
 * Promo payload from the CMS (`/api/promos` list items and `/api/promos/{id}`
 * detail — assumed identical; the detail shape below was provided by the
 * backend on 2026-09-15 while the CMS still had no live promo rows, so the
 * list-item shape is still unverified against real data).
 *
 * `toPromoView()` in `src/lib/api/index.ts` is the single place that translates
 * this into what the UI renders.
 */
declare type CmsPromo = {
  id: number;
  title: string;
  slug: string;
  code: string | null;
  /** Short copy. Live rows just repeat the title — not usable as perks. */
  description: string | null;
  /** Card body (HTML). Plain lines are perks, bold/heading lines are prices. */
  content: string | null;
  is_active: boolean;
  /** The home promo section highlights these (3 in the prototype). */
  is_highlighted: boolean;
  discount_type: string | null;
  discount_value: number | null;
  /** Regular price in rupiah. `null` or 0 = not set; most live rows are null. */
  price: number | null;
  /** Promo price in rupiah. `null` or 0 = not set. */
  discounted_price: number | null;
  cta_text: string | null;
  cta_link: string | null;
  image: {
    url: string;
    alt: string;
    title: string;
  } | null;
  /** ISO 8601. Past = hidden from the site; `null` = never expires. */
  expired_at: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * What `PromoCard` actually renders. Decoupled from `CmsPromo` on purpose: the
 * static fallback in `lib/data/promo.ts` and the CMS both produce this shape.
 */
declare type Promo = {
  id: string;
  title: string;
  image: string;
  alt: string;
  /** Discount label, e.g. "40% off". */
  badge: string;
  perks: string[];
  priceOriginal: string;
  priceCurrent: string;
  /** data-cta attribute value for analytics. */
  ctaTag: string;
  /** Overrides the global WhatsApp link when the CMS sets a per-promo CTA. */
  ctaUrl?: string;
  /** Prototype curates 3 promos for the home section; fallback marks them. */
  featured?: boolean;
};

/* ----------------------------------------------------------------- settings */

declare type CmsAddress = {
  street: string | null;
  city: string | null;
};

declare type CmsSocialMedia = {
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
};

declare type Setting = {
  /** Google Maps URL. `null` in the CMS at time of writing. */
  maps: string | null;
  /** Raw WhatsApp number as typed in the CMS, e.g. "08123456789". */
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
  address: CmsAddress | null;
  social_media: CmsSocialMedia | null;
  /**
   * Derived client-side by `getSettings()` — NOT returned by the API.
   * Full `https://wa.me/…?text=…` link built from `whatsapp`.
   */
  link_whatsapp?: string;
};
