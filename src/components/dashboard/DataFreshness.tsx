import { useTranslations } from "next-intl";
import { formatTimeAgo } from "@/lib/utils/formatting";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";

export type FreshnessStatus = "green" | "yellow" | "red";

export interface DataFreshnessPerSourceProps {
  statuses: {
    pipelineName: string;
    label: string;
    freshnessStatus: FreshnessStatus;
    lastSuccessAt: Date | null;
    hoursSinceSuccess: number | null;
  }[];
  locale: Locale;
  className?: string;
}

export function DataFreshnessPerSource({
  statuses,
  locale,
  className,
}: DataFreshnessPerSourceProps) {
  const t = useTranslations("common");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
        className
      )}
    >
      <span className="font-medium">{t("data")}:</span>
      {statuses.map((s) => (
        <span key={s.pipelineName} className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              s.freshnessStatus === "green" && "bg-green-500",
              s.freshnessStatus === "yellow" && "bg-yellow-500",
              s.freshnessStatus === "red" && "bg-red-500"
            )}
            aria-hidden
            title={
              s.lastSuccessAt
                ? formatTimeAgo(s.lastSuccessAt, locale)
                : t("never")
            }
          />
          <span>
            {s.label}:{" "}
            {s.lastSuccessAt
              ? formatTimeAgo(s.lastSuccessAt, locale)
              : t("never")}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Legacy single-source component (kept for backward compat) */
export interface DataFreshnessProps {
  lastUpdated: Date;
  expectedScheduleHours?: number;
  locale: Locale;
  className?: string;
}

function getFreshnessStatus(
  lastUpdated: Date,
  expectedScheduleHours: number
): FreshnessStatus {
  const now = new Date();
  const diffMs = now.getTime() - lastUpdated.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours <= expectedScheduleHours) return "green";
  if (diffHours <= expectedScheduleHours * 2) return "yellow";
  return "red";
}

export function DataFreshness({
  lastUpdated,
  expectedScheduleHours = 24,
  locale,
  className,
}: DataFreshnessProps) {
  const t = useTranslations("common");
  const status = getFreshnessStatus(lastUpdated, expectedScheduleHours);

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          status === "green" && "bg-green-500",
          status === "yellow" && "bg-yellow-500",
          status === "red" && "bg-red-500"
        )}
        aria-hidden
      />
      <span>
        {t("lastUpdate")}: {formatTimeAgo(lastUpdated, locale)}
      </span>
    </div>
  );
}
