import { NextResponse, type NextRequest } from "next/server";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Compares via hashing both sides first, so this works on the Edge runtime
// (no node:crypto) and doesn't short-circuit on the raw secret.
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [hashA, hashB] = await Promise.all([sha256Hex(a), sha256Hex(b)]);
  return hashA === hashB;
}

async function isValidStatsAuth(header: string | null): Promise<boolean> {
  if (!header?.startsWith("Basic ")) return false;

  const decoded = atob(header.slice("Basic ".length));
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  const [userOk, passOk] = await Promise.all([
    safeEqual(user, process.env.STATS_USER ?? ""),
    safeEqual(pass, process.env.STATS_PASS ?? ""),
  ]);

  return userOk && passOk;
}

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (await isValidStatsAuth(authHeader)) {
    return NextResponse.next();
  }

  return new NextResponse("Autentisering krävs.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Statistik", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/statistik/:path*"],
};
