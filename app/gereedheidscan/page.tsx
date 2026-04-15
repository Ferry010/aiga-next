import type { Metadata } from "next";
import QuizClient from "@/components/QuizClient";

export const metadata: Metadata = {
  title: "AI Gereedheidscan | Meet je AI-readiness in 3 minuten | AIGA",
  description: "Meet in drie minuten hoe gereed jouw organisatie is voor de EU AI Act. 10 vragen, directe score op 5 dimensies.",
  alternates: { canonical: "https://aigeletterdheid.academy/gereedheidscan" },
};

export default function GereedheidscanPage() {
  return <QuizClient />;
}
