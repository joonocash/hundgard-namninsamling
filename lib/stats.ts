import { readFile } from "fs/promises";

const EVENTS_FILE = "/app/data/events.jsonl";

export type Event = {
  type: "pageview" | "click";
  ts: string;
  visitor: string;
  device: "mobile" | "desktop";
  ref: string;
};

export async function readEvents(): Promise<Event[]> {
  let raw: string;
  try {
    raw = await readFile(EVENTS_FILE, "utf-8");
  } catch {
    return [];
  }

  const events: Event[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed?.type === "pageview" || parsed?.type === "click") {
        events.push(parsed);
      }
    } catch {
      // skip malformed line
    }
  }
  return events;
}

// en-CA formats as YYYY-MM-DD, which is exactly the bucket key we want.
function stockholmDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

function stockholmHour(iso: string): number {
  const hourStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
  const hour = parseInt(hourStr, 10);
  return Number.isFinite(hour) ? hour % 24 : 0;
}

// Treats YYYY-MM-DD strings as calendar-date labels and steps day by day —
// no timezone math involved, they're already Stockholm-local buckets.
function fillDateRange(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  let cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
  }
  return dates;
}

export type DailyPoint = { date: string; pageviews: number; clicks: number };

export type Stats = {
  totalPageviews: number;
  totalClicks: number;
  uniqueVisitors: number;
  conversionRate: number;
  daily: DailyPoint[];
  bestDay: DailyPoint | null;
  hourly: number[];
  deviceCounts: { mobile: number; desktop: number };
  referrers: { ref: string; count: number }[];
  daysSinceStart: number;
  avgPerDay: number;
};

export function aggregate(events: Event[]): Stats {
  const pageviews = events.filter((e) => e.type === "pageview");
  const clicks = events.filter((e) => e.type === "click");

  const totalPageviews = pageviews.length;
  const totalClicks = clicks.length;
  const conversionRate = totalPageviews > 0 ? (totalClicks / totalPageviews) * 100 : 0;
  const uniqueVisitors = new Set(events.map((e) => e.visitor)).size;

  const dayMap = new Map<string, { pageviews: number; clicks: number }>();
  for (const e of pageviews) {
    const d = stockholmDate(e.ts);
    const entry = dayMap.get(d) ?? { pageviews: 0, clicks: 0 };
    entry.pageviews += 1;
    dayMap.set(d, entry);
  }
  for (const e of clicks) {
    const d = stockholmDate(e.ts);
    const entry = dayMap.get(d) ?? { pageviews: 0, clicks: 0 };
    entry.clicks += 1;
    dayMap.set(d, entry);
  }

  const sortedDates = Array.from(dayMap.keys()).sort();
  let daily: DailyPoint[] = [];
  let daysSinceStart = 0;

  if (sortedDates.length > 0) {
    const firstDate = sortedDates[0];
    const todayStr = stockholmDate(new Date().toISOString());
    daily = fillDateRange(firstDate, todayStr).map((date) => ({
      date,
      pageviews: dayMap.get(date)?.pageviews ?? 0,
      clicks: dayMap.get(date)?.clicks ?? 0,
    }));
    daysSinceStart = daily.length;
  }

  const bestDay =
    daily.length > 0
      ? daily.reduce((best, d) => (d.pageviews > best.pageviews ? d : best), daily[0])
      : null;

  const hourly = new Array(24).fill(0) as number[];
  for (const e of pageviews) {
    hourly[stockholmHour(e.ts)] += 1;
  }

  const deviceCounts = { mobile: 0, desktop: 0 };
  for (const e of pageviews) {
    deviceCounts[e.device === "mobile" ? "mobile" : "desktop"] += 1;
  }

  const refMap = new Map<string, number>();
  for (const e of pageviews) {
    refMap.set(e.ref, (refMap.get(e.ref) ?? 0) + 1);
  }
  const referrers = Array.from(refMap.entries())
    .map(([ref, count]) => ({ ref, count }))
    .sort((a, b) => b.count - a.count);

  const avgPerDay = daysSinceStart > 0 ? totalPageviews / daysSinceStart : 0;

  return {
    totalPageviews,
    totalClicks,
    uniqueVisitors,
    conversionRate,
    daily,
    bestDay,
    hourly,
    deviceCounts,
    referrers,
    daysSinceStart,
    avgPerDay,
  };
}
