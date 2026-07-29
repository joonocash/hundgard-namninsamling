export default function IntegritetspolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-primary">Integritetspolicy</h1>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          Den här sidan samlar in underskrifter för en namninsamling som syftar till att
          få Göteborgs kommun att utreda möjligheten att anlägga en hundgård vid
          [PLATS/OMRÅDE].
        </p>

        <h2 className="font-semibold text-primary">Vilka uppgifter samlas in?</h2>
        <p>
          Namn, e-postadress och postnummer som du själv anger, samt tidpunkten för din
          underskrift. Vi sparar även en hashad (icke-återställbar) version av din
          IP-adress för att motverka missbruk av formuläret — aldrig din faktiska
          IP-adress.
        </p>

        <h2 className="font-semibold text-primary">Rättslig grund</h2>
        <p>Ditt samtycke, genom att du fyller i och bekräftar formuläret via e-post.</p>

        <h2 className="font-semibold text-primary">Hur används uppgifterna?</h2>
        <p>
          Namn, e-post och postnummer för de som bekräftat sin underskrift sammanställs
          i en lista som lämnas över till Göteborgs kommun som underlag för
          namninsamlingen.
        </p>

        <h2 className="font-semibold text-primary">Hur länge sparas uppgifterna?</h2>
        <p>
          Uppgifterna sparas till dess namninsamlingen lämnats över till kommunen och
          raderas därefter, senast [ANGE PERIOD, t.ex. "6 månader efter överlämning"].
        </p>

        <h2 className="font-semibold text-primary">Personuppgiftsansvarig</h2>
        <p>
          [DITT NAMN], kontakt: [DIN E-POSTADRESS]. Kontakta mig för att rätta, radera
          eller begära ett utdrag av dina uppgifter.
        </p>
      </div>

      <a href="/" className="mt-8 inline-block text-primary underline">
        Till startsidan
      </a>
    </main>
  );
}
