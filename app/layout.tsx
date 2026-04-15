import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aigeletterdheid.academy"),
  title: {
    default: "AI Geletterdheid Academy | EU AI Act Training voor Organisaties",
    template: "%s | AIGA",
  },
  description:
    "Bereid je organisatie voor op de EU AI Act. Praktische AI-trainingen en certificering voor teams, managers en bestuurders.",
  openGraph: {
    siteName: "AI Geletterdheid Academy",
    locale: "nl_NL",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LayoutShell>{children}</LayoutShell>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
