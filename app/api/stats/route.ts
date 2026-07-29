import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const verifiedCount = await prisma.signature.count({
    where: { verifiedAt: { not: null } },
  });

  const goal = Number(process.env.SIGNATURE_GOAL ?? 1000);

  return NextResponse.json({ verifiedCount, goal });
}
