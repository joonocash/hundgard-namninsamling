import { createHash } from "crypto";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const DATA_DIR = "/app/data";
const EVENTS_FILE = path.join(DATA_DIR, "events.jsonl");

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function getDevice(userAgent: string): "mobile" | "desktop" {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent) ? "mobile" : "desktop";
}

function getRef(referer: string | null): string {
  if (!referer) return "direkt";
  try {
    return new URL(referer).hostname || "direkt";
  } catch {
    return "direkt";
  }
}

// Rotates daily and is never reversible to an IP: today's date + the salt
// are folded into the hash, so the same visitor gets a new id tomorrow.
function getVisitorId(ip: string, userAgent: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const salt = process.env.VISITOR_SALT ?? "";
  return createHash("sha256")
    .update(`${ip}${userAgent}${today}${salt}`)
    .digest("hex")
    .slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const type = body?.type;

    if (type === "pageview" || type === "click") {
      const userAgent = req.headers.get("user-agent") ?? "";
      const event = {
        type,
        ts: new Date().toISOString(),
        visitor: getVisitorId(getClientIp(req), userAgent),
        device: getDevice(userAgent),
        ref: getRef(req.headers.get("referer")),
      };

      await mkdir(DATA_DIR, { recursive: true });
      await appendFile(EVENTS_FILE, JSON.stringify(event) + "\n");
    }
  } catch (err) {
    console.error("[track] failed to record event", err);
  }

  return new NextResponse(null, { status: 204 });
}
