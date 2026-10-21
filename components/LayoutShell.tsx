'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureRef } from "@/lib/referral";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import AskFerry from "@/components/AskFerry";

const STANDALONE_PATHS = ["/admin", "/admin/login", "/one-pager"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // A visitor who came in through someone's referral link keeps the code for this visit
  useEffect(() => { captureRef(); }, [pathname]);

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <CookieBanner />
      <AccessibilityWidget />
      <AskFerry />
    </>
  );
}
