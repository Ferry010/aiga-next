import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social share images (Open Graph / Twitter) that look like the page's own hero: the same headline,
// the purple accent line, the wordmark, the site's colours and Lato. Each route has a small
// opengraph-image.tsx that calls heroOg() with its entry from HEROES, so a share shows what the
// visitor will actually see. Rendered at build time; no browser needed.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgHero = {
  title: string;
  accent?: string;
  /** Small label above the headline, e.g. an article category */
  eyebrow?: string;
  /** Image from /public shown on the right, e.g. the book cover or Ferry on stage */
  aside?: { src: string; kind: "book" | "photo" };
};

// Brand tokens from globals.css, as hex (satori is safest with hex)
const C = { bg: "#fcfaf8", fg: "#2c2521", neon: "#8249df", muted: "#786c64", border: "#e7e1da" };

const font = (file: string) => readFile(join(process.cwd(), "lib/og-fonts", file));

async function dataUri(publicPath: string) {
  const buf = await readFile(join(process.cwd(), "public", publicPath));
  const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
}

// Keep the last two words together, so a headline never ends on one orphaned word
const noOrphan = (t: string) => t.replace(/ (\S+)$/, "\u00a0$1");

export async function heroOg({ title: rawTitle, accent: rawAccent, eyebrow, aside }: OgHero) {
  const title = noOrphan(rawTitle);
  const accent = rawAccent && noOrphan(rawAccent);
  const [bold, black, img] = await Promise.all([font("Lato-Bold.ttf"), font("Lato-Black.ttf"), aside ? dataUri(aside.src) : null]);

  // Long headlines step down a size so they never run off the card
  const len = title.length + (accent?.length ?? 0);
  const textWidth = aside ? 720 : 1024;
  const size = aside ? (len > 70 ? 56 : len > 50 ? 62 : 70) : len > 90 ? 60 : len > 60 ? 70 : 82;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.bg, padding: "64px 88px", fontFamily: "Lato" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: textWidth, height: "100%" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 900, color: C.neon, letterSpacing: "-0.01em" }}>AIGA</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow && (
              <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: C.neon, letterSpacing: "0.12em", marginBottom: 22 }}>
                {eyebrow.toUpperCase()}
              </div>
            )}
            <div style={{ display: "flex", fontSize: size, fontWeight: 900, color: C.fg, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{title}</div>
            {accent && (
              <div style={{ display: "flex", fontSize: size, fontWeight: 900, color: C.neon, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 12 }}>
                {accent}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 700, color: C.muted, borderTop: `2px solid ${C.border}`, paddingTop: 22 }}>
            aigeletterdheid.academy
          </div>
        </div>
        {img && aside?.kind === "book" && (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} width={300} height={458} style={{ borderRadius: 6, transform: "rotate(2deg)", boxShadow: "0 30px 60px -24px rgba(60,30,110,0.45)" }} />
          </div>
        )}
        {img && aside?.kind === "photo" && (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} width={300} height={420} style={{ borderRadius: 28, objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Lato", data: bold, weight: 700, style: "normal" },
        { name: "Lato", data: black, weight: 900, style: "normal" },
      ],
    },
  );
}

// The hero of every page that has its own share image. Keep these in sync with the page's <h1>.
export const HEROES = {
  home: { title: "Er verdwijnt vandaag gevoelige data in AI.", accent: "Weet jij welke?" },
  training: { title: "Je team werkt al met AI.", accent: "Maar niemand heeft ze geleerd hoe het moet." },
  masterclass: { title: "Je mensen gebruiken AI.", accent: "Wie bepaalt waar de grens ligt?", aside: { src: "/assets/ferry-stage.jpg", kind: "photo" } },
  overAiga: { title: "AI ging sneller dan de begeleiding.", accent: "Daarom bestaat AIGA.", aside: { src: "/assets/ferry-stage.jpg", kind: "photo" } },
  contact: { title: "Vraag je offerte aan,", accent: "of stel eerst je vraag." },
  check: { title: "Weet jij hoe je team AI gebruikt?", accent: "In 3 minuten weet je waar je staat." },
  shadowAi: { title: "Je team zet klantdata in ChatGPT.", accent: "En niemand die het ziet." },
  kenniscentrum: { title: "Wat je team over AI moet weten.", accent: "Voordat er iets misgaat." },
  faq: { title: "Vragen over AI in je team?", accent: "Liever nu gesteld dan na een datalek." },
  speakersAcademy: { title: "Na de keynote weet je team waarom.", accent: "Met de training weet het ook hoe." },
  aiActCompliance: { title: "Je weet niet wat je mensen met AI doen.", accent: "Elke dag zonder zicht is data die al weg is." },
  aiActDeadlines: { title: "AI Act deadlines in Nederland.", accent: "Wat geldt al, en wat komt nog." },
  aiCursus: { title: "Je mensen leren AI nu van YouTube en van elkaar.", accent: "Ondertussen weet niemand welke data er weglekt." },
  aiGeletterdheidNl: { title: "AI zit al in je organisatie.", accent: "Weten je mensen wat ze ermee mogen?" },
  aiGeletterdheidTraining: { title: "AI-geletterdheid training.", accent: "Voor iedereen die al met AI werkt." },
  aiTrainingBedrijven: { title: "Je betaalt al voor AI-tools.", accent: "Maar weet je welke data je team erin stopt?" },
  aiTools: { title: "Welke AI-tools vallen onder de EU AI Act?" },
  blackfriday: { title: "Black Friday: train je team in AI.", accent: "Elke deelnemer krijgt het boek erbij.", aside: { src: "/assets/boek-brand-humanizing.jpg", kind: "book" } },
} satisfies Record<string, OgHero>;
