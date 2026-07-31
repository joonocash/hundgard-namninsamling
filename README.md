# Hundgård i Stampen — informationssida

En enkel, statisk Next.js-sida som beskriver förslaget om en hundrastgård i
Stampen och länkar vidare till en extern namninsamling. Ingen databas, inget
backend-API — bara en informationssida med bilder och en CTA-knapp.

## Innan du kör något

Fyll i den riktiga länken till namninsamlingen i [app/page.tsx](app/page.tsx)
(sök efter `[KLISTRA IN URL HÄR]`, förekommer på två ställen: hero och
avslutande CTA).

## Lokal utveckling

1. `npm install`
2. `cp .env.example .env`
3. `npm run dev` och öppna http://localhost:3000

## Deploy till din Ubuntu-VM

1. Klona repot i din hemkatalog på VM:en, så att sökvägen blir `~/hundgard-namninsamling`
   (CI/CD-workflowen nedan förutsätter den sökvägen):
   ```
   git clone https://github.com/joonocash/hundgard-namninsamling.git ~/hundgard-namninsamling
   cd ~/hundgard-namninsamling
   ```
2. `cp .env.example .env` och sätt `NEXT_PUBLIC_SITE_URL` till den riktiga
   domänen/adressen.
3. `docker compose up -d --build`
4. Peka din befintliga reverse proxy/Tailscale-uppsättning mot `127.0.0.1:3000`
   på VM:en (porten är bunden till loopback, inte hela LAN:et), precis som för
   dina andra två VM:ar.

### Uppdatera efter kodändringar

Manuellt:
```
git pull
docker compose up -d --build
```

Eller automatiskt vid varje push — se nästa avsnitt.

## Automatisk deploy vid push (CI/CD)

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) kör automatiskt
`git reset --hard origin/master && docker compose up -d --build` i
`~/hundgard-namninsamling` på din VM varje gång du pushar till `master`, via en
**self-hosted GitHub Actions-runner** som du installerar på VM:en. Runnern
kopplar upp sig utåt mot GitHub — inga inkommande portar behöver öppnas.

### Installera runnern på VM:en (görs en gång)

1. Gå till repot på GitHub → **Settings → Actions → Runners → New self-hosted runner**.
2. Välj **Linux / x64** och kör kommandona som visas där direkt på din Ubuntu-VM
   (de innehåller en unik registreringstoken från GitHub som jag inte kan
   generera åt dig här, och som bara gäller en kort stund).
3. När runnern frågar vilka labels/grupp den ska ha kan du köra med standardvärden.
4. Installera den som en tjänst så den överlever omstart:
   ```
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```
5. Testa genom att göra en liten commit och pusha till `master` — under
   **Actions**-fliken på GitHub ser du jobbet köras på din runner.

### Viktigt att veta om self-hosted runners på ett publikt repo

En self-hosted runner har full åtkomst till maskinen den kör på (i det här
fallet din hemmaserver). GitHub varnar uttryckligen för detta i kombination
med publika repon: vem som helst med skrivbehörighet till repot kan i
praktiken köra kod på din server via en workflow. Så länge workflowen (som
ovan) **bara triggas av push till `master`** — inte av `pull_request` från
forkar — och du inte lägger till andra samarbetspartners utan att lita på
dem, är risken låg. Lägg gärna på branch protection på `master` (Settings →
Branches) så att även du själv behöver godkänna ändringar via PR innan de
når `master` och triggar en deploy.
