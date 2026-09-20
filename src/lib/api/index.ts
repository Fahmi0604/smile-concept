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
  "https://cms.tumbuhsehat.id/api";

const REVALIDATE_SETTINGS = process.env.NODE_ENV === "development" ? 60 : 43200; // prod: 12 hours
const REVALIDATE_CONTENT = process.env.NODE_ENV === "development" ? 60 : 3600; // prod: 1 hour

/** WhatsApp number used when the CMS has none configured. */
const FALLBACK_WHATSAPP = "6281286632240";
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

function toPerks(value: string[] | string | null | undefined): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

/** "Rp9.000.000" — matches the prototype's price formatting (no space). */
function formatIDR(value: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

/** Strips HTML tags and collapses the result into plain text lines. */
function htmlToLines(html: string): string[] {
  return html
    .replace(/<[^>]*>/g, "\n")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Translates a raw CMS promo into the shape `PromoCard` renders.
 *
 * Field mapping (schema provided by the backend 2026-09-15, CMS still empty at
 * the time — re-verify against a live row once one exists):
 *   - perks ← `description`, one bullet per line; falls back to tag-stripped
 *     `content` when the description is empty.
 *   - prices ← numeric `price` / `discounted_price` (0 = absent). The
 *     prototype's multi-line price lists (per-treatment pricing) cannot come
 *     from these numeric fields — CMS entries needing one should put the list
 *     in `description` and leave prices at 0.
 *   - badge ← intentionally empty: the revised design dropped discount badges.
 *   - featured ← `is_highlighted`, which curates the 3 home-section promos.
 */
export function toPromoView(promo: CmsPromo): Promo {
  const perks = toPerks(promo.description);

  return {
    id: String(promo.id),
    title: promo.title,
    image: promo.image?.url ?? "/assets/smile-concept/Placeholder.png",
    alt: promo.image?.alt || promo.image?.title || promo.title,
    badge: "",
    perks:
      perks.length > 0
        ? perks
        : typeof promo.content === "string"
          ? htmlToLines(promo.content)
          : [],
    priceOriginal: promo.price > 0 ? formatIDR(promo.price) : "",
    priceCurrent:
      promo.discounted_price > 0
        ? formatIDR(promo.discounted_price)
        : promo.price > 0
          ? formatIDR(promo.price)
          : "",
    ctaTag: `promo-${promo.slug || promo.id}`,
    ctaUrl: promo.cta_link || undefined,
    featured: Boolean(promo.is_highlighted),
  };
}

/**
 * Promo list. Falls back to the static promos from the prototype when the CMS is
 * unreachable OR has no promos published — the promo page would otherwise be a
 * blank grid, and as of now the CMS genuinely returns an empty list.
 * Inactive promos (`is_active: false`) are filtered out.
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
      ? res.data.filter((promo) => promo.is_active !== false)
      : [];

    if (!active.length) {
      return { success: true, message: "Fallback promos", data: fallbackPromos };
    }

    return { ...res, data: active.map(toPromoView) };
  } catch (error) {
    console.error("Failed to fetch promos:", error);
    return { success: true, message: "Fallback promos", data: fallbackPromos };
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
        { next: { revalidate: REVALIDATE_SETTINGS, tags: ["settings"] } },
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
