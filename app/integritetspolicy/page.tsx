import Link from "next/link";

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto max-w-[480px] px-5 py-10">
        <h1 className="font-display text-[32px] font-bold leading-tight">Integritetspolicy</h1>

        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-body">
          <p>
            Den här sidan är en informationssida om förslaget på en hundrastgård i
            Stampen. Den samlar inte in eller sparar några personuppgifter.
          </p>
          <p>
            Om du vill skriva under namninsamlingen länkas du vidare till en
            extern sajt som hanterar och ansvarar för de uppgifter du lämnar där.
            Se den sajtens egen integritetspolicy för information om hur dina
            uppgifter behandlas.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center font-bold text-tint-ink underline underline-offset-2"
        >
          Till startsidan
        </Link>
      </div>
    </main>
  );
}
