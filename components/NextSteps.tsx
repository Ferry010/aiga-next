'use client';
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/track";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { NEXT_STEPS, readLead, type NextStepsKind, type RememberedLead } from "@/lib/nextSteps";

// The route after a form, as a vertical timeline. Step 1 is where the visitor is now.
// Every step has a small "Vraag over deze stap?" that sends a question straight to the
// team (it lands in Slack like a lead), so nobody has to start a new form.

const spring = { type: "spring" as const, bounce: 0, duration: 0.55 };

export default function NextSteps({ kind, lead: leadProp }: { kind: NextStepsKind; lead?: RememberedLead }) {
  const calm = useReduceMotion() || !!useReducedMotion();
  // Details come from the form that was just sent; without them, read what this visit remembered
  const [stored, setStored] = useState<RememberedLead>({});
  useEffect(() => {
    if (!leadProp) setStored(readLead());
  }, [leadProp]);
  const lead = leadProp ?? stored;
  const { steps } = NEXT_STEPS[kind];

  return (
    <ol className="relative">
      {/* The rail: draws down once, the part up to step 1 in purple */}
      <motion.span
        aria-hidden
        className="absolute left-[19px] top-6 bottom-6 w-[2px] origin-top rounded-full bg-[hsl(256_50%_86%)]"
        initial={calm ? false : { scaleY: 0.2 }}
        animate={{ scaleY: 1 }}
        transition={calm ? { duration: 0 } : { ...spring, duration: 0.9, delay: 0.25 }}
      />
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          className="relative pl-14 sm:pl-16 pb-10 last:pb-0"
          initial={calm ? false : { y: 18, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={calm ? { duration: 0 } : { ...spring, delay: 0.3 + i * 0.14 }}
        >
          <StepDot index={i} now={i === 0} calm={calm} />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-xl sm:text-[1.375rem] font-display font-bold text-foreground leading-snug tracking-tight text-balance">
              {step.title}
            </h3>
            {i === 0 && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">Nu</span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold text-primary">{step.when}</p>
          <p className="mt-2 text-[1.0625rem] text-muted-foreground leading-relaxed max-w-xl">{step.body}</p>
          <StepQuestion kind={kind} stepNumber={i + 1} stepTitle={step.title} placeholder={step.ask} lead={lead} calm={calm} />
        </motion.li>
      ))}
    </ol>
  );
}

function StepDot({ index, now, calm }: { index: number; now: boolean; calm: boolean }) {
  return (
    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center">
      {now && !calm && (
        // A few soft rings to say "this is where you are", then it rests
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/30"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.6, repeat: 2, ease: "easeOut", delay: 0.6 }}
        />
      )}
      <span
        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-[0.9375rem] font-bold ${
          now ? "bg-primary text-white" : "border-2 border-[hsl(256_50%_86%)] bg-white text-primary"
        }`}
      >
        {index + 1}
      </span>
    </span>
  );
}

function StepQuestion({
  kind, stepNumber, stepTitle, placeholder, lead, calm,
}: {
  kind: NextStepsKind;
  stepNumber: number;
  stepTitle: string;
  placeholder: string;
  lead: RememberedLead;
  calm: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [vraag, setVraag] = useState("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const known = Boolean(lead.email);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vraag.trim()) return;
    setState("sending");
    const who = {
      naam: lead.naam || naam,
      email: lead.email || email,
      telefoon: lead.telefoon || null,
      organisatie: lead.organisatie || "Onbekend (vraag na aanvraag)",
    };
    const note = `Vraag over stap ${stepNumber} (${stepTitle}): ${vraag.trim()}`;
    const supabase = createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      naam: who.naam,
      organisatie: who.organisatie,
      functie: null,
      email: who.email,
      telefoon: who.telefoon,
      hulp: "anders",
      aantal: null,
      opmerkingen: `${note} · Route: ${kind}`,
    });
    if (error) {
      setState("error");
      return;
    }
    supabase.functions.invoke("notify-new-submission", {
      body: { type: "contact", naam: who.naam, organisatie: who.organisatie, email: who.email, telefoon: who.telefoon, extra: note },
    }).catch(console.error);
    trackEvent("next_steps_question", { stap: stepNumber, route: kind });
    setState("sent");
  };

  const input =
    "w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground text-[0.9375rem] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

  if (state === "sent") {
    return (
      <motion.p
        initial={calm ? false : { y: 6, opacity: 0.4 }}
        animate={{ y: 0, opacity: 1 }}
        transition={spring}
        className="mt-4 inline-block rounded-2xl bg-[hsl(257_70%_95%)] px-4 py-3 text-[0.9375rem] text-foreground"
        role="status"
      >
        <strong>Verstuurd.</strong> We nemen je vraag mee als we contact opnemen.
      </motion.p>
    );
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="press text-[0.9375rem] font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
      >
        {open ? "Toch geen vraag" : "Vraag over deze stap?"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            id={id}
            onSubmit={send}
            initial={calm ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={calm ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={calm ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={calm ? { duration: 0.15 } : spring}
            className="overflow-hidden"
          >
            <div className="mt-3 max-w-xl space-y-3 rounded-2xl border border-border bg-[hsl(36_38%_99%)] p-4">
              <label htmlFor={`${id}-vraag`} className="block text-sm font-semibold text-foreground">
                Stuur ons je vraag, dan nemen we hem mee.
              </label>
              <textarea
                id={`${id}-vraag`}
                required
                rows={3}
                value={vraag}
                onChange={(e) => setVraag(e.target.value)}
                placeholder={placeholder}
                className={input}
              />
              {!known && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input aria-label="Naam" required placeholder="Naam" autoComplete="name" value={naam} onChange={(e) => setNaam(e.target.value)} className={input} />
                  <input aria-label="E-mail" required type="email" placeholder="E-mail" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={state === "sending"} className="btn-neon press px-5 py-2.5 text-[0.9375rem] font-semibold disabled:opacity-60">
                  {state === "sending" ? "Versturen..." : "Verstuur je vraag"}
                </button>
                {state === "error" && (
                  <span className="text-sm text-destructive">Dat lukte niet. Probeer het nog eens, of bel ons.</span>
                )}
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
