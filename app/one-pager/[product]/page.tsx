import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// A4 one-pagers a visitor can forward to a colleague. The same page is
// printed to /public/downloads/*.pdf (see scripts/one-pagers.sh).

type Sheet = {
  eyebrow: string;
  h1: string;
  intro: string;
  stat?: { value: string; text: string; source: string };
  listTitle: string;
  list: { lead?: string; text: string }[];
  howTitle: string;
  how: string[];
  price: string;
  priceNote: string;
  priceBullets: string[];
  pageUrl: string;
};

const SHEETS: Record<string, Sheet> = {
  teamtraining: {
    eyebrow: "Teamtraining AI-geletterdheid",
    h1: "Je team gebruikt AI al. Weet iedereen wat er niet in mag?",
    intro:
      "Medewerkers zetten dagelijks teksten, klantgegevens en cijfers in ChatGPT, Copilot en andere tools. Met goede bedoelingen, maar zonder gedeelde afspraken. Zo verlaat bedrijfsdata je organisatie zonder dat iemand het ziet.",
    stat: {
      value: "82%",
      text: "van de bedrijfsdata die in AI-tools belandt, komt uit privé-accounts buiten het zicht van de organisatie.",
      source: "LayerX, 2025",
    },
    listTitle: "Wat je team leert, in vier modules",
    list: [
      { lead: "1", text: "Begrijpen wat AI is" },
      { lead: "2", text: "Veilig en verantwoord werken met AI" },
      { lead: "3", text: "Slim werken met AI" },
      { lead: "4", text: "AI toepassen in je werk" },
    ],
    howTitle: "Zo werkt het",
    how: [
      "Online en in eigen tempo",
      "Tussentijdse toetsen per module",
      "Digitaal eindexamen",
      "Certificaat van deelname bij voldoende resultaat",
      "Binnen 2 werkdagen live",
      "Data op Europese servers",
    ],
    price: "€249",
    priceNote: "ex btw per persoon",
    priceBullets: [
      "Zet zoveel mensen in de training als je wil, nu of later",
      "50+ plekken in één keer geboekt? De masterclass voor je MT is gratis",
      "Het certificaat helpt ook bij de AI Act: je laat zien dat je AI-geletterdheid ondersteunt",
    ],
    pageUrl: "aigeletterdheid.academy/training",
  },
  masterclass: {
    eyebrow: "Masterclass voor directie en management",
    h1: "Je mensen gebruiken AI. Wie bepaalt waar de grens ligt?",
    intro:
      "Je team kun je trainen. Maar de keuzes over wat AI wel en niet mag, wie verantwoordelijk is als het misgaat en hoe beleid ook echt gedrag wordt, liggen bij de leiding. Deze live sessie gaat over precies die keuzes.",
    listTitle: "Het programma, twee uur",
    list: [
      { lead: "30 min", text: "Wat er nu al met AI gebeurt in je organisatie" },
      { lead: "45 min", text: "Wat dit betekent voor jou als leidinggevende" },
      { lead: "30 min", text: "Van risico naar richting" },
      { lead: "15 min", text: "Live Q&A met Ferry Hoes" },
    ],
    howTitle: "Praktisch",
    how: [
      "Live, op locatie of online",
      "Op een datum die jullie past",
      "Bewijs van deelname",
      "Geen technische kennis nodig",
    ],
    price: "€495",
    priceNote: "ex btw per persoon, minimaal 5",
    priceBullets: ["Gratis als je 50 plekken of meer in de teamtraining in één keer boekt"],
    pageUrl: "aigeletterdheid.academy/masterclass",
  },
};

