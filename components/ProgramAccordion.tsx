import { ChevronDown } from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";

// The full curriculum, module by module, every lesson listed. One container,
// native <details> so it works without JavaScript and with the keyboard.

export default function ProgramAccordion() {
  return (
    <div className="rounded-3xl border border-border bg-white overflow-hidden">
      {CURRICULUM.map((m, idx) => (
        <details key={m.n} open={idx === 0} className="group border-b border-border">
          <summary className="flex cursor-pointer list-none items-center gap-4 sm:gap-5 px-5 sm:px-7 py-5 sm:py-6 hover:bg-[hsl(var(--block-lilac)/0.5)] [&::-webkit-details-marker]:hidden">
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">
              {m.n}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-lg sm:text-xl font-display font-bold text-foreground leading-snug">{m.title}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                Introductie + {m.lessons.length} lessen · toets met {m.quizQuestions} vragen
              </span>
            </span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden />
          </summary>
          <div className="px-5 sm:px-7 pb-7 sm:pl-[5.75rem]">
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{m.summary}</p>
            <ol className="mt-5 border-b border-border">
              {m.lessons.map((l, i) => (
                <li key={l} className="grid grid-cols-[2.75rem_1fr] border-t border-border py-3 text-foreground">
                  <span className="text-sm font-bold text-primary tabular-nums pt-0.5">
                    {m.n}.{i + 1}
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Afsluitende toets: {m.quizQuestions} vragen
            </p>
          </div>
        </details>
      ))}
      <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-5 sm:py-6 block-lilac">
        <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <span>
          <span className="block text-lg sm:text-xl font-display font-bold text-foreground">Digitaal eindexamen</span>
          <span className="block text-sm text-muted-foreground">Bij voldoende resultaat: een certificaat van deelname</span>
        </span>
      </div>
    </div>
  );
}
