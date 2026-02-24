/**
 * Temporal analysis framework — reusable utilities for time series analysis.
 * Powers rolling averages, day-of-week patterns, holiday effects,
 * seasonal decomposition, 5-year trends, YoY comparison, and anomaly detection.
 */

export type TimeSeriesPoint = {
  period: string; // YYYY-MM-DD
  value: number;
  metadata?: Record<string, unknown>;
};

export type TimeSeriesWithRolling = TimeSeriesPoint & {
  rolling7d?: number;
};

export type DayOfWeekPoint = {
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  dayLabel: string;
  hourOfDay?: number;
  value: number;
};

export type SeasonalDecomposition = {
  period: string;
  trend: number;
  seasonal: number;
  residual: number;
  actual: number;
};

export type AnomalyResult = {
  period: string;
  value: number;
  weeklyAvg: number;
  ratio: number;
  isAnomaly: boolean;
  explanation: string;
};

/** 7-day rolling average — smoothing function for any time series */
export function rollingAverage7d(
  points: TimeSeriesPoint[],
  valueKey: keyof TimeSeriesPoint = 'value'
): TimeSeriesWithRolling[] {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  return points.map((p, i) => {
    const start = Math.max(0, i - 6);
    const slice = points.slice(start, i + 1);
    const sum = slice.reduce((s, x) => s + getVal(x), 0);
    const rolling = slice.length > 0 ? sum / slice.length : getVal(p);
    return {
      ...p,
      value: getVal(p),
      rolling7d: Math.round(rolling * 1000) / 1000,
    };
  });
}

/** Quebec stat holidays (America/Montreal) — used for holiday effect detection */
export const QUEBEC_STAT_HOLIDAYS: (string | ((year: number) => string))[] = [
  '01-01', // New Year
  (y) => easter(y), // Good Friday (dynamic)
  '06-24', // Saint-Jean-Baptiste
  '07-01', // Canada Day
  (y) => firstMondayAugust(y), // Civic Holiday
  '09-01', // Labour Day (first Mon — simplified to 1st)
  (y) => secondMondayOctober(y), // Thanksgiving
  '12-25', // Christmas
  '12-26', // Boxing Day
];

function easter(year: number): string {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const dategoodFriday = new Date(year, month - 1, day);
  dategoodFriday.setDate(dategoodFriday.getDate() - 2);
  return `${String(dategoodFriday.getMonth() + 1).padStart(2, '0')}-${String(dategoodFriday.getDate()).padStart(2, '0')}`;
}

function firstMondayAugust(year: number): string {
  const d = new Date(year, 7, 1); // August
  const day = d.getDay();
  const add = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  d.setDate(d.getDate() + add);
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function secondMondayOctober(year: number): string {
  const d = new Date(year, 9, 1);
  const day = d.getDay();
  const add = day === 0 ? 8 : day === 1 ? 7 : 8 - day + 7;
  d.setDate(d.getDate() + add);
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Check if a date is a Quebec stat holiday */
export function isStatHoliday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const monthDay = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  for (const h of QUEBEC_STAT_HOLIDAYS) {
    const md = typeof h === 'string' ? h : h(year);
    if (md === monthDay) return true;
  }
  return false;
}

/** Holiday effect detector — returns average value on holidays vs non-holidays */
export function detectHolidayEffect(
  points: TimeSeriesPoint[],
  valueKey: keyof TimeSeriesPoint = 'value'
): {
  holidayAvg: number;
  nonHolidayAvg: number;
  ratio: number;
  holidayDays: string[];
} {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  const holiday: { date: string; val: number }[] = [];
  const nonHoliday: { date: string; val: number }[] = [];
  for (const p of points) {
    const val = getVal(p);
    if (isStatHoliday(p.period)) holiday.push({ date: p.period, val });
    else nonHoliday.push({ date: p.period, val });
  }
  const holidayAvg =
    holiday.length > 0
      ? holiday.reduce((s, x) => s + x.val, 0) / holiday.length
      : 0;
  const nonHolidayAvg =
    nonHoliday.length > 0
      ? nonHoliday.reduce((s, x) => s + x.val, 0) / nonHoliday.length
      : 0;
  const ratio =
    nonHolidayAvg > 0 ? Math.round((holidayAvg / nonHolidayAvg) * 1000) / 1000 : 0;
  return {
    holidayAvg,
    nonHolidayAvg,
    ratio,
    holidayDays: holiday.map((x) => x.date),
  };
}

/** Day-of-week heatmap data — aggregate by day of week (0=Sun..6=Sat) */
export function aggregateByDayOfWeek(
  points: TimeSeriesPoint[],
  valueKey: keyof TimeSeriesPoint = 'value'
): DayOfWeekPoint[] {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  const byDay: Record<number, { sum: number; count: number }> = {};
  for (let i = 0; i < 7; i++) byDay[i] = { sum: 0, count: 0 };
  const labels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  for (const p of points) {
    const d = new Date(p.period);
    const dow = d.getDay();
    byDay[dow].sum += getVal(p);
    byDay[dow].count += 1;
  }
  return Object.entries(byDay).map(([dayStr, { sum, count }]) => {
    const day = parseInt(dayStr, 10);
    return {
      dayOfWeek: day,
      dayLabel: labels[day],
      value: count > 0 ? Math.round((sum / count) * 1000) / 1000 : 0,
    };
  });
}

/** Simple seasonal decomposition: separate trend (12-period moving avg) from seasonal signal */
export function seasonalDecomposition(
  points: TimeSeriesPoint[],
  periodLength = 7, // weekly pattern
  valueKey: keyof TimeSeriesPoint = 'value'
): SeasonalDecomposition[] {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  const values = points.map((p) => getVal(p));
  const n = values.length;

  // Trend: centered moving average
  const half = Math.floor(periodLength / 2);
  const trend: number[] = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - half); j <= Math.min(n - 1, i + half); j++) {
      sum += values[j];
      count++;
    }
    trend.push(count > 0 ? sum / count : values[i]);
  }

  // Detrended = actual - trend
  const detrended = values.map((v, i) => v - trend[i]);

  // Seasonal: average by position in period
  const seasonalByPos: Record<number, number[]> = {};
  for (let i = 0; i < periodLength; i++) seasonalByPos[i] = [];
  for (let i = 0; i < detrended.length; i++) {
    seasonalByPos[i % periodLength].push(detrended[i]);
  }
  const seasonalComponent = Object.keys(seasonalByPos).map((k) => {
    const arr = seasonalByPos[parseInt(k, 10)];
    return arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  });

  return points.map((p, i) => {
    const actual = getVal(p);
    const t = trend[i] ?? actual;
    const s = seasonalComponent[i % periodLength] ?? 0;
    const residual = actual - t - s;
    return {
      period: p.period,
      trend: Math.round(t * 1000) / 1000,
      seasonal: Math.round(s * 1000) / 1000,
      residual: Math.round(residual * 1000) / 1000,
      actual,
    };
  });
}

