import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

// SQLite defaults to a rollback-journal that serializes writers; WAL lets a
// verification click and a new signup land at the same time without
// "database is locked" errors.
prisma.$executeRawUnsafe("PRAGMA journal_mode=WAL;").catch(() => {});
