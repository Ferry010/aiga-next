'use client';
import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-08-02T00:00:00+02:00");

function getTimeLeft() {
  const diff = Math.max(0, DEADLINE.getTime() - Date.now());
  return {
    dagen: Math.floor(diff / 86_400_000),
    uren: Math.floor((diff % 86_400_000) / 3_600_000),
    minuten: Math.floor((diff % 3_600_000) / 60_000),
  };
}

export default function CountdownClient() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="flex gap-6" aria-label="Aftellen naar deadline 2 augustus 2026">
      {(
        [
          { value: time.dagen, label: "dagen" },
          { value: time.uren, label: "uren" },
          { value: time.minuten, label: "minuten" },
        ] as const
      ).map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center min-w-[3rem]">
          <span className="text-3xl sm:text-4xl font-display font-bold neon-text tabular-nums leading-none">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