export function generateStaticParams() {
  return Object.keys(SHEETS).map((product) => ({ product }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const s = SHEETS[product];
  return { title: s ? `${s.eyebrow} | AIGA one-pager` : "AIGA", robots: { index: false, follow: false } };
}

export default async function OnePager({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const s = SHEETS[product];
  if (!s) notFound();

  return (
    <div className="op-root">
      <style>{`
        @page { size: A4; margin: 0; }
        .op-root { background: #EFE9DF; min-height: 100vh; padding: 24px 16px; }
        .op-bar { max-width: 210mm; margin: 0 auto 16px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
        .op-sheet { width: 210mm; max-width: 100%; min-height: 297mm; margin: 0 auto; background: #FAF8F4; color: #23201D; padding: 16mm 17mm; box-sizing: border-box; display: flex; flex-direction: column; gap: 7mm; box-shadow: 0 10px 40px -20px rgba(40,30,20,.35); }
        @media print {
          .op-root { background: none; padding: 0; min-height: 0; }
          .op-bar { display: none; }
          .op-sheet { box-shadow: none; width: 210mm; height: 297mm; min-height: 0; overflow: hidden; }
          nextjs-portal { display: none !important; }
        }
      `}</style>

      <div className="op-bar">
        <Link href="/" className="font-bold text-[#6E43D6]">AIGA</Link>
        <span className="text-[#6B6459]">Deel deze pagina of de PDF-versie met je collega&apos;s</span>
      </div>

      <article className="op-sheet">
        <header className="flex items-baseline justify-between border-b-2 border-[#23201D] pb-3">
          <span className="text-[22px] font-black tracking-tight text-[#6E43D6]">AIGA</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2F7E8B]">{s.eyebrow}</span>
        </header>

        <div className="flex flex-col gap-3">
          <h1 className="text-[30px] font-black leading-[1.08] tracking-tight">{s.h1}</h1>
          <p className="text-[13.5px] leading-[1.6] text-[#4A443D]">{s.intro}</p>
        </div>

        {s.stat && (
          <div className="flex items-center gap-5 border-l-2 border-[#2F7E8B] pl-5">
            <span className="text-[44px] font-black leading-none tracking-tight text-[#2F7E8B]">{s.stat.value}</span>
            <p className="text-[12.5px] leading-[1.5]">
              {s.stat.text} <span className="text-[#8A8275]">{s.stat.source}</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2F7E8B]">{s.listTitle}</h2>
            <ul className="border-b border-[#E4DCCF]">
              {s.list.map((item) => (
                <li key={item.text} className="flex gap-3 border-t border-[#E4DCCF] py-[7px] text-[13px] leading-[1.45]">
                  {item.lead && <span className="w-12 shrink-0 font-bold text-[#6E43D6]">{item.lead}</span>}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2F7E8B]">{s.howTitle}</h2>
            <ul className="border-b border-[#E4DCCF]">
              {s.how.map((h) => (
                <li key={h} className="flex gap-3 border-t border-[#E4DCCF] py-[7px] text-[13px] leading-[1.45]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6E43D6]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="grid grid-cols-[auto_1fr] items-center gap-8 rounded-[10px] bg-[#F1EBE1] px-6 py-5">
          <div>
            <p className="text-[40px] font-black leading-none tracking-tight">{s.price}</p>
            <p className="mt-1 text-[12px] text-[#6B6459]">{s.priceNote}</p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {s.priceBullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[12.5px] leading-[1.45]">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7E8B]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-[12.5px] leading-[1.6] text-[#4A443D]">
          <strong className="text-[#23201D]">Gegeven door Ferry Hoes.</strong> Veelgevraagd AI-spreker die sinds 2017
          organisaties helpt met verantwoord AI-gebruik, van a.s.r. tot VodafoneZiggo en verschillende Ministeries.
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-[#E4DCCF] pt-4 text-[12px] leading-[1.6]">
          <div>
            <p className="font-bold text-[#6E43D6]">{s.pageUrl}</p>
            <p className="text-[#6B6459]">Reactie binnen één werkdag</p>
          </div>
          <div className="text-right text-[#4A443D]">
            <p>robbert@speakersacademy.nl · tom@speakersacademy.nl</p>
            <p>+31 (0)10 316 7827</p>
          </div>
        </div>
      </article>
    </div>
  );
}
