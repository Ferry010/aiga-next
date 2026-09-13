import type { CSSProperties } from "react";

/**
 * Subtle, brand-fitting hero graphic: the shared AI vocabulary a team needs,
 * as softly floating chips. No icons (AI tell), no gradients, no blobs.
 * Motion is pure CSS and freezes under prefers-reduced-motion.
 */
type Chip = {
  t: string;
  cls: string;
  top: string;
  left: string;
  r: string;
  dur: string;
  delay: string;
  solid?: boolean;
};

const chips: Chip[] = [
  { t: "ChatGPT", cls: "block-lilac", top: "4%", left: "12%", r: "-5deg", dur: "7.5s", delay: "0s" },
  { t: "datalek", cls: "block-peach", top: "16%", left: "58%", r: "4deg", dur: "8.5s", delay: "0.6s" },
  { t: "shadow AI", cls: "", top: "34%", left: "26%", r: "-2deg", dur: "7s", delay: "0.2s", solid: true },
  { t: "AVG &amp; privacy", cls: "block-sage", top: "30%", left: "66%", r: "5deg", dur: "9s", delay: "1.1s" },
  { t: "prompten", cls: "block-butter", top: "52%", left: "6%", r: "3deg", dur: "8s", delay: "0.9s" },
  { t: "hallucinatie", cls: "block-lilac", top: "62%", left: "52%", r: "-4deg", dur: "7.8s", delay: "0.4s" },
  { t: "vertrouwelijk", cls: "block-peach", top: "78%", left: "22%", r: "4deg", dur: "9.2s", delay: "1.4s" },
  { t: "brongebruik", cls: "block-sage", top: "84%", left: "60%", r: "-3deg", dur: "8.2s", delay: "0.7s" },
];

export default function HeroFloat() {
  return (
    <div className="relative h-[460px] w-full max-w-md ml-auto" aria-hidden="true">
      {chips.map((c) => (
        <span
          key={c.t}
          className={`chip-float absolute rounded-full px-4 py-2 text-sm font-semibold shadow-soft whitespace-nowrap ${c.cls} ${
            c.solid ? "text-white" : "text-foreground"
          }`}
          style={
            {
              top: c.top,
              left: c.left,
              "--r": c.r,
              "--dur": c.dur,
              animationDelay: c.delay,
              ...(c.solid ? { backgroundColor: "hsl(var(--neon-purple))" } : {}),
            } as CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: c.t }}
        />
      ))}
    </div>
  );
}
