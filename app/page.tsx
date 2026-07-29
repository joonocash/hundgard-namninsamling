import ProgressBar from "@/components/ProgressBar";
import SignatureForm from "@/components/SignatureForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const verifiedCount = await prisma.signature.count({
    where: { verifiedAt: { not: null } },
  });
  const goal = Number(process.env.SIGNATURE_GOAL ?? 1000);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-primary">Ja till en hundgård!</h1>
        <p className="mt-3 text-ink">
          Vi vill att Göteborgs kommun utreder en inhägnad hundgård vid{" "}
          <strong>[PLATS/OMRÅDE]</strong>. Hjälp oss samla {goal} underskrifter så
          tar kommunen upp frågan.
        </p>
      </header>

      <ProgressBar initialCount={verifiedCount} goal={goal} />

      <SignatureForm />

      <section className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-primary">Varför just här?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
          <li>[Beskriv platsen — storlek, läge, hur den nås.]</li>
          <li>[Beskriv behovet — t.ex. avstånd till närmaste hundgård idag.]</li>
          <li>[Beskriv eventuella fördelar — trygghet, mötesplats, mm.]</li>
        </ul>
      </section>

      <footer className="pb-6 text-center text-sm text-gray-500">
        <a href="/integritetspolicy" className="underline">
          Integritetspolicy
        </a>
      </footer>
    </main>
  );
}
