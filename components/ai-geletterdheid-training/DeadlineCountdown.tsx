'use client';
import { useEffect, useState } from "react";

const DEADLINE = new Date('2026-08-02T00:00:00+02:00');

function getTimeLeft() {
  const diff = Math.max(0, DEADLINE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function DeadlineCountdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex gap-3 sm:gap-6 mt-6"
      aria-label="Aftelling tot handhavingsstart 2 augustus 2026"
    >
      {(
        [
          { value: time.days, label: "dagen" },
          { value: time.hours, label: "uur" },
          { value: time.minutes, label: "min" },
          { value: time.seconds, label: "sec" },
        ] as const
      ).map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center min-w-[3rem]">
          <span className="text-3xl sm:text-5xl font-display font-bold neon-text tabular-nums leading-none">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
