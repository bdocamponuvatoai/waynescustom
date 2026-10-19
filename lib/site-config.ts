/**
 * Deployment-level settings, resolved from environment variables so the same
 * build works locally, on Vercel previews, and in production.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/**
 * Search indexing stays off until the real business details are confirmed.
 * Set SITE_INDEXING=true in the Vercel production environment to go live.
 */
export const allowIndexing = process.env.SITE_INDEXING === "true";

export const siteName = "Wayne’s Customs Automotive and Towing";
