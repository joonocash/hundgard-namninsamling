"use client";

import { useState } from "react";

type DailyPoint = { date: string; pageviews: number; clicks: number };

const RANGES = [
  { key: "week", label: "Vecka", days: 7 },
  { key: "month", label: "Månad", days: 30 },
  { key: "all", label: "Allt", days: Infinity },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

export default function TimeSeriesChart({ data }: { data: DailyPoint[] }) {
  const [range, setRange] = useState<RangeKey>("week");

  const activeRange = RANGES.find((r) => r.key === range)!;
  const slice = activeRange.days === Infinity ? data : data.slice(-activeRange.days);
  const max = Math.max(1, ...slice.map((d) => d.pageviews));

  return (
    <div>
      <div className="flex justify-center gap-2">
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setRange(r.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              range === r.key
                ? "bg-[#e2703a] text-white"
                : "bg-[#171310] text-[#b8ab9c] hover:text-[#f0e6da]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {slice.length === 0 ? (
        <p className="mt-6 text-center text-sm text-[#b8ab9c]">Ingen data än.</p>
      ) : (
        <>
          <div className="mt-6 flex h-40 items-end gap-1">
            {slice.map((d) => (
              <div
                key={d.date}
                className="flex min-w-[3px] flex-1 flex-col items-center justify-end"
                title={`${d.date}: ${d.pageviews} sidvisningar, ${d.clicks} klick`}
              >
                <div
                  className="w-full rounded-t bg-[#e2703a]"
                  style={{
                    height: `${(d.pageviews / max) * 100}%`,
                    minHeight: d.pageviews > 0 ? "2px" : 0,
                  }}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-[#b8ab9c]">
            {slice[0].date} — {slice[slice.length - 1].date}
          </p>
        </>
      )}
    </div>
  );
}
