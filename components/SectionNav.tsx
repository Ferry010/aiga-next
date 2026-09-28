'use client';
import { useEffect, useState } from "react";

// Sticky in-page menu for long product pages (like a course prospectus):
// jump straight to Programma or Prijs, and always see where you are.

export type NavItem = { id: string; label: string };

export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Op deze pagina" className="sticky top-16 z-30 border-y border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={`inline-block rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  active === i.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
