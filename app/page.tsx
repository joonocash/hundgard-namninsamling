import Link from "next/link";
import ExpandableImage from "@/components/ExpandableImage";
import CtaButton from "@/components/CtaButton";
import Tracker from "@/components/Tracker";
import ThemeToggle from "@/components/ThemeToggle";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const CTA_URL = "[KLISTRA IN URL HÄR]";
const MAP_URL = "https://www.google.com/maps?q=57.70790,11.98982&z=18";

// Dogs per dog park, from ~22 300 dogs / ~50 parks (Malmö),
// ~54 000 / ~135–140 (Stockholm) and ~30 700 / ~12–14 (Göteborg).
const DOGS_PER_PARK: { name: string; value: number; label: string; highlight?: boolean }[] = [
  { name: "Göteborg", value: 2500, label: "~2 500", highlight: true },
  { name: "Malmö", value: 450, label: "~450" },
  { name: "Stockholm", value: 400, label: "~400" },
];
const maxDogsPerPark = Math.max(...DOGS_PER_PARK.map((c) => c.value));

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-[22px] w-[22px]",
};

const pawPath =
  "M12 11.5c-2.6 0-5.5 3.6-5.5 6.2 0 1.6 1.2 2.6 2.7 2.6 1.1 0 1.8-.6 2.8-.6s1.7.6 2.8.6c1.5 0 2.7-1 2.7-2.6 0-2.6-2.9-6.2-5.5-6.2z";

function PawIcon({ className }: { className: string }) {
  return (
    <svg {...iconProps} strokeWidth={1.8} className={className}>
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="9.5" cy="5.5" r="2" />
      <circle cx="14.5" cy="5.5" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d={pawPath} />
    </svg>
  );
}

