'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NextSteps from "@/components/NextSteps";
import { colleagueMail } from "@/components/ShareWithColleague";
import { trackEvent } from "@/lib/track";
import { useCalmMotion } from "@/hooks/use-reduce-motion";
import { NEXT_STEPS, firstName, readLead, type NextStepsKind, type RememberedLead } from "@/lib/nextSteps";

// The page every form lands on: not a thank-you, but the route from here.

function Received({ calm }: { calm: boolean }) {
  const draw = (delay: number) =>
    calm ? { duration: 0 } : { type: "spring" as const, bounce: 0, duration: 0.7, delay };
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden className="text-primary">
      <motion.circle
        cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="3"
        initial={calm ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0)}
      />
      <motion.path
        d="M17 29 l7.5 7.5 L39 21" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        initial={calm ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.35)}
      />
    </svg>
  );
}

export default function NextStepsPage({ kind }: { kind: NextStepsKind }) {
  const calm = useCalmMotion();
  const [lead, setLead] = useState<RememberedLead>({});
  useEffect(() => setLead(readLead()), []);
  const name = firstName(lead.naam);
  const mail = colleagueMail(kind === "masterclass" ? "masterclass" : "training");

  return (
    <div className="min-h-screen">
      <section className="pt-12 pb-10 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Received calm={calm} />
          <motion.h1
            initial={calm ? false : { y: 14, opacity: 0.3 }}
            animate={{ y: 0, opacity: 1 }}
            transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.6, delay: 0.15 }}
            className="mt-6 text-[2.1rem] sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight text-balance"
          >
            Bedankt{name ? `, ${name}` : ""}. <span className="text-primary">Dit gebeurt er nu.</span>
          </motion.h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">{NEXT_STEPS[kind].intro}</p>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 sm:p-10 shadow-[0_20px_50px_-30px_hsl(256_56%_33%/0.4)]">
            <NextSteps kind={kind} lead={lead} />
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">Intussen alvast</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href={kind === "masterclass" ? "/masterclass#programma" : "/training"}
              className="press block-lilac rounded-2xl p-6 transition-transform"
            >
              <p className="font-display text-lg font-bold text-foreground">
                {kind === "masterclass" ? "Bekijk het programma" : "Bekijk wat je team leert"}
              </p>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">
                {kind === "masterclass" ? "Vier blokken, twee uur, met Ferry Hoes." : "De modules, het examen en het certificaat."}
              </p>
            </Link>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="font-display text-lg font-bold text-foreground">Moet er nog iemand mee beslissen?</p>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">Stuur een collega een kant-en-klare mail met alles op een rij.</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href={mail.href} onClick={() => trackEvent("share_colleague", { product: kind })} className="btn-neon press px-5 py-2.5 text-[0.9375rem] font-semibold">
                  Mail een collega
                </a>
                <a href={mail.onePager} target="_blank" rel="noopener" className="text-[0.9375rem] font-semibold text-primary hover:underline">
                  Bekijk de one-pager
                </a>
              </div>
            </div>
          </div>
          <p className="mt-8 text-[0.9375rem] text-muted-foreground">
            Liever meteen even bellen? <a href="tel:+31103167827" className="font-semibold text-primary hover:underline">+31 (0)10 316 7827</a>
          </p>
        </div>
      </section>
    </div>
  );
}
