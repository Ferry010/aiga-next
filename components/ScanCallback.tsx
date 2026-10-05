'use client';
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { trackLead, alertTeam } from "@/lib/track";
import ShareWithColleague from "@/components/ShareWithColleague";
import { useInlineValidation, FieldError, PHONE_PATTERN } from "@/components/InlineValidation";

// After the scan: one field (phone) and one click to get a call.
// Name and email are already known from the scan, so we never ask twice.

export default function ScanCallback({
  name = "",
  email = "",
  summary,
}: {
  name?: string;
  email?: string;
  summary: string;
}) {
  const [naam, setNaam] = useState(name);
  const [mail, setMail] = useState(email);
  const [telefoon, setTelefoon] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const v = useInlineValidation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const supabase = createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      naam,
      organisatie: "Onbekend (AI-risicocheck)",
      functie: null,
      email: mail,
      telefoon,
      hulp: "training",
      aantal: null,
      opmerkingen: `Terugbelverzoek via AI-risicocheck · ${summary}`,
    });
    if (error) {
      setState("error");
      return;
    }
    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "contact",
        naam,
        organisatie: "Onbekend (AI-risicocheck)",
        email: mail,
        telefoon,
        extra: `Terugbelverzoek na AI-risicocheck · ${summary}`,
      },
    }).catch(console.error);
    trackLead("lead_callback");
    alertTeam({ type: "callback", naam, email: mail, telefoon, extra: summary, source: "AI-risicocheck" });
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="flex flex-col gap-10">
        <div className="border-t-2 border-foreground pt-6">
          <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Staat genoteerd. We bellen je.</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Binnen één werkdag belt een van ons je op {telefoon}. Robbert, Tom of Ferry: wie het wordt, hangt
            af van wie het eerst zijn koffie op heeft.
          </p>
          <p className="mt-4 text-foreground">
            Alvast kijken wat je team leert?{" "}
            <Link href="/training" className="text-primary font-semibold hover:underline">
              Bekijk de teamtraining →
            </Link>
          </p>
        </div>
        <ShareWithColleague product="training" />
      </div>
    );
  }

  const input =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20";

  return (
    <form onSubmit={submit} {...v.formProps} className="border-t-2 border-foreground pt-6" aria-label="Terugbelverzoek">
      <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Wil je weten hoe je dit dichtzet?</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Laat je nummer achter. Dan bellen we je binnen één werkdag en lopen we je uitslag samen door.
      </p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {!name && (
          <div>
            <label htmlFor="cb-naam" className="text-sm text-muted-foreground mb-1 block">Naam</label>
            <input id="cb-naam" required value={naam} onChange={(e) => setNaam(e.target.value)} autoComplete="name" className={input} />
            <FieldError id="cb-naam" errors={v.errors} />
          </div>
        )}
        {!email && (
          <div>
            <label htmlFor="cb-mail" className="text-sm text-muted-foreground mb-1 block">E-mailadres</label>
            <input id="cb-mail" type="email" required value={mail} onChange={(e) => setMail(e.target.value)} autoComplete="email" className={input} />
            <FieldError id="cb-mail" errors={v.errors} />
          </div>
        )}
        <div className={name && email ? "sm:col-span-2" : ""}>
          <label htmlFor="cb-tel" className="text-sm text-muted-foreground mb-1 block">Telefoonnummer</label>
          <input id="cb-tel" type="tel" required pattern={PHONE_PATTERN} value={telefoon} onChange={(e) => setTelefoon(e.target.value)} autoComplete="tel" className={input} />
            <FieldError id="cb-tel" errors={v.errors} />
        </div>
      </div>
      {state === "error" && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          Dat ging mis. Probeer het nog eens, of bel ons op +31 (0)10 316 7827.
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn-neon px-7 py-3.5 font-semibold disabled:opacity-50">
          {state === "sending" ? "Even versturen..." : "Bel mij terug"}
        </button>
        <Link href="/training" className="text-sm font-semibold text-primary hover:underline">
          Of bekijk eerst de teamtraining
        </Link>
      </div>
    </form>
  );
}
