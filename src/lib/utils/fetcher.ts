export class FetchError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly url: string,
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit & { timeout?: number }
): Promise<T> {
  const timeout = options?.timeout || 10000; // 10 seconds default

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // Keep the real status on the error — the CMS throttles at 5 req/min and
      // used to surface those 429s as a bare `NOT_FOUND`, which made a rate
      // limit indistinguishable from a missing record in the logs.
      console.error(
        `CMS ${res.status} ${res.statusText} for ${url}` +
          ` (x-ratelimit-remaining: ${res.headers.get("x-ratelimit-remaining") ?? "n/a"})`,
      );

      // Only a genuine 404 means "no such record"; anything else is an outage.
      throw new FetchError(res.status === 404 ? "NOT_FOUND" : "CMS_ERROR", res.status, url);
    }

    return res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`CMS timeout after ${timeout}ms for ${url}`);
    }
    throw error;
  }
}
