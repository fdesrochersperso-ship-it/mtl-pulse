/**
 * Data access layer for air quality (RSQA IQA).
 * Current IQA by sector, bad air days, pollutant trends, station map.
 */

import { db } from '@/lib/db';
import { airQuality } from '@/lib/db/schema';
import { eq, gte, lte, sql, desc, and } from 'drizzle-orm';

/** IQA thresholds (RSQA): Bon < 25, Acceptable 25-50, Mauvais > 50 */
const IQA_GOOD = 25;
const IQA_ACCEPTABLE = 50;

export type AirQualityBySector = {
  sectorName: string;
  stationId: string;
  iqa: number;
  pollutant: string;
  readingDate: string;
  readingHour: number | null;
  lat: number | null;
  lng: number | null;
};

/** Latest IQA reading per station/sector */
export async function getCurrentIqaBySector(): Promise<AirQualityBySector[]> {
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const since = sevenDaysAgo.toISOString().slice(0, 10);

  const rows = await db
    .select()
    .from(airQuality)
    .where(
      and(
        gte(airQuality.readingDate, since),
        lte(airQuality.readingDate, today)
      )
    )
    .orderBy(desc(airQuality.readingDate), desc(airQuality.readingHour));

  const byStation = new Map<string, AirQualityBySector>();
  for (const r of rows) {
    const key = r.stationId;
    if (!byStation.has(key)) {
      byStation.set(key, {
        sectorName: r.sectorName ?? r.stationId,
        stationId: r.stationId,
        iqa: r.value != null ? Number(r.value) : 0,
        pollutant: r.pollutant,
        readingDate: String(r.readingDate).slice(0, 10),
        readingHour: r.readingHour,
        lat: r.lat != null ? Number(r.lat) : null,
        lng: r.lng != null ? Number(r.lng) : null,
      });
    }
  }

  return [...byStation.values()];
}

/** City-wide latest IQA (max across sectors for "current" display) */
export async function getCurrentCityIqa(): Promise<{
  iqa: number;
  sectorName: string;
  pollutant: string;
  readingDate: string;
  readingHour: number | null;
} | null> {
  const rows = await getCurrentIqaBySector();
  if (rows.length === 0) return null;
  const latest = rows[0];
  return {
    iqa: latest.iqa,
    sectorName: latest.sectorName,
    pollutant: latest.pollutant,
    readingDate: latest.readingDate,
    readingHour: latest.readingHour,
  };
}

/** Bad air days per year (IQA > 50) */
export async function getBadAirDaysPerYear(): Promise<{ year: string; count: number }[]> {
  const result = await db.execute(sql.raw(`
    SELECT EXTRACT(YEAR FROM reading_date)::int AS y, COUNT(DISTINCT reading_date)::int AS cnt
    FROM air_quality
    WHERE (value)::numeric > ${IQA_ACCEPTABLE}
    GROUP BY EXTRACT(YEAR FROM reading_date)
    ORDER BY y DESC
    LIMIT 10
  `));

  const rows = (result.rows || []) as { y: number; cnt: number }[];
  return rows.map((r) => ({
    year: String(r.y),
    count: Number(r.cnt),
  }));
}

/** Pollutant trend over time */
export type PollutantTrendPoint = {
  period: string;
  pollutant: string;
  avgValue: number;
  maxValue: number;
  stationCount: number;
};

export async function getPollutantTrend(
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly'
): Promise<PollutantTrendPoint[]> {
  const dateTrunc = granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';

  const result = await db.execute(sql.raw(`
    SELECT
      date_trunc('${dateTrunc}', reading_date)::date AS period,
      pollutant,
      AVG((value)::numeric) AS avg_val,
      MAX((value)::numeric) AS max_val,
      COUNT(DISTINCT station_id)::int AS station_cnt
    FROM air_quality
    WHERE reading_date >= '${startDate}' AND reading_date <= '${endDate}'
    GROUP BY date_trunc('${dateTrunc}', reading_date), pollutant
    ORDER BY period, pollutant
  `));

  const rows = (result.rows || []) as {
    period: Date | string;
    pollutant: string;
    avg_val: string;
    max_val: string;
    station_cnt: number;
  }[];

  return rows.map((r) => ({
    period:
      typeof r.period === 'string'
        ? r.period.slice(0, 10)
        : (r.period as Date).toISOString().slice(0, 10),
    pollutant: r.pollutant,
    avgValue: Number(r.avg_val ?? 0),
    maxValue: Number(r.max_val ?? 0),
    stationCount: Number(r.station_cnt ?? 0),
  }));
}

/** Stations with coords for map */
export async function getAirQualityStations(): Promise<{
  stationId: string;
  sectorName: string | null;
  lat: number | null;
  lng: number | null;
  latestIqa: number | null;
}[]> {
  const result = await db.execute(sql.raw(`
    SELECT DISTINCT ON (station_id)
      station_id,
      sector_name,
      (lat)::numeric AS lat,
      (lng)::numeric AS lng,
      (value)::numeric AS latest_iqa
    FROM air_quality
    WHERE lat IS NOT NULL AND lng IS NOT NULL
    ORDER BY station_id, reading_date DESC, reading_hour DESC NULLS LAST
  `));

  const rows = (result.rows || []) as {
    station_id: string;
    sector_name: string | null;
    lat: string;
    lng: string;
    latest_iqa: string | null;
  }[];

  return rows.map((r) => ({
    stationId: r.station_id,
    sectorName: r.sector_name,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
    latestIqa: r.latest_iqa != null ? Number(r.latest_iqa) : null,
  }));
}
