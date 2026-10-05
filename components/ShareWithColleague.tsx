'use client';
import { useState } from "react";

// "Stuur naar een collega": a ready-made mail that opens in the visitor's own
// mail program (same pattern as brandhumanizing.com). mailto can't attach
// files, so the mail links the hosted one-pager PDF.

const SITE = "https://aigeletterdheid.academy";

const MAILS = {
  training: {
    subject: "AI-training voor ons team?",
    pdf: `${SITE}/downloads/aiga-teamtraining.pdf`,
    page: `${SITE}/training?utm_source=collega&utm_medium=email`,
    onePager: "/one-pager/teamtraining",
    body: (pdf: string, page: string) => `Hoi,

Onze mensen gebruiken AI al, van ChatGPT tot Copilot. Maar we hebben geen gedeelde afspraken over wat er wel en niet in mag, en geen zicht op welke data er zo onze organisatie uit gaat.

Ik kwam AIGA tegen. Zij geven het hele team in één keer dezelfde basis:
- 4 online modules, in eigen tempo
- tussentijdse toetsen en een digitaal eindexamen, met certificaat van deelname
- €249 ex btw per persoon, €229 vanaf 11 personen, en we kunnen later altijd mensen toevoegen
- vanaf 50 plekken maken ze een enterprise-offerte op maat, inclusief een masterclass voor het MT

De one-pager met alles op een rij:
${pdf}

Meer info: ${page}

Zullen we er even naar kijken?`,
  },
  masterclass: {
    subject: "Masterclass AI voor ons MT?",
    pdf: `${SITE}/downloads/aiga-masterclass.pdf`,
    page: `${SITE}/masterclass?utm_source=collega&utm_medium=email`,
    onePager: "/one-pager/masterclass",
    body: (pdf: string, page: string) => `Hoi,

Onze mensen gebruiken AI al, maar als leiding hebben we nooit echt bepaald waar de grens ligt: wat AI wel en niet mag, wie verantwoordelijk is als het misgaat, en hoe beleid ook echt gedrag wordt.

AIGA geeft daar een live masterclass over voor directie en management:
- 2 uur, op locatie of online
- €495 ex btw per persoon, minimaal 5
- inbegrepen als we de teamtraining voor 50 plekken of meer afnemen

De one-pager: ${pdf}
Meer info: ${page}

Zullen we dit plannen?`,
  },
} as const;

export default function ShareWithColleague({
  product = "training",
  inline = false,
}: {
  product?: keyof typeof MAILS;
  inline?: boolean;
}) {
  const m = MAILS[product];
  const [copied, setCopied] = useState(false);
  const href = `mailto:?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body(m.pdf, m.page))}`;

  const onMail = () => {
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === "function") w.gtag("event", "share_colleague", { product });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(m.page);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  if (inline) {
    return (
      <p className="text-muted-foreground leading-relaxed">
        Beslis je dit niet alleen?{" "}
        <a href={href} onClick={onMail} className="text-primary font-semibold hover:underline">
          Mail het naar een collega
        </a>{" "}
        of{" "}
        <a href={m.onePager} target="_blank" rel="noopener" className="text-primary font-semibold hover:underline">
          bekijk de one-pager
        </a>
        .
      </p>
    );
  }

  return (
    <div className="border-t-2 border-foreground pt-6">
      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">Beslis je dit niet alleen?</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
        Stuur je collega of leidinggevende een kant-en-klare mail met de one-pager. Hij opent in je eigen
        mailprogramma. Jij drukt alleen nog op verzenden.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a href={href} onClick={onMail} className="btn-neon px-6 py-3 rounded-lg text-sm font-semibold">
          Mail naar een collega
        </a>
        <a href={m.onePager} target="_blank" rel="noopener" className="btn-neon-outline px-6 py-3 rounded-lg text-sm font-semibold">
          Bekijk de one-pager
        </a>
        <button type="button" onClick={copy} className="text-sm font-semibold text-primary hover:underline px-2 py-3">
          {copied ? "Link gekopieerd" : "Kopieer link"}
        </button>
      </div>
    </div>
  );
}
