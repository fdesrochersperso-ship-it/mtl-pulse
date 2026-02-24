/**
 * Sentry client-side init.
 * Set NEXT_PUBLIC_SENTRY_DSN (or SENTRY_DSN) for error tracking.
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 0.1,
    environment: process.env.NODE_ENV,
  });
}
