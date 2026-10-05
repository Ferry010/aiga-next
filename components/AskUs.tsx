'use client';
import { useEffect, useRef, useState } from "react";
import { PHONE, PHONE_HREF, PEOPLE } from "@/lib/contact";

// The escape hatch for people who want to talk before they fill in a form.
// Photos live in /public/assets; until a file is there, the initials show.

function Face({ name, photo }: { name: string; photo: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // An image that already failed before hydration never fires onError
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white" aria-hidden>
        {name[0]}
      </span>
    );
  }
  return (
    <img
      ref={ref}
      src={photo}
      alt={`Foto van ${name}`}
      onError={() => setFailed(true)}
      className="h-14 w-14 shrink-0 rounded-full object-cover"
    />
  );
}

export default function AskUs({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-white p-6 sm:p-7 ${className}`}>
      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
        Vragen? Bel of mail ons eerst.
      </h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Liever eerst even overleggen? Robbert en Tom weten alles over de training en de masterclass. Je zit nergens
        aan vast.
      </p>
      <ul className="mt-5 flex flex-col gap-4">
        {PEOPLE.map((p) => (
          <li key={p.name} className="flex items-center gap-4">
            <Face name={p.name} photo={p.photo} />
            <div className="min-w-0">
              <p className="font-display font-bold text-foreground">{p.name}</p>
              <a href={`mailto:${p.email}`} className="block truncate text-sm text-primary hover:underline">
                {p.email}
              </a>
            </div>
          </li>
        ))}
      </ul>
      <a
        href={PHONE_HREF}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Bel {PHONE}
      </a>
    </div>
  );
}
