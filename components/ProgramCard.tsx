// The masterclass agenda as a card: two hours in four blocks. Unlike the other
// hero illustrations this is real content (the program), so it stays readable
// for screen readers.

export const PROGRAM = [
  { time: "30 min", title: "Wat er nu al met AI gebeurt", body: "Wat betekent het voor je data, shadow AI en de output die de deur uitgaat?" },
  { time: "45 min", title: "Wat dit betekent voor jou als leidinggevende", body: "Welke rollen, tools en processen het raakt, en waar jij op stuurt." },
  { time: "30 min", title: "Van risico naar richting", body: "AI-gebruik in goede banen leiden, zonder je mensen af te remmen." },
  { time: "15 min", title: "Live Q&A met Ferry Hoes", body: "Jullie eigen vragen, over jullie eigen situatie." },
];

export default function ProgramCard() {
  return (
    <div className="block-lilac rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-9">
      <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.35)]">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[17px] font-bold text-foreground">Het programma</h2>
          <span className="text-[13px] text-muted-foreground">2 uur, live</span>
        </div>
        <ol className="mt-3">
          {PROGRAM.map((p) => (
            <li key={p.title} className="grid grid-cols-[4.25rem_1fr] gap-2 border-t border-[#F0EBE3] py-3.5">
              <span className="text-[14px] font-bold text-primary">{p.time}</span>
              <div>
                <p className="text-[15px] font-bold leading-snug text-foreground">{p.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
