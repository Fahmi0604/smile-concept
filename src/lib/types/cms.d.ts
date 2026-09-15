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
 * ⚠️ UNVERIFIED — `/api/promos` returned an empty `data` array, so no live promo
 * has ever been observed. The fields below mirror the conventions the CMS uses
 * for posts (the only documented resource) and every one of them is optional so
 * that an unexpected payload degrades instead of crashing.
 *
 * When the CMS has a real promo: re-hit the endpoint, correct this type, and fix
 * `toPromoView()` in `src/lib/api/index.ts` — that adapter is the single place
 * the raw payload is translated into what the UI renders.
 */
declare type CmsPromo = {
  id: string;
  title: string;
  slug?: string;
  description?: string | null;
  status?: CmsStatus;
  thumbnail?: CmsMedia | null;
  cta?: CmsCta | null;
  /** Discount label the card shows in the corner badge, e.g. "40% off". */
  badge?: string | null;
  discount?: string | number | null;
  /** Bullet list on the card. May arrive as an array or a newline string. */
  perks?: string[] | string | null;
  benefits?: string[] | string | null;
  price?: string | number | null;
  price_original?: string | number | null;
  price_before?: string | number | null;
  price_after?: string | number | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
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
