'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import AskFerry from "@/components/AskFerry";

const STANDALONE_PATHS = ["/admin", "/admin/login", "/one-pager"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

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
