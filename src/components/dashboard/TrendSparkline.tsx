"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export interface TrendSparklineProps {
  data: number[];
  color?: "green" | "red" | "neutral";
  className?: string;
}

export function TrendSparkline({
  data,
  color = "neutral",
  className,
}: TrendSparklineProps) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((value, i) => ({ value, index: i }));
  const strokeColor =
    color === "green"
      ? "#16A34A"
      : color === "red"
        ? "#DC2626"
        : "hsl(var(--muted-foreground))";

  return (
    <div
      className={className}
      style={{ width: "100%", minHeight: "60px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
