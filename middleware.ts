import { NextResponse, type NextRequest } from "next/server";
import { isValidAdminAuth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (await isValidAdminAuth(authHeader)) {
    return NextResponse.next();
  }

  return new NextResponse("Autentisering krävs.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
