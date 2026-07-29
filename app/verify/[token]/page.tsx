import { prisma } from "@/lib/prisma";

function Message({ title, body }: { title: string; body: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-10 text-center">
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="mt-3 text-ink">{body}</p>
        <a href="/" className="mt-6 inline-block text-primary underline">
          Till startsidan
        </a>
      </div>
    </main>
  );
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const signature = await prisma.signature.findUnique({
    where: { verificationToken: token },
  });

  if (!signature) {
    return (
      <Message
        title="Ogiltig länk"
        body="Den här bekräftelselänken hittades inte. Den kan redan ha använts eller vara felaktig."
      />
    );
  }

  if (signature.verifiedAt) {
    return (
      <Message title="Redan bekräftad" body="Den här underskriften är redan bekräftad. Tack!" />
    );
  }

  if (signature.verificationExpires < new Date()) {
    return (
      <Message
        title="Länken har gått ut"
        body="Den här länken är inte längre giltig. Gå till startsidan och skriv under igen med samma e-postadress för att få en ny bekräftelselänk."
      />
    );
  }

  await prisma.signature.update({
    where: { id: signature.id },
    data: { verifiedAt: new Date() },
  });

  return (
    <Message title="Tack för din underskrift!" body="Din underskrift för hundgården är nu bekräftad." />
  );
}
