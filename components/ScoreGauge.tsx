'use client';
import { useEffect, useRef, useState } from "react";

export default function ScoreGauge({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  const r = 80;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - displayed / 100);

  return (
    <div className="relative inline-flex items-center justify-center w-[200px] h-[200px]">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9B3FF5" />
            <stop offset="100%" stopColor="#E040C8" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="14"
        />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#score-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-display font-bold text-foreground leading-none">
          {displayed}%
        </span>
      </div>
    </div>
  );
}
