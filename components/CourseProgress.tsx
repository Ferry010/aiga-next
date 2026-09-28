// What a participant sees in the teamtraining, drawn in HTML: four modules,
// toetsen, the exam, then the certificate. An illustration of the flow, so it
// is hidden from screen readers (the page text describes the same steps).

const rows = [
  { label: "Begrijpen wat AI is", state: "done" },
  { label: "Veilig en verantwoord werken", state: "done" },
  { label: "Slim werken met AI", state: "active" },
  { label: "AI toepassen in je werk", state: "todo" },
  { label: "Digitaal eindexamen", state: "exam" },
] as const;

function Mark({ state }: { state: (typeof rows)[number]["state"] }) {
  if (state === "done")
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
    );
  if (state === "active") return <span className="h-6 w-6 shrink-0 rounded-full border-2 border-primary" />;
  if (state === "exam") return <span className="h-6 w-6 shrink-0 rounded-full border-2 border-dashed border-border" />;
  return <span className="h-6 w-6 shrink-0 rounded-full border-2 border-border" />;
}

export default function CourseProgress() {
  return (
    <div className="block-lilac rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-9" aria-hidden="true">
      <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.35)]">
        <div className="flex items-baseline justify-between">
          <span className="text-[17px] font-bold text-foreground">Jouw training</span>
          <span className="text-[13px] text-muted-foreground">2 van 4 afgerond</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-[hsl(256_60%_94%)]">
          <div className="h-2 w-[52%] rounded-full bg-primary" />
        </div>
        <ul className="mt-4">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-3 border-t border-[#F0EBE3] py-3">
              <Mark state={r.state} />
              <span
                className={`flex-1 text-[15px] ${
                  r.state === "active" ? "font-bold text-foreground" : r.state === "done" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {r.label}
              </span>
              <span className={`text-[13px] ${r.state === "active" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {r.state === "done" ? "toets behaald" : r.state === "active" ? "bezig" : r.state === "exam" ? "daarna je certificaat" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 px-1 text-[15px] leading-relaxed text-[hsl(var(--deep))]">
        Zo ziet een deelnemer het. Kort, tussen het werk door, en je weet altijd waar je staat.
      </p>
    </div>
  );
}
