"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({
  initialCount,
  goal,
}: {
  initialCount: number;
  goal: number;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setCount(data.verifiedCount);
      } catch {
        // ignore transient network errors, next poll will retry
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const pct = Math.min(100, Math.round((count / goal) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm font-medium text-ink">
        <span>{count} underskrifter</span>
        <span>Mål: {goal}</span>
      </div>
      <div className="h-4 w-full rounded-full bg-white shadow-inner overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
