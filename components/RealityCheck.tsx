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
// slows down scrolling in a non-crucial part of the page: past the hero, away from forms,
// prices, the quiz and quote sections. At most three per visit.

const NUDGES = [
  {
    text: "Iemand bij jou plakte net gevoelige data in ChatGPT.",
    reveal: "Maar 77% van de medewerkers plakt gegevens in AI-tools (LayerX, 2025). De kans is dus groot.",
  },
  {
    text: "Een gratis AI-tool leert net van jullie bedrijfsdata.",
    reveal: "Maar gratis ChatGPT mag standaard leren van wat je typt. Wie dat niet weet, zet het niet uit.",
  },
  {
    text: "Iemand in je team gebruikt nu AI met een privé-account.",
    reveal: "Maar 82% van de data in AI-tools komt via privé-accounts (LayerX, 2025). De kans is dus groot.",
  },
  {
    text: "Iemand bij jou nam net een eigen AI-tool mee naar het werk.",
    reveal: "Maar 78% van de AI-gebruikers neemt eigen tools mee (Microsoft en LinkedIn, 2024). De kans is dus groot.",
  },
];

const HIDDEN_ON = ["/volgende-stappen", "/admin", "/podcast", "/privacyverklaring", "/licentie", "/unsubscribe", "/one-pager"];
const COUNT_KEY = "aiga_nudge_count";
const MAX_PER_VISIT = 3;
const FIRST_AFTER_MS = 6000; // per page
const GAP_MS = 30000;
// Parts of a page where the visitor is deciding or acting: never interrupt there
const CRUCIAL = "form, [data-crucial], #offerte, #aanmelden, #contact, #oplossing";

// True while the visitor is in the hero or a crucial part sits in the middle of the screen
function inCrucialZone() {
  const h = window.innerHeight;
  if (window.scrollY < h * 0.6) return true;
  return [...document.querySelectorAll(CRUCIAL)].some((el) => {
    const r = el.getBoundingClientRect();
    return r.top < h * 0.85 && r.bottom > h * 0.15;
  });
}
const VISIBLE_MS = 60000; // stays until closed, or a minute

function canShowNow() {
  // Not while the cookie choice is still open, the chat is open, or a form is on screen
  try {
    if (!localStorage.getItem("aiga_cookie_consent")) return false;
  } catch { return false; }
  if (!document.querySelector(".askferry-launcher")) return false;
  if (document.querySelector(".askferry-teaser")) return false; // one nudge on screen at a time
  if (document.activeElement?.closest("form, input, textarea, select")) return false;
  return !inCrucialZone();
}

export default function RealityCheck() {
  const pathname = usePathname();
  const calm = useCalmMotion();
  const [nudge, setNudge] = useState<(typeof NUDGES)[number] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const lastShown = useRef(0);
  const showing = useRef(false);
  const opened = useRef(false);
  const used = useRef<Set<number>>(new Set());
  showing.current = !!nudge;
  opened.current = revealed;
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
      if (Date.now() - start < FIRST_AFTER_MS || scrolled < 250) return;
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
      setRevealed(false);
      setNudge(NUDGES[pick]);
      trackEvent("nudge_show", { text: NUDGES[pick].text });
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
      // Scrolled into a crucial part with an unopened nudge: get out of the way
      if (showing.current && !opened.current && inCrucialZone()) setNudge(null);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(tryShow, 900); // stopped scrolling
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
  }, [nudge, revealed]);

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
          <div className="flex items-start gap-2.5">
            <span className="relative mt-[0.45rem] flex h-2.5 w-2.5 shrink-0" aria-hidden>
              {!calm && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(330_78%_60%)] opacity-60" style={{ animationIterationCount: 3 }} />}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(330_78%_55%)]" />
            </span>
            <p className="font-display text-[1.0625rem] font-bold leading-snug text-foreground">{nudge.text}</p>
          </div>
          {!revealed ? (
            <button
              type="button"
              onClick={() => { setRevealed(true); trackEvent("nudge_open", { text: nudge.text }); }}
              aria-expanded={false}
              className="press mt-2 ml-5 rounded-full bg-[hsl(330_78%_95%)] px-3 py-1 text-sm font-bold text-[hsl(330_70%_40%)] hover:bg-[hsl(330_78%_91%)]"
            >
              Echt?
            </button>
          ) : (
            <motion.div
              initial={calm ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.35 }}
              className="mt-2 ml-5"
            >
              <p className="text-[0.9375rem] leading-relaxed text-foreground">
                <strong>Grapje. Waarschijnlijk.</strong> Wij kunnen niet zien wat er bij jou gebeurt. {nudge.reveal} Daarom is
                training zo belangrijk.
              </p>
              <Link
                href={href}
                onClick={() => { trackEvent("nudge_click", { text: nudge.text }); setNudge(null); }}
                className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Zo regel je het →
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
