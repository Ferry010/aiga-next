import { heroOg, HEROES, ogSize, ogContentType } from "@/lib/og";

// Share image: this page's hero (see lib/og.tsx)
export const alt = "Black Friday: train je team in AI. Elke deelnemer krijgt het boek erbij.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return heroOg(HEROES.blackfriday);
}
