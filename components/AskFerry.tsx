'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";
import { PHONE, PHONE_HREF } from "@/lib/contact";
import { TIERS, BASE_PRICE, MID_PRICE, eur, type Tier } from "@/lib/pricing";

// "Vraag het Ferry": a chat bubble with the questions buyers ask most, answered
// from fixed copy (no AI, so no made-up prices and no visitor data in a model).
// Every answer ends in one next step: a call with Ferry via Calendly.

const CALENDLY = "https://calendly.com/ferryhoes/meeting";

type Qa = { id: string; q: string; a: React.ReactNode };

const QAS: Qa[] = [
  {
    id: "prijs",
    q: "Wat kost het voor mijn team?",
    a: <>Dat hangt af van hoeveel mensen er meedoen. Met hoeveel zijn jullie ongeveer?</>,
  },
  {
    id: "enterprise",
    q: "We zijn met meer dan 50 mensen",
    a: (
      <>
        Dan maken we er een enterprise-traject van, met een offerte op maat. Daar hoort de live masterclass voor je
        directie en MT bij, en we plannen de uitrol samen in zodat het past bij jullie organisatie. Het snelst gaat
        dat in een kort gesprek.
      </>
    ),
  },
  {
    id: "inhoud",
    q: "Wat leren mensen precies?",
    a: (
      <>
        Vier modules met samen 22 korte lessen: begrijpen wat AI is, veilig en verantwoord werken met AI, slim werken
        met AI, en AI toepassen in je eigen werk. Van wat je nooit in een AI-tool invoert tot je eerste drie
        toepassingen.{" "}
        <Link href="/training#programma" className="font-semibold text-primary underline underline-offset-2">
          Bekijk het programma
        </Link>
      </>
    ),
  },
  {
    id: "tijd",
    q: "Hoeveel tijd kost het per persoon?",
    a: <>Een paar uur, verdeeld over vier modules die mensen tussen het werk door volgen. Volledig in eigen tempo.</>,
  },
  {
    id: "certificaat",
    q: "Krijgt iedereen een certificaat?",
    a: (
      <>
        Ja. Na elke module volgt een korte toets en aan het eind een digitaal eindexamen. Wie voldoende scoort, krijgt
        een certificaat van deelname.
      </>
    ),
  },
  {
    id: "data",
    q: "Waar staat onze data?",
    a: <>Op Europese servers. En de training leert je mensen juist wat er níet in een AI-tool hoort.</>,
  },
];

// The answer once we know the team size: just the tier, no totals
const TIER_ANSWERS: Record<Tier["id"], React.ReactNode> = {
  small: (
    <>
      Dan is het {eur(BASE_PRICE)} ex btw per persoon. Doen er 11 of meer mee, dan zakt de prijs naar{" "}
      {eur(MID_PRICE)} per persoon. Later mensen toevoegen kan altijd.
    </>
  ),
  mid: (
    <>
      Dan betaal je {eur(MID_PRICE)} ex btw per persoon. Later mensen toevoegen kan altijd, en vanaf 50 personen
      maken we een offerte op maat.
    </>
  ),
  enterprise: (
    <>
      Dan wordt het een enterprise-traject met een offerte op maat. Daar hoort de live masterclass voor je directie en
      MT bij, en we plannen de uitrol samen in. Dat bespreek ik graag even met je.
    </>
  ),
};

const HIDDEN_ON = ["/gereedheidscan"];
const TEASER_KEY = "aiga_chat_teaser_seen";

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/assets/ferry-avatar.jpg"
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

