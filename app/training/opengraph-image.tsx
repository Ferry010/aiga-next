import { heroOg, HEROES, ogSize, ogContentType } from "@/lib/og";

// Share image: this page's hero (see lib/og.tsx)
export const alt = "Je team werkt al met AI. Maar niemand heeft ze geleerd hoe het moet.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return heroOg(HEROES.training);
}
