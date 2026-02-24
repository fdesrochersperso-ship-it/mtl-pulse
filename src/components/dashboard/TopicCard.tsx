import Link from "next/link";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendSparkline } from "@/components/dashboard/TrendSparkline";
import { cn } from "@/lib/utils";

export interface TopicCardProps {
  title: string;
  emoji: string;
  primaryMetric: {
    value: number;
    label: string;
    formatter?: (n: number) => string;
  };
  delta?:
    | {
        percent: number;
        direction: "up" | "down" | "neutral";
        /** For crime/safety: down = good (green). For permits/construction: up = good (green). */
        improveOnUp?: boolean;
      }
    | {
        /** Absolute value to show (e.g. "+23 auj.") */
        absoluteValue: number;
        direction: "up" | "down" | "neutral";
        improveOnUp?: boolean;
      }
    | null;
  sparklineData: number[];
  href: string;
  className?: string;
}

function formatDefault(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString("fr-CA");
}

export function TopicCard({
  title,
  emoji,
  primaryMetric,
  delta,
  sparklineData,
  href,
  className,
}: TopicCardProps) {
  const formatter = primaryMetric.formatter ?? formatDefault;
  const displayValue = formatter(primaryMetric.value);

  const deltaColor =
    !delta || delta.direction === "neutral"
      ? "neutral"
      : (delta.direction === "up" && delta.improveOnUp) ||
          (delta.direction === "down" && delta.improveOnUp === false)
        ? "green"
        : "red";

  return (
    <Link href={href} className="block transition-opacity hover:opacity-90">
      <Card
        className={cn(
          "overflow-hidden transition-shadow hover:shadow-md",
          className
        )}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-hidden>
                  {emoji}
                </span>
                <h3 className="truncate font-semibold text-foreground">
                  {title}
                </h3>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums text-navy dark:text-foreground sm:text-3xl">
                  {displayValue}
                </span>
                <span className="text-sm text-muted-foreground">
                  {primaryMetric.label}
                </span>
              </div>
              {delta && delta.direction !== "neutral" && (
                <div className="mt-1.5 flex items-center gap-1">
                  <DeltaBadge delta={delta} color={deltaColor} />
                </div>
              )}
            </div>
            <div className="h-[60px] w-20 shrink-0 sm:h-[80px] sm:w-24">
              <TrendSparkline
                data={sparklineData}
                color={deltaColor}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function DeltaBadge({
  delta,
  color,
}: {
  delta: NonNullable<TopicCardProps["delta"]>;
  color: "green" | "red" | "neutral";
}) {
  if (delta.direction === "neutral") return null;

  const Icon =
    delta.direction === "up"
      ? ArrowUp
      : delta.direction === "down"
        ? ArrowDown
        : Minus;

  const isAbsolute = "absoluteValue" in delta && delta.absoluteValue !== undefined;
  const displayText = isAbsolute
    ? `${delta.absoluteValue}`
    : `${Math.abs((delta as { percent: number }).percent).toFixed(1)}%`;

  const colorClasses =
    color === "green"
      ? "text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950/50"
      : color === "red"
        ? "text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/50"
        : "text-muted-foreground bg-muted";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
        colorClasses
      )}
    >
      <Icon className="h-3 w-3" />
      {displayText}
    </span>
  );
}
