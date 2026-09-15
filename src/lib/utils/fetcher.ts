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
      if (res.status === 404) {
        throw new Error('NOT_FOUND');
      } else {
        console.error(`Error fetching ${url}:`, res.statusText);
        throw new Error(`NOT_FOUND`);
      }
    }

    return res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
