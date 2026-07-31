export default function IntegritetspolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-primary">Integritetspolicy</h1>

      <div className="mt-6 space-y-4 text-ink">
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

      <a href="/" className="mt-8 inline-block text-primary underline">
        Till startsidan
      </a>
    </main>
  );
}
