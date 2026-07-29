import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  const sizeParam = Number(req.nextUrl.searchParams.get("size") ?? 1024);
  const size = [512, 1024, 2048].includes(sizeParam) ? sizeParam : 1024;

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const buffer = await QRCode.toBuffer(url, { width: size, margin: 2 });

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
