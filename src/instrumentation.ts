/**
 * Next.js instrumentation.
 * Runs Sentry init when SENTRY_DSN is set.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;

  const sentryDsn = process.env.SENTRY_DSN;
  if (!sentryDsn) return;

  try {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: sentryDsn,
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
  } catch {
    // @sentry/nextjs not installed
  }
}
