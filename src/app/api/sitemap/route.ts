export const dynamic = "force-dynamic";

import { getPostsForSitemap } from "@/lib/api";
import { doctorList } from "@/lib/data/doctor-list";
import { treatmentDetails } from "@/lib/data/treatment-detail";
import { SITE_URL } from "@/lib/utils/metadata";
import { NextResponse } from "next/server";

let cachedSitemap: string | null = null;
let lastFetched = 0;

type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string;
};

export async function GET() {
  const now = Date.now();
  const lastMod = new Date().toISOString();

  // 10 seconds cache in dev, 1 hour in production
  const cacheTime = process.env.NODE_ENV === "development" ? 10000 : 1000 * 60 * 60;

  if (!cachedSitemap || now - lastFetched > cacheTime) {
    try {
      const responseBlog = await getPostsForSitemap();
      const blogs = responseBlog.data;
      const baseUrl = `${SITE_URL}/`;

      // Detail pages are driven by the static content in src/lib/data, so the
      // sitemap derives them from the same source instead of a hand-kept list.
      const doctorUrls = doctorList
        .filter((doctor) => doctor.slug)
        .map((doctor) => `doctors/${doctor.slug}`);

      const treatmentUrls = Object.keys(treatmentDetails).map(
        (slug) => `treatments/${slug}`,
      );

      const staticPaths: string[] = [
        "treatments",
        "doctors",
        "promo",
        "blog",
        "blog/id",
        "blog/en",
        ...doctorUrls,
        ...treatmentUrls,
      ];

      const urls: SitemapEntry[] = [
        { loc: baseUrl, changefreq: "weekly", priority: 1.0, lastmod: lastMod },
        ...staticPaths.map((path) => ({
          loc: `${baseUrl}${path}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: lastMod,
        })),
        ...(blogs ?? []).map((blog: Post) => ({
          loc: `${baseUrl}blog/${blog.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: blog.updated_at || lastMod,
        })),
      ];

      cachedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map(
            (url) => `
          <url>
            <loc>${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
            <changefreq>${url.changefreq}</changefreq>
            <priority>${url.priority}</priority>
          </url>`,
          )
          .join("")}
      </urlset>`;
      lastFetched = now;
    } catch (error) {
      console.error("Error generating sitemap:", error);
      cachedSitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    }
  }

  return new NextResponse(cachedSitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
