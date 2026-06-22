import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "AI Geletterdheid Academy | EU AI Act Training voor Organisaties",
  description:
    "Bereid je organisatie voor op de EU AI Act. Praktische AI-trainingen en certificering voor teams, managers en bestuurders.",
  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    apple: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
  openGraph: {
    siteName: "AI Geletterdheid Academy",
    locale: "nl_NL",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const sitewideSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aigeletterdheid.academy/#org",
      name: "AI Geletterdheid Academy",
      alternateName: ["AIGA", "AI Geletterdheid Academy Nederland"],
      url: "https://aigeletterdheid.academy",
      logo: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png",
      founder: { "@id": "https://aigeletterdheid.academy/#ferry" },
      parentOrganization: {
        "@type": "Organization",
        name: "Brand Humanizing Institute",
        url: "https://brandhumanizing.com",
      },
      sameAs: [
        "https://brandhumanizing.com",
        "https://www.speakersacademy.nl",
        "https://www.linkedin.com/company/aiga-nl",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://aigeletterdheid.academy/#ferry",
      name: "Ferry Hoes",
      jobTitle: "AI-expert, keynote spreker, mede-oprichter AIGA",
      award: "Winnaar Anti-Discriminatie AI-Hackathon Nederlandse Overheid 2020",
      sameAs: [
        "https://ferryhoes.com",
        "https://brandhumanizing.com",
        "https://www.linkedin.com/in/ferryhoes/",
        "https://www.speakersacademy.com/nl/spreker/ferry-hoes/",
      ],
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitewideSchema) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HDFX7HK13F"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HDFX7HK13F');
        `}
      </Script>
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
