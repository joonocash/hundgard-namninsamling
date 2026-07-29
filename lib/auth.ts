async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time-ish comparison via hashing both sides first, so this works
 * in the Edge runtime (no node:crypto) and never short-circuits on the raw
 * secret's length/content.
 */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [hashA, hashB] = await Promise.all([sha256Hex(a), sha256Hex(b)]);
  return hashA === hashB;
}

export async function isValidAdminAuth(header: string | null): Promise<boolean> {
  if (!header?.startsWith("Basic ")) return false;

  const decoded = atob(header.slice("Basic ".length));
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedPass = process.env.ADMIN_PASS ?? "";

  const [userOk, passOk] = await Promise.all([
    safeEqual(user, expectedUser),
    safeEqual(pass, expectedPass),
  ]);

  return userOk && passOk;
}
