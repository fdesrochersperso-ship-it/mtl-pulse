import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

const config = withBundleAnalyzer(withNextIntl(nextConfig));

export default process.env.SENTRY_DSN
  ? withSentryConfig(config, {
      org: process.env.SENTRY_ORG ?? "mtl-pulse",
      project: process.env.SENTRY_PROJECT ?? "mtl-pulse",
      silent: !process.env.CI,
    })
  : config;
