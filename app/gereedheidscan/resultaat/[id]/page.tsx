import { Suspense } from "react";
import type { Metadata } from "next";
import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Gereedheidsresultaat | AIGA",
  robots: { index: false, follow: false },
};

export default function ResultaatPage() {
  return (
    <Suspense>
      <ResultClient />
    </Suspense>
  );
}
