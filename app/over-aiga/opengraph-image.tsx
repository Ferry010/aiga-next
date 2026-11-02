import { heroOg, HEROES, ogSize, ogContentType } from "@/lib/og";

// Share image: this page's hero (see lib/og.tsx)
export const alt = "AI ging sneller dan de begeleiding. Daarom bestaat AIGA.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return heroOg(HEROES.overAiga);
}
