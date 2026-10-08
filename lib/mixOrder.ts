// Mixes a list of articles so no two neighbours share a format (list, how-to, wist je dat,
// reden waarom, uitleg) or a category, where that's possible. Used by the admin's
// "Mix volgorde" button. The format is read from the title, with the labels as backup.

export type MixFormat = "lijst" | "howto" | "wist" | "reden" | "uitleg" | "overig";

interface Mixable {
  title: string;
  category: string;
  labels?: string[] | null;
}

export function formatOf(a: Mixable): MixFormat {
  const t = a.title.toLowerCase().trim();
  const labels = (a.labels || []).map((l) => l.toLowerCase());
  if (t.startsWith("wist je dat") || labels.includes("wist je dat")) return "wist";
  // A number in the title (not a year) means a listicle: "7 signalen", "8 checks"
  if (/(^|\s)\d{1,2}(\s|$)/.test(t.replace(/\(\d{4}\)/g, ""))) return "lijst";
  if (t.startsWith("waarom") || labels.includes("reden waarom")) return "reden";
  if (t.startsWith("zo ") || /: zo /.test(t) || labels.includes("zo doe je dat") || labels.includes("checklist") || labels.includes("stappenplan")) return "howto";
  if (t.startsWith("wat is") || t.includes("uitgelegd") || labels.includes("uitleg")) return "uitleg";
  if (labels.includes("lijst")) return "lijst";
  return "overig";
}

function shuffleOnce<T extends Mixable>(items: T[], rand: () => number, strict: boolean): T[] | null {
  const pool = [...items];
  const out: T[] = [];
  while (pool.length) {
    const prev = out[out.length - 1];
    const left: Record<string, number> = {};
    pool.forEach((x) => { const f = formatOf(x); left[f] = (left[f] || 0) + 1; });
    let ok = pool.filter((x) => !prev || (formatOf(x) !== formatOf(prev) && x.category !== prev.category));
    if (!ok.length && !strict) ok = pool.filter((x) => !prev || formatOf(x) !== formatOf(prev));
    if (!ok.length && !strict) ok = pool;
    if (!ok.length) return null;
    // Weighted by how many of that format are left, so formats spread evenly top to bottom
    const weights = ok.map((x) => left[formatOf(x)]);
    let r = rand() * weights.reduce((s, w) => s + w, 0);
    let i = 0;
    while (r >= weights[i] && i < weights.length - 1) { r -= weights[i]; i++; }
    const pick = ok[i];
    pool.splice(pool.indexOf(pick), 1);
    out.push(pick);
  }
  return out;
}

export function mixOrder<T extends Mixable>(items: T[], rand: () => number = Math.random): T[] {
  for (let attempt = 0; attempt < 400; attempt++) {
    const out = shuffleOnce(items, rand, true);
    if (out) return out;
  }
  // If a perfect mix isn't possible (for example mostly one format), allow category repeats
  return shuffleOnce(items, rand, false)!;
}
