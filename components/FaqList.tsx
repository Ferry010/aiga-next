import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faq";

export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-b border-border">
      {items.map((item) => (
        <details key={item.q} className="group border-t border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden />
          </summary>
          <p className="pb-5 pr-10 text-muted-foreground leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
