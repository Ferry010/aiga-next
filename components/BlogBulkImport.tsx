'use client';

import { useMemo, useRef, useState } from "react";
import { FileJson, ImageIcon, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Switch } from "@/components/ui/switch";

// Bulk upload for articles: one row per article, a JSON file on the left and its header
// image on the right. Drop a whole folder of files at once and rows pair up by filename
// (01-x.json with 01-x.png), or by the JSON's "image_file" field. A JSON that holds an
// array of articles becomes one row per article. Runs on the admin's own login.

interface Row {
  id: string;
  jsonName: string;
  data: ArticleJson | null;
  error: string | null;
  image: File | null;
  preview: string | null;
  status: "klaar-voor-upload" | "bezig" | "geplaatst" | "fout" | "bestaat-al";
  message?: string;
}

interface ArticleJson {
  title: string;
  category: string;
  meta_description: string;
  seo_keywords: string;
  labels: string[];
  content: string;
  read_time_minutes: number | null;
  image_file: string | null;
  slug: string | null;
}

interface Props {
  existingSlugs: string[];
  categories: string[];
  slugify: (title: string) => string;
  onDone: () => void;
  onClose: () => void;
}

const IMAGE_TYPES = /\.(png|jpe?g|webp|avif|gif)$/i;
const base = (name: string) => name.replace(/\.[^.]+$/, "").toLowerCase();
const newId = () => Math.random().toString(36).slice(2);

function normalize(json: Record<string, unknown>): ArticleJson {
  const labels = json.labels;
  const rt = json.read_time_minutes;
  return {
    title: String(json.title || "").trim(),
    category: String(json.category || ""),
    meta_description: String(json.meta_description || ""),
    seo_keywords: String(json["Zoektermen (SEO)"] || json.seo_keywords || json.keywords || json.zoekwoorden || ""),
    labels: Array.isArray(labels)
      ? labels.map(String)
      : String(labels || "").split(",").map((l) => l.trim()).filter(Boolean),
    content: String(json.content || ""),
    read_time_minutes: rt != null && rt !== "" ? Number(rt) || null : null,
    image_file: json.image_file ? String(json.image_file) : null,
    slug: json.slug ? String(json.slug) : null,
  };
}

// Reading time from the text when the JSON doesn't give one: about 200 words a minute
const readTime = (html: string) =>
  Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

