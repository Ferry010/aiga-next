import type { Metadata } from "next";
import NextStepsPage from "@/components/NextStepsPage";
import type { NextStepsKind } from "@/lib/nextSteps";

export const metadata: Metadata = {
  title: "Dit gebeurt er nu | AIGA",
  robots: { index: false, follow: false },
};

const KINDS: NextStepsKind[] = ["training", "masterclass", "contact", "terugbellen"];

export default async function Page({ searchParams }: { searchParams: Promise<{ voor?: string }> }) {
  const { voor } = await searchParams;
  const kind = KINDS.includes(voor as NextStepsKind) ? (voor as NextStepsKind) : "contact";
  return <NextStepsPage kind={kind} />;
}
