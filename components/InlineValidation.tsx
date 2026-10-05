'use client';
import { useRef, useState } from "react";

// Inline form validation: a field is checked the moment you leave it, and the
// message sits right under that field instead of a popup after submit.
// Usage: const v = useInlineValidation(); <form {...v.formProps}> ... <FieldError id="lf-naam" errors={v.errors} />

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function messageFor(el: Field): string {
  const v = el.validity;
  if (v.valueMissing) {
    if (el instanceof HTMLSelectElement) return "Kies een optie.";
    if (el.type === "email") return "Vul je e-mailadres in.";
    if (el.type === "tel") return "Vul je telefoonnummer in, dan kunnen we je bellen.";
    return "Vul dit veld in.";
  }
  if ((v.typeMismatch || v.customError) && el.type === "email") return "Dit lijkt geen geldig e-mailadres. Check de @ en de punt.";
  if (v.patternMismatch && el.type === "tel") return "Dit lijkt geen telefoonnummer. Gebruik alleen cijfers, spaties of +.";
  return el.validationMessage || "Dit klopt nog niet helemaal.";
}

const isField = (t: EventTarget | null): t is Field =>
  t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement;

export function useInlineValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const focusedThisSubmit = useRef(0);

  const check = (el: Field) => {
    if (!el.id) return;
    // Browsers accept "naam@bedrijf"; we want a real domain with a dot
    if (el instanceof HTMLInputElement && el.type === "email") {
      el.setCustomValidity(el.value && !/@[^@\s]+\.[^@\s]+$/.test(el.value) ? "Dit lijkt geen geldig e-mailadres. Check de @ en de punt." : "");
    }
    const msg = el.validity.valid ? "" : messageFor(el);
    if (msg) {
      el.setAttribute("aria-invalid", "true");
      el.setAttribute("aria-describedby", `${el.id}-error`);
    } else {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    }
    setErrors((e) => (e[el.id] === msg ? e : { ...e, [el.id]: msg }));
  };

  const formProps = {
    onBlur: (e: React.FocusEvent<HTMLFormElement>) => {
      if (isField(e.target) && (e.target.value || e.target.required)) {
        // Don't scold an empty field someone merely tabbed past before typing anything
        if (!e.target.value && !errors[e.target.id]) return;
        check(e.target);
      }
    },
    onChange: (e: React.ChangeEvent<HTMLFormElement>) => {
      if (isField(e.target) && errors[e.target.id]) check(e.target);
    },
    onInvalidCapture: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isField(e.target)) return;
      check(e.target);
      // Focus only the first invalid field of this submit attempt
      const now = Date.now();
      if (now - focusedThisSubmit.current > 300) {
        focusedThisSubmit.current = now;
        e.target.focus();
      }
    },
  };

  return { errors, formProps };
}

export function FieldError({ id, errors }: { id: string; errors: Record<string, string> }) {
  const msg = errors[id];
  if (!msg) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
      {msg}
    </p>
  );
}

/** Pattern for phone fields: digits, spaces, +, dashes, dots and brackets, at least 8 characters */
export const PHONE_PATTERN = "[0-9+()\\s.\\-]{8,}";
