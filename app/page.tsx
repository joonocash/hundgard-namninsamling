import ExpandableImage from "@/components/ExpandableImage";
import CtaButton from "@/components/CtaButton";
import Tracker from "@/components/Tracker";

const CTA_URL = "[KLISTRA IN URL HÄR]";
const MAP_URL = "https://www.google.com/maps?q=57.70790,11.98982&z=18";

const CITY_STATS: {
  name: string;
  dogs: number;
  dogsLabel: string;
  parks: number;
  parksLabel: string;
  ratioLabel: string;
  highlight?: boolean;
}[] = [
  { name: "Malmö", dogs: 22300, dogsLabel: "~22 300", parks: 50, parksLabel: "~50", ratioLabel: "~450" },
  {
    name: "Stockholm",
    dogs: 54000,
    dogsLabel: "~54 000",
    parks: 137,
    parksLabel: "~135–140",
    ratioLabel: "~390–400",
  },
  {
    name: "Göteborg",
    dogs: 30700,
    dogsLabel: "~30 700",
    parks: 13,
    parksLabel: "~12–14",
    ratioLabel: "~2 200–2 500",
    highlight: true,
  },
];

const maxCityDogs = Math.max(...CITY_STATS.map((c) => c.dogs));
const maxCityParks = Math.max(...CITY_STATS.map((c) => c.parks));

