// Next.js instrumentation hook — runs once at server startup.
//
// In local development the CMS (cms.tumbuhsehat.id) is reached through a
// TLS-intercepting proxy, so Node's fetch rejects the chain with
// SELF_SIGNED_CERT_IN_CHAIN and server-side data fetches (blog, settings, …)
// fail. Relax cert verification ONLY in development and ONLY in the Node
// runtime. Production builds and `next start` run with NODE_ENV=production and
// are never affected.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.warn(
      "[dev] TLS verification disabled for outbound fetch (local API via proxy). Development only.",
    );
  }
}
