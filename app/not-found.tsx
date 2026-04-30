'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const aigaLogo = "/assets/AIGA_transparent.png";

export default function NotFound() {
  const reduced = useReduceMotion();
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{ background: '#09090b' }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={aigaLogo} alt="AIGA" className="mx-auto mb-12 h-10 opacity-90" />

        <h1
          className="font-display font-bold leading-none tracking-tight select-none"
          style={{
            fontSize: 'clamp(7rem, 22vw, 18rem)',
            background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        <p className="mt-8 font-display text-2xl font-bold text-white md:text-3xl">
          Deze pagina bestaat niet.
        </p>
        <p
          className="font-display text-2xl font-bold md:text-3xl"
          style={{
            background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Wel jij.
        </p>

        <Link
          href="/"
          className="btn-neon mt-10 inline-block rounded-lg px-8 py-3 text-sm font-semibold"
        >
          Terug naar home
        </Link>
      </motion.div>
    </div>
  );
}
