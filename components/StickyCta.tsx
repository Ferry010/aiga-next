'use client';
import { useEffect, useState } from "react";

// Mobile-only action bar. Shows once the visitor scrolls past the hero and
// hides while the section it points to is on screen, so it never covers the
// form it leads to.

export default function StickyCta({ target, label, note }: { target: string; label: string; note?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const el = document.getElementById(target);
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([entry]) => setTargetVisible(entry.isIntersecting), { threshold: 0.15 });
      io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [target]);

  const show = scrolled && !targetVisible;

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md px-4 pt-3 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-3">
        {note && <span className="text-sm text-muted-foreground leading-tight shrink-0">{note}</span>}
        <a
          href={`#${target}`}
          tabIndex={show ? 0 : -1}
          className="btn-neon flex-1 text-center py-3 rounded-lg text-[15px] font-semibold"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
