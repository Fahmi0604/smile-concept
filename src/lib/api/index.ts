import { cache } from "react";
import { whatsappLink } from "../utils";
import { fetcher } from "../utils/fetcher";
import { promos as fallbackPromos } from "../data/promo";

/**
 * Smile Concept CMS client.
 *
 * Only four resources are dynamic and come from the CMS — posts, post detail,
 * promos, promo detail, plus global settings. Everything else on the site
 * (treatments, doctors, home sections) is static content in `src/lib/data` and
 * inside the section components.
 *
 * Rate limit: the CMS allows **5 requests per minute per IP** (Laravel throttle,
 * `x-ratelimit-limit: 5`). Two things keep us under it:
 *   1. every call goes through Next's Data Cache with a long `revalidate`, so a
 *      full build issues one request per resource, not one per page;
 *   2. `getSettings` is additionally wrapped in React `cache()` so the layout
 *      and the page of a single render share one call.
 * Do not switch these to `cache: "no-store"` without re-checking the limit.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL?.replace(/\/+$/, "") ??
  // "https://cms.tumbuhsehat.id/api";
  "https://cms.smileconceptclinic.com/api";

const REVALIDATE_SETTINGS = process.env.NODE_ENV === "development" ? 60 : 43200; // prod: 12 hours
const REVALIDATE_CONTENT = process.env.NODE_ENV === "development" ? 60 : 3600; // prod: 1 hour

/** WhatsApp number used when the CMS has none configured — the clinic's
 *  real number (matches the live CMS settings), so a CMS outage still shows
 *  a correct contact. */
const FALLBACK_WHATSAPP = "628111577137";
const WHATSAPP_MESSAGE =
  "Halo Smile Concept, saya ingin konsultasi untuk perawatan gigi saya ya";

function emptyList<T>(message: string): CmsResponse<T[]> {
  return { success: true, message, data: [] };
}

/* -------------------------------------------------------------------- posts */

/**
 * Blog posts, optionally filtered by language.
 *
 * The filter parameter is `?lang=` (NOT `?language=` — that one is silently
 * ignored and returns the unfiltered list). Verified against the live CMS:
 * `?lang=id` → 1 post, `?lang=en` → 0.
 *
 * Returns an empty list rather than throwing so an unreachable CMS renders an
 * empty state instead of crashing the route.
 */
export async function getPosts(
  lang: CmsLanguage | null = null,
): Promise<CmsResponse<Post[]>> {
  const url = lang
    ? `${API_BASE_URL}/posts?lang=${encodeURIComponent(lang)}`
    : `${API_BASE_URL}/posts`;

  try {
    const res = await fetcher<CmsResponse<Post[]>>(url, {
      // A cold request can be slow; keep headroom over the 10s default.
      timeout: 20000,
      next: {
        revalidate: REVALIDATE_CONTENT,
        tags: [`posts-${lang ?? "all"}`],
      },
    });

    return { ...res, data: Array.isArray(res?.data) ? res.data : [] };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return emptyList<Post>("Fallback posts");
  }
}

export const getPostsId = () => getPosts("id");
export const getPostsEn = () => getPosts("en");

/**
 * Single post by slug (or id — the CMS accepts either as `{identifier}`).
 * Throws `NOT_FOUND` for a 404 so the route can call `notFound()`.
 */
export async function getPostBySlug(
  identifier: string,
): Promise<CmsResponse<PostDetail>> {
  return fetcher<CmsResponse<PostDetail>>(
    `${API_BASE_URL}/posts/${encodeURIComponent(identifier)}`,
    {
      timeout: 20000,
      next: { revalidate: REVALIDATE_CONTENT, tags: [`post-${identifier}`] },
    },
  );
}

export async function getPostsForSitemap(): Promise<CmsResponse<Post[]>> {
  return getPosts();
}

/* ------------------------------------------------------------------- promos */

type ContentLine = {
  text: string;
  /** Bold or a heading — the CMS marks price lines this way. */
  price: boolean;
  /** Struck through — a crossed-out "before" price. */
  struck: boolean;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function decodeEntities(value: string): string {
  return value.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);
}

/**
 * Splits the CMS `content` HTML into labelled lines.
 *
 * The editor emits block elements only — `<li>`, `<p>`, `<h2>` — and marks
 * price lines by making them bold or a heading, with old prices struck
 * through. Verified against all 10 live promos on 2026-09-22; the convention
 * holds for every one of them.
 */
function parseContentLines(html: string): ContentLine[] {
  const blocks = html.match(/<(li|p|h[1-6])\b[^>]*>[\s\S]*?<\/\1>/gi) ?? [];

  return blocks
    .map((block) => {
      const text = decodeEntities(block.replace(/<[^>]*>/g, " "))
        .replace(/\s+/g, " ")
        .trim();

      return {
        text,
        price: /^<h[1-6]/i.test(block) || /<(strong|b)\b/i.test(block),
        struck: /<(s|del|strike)\b/i.test(block),
      };
    })
    .filter((line) => line.text.length > 0);
}

