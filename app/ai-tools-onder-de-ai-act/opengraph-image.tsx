import { heroOg, HEROES, ogSize, ogContentType } from "@/lib/og";

// Share image: this page's hero (see lib/og.tsx)
export const alt = "Welke AI-tools vallen onder de EU AI Act?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return heroOg(HEROES.aiTools);
}
