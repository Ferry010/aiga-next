import type { Metadata } from "next";
import { PageHero, TextSection, PointGrid, OfferteBlock, container } from "@/components/PageKit";

export const metadata: Metadata = {
  title: "Speakers Academy x AIGA | Van inspiratie naar actie",
  description:
    "Speakers Academy en AIGA: van een keynote die ogen opent naar een team dat weet hoe het veilig met AI werkt. Online training, gebouwd en gegeven door Ferry Hoes.",
  alternates: { canonical: "https://aigeletterdheid.academy/speakers-academy" },
};

const stats = [
  { title: "40+ keynotes per jaar", body: "Internationale events en in-house sessies, voor zalen vol mensen die met AI werken." },
  { title: "Sinds 2017", body: "Helpt Ferry organisaties met verantwoord AI-gebruik, van a.s.r. tot VodafoneZiggo en verschillende Ministeries." },
  { title: "Winnaar in 2020", body: "Van de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid." },
];

const testimonials = [
  {
    pull: "Heel fijn hoe Ferry ook voor niet-technische collega's het onderwerp toegankelijk maakt.",
    quote: "Ferry weet als geen ander hoe je AI begrijpelijk maakt voor een breed publiek. Heel fijn hoe hij ook voor niet-technische collega's het onderwerp toegankelijk maakt, zonder in te leveren op inhoudelijke diepgang. Onze teams gingen direct aan de slag met de inzichten.",
    name: "Laurens Baars",
    company: "ATOS",
  },
  {
    pull: "Zelfs deelnemers zonder ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    quote: "Ferry heeft de gave om ingewikkelde theorie op een toegankelijke manier aan het publiek uit te leggen. De ervaring met AI onder de deelnemers liep sterk uiteen; van helemaal geen ervaring tot medewerkers die er al dagelijks mee werken. Zelfs degenen zonder enige ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    name: "Maud",
    company: "Chubb Fire & Security",
  },
];

export default function SpeakersAcademyPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        crumb="Speakers Academy"
        title="Van inspiratie naar actie."
        accent="Een keynote opent ogen. De training verandert gedrag."
        intro="Speakers Academy is het sprekersbureau waar Ferry Hoes een van de meest gevraagde AI-sprekers is. Samen bouwden we AIGA, zodat organisaties na de keynote ook echt weten hoe het moet."
        primary={{ href: "/training", label: "Bekijk de teamtraining" }}
        secondary={{ href: "#offerte", label: "Of praat eerst met Robbert of Tom" }}
        aside={
          <img
            src="/assets/ferry-stage.jpg"
            alt="Ferry Hoes op het podium"
            width={959}
            height={904}
            className="w-full aspect-[959/904] object-cover rounded-[1.75rem]"
          />
        }
      />

      <TextSection title="De partner">
        <p>
          Speakers Academy koppelt organisaties al meer dan 30 jaar aan sprekers, van wetenschappers en CEO&apos;s tot
          beleidsmakers. Ferry Hoes is een van hun meest gevraagde AI-sprekers. Dat vertrouwen is de basis van AIGA.
        </p>
        <img src="/assets/speakers-academy-logo.png" alt="Speakers Academy" className="h-14 w-auto rounded" />
      </TextSection>

      <TextSection title="Waarom een training na de keynote">
        <p>
          Na een keynote is iedereen enthousiast. Een week later plakt iemand toch weer een klantmail in een privé
          ChatGPT-account. Bewustwording alleen verandert geen gedrag.
        </p>
        <p className="text-foreground">
          Daarom ontwikkelde Ferry de AIGA-training: dezelfde inhoud als zijn sessies, maar als leertraject voor je hele
          team. Vier modules, toetsen, een digitaal eindexamen en een certificaat van deelname.
        </p>
      </TextSection>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">De trainer</h2>
          <div className="mt-8"><PointGrid cols={3} items={stats} /></div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
            Wat organisaties over Ferry zeggen
          </h2>
          <p className="mt-3 text-muted-foreground">Ervaringen van organisaties die Ferry boekten als spreker of workshopbegeleider.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <blockquote className="text-lg text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span>, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <OfferteBlock title="Na de inspiratie: je hele team getraind." source="Speakers Academy pagina, offerte aanvraag" />
    </div>
  );
}
