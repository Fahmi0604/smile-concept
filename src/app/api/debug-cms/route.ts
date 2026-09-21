export const dynamic = "force-dynamic";

/**
 * Temporary diagnostic endpoint — hit /api/debug-cms on the deployment to see
 * exactly what the CMS answers when the request comes from Vercel's own IPs
 * (as opposed to a laptop). Delete once the CMS issue is settled.
 */

const BASE =
  process.env.NEXT_PUBLIC_CMS_API_URL?.replace(/\/+$/, "") ??
  "https://cms.tumbuhsehat.id/api";

const ENDPOINTS = ["/settings", "/promos", "/posts"];

async function probe(path: string) {
  const url = `${BASE}${path}`;
  const startedAt = Date.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const body = await res.text();

    return {
      url,
      ok: res.ok,
      status: res.status,
      ms: Date.now() - startedAt,
      rateLimit: {
        limit: res.headers.get("x-ratelimit-limit"),
        remaining: res.headers.get("x-ratelimit-remaining"),
        retryAfter: res.headers.get("retry-after"),
      },
      server: res.headers.get("server"),
      cfRay: res.headers.get("cf-ray"),
      contentType: res.headers.get("content-type"),
      bodyPreview: body.slice(0, 300),
    };
  } catch (error) {
    return {
      url,
      ok: false,
      status: null,
      ms: Date.now() - startedAt,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      // undici hides the real reason (DNS, TLS, ECONNREFUSED) in `cause`.
      cause:
        error instanceof Error && error.cause instanceof Error
          ? `${error.cause.name}: ${error.cause.message}${
              "code" in error.cause ? ` (${(error.cause as { code?: string }).code})` : ""
            }`
          : null,
    };
  }
}

export async function GET() {
  const results = await Promise.all(ENDPOINTS.map(probe));

  // Client IP as the CMS sees it — this is the IP the 5 req/min throttle counts.
  let egressIp: string | null = null;
  try {
    const res = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
    egressIp = ((await res.json()) as { ip?: string }).ip ?? null;
  } catch {
    egressIp = null;
  }

  return Response.json(
    {
      env: {
        NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL ?? "(not set — using hardcoded default)",
        resolvedBase: BASE,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "(not set)",
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV ?? "(not on Vercel)",
        VERCEL_REGION: process.env.VERCEL_REGION ?? null,
      },
      egressIp,
      results,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