/** "Rp9.000.000" — matches the prototype's price formatting (no space). */
function formatIDR(value: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

/**
 * Translates a raw CMS promo into the shape `PromoCard` renders.
 *
 * Field mapping (verified against all 10 live promos on 2026-09-22):
 *   - perks ← plain lines of `content`. NOT `description`: the CMS fills that
 *     with a copy of the title, which rendered as a single useless bullet.
 *   - prices ← bold/heading lines of `content`, struck-through ones becoming
 *     the crossed-out "before" price. This is what carries the prototype's
 *     multi-line per-treatment price lists, which the numeric fields cannot
 *     express. Numeric `price` / `discounted_price` are the fallback for
 *     promos whose content has no price line.
 *   - badge ← intentionally empty: the revised design dropped discount badges.
 *   - featured ← `is_highlighted`, which curates the home-section promos.
 */
export function toPromoView(promo: CmsPromo): Promo {
  const lines = typeof promo.content === "string"
    ? parseContentLines(promo.content)
    : [];

  const perks = lines.filter((line) => !line.price && !line.struck);
  const struckPrices = lines.filter((line) => line.struck);
  const currentPrices = lines.filter((line) => line.price && !line.struck);

  // `price` / `discounted_price` are null on most live rows, so coerce first.
  const price = Number(promo.price) || 0;
  const discounted = Number(promo.discounted_price) || 0;

  // Never mix sources: once content carries a price, the numeric fields are
  // ignored entirely. Some rows still hold placeholder numbers (promo 11 has
  // price 100000 while its content reads "Rp.55.000.000 - Rp85.000.000"), and
  // pairing those would show a nonsensical crossed-out price.
  const hasContentPrice = currentPrices.length > 0 || struckPrices.length > 0;

  const priceOriginal = struckPrices.length
    ? struckPrices.map((line) => line.text).join("\n")
    : !hasContentPrice && price > 0 && discounted > 0
      ? formatIDR(price)
      : "";

  const priceCurrent = currentPrices.length
    ? currentPrices.map((line) => line.text).join("\n")
    : hasContentPrice
      ? ""
      : discounted > 0
        ? formatIDR(discounted)
        : price > 0
          ? formatIDR(price)
          : "";

  return {
    id: String(promo.id),
    title: promo.title,
    image: promo.image?.url ?? "/assets/smile-concept/Placeholder.webp",
    alt: promo.image?.alt || promo.image?.title || promo.title,
    badge: "",
    perks: perks.map((line) => line.text),
    priceOriginal,
    priceCurrent,
    ctaTag: `promo-${promo.slug || promo.id}`,
    ctaUrl: promo.cta_link || undefined,
    featured: Boolean(promo.is_highlighted),
  };
}

/**
 * A promo is expired once `expired_at` is in the past. A missing or
 * unparseable date means "no expiry" — never hide a promo because the CMS
 * sent a field we could not read.
 *
 * Note: promo pages are cached for an hour, so an expiry takes up to that
 * long to disappear from the live site.
 */
function isExpired(promo: CmsPromo): boolean {
  if (!promo.expired_at) return false;
  const expiresAt = Date.parse(promo.expired_at);
  return Number.isFinite(expiresAt) && expiresAt < Date.now();
}

/**
 * Promo list. Inactive (`is_active: false`) and expired promos are dropped,
 * so both the home section and /promo get the same filtered set.
 *
 * An unreachable CMS returns an empty list, not the static promos: showing
 * prototype data during an outage hid the outage — the site looked healthy
 * while every CMS call was failing. Both consumers render an empty state.
 *
 * A reachable CMS with nothing published still falls back to the static
 * promos (see below).
 */
export async function getPromos(): Promise<CmsResponse<Promo[]>> {
  try {
    const res = await fetcher<CmsResponse<CmsPromo[]>>(
      `${API_BASE_URL}/promos`,
      {
        timeout: 20000,
        next: { revalidate: REVALIDATE_CONTENT, tags: ["promos"] },
      },
    );

    const active = Array.isArray(res?.data)
      ? res.data.filter((promo) => promo.is_active !== false && !isExpired(promo))
      : [];

    if (!active.length) {
      return { success: true, message: "Fallback promos", data: fallbackPromos };
    }

    return { ...res, data: active.map(toPromoView) };
  } catch (error) {
    console.error("Failed to fetch promos:", error);
    return emptyList<Promo>("Promos unavailable");
  }
}

/** Single promo by slug or id. Throws `NOT_FOUND` on a 404. */
export async function getPromoBySlug(
  identifier: string,
): Promise<CmsResponse<Promo>> {
  const res = await fetcher<CmsResponse<CmsPromo>>(
    `${API_BASE_URL}/promos/${encodeURIComponent(identifier)}`,
    {
      timeout: 20000,
      next: { revalidate: REVALIDATE_CONTENT, tags: [`promo-${identifier}`] },
    },
  );

  return { ...res, data: toPromoView(res.data) };
}

/* ----------------------------------------------------------------- settings */

const EMPTY_SETTINGS: Setting = {
  maps: null,
  whatsapp: null,
  phone: null,
  email: null,
  address: null,
  social_media: null,
};

/**
 * Global clinic settings (contact details + socials).
 *
 * Wrapped in React `cache()`: the root layout and every page call this, and
 * without deduping a single render would burn several of the 5 requests/minute.
 *
 * Adds the derived `link_whatsapp` field the CTAs across the site use.
 */
export const getSettings = cache(
  async (): Promise<CmsResponse<Setting>> => {
    try {
      const res = await fetcher<CmsResponse<Setting>>(
        `${API_BASE_URL}/settings`,
        {
          // Same headroom as the other calls: the origin has been observed
          // answering in 16s under concurrent load, well past the 10s default.
          timeout: 20000,
          next: { revalidate: REVALIDATE_SETTINGS, tags: ["settings"] },
        },
      );

      const data = res?.data ?? EMPTY_SETTINGS;

      return {
        ...res,
        data: {
          ...data,
          link_whatsapp: whatsappLink(
            data.whatsapp || FALLBACK_WHATSAPP,
            WHATSAPP_MESSAGE,
          ),
        },
      };
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      return {
        success: true,
        message: "Fallback settings",
        data: {
          ...EMPTY_SETTINGS,
          link_whatsapp: whatsappLink(FALLBACK_WHATSAPP, WHATSAPP_MESSAGE),
        },
      };
    }
  },
);
