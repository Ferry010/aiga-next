// The moment the whole site is about, drawn in HTML: someone attaches a
// contract to an AI chat to save an hour. Decorative (the headline says it in
// words), so it is hidden from screen readers.

export default function HeroChat() {
  return (
    <div className="block-lilac rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-9" aria-hidden="true">
      <div className="rounded-2xl bg-white p-5 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.35)]">
        <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
          <span className="font-bold text-foreground">Chat met AI</span>
          <span>dinsdag 10:42</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2.5 rounded-xl bg-[#F4F1EC] px-3.5 py-2.5 text-sm text-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <path d="M14 3v6h6" />
          </svg>
          Klantcontract_Q3_definitief.pdf
        </div>
        <div className="mt-3 rounded-xl border border-border px-4 py-3 text-[15px] leading-relaxed text-foreground">
          Kun je dit even samenvatten? Scheelt me een uur.
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background">Versturen</span>
        </div>
      </div>
      <p className="mt-5 px-1 text-[15px] leading-relaxed text-[hsl(var(--deep))]">
        <strong>Eén klik.</strong> Daarna heb jij geen zicht meer op waar dit contract staat of wat ermee gebeurt.
      </p>
    </div>
  );
}
