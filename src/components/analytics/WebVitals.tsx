"use client";

import { useReportWebVitals } from "next/web-vitals";

interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
}

function reportToAnalytics(metric: WebVitalMetric) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    const url = process.env.NEXT_PUBLIC_ANALYTICS_URL ?? "/api/analytics/web-vitals";
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    fetch(url, {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  }
}

export function WebVitals() {
  useReportWebVitals(reportToAnalytics);
  return null;
}
