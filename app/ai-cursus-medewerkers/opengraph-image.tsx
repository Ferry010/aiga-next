import { heroOg, HEROES, ogSize, ogContentType } from "@/lib/og";

// Share image: this page's hero (see lib/og.tsx)
export const alt = "Je mensen leren AI nu van YouTube en van elkaar. Ondertussen weet niemand welke data er weglekt.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return heroOg(HEROES.aiCursus);
}
