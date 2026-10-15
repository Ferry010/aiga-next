'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCalmMotion } from "@/hooks/use-reduce-motion";
import { trackEvent } from "@/lib/track";

// A Booking.com-style nudge ("only 1 room left"), but about AI in your team. It never claims
// to see what happens at the visitor's company: every line says "grote kans" or "statistisch
// gezien" and names its source, so it stays funny and true. It appears when someone stops or
// slows down scrolling, never over a form, at most twice per visit.

const NUDGES = [
  {
    label: "Grote kans",
    text: "Iemand bij jou heeft vandaag bedrijfsdata in ChatGPT geplakt.",
    source: "77% van de medewerkers plakt gegevens in AI-tools. LayerX, 2025",
  },
  {
    label: "Ondertussen",
    text: "Leert een gratis AI-tool waarschijnlijk net van jullie bedrijfsdata.",
    source: "Gratis ChatGPT mag standaard leren van wat je typt.",
  },
  {
    label: "Statistisch gezien",
    text: "Gebruikt iemand in je team op dit moment AI met een privé-account.",
    source: "82% van de data in AI-tools komt via privé-accounts. LayerX, 2025",
  },
  {
    label: "Net als in de meeste teams",
    text: "Heeft iemand bij jou een eigen AI-tool mee naar het werk genomen.",
    source: "78% van de AI-gebruikers neemt eigen tools mee. Microsoft en LinkedIn, 2024",
  },
];

const HIDDEN_ON = ["/gereedheidscan", "/volgende-stappen", "/admin", "/podcast", "/privacyverklaring", "/licentie", "/unsubscribe", "/one-pager"];
const COUNT_KEY = "aiga_nudge_count";
const MAX_PER_VISIT = 2;
const FIRST_AFTER_MS = 20000;
const GAP_MS = 45000;
const VISIBLE_MS = 9000;

function canShowNow() {
  // Not while the cookie choice is still open, the chat is open, or a form is on screen
  try {
    if (!localStorage.getItem("aiga_cookie_consent")) return false;
  } catch { return false; }
  if (!document.querySelector(".askferry-launcher")) return false;
  if (document.querySelector(".askferry-teaser")) return false; // one nudge on screen at a time
  if (document.activeElement?.closest("form, input, textarea, select")) return false;
  const h = window.innerHeight;
  return ![...document.querySelectorAll("form")].some((f) => {
    const r = f.getBoundingClientRect();
    return r.top < h && r.bottom > 0;
  });
}

export default function RealityCheck() {
  const pathname = usePathname();
  const calm = useCalmMotion();
  const [nudge, setNudge] = useState<(typeof NUDGES)[number] | null>(null);
  const lastShown = useRef(0);
  const used = useRef<Set<number>>(new Set());
  const hidden = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    if (hidden) return;
    const start = Date.now();
    let scrolled = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let fast = false;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;

    const tryShow = () => {
      if (Date.now() - start < FIRST_AFTER_MS || scrolled < 500) return;
      if (Date.now() - lastShown.current < GAP_MS) return;
      let count = 0;
      try { count = Number(sessionStorage.getItem(COUNT_KEY) || 0); } catch {}
      if (count >= MAX_PER_VISIT || !canShowNow()) return;
      const options = NUDGES.map((_, i) => i).filter((i) => !used.current.has(i));
      const pick = options[Math.floor(Math.random() * options.length)];
      if (pick === undefined) return;
      used.current.add(pick);
      lastShown.current = Date.now();
      try { sessionStorage.setItem(COUNT_KEY, String(count + 1)); } catch {}
      setNudge(NUDGES[pick]);
      trackEvent("nudge_show", { label: NUDGES[pick].label });
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const speed = Math.abs(y - lastY) / Math.max(now - lastT, 1); // px per ms
      scrolled += Math.abs(y - lastY);
      // Slowing down after a quick scroll: someone found something to read
      if (fast && speed < 0.15) { fast = false; tryShow(); }
      if (speed > 1) fast = true;
      lastY = y;
      lastT = now;
      clearTimeout(stopTimer);
      stopTimer = setTimeout(tryShow, 1200); // stopped scrolling
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer);
    };
  }, [hidden, pathname]);

  // Leaves by itself after a few seconds
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(null), VISIBLE_MS);
    return () => clearTimeout(t);
  }, [nudge]);

  useEffect(() => setNudge(null), [pathname]);

  if (hidden) return null;
  const href = pathname === "/training" ? "#offerte" : "/training#offerte";

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          key={nudge.text}
          role="status"
          data-nudge
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={calm ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={calm ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          transition={calm ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed left-3 right-[5.5rem] bottom-24 z-40 sm:right-auto sm:w-[22rem] md:bottom-6 md:left-6 rounded-2xl border border-border bg-white p-4 pr-10 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.5)]"
        >
          <button
            type="button"
            onClick={() => setNudge(null)}
            aria-label="Sluiten"
            className="press absolute right-2.5 top-2.5 rounded-full p-1 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              {!calm && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(330_78%_60%)] opacity-60" style={{ animationIterationCount: 3 }} />}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(330_78%_55%)]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-[hsl(330_70%_42%)]">{nudge.label}</span>
          </div>
          <p className="mt-1.5 font-display text-[1.0625rem] font-bold leading-snug text-foreground">{nudge.text}</p>
          <p className="mt-1 text-xs text-muted-foreground">{nudge.source}</p>
          <Link
            href={href}
            onClick={() => { trackEvent("nudge_click", { label: nudge.label }); setNudge(null); }}
            className="mt-2.5 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Zo regel je het →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
