import type { ReactNode } from "react";

// An inset, rounded color moment between stretches of cream. Used sparingly:
// "tint" (lilac) for soft moments, "deep" (dark purple) for the bold ones.
// Never full-bleed, so the page breathes instead of stacking into blocks.

export default function Panel({
  tone = "tint",
  id,
  children,
  className = "",
}: {
  tone?: "tint" | "deep";
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const bg = tone === "deep" ? "statement-block" : "block-lilac";
  return (
    <section id={id} className="px-3 sm:px-5 lg:px-8 scroll-mt-20">
      <div className={`max-w-7xl mx-auto rounded-[1.75rem] sm:rounded-[2.25rem] ${bg} px-5 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}
