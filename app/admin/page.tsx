import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const signatures = await prisma.signature.findMany({
    where: { verifiedAt: { not: null } },
    orderBy: { verifiedAt: "desc" },
    select: { name: true, email: true, postnummer: true, verifiedAt: true },
  });

  const pendingCount = await prisma.signature.count({
    where: { verifiedAt: null },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Admin — underskrifter</h1>
        <a
          href="/api/admin/export"
          className="rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          Exportera CSV
        </a>
      </div>

      <p className="mb-4 text-ink">
        {signatures.length} bekräftade underskrifter · {pendingCount} väntar på
        e-postbekräftelse ·{" "}
        <a href="/admin/qr" className="underline">
          QR-kod för lappar
        </a>
      </p>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3">Namn</th>
              <th className="px-4 py-3">E-post</th>
              <th className="px-4 py-3">Postnummer</th>
              <th className="px-4 py-3">Bekräftad</th>
            </tr>
          </thead>
          <tbody>
            {signatures.map((s) => (
              <tr key={s.email} className="border-b border-gray-100">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.postnummer}</td>
                <td className="px-4 py-2">
                  {s.verifiedAt?.toLocaleString("sv-SE")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
