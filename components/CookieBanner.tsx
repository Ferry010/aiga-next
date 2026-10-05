'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const COOKIE_KEY = "aiga_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  const reduced = useReduceMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-6"
        >
          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg p-4 sm:p-6 sm:flex sm:items-center sm:gap-6">
            <p className="text-[0.8125rem] sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-0 sm:flex-1">
              We gebruiken cookies zodat de site werkt en om te meten hoe hij gebruikt wordt.{" "}
              <Link href="/privacyverklaring" className="neon-text font-medium hover:underline">
                Meer weten
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={accept}
                className="btn-neon text-sm px-5 py-2.5 min-h-[44px]"
              >
                Accepteren
              </button>
              <button
                onClick={decline}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5 min-h-[44px]"
              >
                Alleen noodzakelijke
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
