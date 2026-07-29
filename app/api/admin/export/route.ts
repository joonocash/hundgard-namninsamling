import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function csvField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function GET() {
  const signatures = await prisma.signature.findMany({
    where: { verifiedAt: { not: null } },
    orderBy: { verifiedAt: "asc" },
    select: { name: true, email: true, postnummer: true, verifiedAt: true },
  });

  const header = "Namn,E-post,Postnummer,Bekräftad\n";
  const rows = signatures
    .map((s) =>
      [csvField(s.name), csvField(s.email), csvField(s.postnummer), csvField(s.verifiedAt!.toISOString())].join(",")
    )
    .join("\n");

  return new NextResponse(header + rows + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="hundgard-underskrifter-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