export default function AskFerry() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [log, setLog] = useState<{ key: string; q: string; a: React.ReactNode }[]>([]);
  const [awaitingSize, setAwaitingSize] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hidden = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(p + "/"));

  const calendly = `${CALENDLY}?utm_source=aigeletterdheid&utm_medium=chat&utm_campaign=${encodeURIComponent(pathname || "/")}`;

  // One gentle nudge per visit, after the visitor has had time to read
  useEffect(() => {
    if (hidden) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 15000);
    return () => clearTimeout(t);
  }, [hidden]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [log, awaitingSize]);

  if (hidden) return null;

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  };

  const openChat = (firstQuestion?: string) => {
    dismissTeaser();
    setOpen(true);
    trackEvent("chat_open", { page: pathname });
    if (firstQuestion && !asked.includes(firstQuestion)) ask(firstQuestion);
  };

  const ask = (id: string) => {
    const qa = QAS.find((x) => x.id === id);
    if (!qa) return;
    setAsked((a) => [...a, id]);
    setLog((l) => [...l, { key: id, q: qa.q, a: qa.a }]);
    if (id === "prijs") setAwaitingSize(true);
    trackEvent("chat_question", { question: id });
  };

  const pickSize = (t: Tier) => {
    setAwaitingSize(false);
    setLog((l) => [...l, { key: `size-${t.id}`, q: `${t.label} mensen`, a: TIER_ANSWERS[t.id] }]);
    if (t.id === "enterprise") setAsked((a) => (a.includes("enterprise") ? a : [...a, "enterprise"]));
    trackEvent("chat_team_size", { tier: t.id });
  };

  const book = () => trackEvent("book_call_click", { source: "chat", page: pathname });

  const remaining = QAS.filter((x) => !asked.includes(x.id));

  return (
    <>
      {/* Teaser */}
      {teaser && !open && (
        <div className="fixed right-3 bottom-[10.5rem] md:right-6 md:bottom-24 z-40 w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-border bg-white p-4 pr-9 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.45)]">
          <button
            onClick={dismissTeaser}
            aria-label="Sluiten"
            className="absolute right-2 top-2 h-7 w-7 rounded-full text-muted-foreground hover:bg-muted"
          >
            ×
          </button>
          <button onClick={() => openChat("prijs")} className="text-left">
            <span className="block text-[15px] font-bold text-foreground">Wat kost dit voor jouw team?</span>
            <span className="mt-1 block text-sm text-muted-foreground">Vertel hoe groot je team is, dan zie je meteen je prijs.</span>
          </button>
        </div>
      )}

      {/* Launcher */}
      {!open && (
        <button
          onClick={() => openChat()}
          aria-label="Vraag het Ferry"
          className="fixed bottom-24 right-3 md:bottom-6 md:right-6 z-40 flex items-center gap-2 rounded-full bg-primary p-1 sm:pr-4 text-white shadow-[0_14px_34px_-12px_hsl(256_56%_33%/0.6)] transition-transform hover:-translate-y-0.5"
        >
          <span className="rounded-full ring-2 ring-white">
            <Avatar size={40} />
          </span>
          <span className="hidden sm:inline text-[15px] font-semibold">Vraag het Ferry</span>
        </button>
      )}

      {/* Soft backdrop: the page steps back while the conversation is open */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[hsl(256_40%_12%/0.28)] backdrop-blur-[3px] motion-safe:animate-in motion-safe:fade-in"
        />
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Vraag het Ferry"
          className="fixed inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 z-50 flex max-h-[min(36rem,calc(100vh-5rem))] md:w-[23rem] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_70px_-30px_hsl(256_56%_33%/0.55)]"
        >
          <div className="flex items-center gap-3 bg-[hsl(var(--deep))] px-4 py-3 text-white">
            <Avatar size={42} />
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight">Ferry Hoes</p>
              <p className="text-[13px] leading-tight text-white/75">Bouwt en geeft de AIGA-training</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="h-9 w-9 rounded-full text-xl leading-none text-white/80 hover:bg-white/10"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-foreground shadow-sm">
              Hoi, ik ben Ferry. Dit zijn de vragen die ik het vaakst krijg. Staat de jouwe er niet tussen? Plan gewoon
              even een gesprek met me.
            </div>

            {log.map((m) => (
              <div key={m.key} className="space-y-3">
                <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[15px] text-white">
                  {m.q}
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-foreground shadow-sm">
                  {m.a}
                </div>
              </div>
            ))}

            {awaitingSize && (
              <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Aantal mensen">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => pickSize(t)}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {log.length > 0 && !awaitingSize && (
              <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-foreground shadow-sm">
                Wil je weten wat dit voor jullie organisatie betekent? Plan een gesprek, dan kijken we er samen naar.
              </div>
            )}

            {remaining.length > 0 && !awaitingSize && (
              <div className="flex flex-wrap gap-2 pt-1">
                {remaining.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => ask(x.id)}
                    className="rounded-full border border-primary/40 bg-white px-3.5 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {x.q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border bg-white px-4 py-3">
            <a
              href={calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={book}
              className="btn-neon flex w-full items-center justify-center rounded-lg py-3 text-[15px] font-semibold"
            >
              Plan een gesprek met Ferry
            </a>
            <p className="mt-2 text-center text-[13px] text-muted-foreground">
              Of{" "}
              <Link href="/training#offerte" onClick={() => setOpen(false)} className="font-semibold text-primary hover:underline">
                vraag direct een offerte aan
              </Link>{" "}
              · <a href={PHONE_HREF} className="hover:underline whitespace-nowrap">{PHONE}</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
