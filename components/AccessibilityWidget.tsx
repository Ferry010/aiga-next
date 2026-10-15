'use client';
import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "aiga-accessibility";

interface A11yState {
  contrast: boolean;
  largeText: boolean;
  colorblind: boolean;
  reduceMotion: boolean;
}

const defaults: A11yState = { contrast: false, largeText: false, colorblind: false, reduceMotion: false };

const classMap: Record<keyof A11yState, string> = {
  contrast: "a11y-contrast",
  largeText: "a11y-large-text",
  colorblind: "a11y-colorblind",
  reduceMotion: "a11y-reduce-motion",
};

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(defaults);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("aiga:open-a11y", onOpen);
    window.addEventListener("aiga:toggle-a11y", onToggle);
    return () => {
      window.removeEventListener("aiga:open-a11y", onOpen);
      window.removeEventListener("aiga:toggle-a11y", onToggle);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as A11yState;
        setState(parsed);
        applyClasses(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    // Close on a click elsewhere (the menu button toggles it itself) and on Escape
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("[data-a11y-trigger]")) return;
      if (ref.current && !ref.current.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const applyClasses = (s: A11yState) => {
    const el = document.documentElement;
    (Object.keys(classMap) as (keyof A11yState)[]).forEach((key) => {
      el.classList.toggle(classMap[key], s[key]);
    });
  };

  const toggle = (key: keyof A11yState) => {
    const next = { ...state, [key]: !state[key] };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    applyClasses(next);
  };

  const options: { key: keyof A11yState; label: string }[] = [
    { key: "contrast", label: "Meer contrast" },
    { key: "largeText", label: "Grotere tekst" },
    { key: "colorblind", label: "Kleurenblindmodus" },
    { key: "reduceMotion", label: "Minder beweging" },
  ];

  if (!open) return null;

  // Opens as a small panel under the menu bar, where the button now lives
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Toegankelijkheid"
      className="fixed right-3 top-[4.5rem] z-[60] w-[280px] rounded-2xl border border-border bg-card p-4 shadow-lg sm:right-6"
      style={{ fontSize: "16px", filter: "none" }}
    >
      <p className="text-sm font-semibold text-foreground mb-3">Toegankelijkheid</p>
      <div className="space-y-3">
        {options.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{label}</span>
            <Switch checked={state[key]} onCheckedChange={() => toggle(key)} aria-label={label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityWidget;