export default function BlogBulkImport({ existingSlugs, categories, slugify, onDone, onClose }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const [rows, setRows] = useState<Row[]>([]);
  const [publish, setPublish] = useState(true);
  const [running, setRunning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pickAll = useRef<HTMLInputElement>(null);

  const taken = useMemo(() => new Set(existingSlugs), [existingSlugs]);
  const slugOf = (d: ArticleJson) => d.slug || slugify(d.title);

  const statusFor = (d: ArticleJson | null): Row["status"] =>
    d && taken.has(slugOf(d)) ? "bestaat-al" : "klaar-voor-upload";

  const parseJson = async (file: File): Promise<Row[]> => {
    try {
      const parsed = JSON.parse(await file.text());
      const list = Array.isArray(parsed) ? parsed : [parsed];
      return list.map((item, i) => {
        const data = normalize(item || {});
        const bad = !data.title || !data.content ? "Mist 'title' of 'content'" : null;
        return {
          id: newId(),
          jsonName: list.length > 1 ? `${file.name} #${i + 1}` : file.name,
          data: bad ? null : data,
          error: bad,
          image: null,
          preview: null,
          status: bad ? "fout" : statusFor(data),
        };
      });
    } catch {
      return [{ id: newId(), jsonName: file.name, data: null, error: "Geen geldige JSON", image: null, preview: null, status: "fout" }];
    }
  };

  // Pair images with rows: first by the JSON's image_file, then by matching filename
  const pairImages = (list: Row[], images: File[]) => {
    const left = [...images];
    const take = (pred: (f: File) => boolean) => {
      const i = left.findIndex(pred);
      return i >= 0 ? left.splice(i, 1)[0] : null;
    };
    const paired = list.map((r) => {
      if (r.image || !r.data) return r;
      const want = r.data.image_file?.toLowerCase();
      const json = base(r.jsonName.replace(/ #\d+$/, ""));
      const img =
        (want && take((f) => f.name.toLowerCase() === want)) ||
        take((f) => base(f.name) === json) ||
        null;
      return img ? { ...r, image: img, preview: URL.createObjectURL(img) } : r;
    });
    return { paired, left };
  };

  const addFiles = async (files: File[]) => {
    // Sorted by filename (01, 02, ... 10), so the numbering decides the order on the site:
    // the first file ends up at the top of the kenniscentrum
    const jsons = files
      .filter((f) => /\.json$/i.test(f.name))
      .sort((a, b) => a.name.localeCompare(b.name, "nl", { numeric: true }));
    const images = files.filter((f) => IMAGE_TYPES.test(f.name));
    // The same article twice (for example a list JSON and its single files) becomes one row
    const seen = new Set(rows.filter((r) => r.data).map((r) => slugOf(r.data!)));
    const newRows = (await Promise.all(jsons.map(parseJson))).flat().filter((r) => {
      if (!r.data) return true;
      const s = slugOf(r.data);
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
    const { paired, left } = pairImages([...rows, ...newRows], images);
    // Images without a matching name fill the empty rows in order
    let rest = left;
    const filled = paired.map((r) => {
      if (r.image || !r.data || rest.length === 0) return r;
      const [img, ...more] = rest;
      rest = more;
      return { ...r, image: img, preview: URL.createObjectURL(img) };
    });
    setRows(filled);
    if (rest.length) toast.message(`${rest.length} afbeelding(en) zonder artikel overgeslagen`);
  };

  const setRowImage = (id: string, file: File | undefined) => {
    if (!file) return;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, image: file, preview: URL.createObjectURL(file) } : r)));
  };

  const setRowJson = async (id: string, file: File | undefined) => {
    if (!file) return;
    const [parsed] = await parseJson(file);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...parsed, id, image: r.image, preview: r.preview } : r)));
  };

  const removeRow = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  const ready = rows.filter((r) => r.status === "klaar-voor-upload" && r.data && r.image);
  const missingImage = rows.filter((r) => r.status === "klaar-voor-upload" && r.data && !r.image).length;

  const update = (id: string, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const uploadAll = async () => {
    if (!ready.length) return;
    setRunning(true);
    // Make room at the top of the list for the new articles, in one pass
    const { data: current } = await supabase.from("articles").select("id, sort_order");
    await Promise.all(
      (current || []).map((a: { id: string; sort_order: number }) =>
        supabase.from("articles").update({ sort_order: a.sort_order + ready.length }).eq("id", a.id)
      )
    );
    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    let ok = 0;
    for (const [i, r] of ready.entries()) {
      const d = r.data!;
      const slug = slugOf(d);
      update(r.id, { status: "bezig" });
      try {
        const ext = (r.image!.name.split(".").pop() || "png").toLowerCase();
        const path = `${slug}-${now.toString(36)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("article-images")
          .upload(path, r.image!, { cacheControl: "31536000", contentType: r.image!.type || undefined });
        if (upErr) throw upErr;
        const { data: { publicUrl } } = supabase.storage.from("article-images").getPublicUrl(path);
        const category = categories.find((c) => c.toLowerCase() === d.category.toLowerCase()) || categories[0];
        const { error: insErr } = await supabase.from("articles").insert([{
          title: d.title,
          category,
          url: `/kenniscentrum/${slug}`,
          image_url: publicUrl,
          published: publish,
          sort_order: i + 1,
          content: d.content,
          slug,
          labels: d.labels,
          published_date: today,
          read_time_minutes: d.read_time_minutes ?? readTime(d.content),
          meta_description: d.meta_description || null,
          seo_keywords: d.seo_keywords || null,
          // Keep the order of the rows: the first row is the newest
          updated_at: new Date(now - i * 1000).toISOString(),
        }]);
        if (insErr) throw insErr;
        ok++;
        update(r.id, { status: "geplaatst" });
      } catch (e) {
        const msg = e instanceof Error ? e.message : (e as { message?: string })?.message || "Onbekende fout";
        update(r.id, { status: "fout", message: msg });
      }
    }
    setRunning(false);
    onDone();
    if (ok) toast.success(`${ok} ${ok === 1 ? "artikel" : "artikelen"} ${publish ? "gepubliceerd" : "opgeslagen als concept"}`);
  };

  const badge = (r: Row) => {
    const map: Record<Row["status"], [string, string]> = {
      "klaar-voor-upload": [r.image ? "Klaar" : "Mist afbeelding", r.image ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-800"],
      bezig: ["Bezig", "bg-muted text-foreground"],
      geplaatst: ["Geplaatst", "bg-emerald-100 text-emerald-800"],
      fout: [r.error || r.message || "Fout", "bg-red-100 text-red-800"],
      "bestaat-al": ["Bestaat al, wordt overgeslagen", "bg-muted text-muted-foreground"],
    };
    const [label, cls] = map[r.status];
    return <span className={`inline-block max-w-full truncate rounded-full px-2.5 py-1 text-xs font-medium ${cls}`} title={label}>{label}</span>;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Bulk upload</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Per rij een JSON en de afbeelding die erbij hoort. Sleep alles tegelijk hierheen: bestanden met dezelfde naam worden aan elkaar gekoppeld.
          </p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Sluiten"><X size={18} /></button>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
        onClick={() => pickAll.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
      >
        <Upload size={20} className="text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Sleep JSON-bestanden en afbeeldingen hierheen</p>
        <p className="text-xs text-muted-foreground">of klik om ze te kiezen. Meerdere tegelijk mag, ook een JSON met een lijst artikelen.</p>
        <input
          ref={pickAll}
          type="file"
          multiple
          accept=".json,application/json,image/*"
          className="hidden"
          onChange={(e) => { addFiles(Array.from(e.target.files || [])); e.target.value = ""; }}
        />
      </div>

      {rows.length > 0 && (
        <div className="divide-y divide-border rounded-xl border border-border">
          <div className="hidden md:grid grid-cols-[1fr_180px_200px_32px] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>JSON</span><span>Afbeelding</span><span>Status</span><span />
          </div>
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 md:grid-cols-[1fr_180px_200px_32px] gap-3 md:gap-4 px-4 py-3 items-center">
              <label className="flex min-w-0 cursor-pointer items-start gap-3">
                <FileJson size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">{r.data?.title || r.jsonName}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {r.data ? `${r.data.category || categories[0]} · /kenniscentrum/${slugOf(r.data)}` : "Wordt niet geplaatst"}
                  </span>
                </span>
                <input type="file" accept=".json,application/json" className="hidden" disabled={running} onChange={(e) => setRowJson(r.id, e.target.files?.[0])} />
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                {r.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.preview} alt="" className="h-12 w-20 rounded-md object-cover border border-border" />
                ) : (
                  <span className="flex h-12 w-20 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground"><ImageIcon size={16} /></span>
                )}
                <span className="truncate text-xs text-muted-foreground">{r.image ? r.image.name : "Kies afbeelding"}</span>
                <input type="file" accept="image/*" className="hidden" disabled={running} onChange={(e) => setRowImage(r.id, e.target.files?.[0])} />
              </label>
              <div className="min-w-0">{badge(r)}</div>
              <button onClick={() => removeRow(r.id)} disabled={running} className="text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Rij verwijderen"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch checked={publish} onCheckedChange={setPublish} disabled={running} />
          {publish ? "Direct publiceren" : "Opslaan als concept"}
        </label>
        <div className="flex items-center gap-3">
          {missingImage > 0 && <span className="text-xs text-amber-700">{missingImage} zonder afbeelding</span>}
          {rows.length > 0 && !running && (
            <button onClick={() => setRows([])} className="text-sm text-muted-foreground hover:text-foreground">Leegmaken</button>
          )}
          <button
            onClick={uploadAll}
            disabled={running || ready.length === 0}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {running ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {running ? "Bezig met uploaden..." : `Upload ${ready.length} ${ready.length === 1 ? "artikel" : "artikelen"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
