import { TOTAL_LESSONS } from "@/lib/curriculum";
import { PHONE, PHONE_HREF } from "@/lib/contact";

// Sticky booking box beside the course content on desktop (phones get the
// sticky bottom bar instead). The facts a booker scans before deciding.

type Booking = {
  product: "training" | "masterclass";
  price: string;
  unit: string;
  lead: string;
  facts: string[];
  bonus: React.ReactNode;
  cta: string;
  target: string;
  after: string;
};

const BOOKINGS: Record<Booking["product"], Booking> = {
  training: {
    product: "training",
    price: "€249",
    unit: "ex btw per persoon",
    lead: "Voor 1 tot 10 personen. Vanaf 11 personen €229 per persoon.",
    facts: [
      `4 modules, ${TOTAL_LESSONS} lessen`,
      "Toets per module + digitaal eindexamen",
      "Certificaat van deelname",
      "Online, in eigen tempo",
      "Data op Europese servers",
    ],
    bonus: (
      <>
        <strong>50+ plekken?</strong> Enterprise: een offerte op maat, inclusief de masterclass voor je MT.
      </>
    ),
    cta: "Vraag een offerte aan",
    target: "offerte",
    after: "Binnen één werkdag belt een van ons je.",
  },
  masterclass: {
    product: "masterclass",
    price: "€495",
    unit: "ex btw per persoon, minimaal 5",
    lead: "Voor directie en management, op een datum die jullie past.",
    facts: [
      "2 uur live met Ferry Hoes",
      "4 blokken, afgesloten met een live Q&A",
      "Op locatie of online",
      "Open of besloten sessie",
      "Bewijs van deelname",
      "Geen technische kennis nodig",
    ],
    bonus: (
      <>
        <strong>Inbegrepen</strong> bij een enterprise-traject voor de teamtraining (vanaf 50 plekken).
      </>
    ),
    cta: "Plan de masterclass",
    target: "aanmelden",
    after: "Binnen één werkdag bellen we om een datum te prikken.",
  },
};

export default function BookingBox({ product = "training" }: { product?: Booking["product"] }) {
  const b = BOOKINGS[product];
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_20px_50px_-30px_hsl(256_56%_33%/0.35)]">
      <p className="text-5xl font-display font-bold text-foreground tracking-tight">{b.price}</p>
      <p className="mt-1 text-muted-foreground">{b.unit}</p>
      <p className="mt-3 text-sm text-foreground leading-relaxed">{b.lead}</p>
      <ul className="mt-5 border-b border-border">
        {b.facts.map((f) => (
          <li key={f} className="flex items-start gap-3 border-t border-border py-2.5 text-[0.9375rem] text-foreground">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl block-lilac px-4 py-3 text-sm text-foreground leading-relaxed">{b.bonus}</p>
      <a href={`#${b.target}`} className="btn-neon mt-5 flex w-full items-center justify-center py-3.5 text-[0.9375rem] font-semibold">
        {b.cta}
      </a>
      <p className="mt-3 text-center text-sm text-muted-foreground">{b.after}</p>
      <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
        Vragen? Bel ons op{" "}
        <a href={PHONE_HREF} className="font-semibold text-primary hover:underline whitespace-nowrap">{PHONE}</a>
      </p>
    </div>
  );
}
