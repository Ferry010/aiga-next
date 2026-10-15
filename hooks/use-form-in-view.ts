'use client';
import { useEffect, useState } from "react";

// True while a form fills a real part of the screen (or has focus). Floating extras like
// the chat button step aside then, so the form is the only thing asking for attention.
export function isFormInView() {
  if (typeof document === "undefined") return false;
  if (document.activeElement?.closest("form")) return true;
  const h = window.innerHeight;
  return [...document.querySelectorAll("form")].some((f) => {
    const r = f.getBoundingClientRect();
    const visible = Math.min(r.bottom, h) - Math.max(r.top, 0);
    return visible > Math.min(r.height, h) * 0.35;
  });
}

export function useFormInView() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setInView(isFormInView()));
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    document.addEventListener("focusin", check);
    document.addEventListener("focusout", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("focusin", check);
      document.removeEventListener("focusout", check);
    };
  }, []);
  return inView;
}