/** 5-year trend line — linear regression slope for long-term direction */
export function fiveYearTrendLine(
  points: TimeSeriesPoint[],
  valueKey: keyof TimeSeriesPoint = 'value'
): { slope: number; intercept: number; direction: 'up' | 'down' | 'flat' } {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0, direction: 'flat' };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  for (let i = 0; i < n; i++) {
    const x = i;
    const y = getVal(points[i]);
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }
  const denom = n * sumXX - sumX * sumX;
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
  const intercept = (sumY - slope * sumX) / n;
  const direction: 'up' | 'down' | 'flat' =
    slope > 0.001 ? 'up' : slope < -0.001 ? 'down' : 'flat';
  return {
    slope: Math.round(slope * 10000) / 10000,
    intercept: Math.round(intercept * 1000) / 1000,
    direction,
  };
}

/** Year-over-year same-period comparison — e.g. "vs same week last year" */
export function yearOverYearComparison(
  points: TimeSeriesPoint[],
  currentPeriod: string,
  valueKey: keyof TimeSeriesPoint = 'value'
): { current: number; previousYear: number; deltaPct: number | null } {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);
  const current = points.find((p) => p.period === currentPeriod);
  const prevYear = new Date(currentPeriod);
  prevYear.setFullYear(prevYear.getFullYear() - 1);
  const prevYearStr = prevYear.toISOString().slice(0, 10);
  const previous = points.find((p) => p.period === prevYearStr);

  const currVal = current ? getVal(current) : 0;
  const prevVal = previous ? getVal(previous) : 0;
  const deltaPct =
    prevVal > 0 ? Math.round(((currVal - prevVal) / prevVal) * 1000) / 10 : null;
  return { current: currVal, previousYear: prevVal, deltaPct };
}

/** Anomaly detection — flag metrics >2× weekly average with explanation */
export function detectAnomalies(
  points: TimeSeriesPoint[],
  thresholdMultiplier = 2,
  valueKey: keyof TimeSeriesPoint = 'value',
  windowDays = 7
): AnomalyResult[] {
  const getVal = (p: TimeSeriesPoint): number =>
    Number((p as Record<string, unknown>)[valueKey as string] ?? p.value);

  return points.map((p, i) => {
    const value = getVal(p);
    const start = Math.max(0, i - windowDays);
    const priorSlice = points.slice(start, i); // prior days only, not current
    const weeklyAvg =
      priorSlice.length > 0
        ? priorSlice.reduce((s, x) => s + getVal(x), 0) / priorSlice.length
        : value;
    const ratio = weeklyAvg > 0 ? value / weeklyAvg : 1;
    const isAnomaly = ratio >= thresholdMultiplier || (weeklyAvg > 0 && ratio <= 1 / thresholdMultiplier);
    const explanation = isAnomaly
      ? weeklyAvg > 0
        ? ratio >= thresholdMultiplier
          ? `${Math.round((ratio - 1) * 100)}% above weekly average`
          : `${Math.round((1 - ratio) * 100)}% below weekly average`
        : 'No baseline'
      : 'Within normal range';
    return {
      period: p.period,
      value,
      weeklyAvg: Math.round(weeklyAvg * 1000) / 1000,
      ratio: Math.round(ratio * 1000) / 1000,
      isAnomaly,
      explanation,
    };
  });
}
