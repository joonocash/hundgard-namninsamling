export default function AdminQrPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-primary">QR-kod för lappar</h1>
      <p className="mt-2 text-ink">
        Skanna för att testa, eller ladda ner i den upplösning du behöver för utskrift.
      </p>

      <div className="mt-6 flex justify-center rounded-2xl bg-white p-6 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/admin/qrcode?size=1024" alt="QR-kod till sajten" width={320} height={320} />
      </div>

      <div className="mt-6 flex justify-center gap-4 text-sm">
        <a className="underline" href="/api/admin/qrcode?size=512" download="hundgard-qr-512.png">
          Ladda ner 512px
        </a>
        <a className="underline" href="/api/admin/qrcode?size=1024" download="hundgard-qr-1024.png">
          Ladda ner 1024px
        </a>
        <a className="underline" href="/api/admin/qrcode?size=2048" download="hundgard-qr-2048.png">
          Ladda ner 2048px
        </a>
      </div>

      <a href="/admin" className="mt-8 inline-block text-primary underline">
        Tillbaka till admin
      </a>
    </main>
  );
}
