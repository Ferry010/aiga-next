'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const cta = primaryAction(pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
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
            <Link
              href="/gereedheidscan"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              Gratis AI-risicocheck
            </Link>
            <Link
              href={cta.href}
              className="btn-neon text-sm px-5 py-2 rounded-lg"
            >
              {cta.label}
            </Link>
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 flex flex-col p-8 gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="text-lg font-body text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-border" />
          <Link href="/gereedheidscan" onClick={() => setOpen(false)} className="text-lg font-body neon-text font-semibold">
            Gratis AI-risicocheck
          </Link>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="btn-neon text-center px-5 py-3 rounded-lg"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
