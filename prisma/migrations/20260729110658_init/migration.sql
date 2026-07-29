-- CreateTable
CREATE TABLE "Signature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postnummer" TEXT NOT NULL,
    "verificationToken" TEXT NOT NULL,
    "verificationExpires" DATETIME NOT NULL,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipHash" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Signature_email_key" ON "Signature"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_verificationToken_key" ON "Signature"("verificationToken");

-- CreateIndex
CREATE INDEX "Signature_verifiedAt_idx" ON "Signature"("verifiedAt");