const features: { title: string; icon: React.ReactNode }[] = [
  {
    title: "Skapa en trygg plats där hundar kan springa fritt.",
    icon: (
      <svg {...iconProps}>
        <path d="M9 12.75 11.25 15 15 9.75M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v4.286c0 3.51-2.02 6.784-4.918 8.767a26.6 26.6 0 0 1-3.626 2.048.75.75 0 0 1-.912 0 26.6 26.6 0 0 1-3.626-2.048C5.02 15.844 3 12.57 3 9.06V4.774c0-.54.384-1.006.917-1.096A50.317 50.317 0 0 1 12 3Z" />
      </svg>
    ),
  },
  {
    title: "Bidra till ökad gemenskap mellan grannar.",
    icon: (
      <svg {...iconProps}>
        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Göra området ännu mer attraktivt och levande.",
    icon: (
      <svg {...iconProps}>
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Ta till vara på en yta som idag inte används.",
    icon: (
      <svg {...iconProps}>
        <path d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.443a1.125 1.125 0 0 0-1.006 0L3.622 5.88C3.24 6.07 3 6.462 3 6.887V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
];

const h2 = "font-display text-[26px] font-bold leading-tight text-ink";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <Tracker />
      <div className="mx-auto flex max-w-[480px] flex-col">
        <header className="flex items-center gap-2.5 px-5 py-4">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand text-brand-ink">
            <PawIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 text-base font-bold">Hundgård i Stampen</span>
          <ThemeToggle />
        </header>

        <section className="flex flex-col items-start gap-3.5 px-5 pt-2">
          <span className="rounded-full bg-tint px-3 py-1.5 text-[13px] font-bold text-tint-ink">
            Namninsamling
          </span>
          <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.01em]">
            Ja till en hundrastgård i Stampen!
          </h1>
          <p className="text-[17px] leading-relaxed text-body">
            En obebyggd yta vid Stampens kyrkogård skulle kunna bli en trygg och
            efterlängtad hundrastgård. Hjälp oss visa Göteborgs stad att vi är
            många som vill se det hända.
          </p>
        </section>

        <section className="px-5 pt-6">
          <BeforeAfterSlider
            before={{
              src: "/fore-slider.jpg",
              alt: "Den obebyggda ytan vid Stampens kyrkogård som den ser ut idag",
            }}
            after={{
              src: "/efter-slider.jpg",
              alt: "Illustration av hur platsen skulle kunna bli som hundrastgård",
            }}
          />
        </section>

        <section className="mx-5 mt-9 flex flex-col gap-3.5 rounded-3xl border border-line bg-surface px-5 py-[22px]">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">
            Så illa är läget
          </p>
          <h2 className="font-display text-[30px] font-bold leading-[1.1]">
            Nästan <span className="text-coral">2 500</span> hundar per rastgård
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Göteborg har fler hundar än Malmö men bara en bråkdel så många
            hundrastgårdar — i Göteborg delar nästan 2 500 hundar på varje
            rastgård, jämfört med som mest 450 i de andra städerna.
          </p>
          <div className="flex flex-col gap-2.5 pt-1">
            {DOGS_PER_PARK.map((city) => (
              <div key={city.name} className="flex items-center gap-2.5">
                <span
                  className={`w-20 shrink-0 text-sm ${city.highlight ? "font-bold text-ink" : "text-muted"}`}
                >
                  {city.name}
                </span>
                <div className="h-3 flex-1 rounded-full bg-track">
                  <div
                    className={`h-full rounded-full ${city.highlight ? "bg-coral" : "bg-bar"}`}
                    style={{ width: `${(city.value / maxDogsPerPark) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-14 shrink-0 text-right text-sm ${city.highlight ? "font-bold text-ink" : "text-muted"}`}
                >
                  {city.label}
                </span>
              </div>
            ))}
            <p className="mt-0.5 text-xs text-muted">Antal hundar per hundrastgård</p>
          </div>
        </section>

        <section className="px-5 pt-9">
          <h2 className={h2}>Här ligger platsen</h2>
          <figure className="mt-3.5 overflow-hidden rounded-3xl border border-line bg-surface">
            <ExpandableImage
              src="/karta.jpg"
              alt="Karta som visar platsens läge i Stampen"
              sizes="(min-width: 480px) 440px, 100vw"
              aspectClassName="aspect-[1138/756]"
            />
            <figcaption className="flex flex-col items-start gap-2.5 px-4 pb-3.5 pt-3 text-sm text-muted">
              <span>Platsen är inringad på kartan.</span>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-brand px-4 font-bold text-tint-ink transition hover:bg-tint"
              >
                Öppna i Google Maps
                <svg {...iconProps} strokeWidth={2} className="h-4 w-4">
                  <path d="M14 4h6v6" />
                  <path d="M20 4l-9 9" />
                  <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="flex flex-col gap-3.5 px-5 pt-9 text-[17px] leading-[1.6] text-body">
          <h2 className={h2}>Därför behövs den</h2>
          <p className="text-ink">
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

        <section className="px-5 pt-9">
          <h2 className={h2}>En hundrastgård skulle:</h2>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-surface px-3.5 py-4"
              >
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-tint text-tint-ink">
                  {feature.icon}
                </span>
                <p className="text-[15px] font-semibold leading-snug">{feature.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-5 mt-7 rounded-3xl bg-tint px-5 py-[22px]">
          <p className="font-display text-[21px] font-semibold leading-[1.35]">
            Detta är inte bara en önskan från en enskild person. Vi är många som
            saknar denna typ av facilitet och det kommer underskrifterna i detta
            förslag att styrka.
          </p>
        </section>

        <section className="px-5 pt-9">
          <p className="text-center text-lg leading-relaxed">
            Tycker inte du, precis som vi, att Göteborgs stad borde se
            möjligheten att, med mycket enkla medel, utveckla denna idag
            outnyttjade yta till en välkomnande hundrastgård som kommer att
            uppskattas av många (med och utan morrhår och päls) under en lång tid
            framöver?
          </p>
        </section>

        <footer className="px-5 pb-7 pt-9 text-center text-[13px]">
          <Link href="/integritetspolicy" className="text-muted underline underline-offset-2">
            Integritetspolicy
          </Link>
        </footer>

        {/* The only sign-up button: follows along at the bottom of the screen. */}
        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-line bg-glass px-4 pb-[calc(14px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md">
          <span className="text-sm font-semibold leading-snug">
            Vill du också ha en hundgård i Stampen?
          </span>
          <CtaButton href={CTA_URL} className="shrink-0 gap-2">
            <PawIcon className="h-5 w-5" />
            Skriv under
          </CtaButton>
        </div>
      </div>
    </main>
  );
}
