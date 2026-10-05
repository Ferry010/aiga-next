'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const navLinks = [
  { to: "/training", label: "Teamtraining" },
  { to: "/masterclass", label: "Masterclass" },
  { to: "/kenniscentrum", label: "Kenniscentrum" },
  { to: "/over-aiga", label: "Over AIGA" },
];

// The header's one button follows the page: on a product page it jumps to that
// page's own form, everywhere else it leads to the teamtraining offerte.
function primaryAction(pathname: string) {
  if (pathname === "/masterclass") return { href: "#aanmelden", label: "Plan de masterclass" };
  if (pathname === "/training") return { href: "#offerte", label: "Vraag een offerte aan" };
  return { href: "/training#offerte", label: "Vraag een offerte aan" };
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const cta = primaryAction(pathname);
  const calm = useReduceMotion() || !!useReducedMotion();

  // Translucent header that gains a soft edge once content scrolls under it.
  // On phones it slides away while reading down and returns on the way up.
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const goingDown = y > lastY.current + 4;
      const goingUp = y < lastY.current - 4;
      if (phone.matches && y > 120 && goingDown) setHidden(true);
      else if (goingUp || y <= 120 || !phone.matches) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sticky in-page menus sit right under the header, wherever it is
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-h", hidden && !open ? "0px" : "4rem");
  }, [hidden, open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHidden = hidden && !open;

  return (
    <>
    <nav
      className={`surface-glass fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-[transform,box-shadow] duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "shadow-[0_1px_0_hsl(var(--border)),0_8px_24px_-18px_hsl(256_56%_33%/0.35)]" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-2xl font-display font-bold neon-text">AIGA</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={`text-sm font-body transition-colors duration-300 hover:text-primary ${
                  pathname === l.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/gereedheidscan" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
              Gratis AI-risicocheck
            </Link>
            <Link href={cta.href} className="btn-neon text-sm px-5 py-2">
              {cta.label}
            </Link>
          </div>

          <button
            className="press lg:hidden -mr-2 p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

    </nav>

      {/* Mobile menu: drops down from the header and goes back up the same way */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={calm ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={calm ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={calm ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={calm ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-background z-[45] flex flex-col p-8 gap-6 overflow-y-auto"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={`text-lg font-body transition-colors hover:text-primary ${pathname === l.to ? "text-primary" : "text-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link href="/gereedheidscan" onClick={() => setOpen(false)} className="text-lg font-body neon-text font-semibold">
              Gratis AI-risicocheck
            </Link>
            <Link href={cta.href} onClick={() => setOpen(false)} className="btn-neon text-center px-5 py-3">
              {cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
