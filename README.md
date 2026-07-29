# Hundgård-namninsamling

Enkel namninsamlingssajt: besökare skriver under med namn, e-post och postnummer,
bekräftar via en länk i mejlet, och en admin-vy låter dig exportera bekräftade
underskrifter som CSV att lämna till kommunen.

## Innan du kör något

Fyll i platsen och motiveringen i [app/page.tsx](app/page.tsx) (sök efter `[PLATS/OMRÅDE]`
och de tre punkterna under "Varför just här?"), samt ditt namn, e-post och
lagringstid i [app/integritetspolicy/page.tsx](app/integritetspolicy/page.tsx).

## Lokal utveckling

1. `npm install`
2. `cp .env.example .env` och sätt (Prisma CLI läser bara `.env`, inte `.env.local`):
   - `DATABASE_URL="file:./dev.db"`
   - `NEXT_PUBLIC_SITE_URL="http://localhost:3000"`
3. Starta Mailhog för att fånga upp bekräftelsemejl lokalt (kräver Docker):
   ```
   docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
   ```
   Sätt i `.env`: `SMTP_HOST=localhost`, `SMTP_PORT=1025`, `SMTP_SECURE=false`,
   lämna `SMTP_USER`/`SMTP_PASS` tomma. Se skickade mejl på http://localhost:8025.
4. `npx prisma migrate dev --name init`
5. `npm run dev` och öppna http://localhost:3000

### Testflöde

- Skriv under med en testadress → mejlet dyker upp i Mailhog → klicka
  bekräftelselänken → `/api/stats` bör öka.
- Samma e-post igen: om obekräftad skickas en ny länk, om redan bekräftad visas
  ett felmeddelande.
- `/admin` (Basic Auth med `ADMIN_USER`/`ADMIN_PASS` från `.env.local`) visar
  listan och en CSV-export-knapp.
- `/admin/qr` visar QR-koden som ska sättas på lapparna, med nedladdning i olika
  upplösningar för utskrift.

## Deploy till din Ubuntu-VM

1. Klona repot på VM:en.
2. `cp .env.example .env` och fyll i riktiga värden (SMTP, `ADMIN_USER`/`ADMIN_PASS`,
   `NEXT_PUBLIC_SITE_URL` med den riktiga domänen/adressen, `DATABASE_URL="file:/app/data/prod.db"`).
3. `mkdir -p data && chmod 777 data` (containern kör som en icke-root-användare
   med uid 1001 — enklast är att låta host-mappen vara skrivbar för alla i ett
   litet självhostat sammanhang som detta; kör annars `chown -R 1001:1001 data`).
4. `docker compose up -d --build`
5. Peka din befintliga reverse proxy/Tailscale-uppsättning mot port 3000, precis
   som för dina andra två VM:ar.

### Uppdatera efter kodändringar

```
git pull
docker compose up -d --build
```

### Backup

SQLite-filen ligger i `data/prod.db`. Backup är att kopiera filen:

```
cp data/prod.db backups/prod-$(date +%F).db
```

Kan enkelt schemaläggas med en cronjob på VM:en.

### Om spam blir ett problem

Just nu skyddas formuläret av ett honeypot-fält och rate limiting per IP
(`lib/rateLimit.ts`). Om det inte räcker är nästa steg att lägga till
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) på
formuläret — kräver bara ett gratis Cloudflare-konto och två nycklar.
