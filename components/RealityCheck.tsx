'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCalmMotion } from "@/hooks/use-reduce-motion";
import { trackEvent } from "@/lib/track";

// A Booking.com-style nudge ("only 1 room left"), but about AI in your team. The teaser line is
// a joke: clicking the card reveals "Grapje. Dat weten wij natuurlijk niet." plus the research
// behind it, so it never leaves a false claim standing. It appears when someone stops or slows
// down scrolling in a non-crucial part of the page: past the hero, away from forms, prices, the
// quiz and quote sections. At most twice per visit.

// A/B test: each visitor gets one variant and keeps it, so GA4 can compare them cleanly
const NUDGES = {
  A: {
    text: "Iemand in jouw organisatie heeft zojuist iets in ChatGPT geplakt.",
    research: "77% van de medewerkers gegevens in AI-tools plakt (LayerX, 2025)",
  },
  B: {
    text: "2 AI-tools in jouw buurt zijn getraind op jullie data.",
    research: "82% van de data in AI-tools via privé-accounts gaat (LayerX, 2025), en gratis ChatGPT mag standaard leren van wat je typt",
  },
} as const;
type Variant = keyof typeof NUDGES;
const VARIANT_KEY = "aiga_nudge_variant";

function myVariant(): Variant {
  try {
    const saved = localStorage.getItem(VARIANT_KEY);
    if (saved === "A" || saved === "B") return saved;
    const v: Variant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(VARIANT_KEY, v);
    return v;
  } catch {
    return Math.random() < 0.5 ? "A" : "B";
  }
}

const HIDDEN_ON = ["/volgende-stappen", "/admin", "/podcast", "/privacyverklaring", "/licentie", "/unsubscribe", "/one-pager"];
const COUNT_KEY = "aiga_nudge_count";
const MAX_PER_VISIT = 2;
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
  // Not while the chat is open, its own teaser shows, or a form is in use
  if (!document.querySelector(".askferry-launcher")) return false;
  if (document.querySelector(".askferry-teaser")) return false; // one nudge on screen at a time
  if (document.activeElement?.closest("form, input, textarea, select")) return false;
  return !inCrucialZone();
}

export default function RealityCheck() {
  const pathname = usePathname();
  const calm = useCalmMotion();
  const [nudge, setNudge] = useState<Variant | null>(null);
  const [revealed, setRevealed] = useState(false);
  const lastShown = useRef(0);
  const showing = useRef(false);
  const opened = useRef(false);
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
      const variant = myVariant();
      lastShown.current = Date.now();
      try { sessionStorage.setItem(COUNT_KEY, String(count + 1)); } catch {}
      setRevealed(false);
      setNudge(variant);
      trackEvent("nudge_show", { variant });
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
  const href = pathname === "/training" ? "#offerte" : "/training";
  const content = nudge ? NUDGES[nudge] : null;
  const open = () => {
    if (revealed || !nudge) return;
    setRevealed(true);
    trackEvent("nudge_open", { variant: nudge });
  };

  return (
    <AnimatePresence>
      {nudge && content && (
        <motion.div
          key={nudge}
          // The whole card is the button until it's opened
          role={revealed ? "status" : "button"}
          tabIndex={revealed ? undefined : 0}
          aria-expanded={revealed}
          onClick={open}
          onKeyDown={(e) => { if (!revealed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } }}
          data-nudge
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={calm ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={calm ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          transition={calm ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.4 }}
          className={`fixed left-3 right-[5.5rem] bottom-24 z-40 sm:right-auto sm:w-[22rem] md:bottom-6 md:left-6 rounded-2xl border border-border bg-white p-4 pr-10 shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.5)] ${revealed ? "" : "press cursor-pointer transition-colors hover:border-primary/40"}`}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setNudge(null); }}
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
            <p className="font-display text-[1.0625rem] font-bold leading-snug text-foreground">{content.text}</p>
          </div>
          {revealed && (
            <motion.p
              initial={calm ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.35 }}
              className="mt-2 ml-5 text-[0.9375rem] leading-relaxed text-foreground"
            >
              <strong>Grapje. Dat weten wij natuurlijk niet.</strong> Maar onderzoek wijst uit dat {content.research}.{" "}
              <Link
                href={href}
                onClick={(e) => { e.stopPropagation(); trackEvent("nudge_click", { variant: nudge }); setNudge(null); }}
                className="font-semibold text-primary underline underline-offset-2"
              >
                Train daarom je team.
              </Link>
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
