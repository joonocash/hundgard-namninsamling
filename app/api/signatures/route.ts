import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signatureSchema } from "@/lib/validation";
import { sendVerificationEmail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rateLimit";
import { getClientIp, hashIp } from "@/lib/ip";

const VERIFICATION_TTL_MS = 72 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = hashIp(getClientIp(req));

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "För många försök. Försök igen senare." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = signatureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ogiltiga uppgifter." },
      { status: 400 }
    );
  }

  const { name, email, postnummer, company } = parsed.data;

  // Honeypot tripped: pretend it worked, write nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + VERIFICATION_TTL_MS);

  const existing = await prisma.signature.findUnique({ where: { email } });

  if (existing?.verifiedAt) {
    return NextResponse.json(
      { error: "Den här e-postadressen har redan skrivit under." },
      { status: 409 }
    );
  }

  if (existing) {
    await prisma.signature.update({
      where: { email },
      data: { name, postnummer, verificationToken: token, verificationExpires: expires, ipHash: ip },
    });
  } else {
    await prisma.signature.create({
      data: { name, email, postnummer, verificationToken: token, verificationExpires: expires, ipHash: ip },
    });
  }

  await sendVerificationEmail(email, name, token);

  return NextResponse.json({ ok: true });
}