const features: { title: string; icon: React.ReactNode }[] = [
  {
    title: "Skapa en trygg plats där hundar kan springa fritt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v4.286c0 3.51-2.02 6.784-4.918 8.767a26.6 26.6 0 0 1-3.626 2.048.75.75 0 0 1-.912 0 26.6 26.6 0 0 1-3.626-2.048C5.02 15.844 3 12.57 3 9.06V4.774c0-.54.384-1.006.917-1.096A50.317 50.317 0 0 1 12 3Z"
        />
      </svg>
    ),
  },
  {
    title: "Bidra till ökad gemenskap mellan grannar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Göra området ännu mer attraktivt och levande.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
    ),
  },
  {
    title: "Ta till vara på en yta som idag inte används.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.443a1.125 1.125 0 0 0-1.006 0L3.622 5.88C3.24 6.07 3 6.462 3 6.887V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171310]">
      <Tracker />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-12 sm:px-6">
        <section className="text-center">
          <h1 className="text-3xl font-bold text-[#f2c879] sm:text-4xl">
            Ja till en hundrastgård i Stampen!
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#f0e6da]">
            En obebyggd yta vid Stampens kyrkogård skulle kunna bli en trygg och
            efterlängtad hundrastgård. Hjälp oss visa Göteborgs stad att vi är
            många som vill se det hända.
          </p>
          <div className="mt-6">
            <CtaButton href={CTA_URL}>Skriv under här</CtaButton>
          </div>
        </section>

        <section className="rounded-2xl bg-[#241d17] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#b8ab9c]">
            Så illa är läget
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#f0e6da]">
            Göteborg har fler hundar än Malmö men bara en bråkdel så många
            hundrastgårdar — och långt färre än Stockholm. Resultatet: i Göteborg
            delar hela{" "}
            <strong className="text-[#e2703a]">2 200–2 500 hundar</strong> på
            varje rastgård, jämfört med som mest{" "}
            <strong className="text-[#f2c879]">450</strong> i Malmö och{" "}
            <strong className="text-[#f2c879]">390–400</strong> i Stockholm.
          </p>

          <div className="mx-auto mt-8 max-w-md">
            <p className="text-left text-xs font-semibold uppercase tracking-wide text-[#b8ab9c]">
              Antal registrerade hundar
            </p>
            <div className="mt-3 space-y-4">
              {CITY_STATS.map((city) => (
                <div key={`dogs-${city.name}`}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[#f0e6da]">{city.name}</span>
                    <span
                      className={`text-lg font-bold ${
                        city.highlight ? "text-[#e2703a]" : "text-[#f2c879]"
                      }`}
                    >
                      {city.dogsLabel}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-[#171310]">
                    <div
                      className={`h-full rounded-full ${
                        city.highlight ? "bg-[#e2703a]" : "bg-[#f2c879]"
                      }`}
                      style={{ width: `${(city.dogs / maxCityDogs) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-7 text-left text-xs font-semibold uppercase tracking-wide text-[#b8ab9c]">
              Antal kommunala hundrastgårdar
            </p>
            <div className="mt-3 space-y-4">
              {CITY_STATS.map((city) => (
                <div key={`parks-${city.name}`}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[#f0e6da]">{city.name}</span>
                    <span
                      className={`text-lg font-bold ${
                        city.highlight ? "text-[#e2703a]" : "text-[#f2c879]"
                      }`}
                    >
                      {city.parksLabel}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-[#171310]">
                    <div
                      className={`h-full rounded-full ${
                        city.highlight ? "bg-[#e2703a]" : "bg-[#f2c879]"
                      }`}
                      style={{ width: `${(city.parks / maxCityParks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-4">
              <p className="text-left text-xs font-semibold uppercase tracking-wide text-[#b8ab9c]">
                Hundar per rastgård
              </p>
              <div className="mt-3 flex justify-between gap-2">
                {CITY_STATS.map((city) => (
                  <div key={`ratio-${city.name}`} className="flex-1">
                    <p
                      className={`text-xl font-bold ${
                        city.highlight ? "text-[#e2703a]" : "text-[#f2c879]"
                      }`}
                    >
                      {city.ratioLabel}
                    </p>
                    <p className="mt-1 text-xs text-[#b8ab9c]">{city.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-[#241d17]">
            <ExpandableImage
              src="/fore.jpg"
              alt="Den obebyggda ytan vid Stampens kyrkogård som den ser ut idag"
              sizes="(min-width: 768px) 50vw, 100vw"
              aspectClassName="aspect-[4/3]"
            />
            <figcaption className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wide text-[#b8ab9c]">
              Idag
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-2xl bg-[#241d17]">
            <ExpandableImage
              src="/efter.jpg"
              alt="Illustration av hur platsen skulle kunna bli som hundrastgård"
              sizes="(min-width: 768px) 50vw, 100vw"
              aspectClassName="aspect-[4/3]"
            />
            <figcaption className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wide text-[#b8ab9c]">
              Så här skulle det kunna bli
            </figcaption>
          </figure>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-[#f0e6da]">
          <p>
            Även människans bästa vän behöver en plats för att springa av sig och
            ha roligt. I centrala Göteborg finns alldeles för få hundrastgårdar,
            men i Stampen finns en yta som är perfekt för ändamålet!
          </p>
          <p>
            Vi är många hundägare i centrala Göteborg som efterfrågar, önskar och
            längtar efter en lättillgänglig hundrastgård.
          </p>
          <p>
            I dagsläget finns en obebyggd yta i närheten av Stampens kyrkogård där
            en förskola tidigare låg. Marken har stått oanvänd under lång tid, men
            skulle kunna förvandlas till något som skapar glädje, gemenskap och
            ökad trivsel för många boende i området med omnejd.
          </p>
          <p>
            En hundrastgård skulle ge oss en trygg och naturlig plats där hundar
            kan springa lösa, leka och få den motion och socialisering de behöver,
            samtidigt som hundägare får en trevlig mötesplats. I ett tätbebyggt
            område som Stampen är det ont om säkra ytor där hundar kan vara lösa
            och vi är många som efterfrågar en sådan mötesplats för både oss och
            de fyrbenta.
          </p>
        </section>

        <section>
          <h2 className="text-center text-xl font-semibold text-[#f2c879]">
            En hundrastgård skulle:
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-2xl bg-[#241d17] p-5"
              >
                <span className="mt-0.5 shrink-0 text-[#e2703a]">{feature.icon}</span>
                <p className="text-[#f0e6da]">{feature.title}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-base leading-relaxed text-[#f0e6da]">
          Detta är inte bara en önskan från en enskild person. Vi är många som
          saknar denna typ av facilitet och det kommer underskrifterna i detta
          förslag att styrka.
        </p>

        <section>
          <figure className="overflow-hidden rounded-2xl bg-[#241d17]">
            <ExpandableImage
              src="/karta.jpg"
              alt="Karta som visar platsens läge i Stampen"
              sizes="100vw"
              aspectClassName="aspect-[16/10]"
            />
            <figcaption className="px-4 py-3 text-center text-sm text-[#b8ab9c]">
              Platsen är inringad på kartan.{" "}
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#e2703a] underline underline-offset-2 hover:text-[#c85f2e]"
              >
                Visa på Google Maps
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="text-center">
          <p className="text-lg leading-relaxed text-[#f0e6da]">
            Tycker inte du, precis som vi, att Göteborgs stad borde se
            möjligheten att, med mycket enkla medel, utveckla denna idag
            outnyttjade yta till en välkomnande hundrastgård som kommer att
            uppskattas av många (med och utan morrhår och päls) under en lång tid
            framöver?
          </p>
          <div className="mt-6">
            <CtaButton href={CTA_URL}>Skriv under här</CtaButton>
          </div>
        </section>
      </div>
    </main>
  );
}
