import { readEvents, aggregate } from "@/lib/stats";
import TimeSeriesChart from "@/components/TimeSeriesChart";

export const dynamic = "force-dynamic";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#241d17] p-5 text-center">
      <p className="text-2xl font-bold text-[#f2c879]">{value}</p>
      <p className="mt-1 text-sm text-[#b8ab9c]">{label}</p>
    </div>
  );
}

export default async function StatistikPage() {
  const events = await readEvents();
  const stats = aggregate(events);

  const maxHourly = Math.max(1, ...stats.hourly);
  const maxDeviceCount = Math.max(1, stats.deviceCounts.mobile, stats.deviceCounts.desktop);
  const maxRefCount = stats.referrers[0]?.count ?? 1;

  return (
    <main className="min-h-screen bg-[#171310] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-[#f2c879]">
          Besöksstatistik
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Sidvisningar" value={String(stats.totalPageviews)} />
          <StatCard label="Unika besökare" value={String(stats.uniqueVisitors)} />
          <StatCard label="Klick" value={String(stats.totalClicks)} />
          <StatCard label="Konverteringsgrad" value={`${stats.conversionRate.toFixed(1)}%`} />
        </div>

        <section className="mt-8 rounded-2xl bg-[#241d17] p-6">
          <h2 className="text-center text-lg font-semibold text-[#f2c879]">
            Sidvisningar över tid
          </h2>
          <div className="mt-4">
            <TimeSeriesChart data={stats.daily} />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#241d17] p-5">
            <h3 className="font-semibold text-[#f2c879]">Bästa dagen</h3>
            {stats.bestDay ? (
              <p className="mt-2 text-[#f0e6da]">
                {stats.bestDay.date} — {stats.bestDay.pageviews} sidvisningar
              </p>
            ) : (
              <p className="mt-2 text-sm text-[#b8ab9c]">Ingen data än.</p>
            )}
          </div>
          <div className="rounded-2xl bg-[#241d17] p-5">
            <h3 className="font-semibold text-[#f2c879]">Sedan start</h3>
            <p className="mt-2 text-[#f0e6da]">
              {stats.daysSinceStart} {stats.daysSinceStart === 1 ? "dag" : "dagar"} ·{" "}
              {stats.avgPerDay.toFixed(1)} sidvisningar/dag i snitt
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-[#241d17] p-6">
          <h2 className="text-center text-lg font-semibold text-[#f2c879]">
            Fördelning över dygnet
          </h2>
          <div className="mt-6 flex h-32 items-end gap-1">
            {stats.hourly.map((count, hour) => (
              <div
                key={hour}
                className="flex flex-1 flex-col items-center justify-end"
                title={`${hour}:00 — ${count} sidvisningar`}
              >
                <div
                  className="w-full rounded-t bg-[#e2703a]"
                  style={{
                    height: `${(count / maxHourly) * 100}%`,
                    minHeight: count > 0 ? "2px" : 0,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-[#b8ab9c]">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>23</span>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#241d17] p-5">
            <h3 className="font-semibold text-[#f2c879]">Mobil vs desktop</h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm text-[#f0e6da]">
                  <span>Mobil</span>
                  <span>{stats.deviceCounts.mobile}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[#171310]">
                  <div
                    className="h-full rounded-full bg-[#e2703a]"
                    style={{ width: `${(stats.deviceCounts.mobile / maxDeviceCount) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-[#f0e6da]">
                  <span>Desktop</span>
                  <span>{stats.deviceCounts.desktop}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[#171310]">
                  <div
                    className="h-full rounded-full bg-[#f2c879]"
                    style={{ width: `${(stats.deviceCounts.desktop / maxDeviceCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#241d17] p-5">
            <h3 className="font-semibold text-[#f2c879]">Trafikkällor</h3>
            <div className="mt-4 space-y-3">
              {stats.referrers.length === 0 && (
                <p className="text-sm text-[#b8ab9c]">Ingen data än.</p>
              )}
              {stats.referrers.slice(0, 6).map((r) => (
                <div key={r.ref}>
                  <div className="flex justify-between text-sm text-[#f0e6da]">
                    <span>{r.ref}</span>
                    <span>{r.count}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[#171310]">
                    <div
                      className="h-full rounded-full bg-[#e2703a]"
                      style={{ width: `${(r.count / maxRefCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
