"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit?: string;
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  previousValue,
  unit,
  icon,
}: MetricCardProps) {
  const delta = previousValue != null ? value - previousValue : null;
  const deltaPercent =
    previousValue != null && previousValue !== 0
      ? ((value - previousValue) / previousValue) * 100
      : null;

  return (
    <div className="rounded-lg bg-card-bg p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{title}</p>
        {icon && <span className="text-navy/40">{icon}</span>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold text-navy">
          {value.toLocaleString("fr-CA")}
        </p>
        {unit && <span className="text-sm text-muted">{unit}</span>}
      </div>

      {delta != null && (
        <div className="mt-2 flex items-center gap-1">
          <DeltaBadge delta={delta} deltaPercent={deltaPercent} />
          <span className="text-xs text-muted">vs hier</span>
        </div>
      )}
    </div>
  );
}

function DeltaBadge({
  delta,
  deltaPercent,
}: {
  delta: number;
  deltaPercent: number | null;
}) {
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-muted">
        <Minus className="h-3 w-3" />
        0
      </span>
    );
  }

  const isPositive = delta > 0;
  const color = isPositive ? "text-red bg-red-50" : "text-green bg-green-50";
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
    >
      <Icon className="h-3 w-3" />
      {deltaPercent != null
        ? `${Math.abs(deltaPercent).toFixed(1)}%`
        : Math.abs(delta)}
    </span>
  );
}
