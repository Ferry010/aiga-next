import type { Metadata } from "next";
import { PageHero, TextSection, PointGrid, PriceTiers, OfferteBlock, container } from "@/components/PageKit";
import FaqList from "@/components/FaqList";
import type { Faq } from "@/lib/faq";

// Black Friday 2026: no discount, the book with every seat, and "buy on the 2026 budget, start in
// 2027". The deal counts for quote requests up to and including Monday 30 November 2026. After that
// the page says so by itself (it is regenerated every hour) and keeps working as a normal quote page.
export const revalidate = 3600;
const ENDS = new Date("2026-12-01T00:00:00+01:00");
const PAGE_URL = "https://aigeletterdheid.academy/blackfriday";

export const metadata: Metadata = {
  title: "Black Friday AI-training voor je team: bij elke plek het boek | AIGA",
  description:
    "Black Friday bij AIGA: vraag t/m 30 november een offerte aan voor de online AI-training en elke deelnemer krijgt het boek Brand Humanizing. Koop op budget 2026, start in 2027. €249 ex btw p.p.",
  alternates: { canonical: "/blackfriday" },
};

const FAQ: Faq[] = [
  {
    q: "Wat is de Black Friday-deal van AIGA?",
    a: "Vraag je tot en met maandag 30 november 2026 een offerte aan voor de online AI-training, dan krijgt elke deelnemer het boek Brand Humanizing van Ferry Hoes en Jonathan Flores erbij. De prijs blijft €249 ex btw per persoon, €229 vanaf 11 personen.",
  },
  {
    q: "Krijg ik ook korting?",
    a: "Nee. We houden de prijs gelijk voor iedereen, ook na Black Friday. Zo betaal je nooit te veel omdat je op het verkeerde moment kocht. In plaats van korting krijg je er iets bij: het boek voor elke deelnemer.",
  },
  {
    q: "Kunnen we nu kopen en in 2027 starten?",
    a: "Ja. De 12 maanden toegang gaan pas in als een deelnemer het account activeert. Plekken die nog niet geactiveerd zijn, kun je bewaren of aan een collega geven. Je kunt dus het budget van 2026 gebruiken en je team in januari laten beginnen.",
  },
  {
    q: "Waar gaat het boek over?",
    a: "Brand Humanizing gaat over de superpower waarmee je merk menselijker wordt en je bedrijf sneller groeit, met praktijkcases van onder meer a.s.r., Ben & Jerry's, Dove, Octopus Energy en Patagonia. Geschreven door Ferry Hoes, die ook de AI-training maakt, en Jonathan Flores. Nederlandstalig, winkelwaarde €24,95.",
  },
  {
    q: "Hoe krijgen we de boeken?",
    a: "We sturen alle boeken in één zending naar het adres dat je opgeeft, meestal jullie kantoor. Zo kun je ze zelf uitdelen bij de start van de training.",
  },
  {
    q: "Geldt de deal ook vanaf 50 personen?",
    a: "Ja. Vanaf 50 personen werk je met een enterprise-licentie en een offerte op maat, met een gratis MT-masterclass voor je directie en management (t.w.v. vanaf €2.475). Elke deelnemer krijgt daarnaast het boek.",
  },
  {
    q: "Wat zit er in de AI-training?",
    a: "Vier online modules in eigen tempo, samen 2 à 3 uur per persoon inclusief een digitaal eindexamen. Je team leert wat AI is, hoe je het slim inzet in je eigen werk en wat er niet in een AI-tool mag. Wie slaagt, krijgt een certificaat van deelname. Herkansen kan zo vaak als nodig.",
  },
  {
    q: "Tot wanneer loopt de deal?",
    a: "Voor offerteaanvragen tot en met maandag 30 november 2026. Je hoort binnen één werkdag van ons.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Offer",
      name: "Black Friday 2026: AI-training met het boek Brand Humanizing bij elke plek",
      description:
        "Online AI-training voor teams, met het boek Brand Humanizing van Ferry Hoes en Jonathan Flores voor elke deelnemer. Voor offerteaanvragen tot en met 30 november 2026.",
      url: PAGE_URL,
      price: "249",
      priceCurrency: "EUR",
      validFrom: "2026-11-02",
      priceValidUntil: "2026-11-30",
      seller: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
      itemOffered: { "@type": "Course", name: "AI-geletterdheid teamtraining", url: "https://aigeletterdheid.academy/training" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

function BookCover() {
  return (
    <figure className="mx-auto max-w-[19rem] lg:mr-0">
      <img
        src="/assets/boek-brand-humanizing.jpg"
        alt="Omslag van het boek Brand Humanizing van Ferry Hoes en Jonathan Flores"
        width={550}
        height={839}
        className="w-full rounded-md shadow-[0_30px_60px_-30px_hsl(263_45%_25%/0.55)] rotate-[1.5deg]"
      />
      <figcaption className="mt-5 text-center text-sm text-muted-foreground">
        Brand Humanizing, Ferry Hoes en Jonathan Flores. Winkelwaarde €24,95, voor elke deelnemer.
      </figcaption>
    </figure>
  );
}

const facts = [
  { k: "Tot en met", v: "30 november 2026" },
  { k: "Prijs", v: "€249 p.p., €229 vanaf 11" },
  { k: "Erbij", v: "Het boek, per deelnemer" },
  { k: "Start", v: "Wanneer het jullie uitkomt" },
];

export default function BlackFridayPage() {
  const ended = Date.now() >= ENDS.getTime();
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="Black Friday"
        title={ended ? "De Black Friday-deal is voorbij." : "Black Friday: train je team in AI."}
        accent={ended ? "De training blijft gewoon beschikbaar." : "Elke deelnemer krijgt het boek erbij."}
        intro={
          ended
            ? "De actie liep tot en met 30 november 2026. Je kunt de online AI-training nog steeds aanvragen, voor €249 ex btw per persoon en €229 vanaf 11."
            : "Vraag tot en met 30 november een offerte aan voor de online AI-training, en elke deelnemer krijgt Brand Humanizing, het boek van Ferry Hoes en Jonathan Flores. Koop op het budget van 2026, start wanneer het jullie uitkomt."
        }
        primary={{ href: "#offerte", label: ended ? "Vraag een offerte aan" : "Vraag je Black Friday-offerte aan" }}
        secondary={{ href: "/training", label: "Bekijk de training" }}
        aside={ended ? undefined : <BookCover />}
      />

      {!ended && (
        <>
          <section className="pb-16 sm:pb-20">
            <div className={container}>
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-border pt-8">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="text-sm text-muted-foreground">{f.k}</dt>
                    <dd className="mt-1 text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="pb-16 sm:pb-24">
            <div className={container}>
              <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
                Wat je krijgt
              </h2>
              <div className="mt-8">
                <PointGrid
                  cols={3}
                  items={[
                    {
                      title: "De volledige AI-training",
                      body: "Vier modules, 2 à 3 uur per persoon, met examen en certificaat van deelname. Je team leert wat AI is, hoe je het slim inzet en wat er níet in mag.",
                    },
                    {
                      title: "Het boek voor elke deelnemer",
                      body: "Brand Humanizing, over waarom de mens het verschil maakt. Nederlandstalig, winkelwaarde €24,95. We sturen alle boeken in één zending naar jullie kantoor.",
                    },
                    {
                      title: "Budget 2026, start in 2027",
                      body: "Een plek gaat pas lopen als een deelnemer het account activeert. Koop nu en laat je team in januari beginnen. Niet geactiveerde plekken kun je bewaren of doorgeven.",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          <TextSection title="Geen korting. Wel iets erbij.">
            <p>
              We houden de prijs gelijk, voor iedereen en ook na Black Friday. Zo betaal je nooit te veel omdat je op het
              verkeerde moment kocht.
            </p>
            <p className="text-foreground">
              Deze weken krijg je er wel iets bij dat blijft. In de training leert je team hoe AI werkt en hoe je het veilig
              inzet. Het boek gaat over wat AI niet kan: het menselijke verschil dat klanten voelen.
            </p>
          </TextSection>

          <TextSection title="Nog opleidingsbudget voor 2026?">
            <p>
              Dan kun je het nu besteden, terwijl je team pas begint wanneer het jullie uitkomt. De 12 maanden toegang gaan
              per persoon in bij de activatie van het account, niet bij de aankoop.
            </p>
            <p className="text-foreground">
              Je team gebruikt AI ondertussen al elke dag. Hoe eerder iedereen weet wat wel en niet mag, hoe beter.
            </p>
          </TextSection>
        </>
      )}

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
            €249 per persoon. Hoe groter je team, hoe lager de prijs.
          </h2>
          <div className="mt-8"><PriceTiers /></div>
          {!ended && (
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Rekenvoorbeeld: een team van 12 kost 12 × €229 = €2.748 ex btw. Daarbij krijg je 12 boeken, samen een
              winkelwaarde van €299,40.
            </p>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16`}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
            Vragen over de Black Friday-deal
          </h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      <OfferteBlock
        title={ended ? "Vraag een offerte aan voor je team." : "Vraag je offerte aan vóór 1 december."}
        intro={
          ended
            ? undefined
            : "Vul vijf velden in. Binnen één werkdag weet je wat het kost voor jouw team, met een boek voor iedere deelnemer erbij."
        }
        source={ended ? "Black Friday-pagina (na de actie), offerte aanvraag" : "Black Friday 2026, offerte aanvraag (boek bij elke plek)"}
      />
    </div>
  );
}
