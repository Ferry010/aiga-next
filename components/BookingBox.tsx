import { TOTAL_LESSONS } from "@/lib/curriculum";
import ShareWithColleague from "@/components/ShareWithColleague";

// Sticky booking box beside the course content on desktop (phones get the
// sticky bottom bar instead). The facts a booker scans before deciding.

const facts = [
  `4 modules, ${TOTAL_LESSONS} lessen`,
  "Toets per module + digitaal eindexamen",
  "Certificaat van deelname",
  "Online, in eigen tempo",
  "Binnen 2 werkdagen live",
  "Data op Europese servers",
];

export default function BookingBox() {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_20px_50px_-30px_hsl(256_56%_33%/0.35)]">
      <p className="text-5xl font-display font-bold text-foreground tracking-tight">€249</p>
      <p className="mt-1 text-muted-foreground">ex btw per persoon</p>
      <p className="mt-3 text-sm text-foreground leading-relaxed">Zoveel mensen als je wil, nu of later. Iedereen kost hetzelfde.</p>
      <ul className="mt-5 border-b border-border">
        {facts.map((f) => (
          <li key={f} className="flex items-start gap-3 border-t border-border py-2.5 text-[15px] text-foreground">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl block-lilac px-4 py-3 text-sm text-foreground leading-relaxed">
        <strong>50+ plekken in één keer?</strong> Dan is de masterclass voor je MT gratis.
      </p>
      <a href="#offerte" className="btn-neon mt-5 flex w-full items-center justify-center py-3.5 rounded-lg text-[15px] font-semibold">
        Vraag een offerte aan
      </a>
      <p className="mt-3 text-center text-sm text-muted-foreground">Binnen één werkdag belt een van ons je.</p>
      <div className="mt-4 border-t border-border pt-4 text-sm">
        <ShareWithColleague product="training" inline />
      </div>
    </div>
  );
}
