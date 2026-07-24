'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface ArticleLink {
  title: string;
  slug: string | null;
}

const STATIC_ARTICLES: ArticleLink[] = [
  { title: "Hoe kies je de juiste AI-geletterdheid training? Een checklist voor 2026.", slug: "ai-geletterdheid-training-kiezen-checklist-2026" },
  { title: "Het Nederlandse AI-geletterdheid training landschap: 6 categorieën, en wat ze waard zijn", slug: "ai-geletterdheid-training-landschap-nederland" },
];

export default function OverAigaClient() {
  const [articles, setArticles] = useState<ArticleLink[]>([]);
  const [form, setForm] = useState({ naam: "", organisatie: "", functie: "", email: "", telefoon: "", hulp: "", aantal: "", opmerkingen: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("articles")
      .select("title, slug")
      .eq("published", true)
      .order("updated_at", { ascending: false })
      .then(({ data }) => setArticles((data as ArticleLink[]) || []));
  }, []);

  const allArticles = [
    ...STATIC_ARTICLES,
    ...(articles.filter(a => a.slug && !STATIC_ARTICLES.some(s => s.slug === a.slug))),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("contact_submissions").insert({
      naam: form.naam,
      organisatie: form.organisatie,
      functie: form.functie || null,
      email: form.email,
      telefoon: form.telefoon || null,
      hulp: form.hulp,
      aantal: form.aantal || null,
      opmerkingen: form.opmerkingen || null,
    });

    if (error) {
      setSubmitting(false);
      toast.error("Er ging iets mis bij het versturen. Probeer het opnieuw.");
      return;
    }

    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "contact",
        naam: form.naam,
        organisatie: form.organisatie,
        email: form.email,
        telefoon: form.telefoon || null,
        extra: `Hulp: ${form.hulp}${form.aantal ? ` · Aantal: ${form.aantal}` : ""}`,
      },
    }).catch(console.error);

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Bericht verstuurd! We nemen snel contact met je op.");
  };

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Over AIGA" }]} />

      {/* Hero */}
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="OVER AIGA" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight mt-4">
              AI-geletterdheid is geen buzzword.<br />
              <span className="text-primary">Het is de basis.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              AIGA is opgericht met een duidelijk doel: organisaties helpen om serieus, verantwoord en strategisch met AI om te gaan.
            </p>
            <a href="#contact" className="btn-neon inline-block mt-8 px-7 py-3 rounded-lg text-sm font-semibold">
              Neem contact op
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Ons verhaal */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ONS VERHAAL" />
            <h2 className="text-3xl font-display font-semibold text-foreground mt-2">Waarom wij dit doen.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>De EU AI Act is niet het beginpunt. Al jaren zien wij dat organisaties AI inzetten zonder dat medewerkers begrijpen wat dat betekent. Kansen worden gemist. Risico's worden genegeerd. En wanneer er iets fout gaat, is niemand verantwoordelijk.</p>
              <p>AIGA is de reactie op dat probleem. Een praktische, inhoudelijke training die medewerkers op elk niveau geeft wat ze nodig hebben. Niet meer, niet minder.</p>
              <p>Wij geloven dat AI pas echt waarde toevoegt als mensen begrijpen wat het is, wat het kan en wat de grenzen zijn.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="CONTACT" />
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Klaar om jouw team te certificeren?<br />
              <span className="neon-text">Laten we praten.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Vul het formulier in en we nemen contact met je op met een offerte op maat. Geen verplichtingen.
            </p>
          </AnimatedSection>

          <div className="mt-12">
            <AnimatedSection delay={0.1}>
              {submitted ? (
                <div className="bg-background border border-neon-purple/30 rounded-2xl p-10 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt voor je bericht!</h3>
                  <p className="text-muted-foreground">We nemen zo snel mogelijk contact met je op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "naam", label: "Naam", required: true },
                    { name: "organisatie", label: "Organisatie", required: true },
                    { name: "functie", label: "Functie", required: false },
                    { name: "email", label: "E-mailadres", required: true, type: "email" },
                    { name: "telefoon", label: "Telefoonnummer", required: false, type: "tel" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`over-${f.name}`} className="text-sm text-muted-foreground mb-1 block">
                        {f.label} {f.required && <span className="text-neon-purple">*</span>}
                      </label>
                      <input
                        id={`over-${f.name}`}
                        name={f.name}
                        type={f.type || "text"}
                        required={f.required}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="over-hulp" className="text-sm text-muted-foreground mb-1 block">
                      Waarmee kan ik je helpen? <span className="text-neon-purple">*</span>
                    </label>
                    <select
                      id="over-hulp"
                      name="hulp"
                      required
                      value={form.hulp}
                      onChange={(e) => setForm({ ...form, hulp: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                    >
                      <option value="">Selecteer...</option>
                      <option value="training">Online Training</option>
                      <option value="masterclass">Masterclass</option>
                      <option value="beide">Beide</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="over-aantal" className="text-sm text-muted-foreground mb-1 block">Aantal seats</label>
                    <select
                      id="over-aantal"
                      name="aantal"
                      value={form.aantal}
                      onChange={(e) => setForm({ ...form, aantal: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                    >
                      <option value="">Selecteer...</option>
                      <option value="1">1</option>
                      <option value="2-49">2-49</option>
                      <option value="50-99">50-99</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="over-opmerkingen" className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
                    <textarea
                      id="over-opmerkingen"
                      name="opmerkingen"
                      value={form.opmerkingen}
                      onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
                      rows={4}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg disabled:opacity-50">
                    {submitting ? "Bezig met versturen..." : "Verstuur bericht"}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Oprichter */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="OPRICHTER & TRAINER" />
            <div className="flex flex-col sm:flex-row gap-8 mt-8">
              <div className="shrink-0">
                <img
                  src="/assets/ferry-hoes.gif"
                  alt="Ferry Hoes, AI-expert en keynote spreker"
                  className="w-48 h-48 rounded-2xl object-cover"
                  loading="lazy"
                  width={192}
                  height={192}
                />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Ferry Hoes</h2>
                <p className="text-sm text-primary font-medium mt-1">AI-expert, Keynote Spreker & Mede-oprichter AIGA</p>
                <a href="https://www.linkedin.com/in/ferryhoes" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-block mt-2">
                  Bekijk LinkedIn-profiel →
                </a>
              </div>
            </div>
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>Ferry Hoes is een van de meest gevraagde sprekers en trainers op het gebied van kunstmatige intelligentie in Nederland. Als AI-expert en mede-oprichter van Brand Humanizing combineert hij diepgaande technische kennis met een uniek vermogen om complexe onderwerpen begrijpelijk te maken voor elk publiek.</p>
              <p>Ferry staat meermaals per maand op het podium voor toonaangevende organisaties in heel Nederland. Zijn klanten omvatten a.s.r. Verzekeringen, VodafoneZiggo, meerdere Nederlandse ministeries, zorginstellingen, onderwijsorganisaties en MKB-bedrijven.</p>
              <p>In 2020 won Ferry de prestigieuze Anti-Discriminatie AI-Hackathon, georganiseerd door de Nederlandse overheid.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Drie principes */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT ONS ONDERSCHEIDT" />
            <h2 className="text-3xl font-display font-semibold text-foreground mt-2">
              Drie principes.<br /><span className="text-primary">Een richting.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Praktisch boven theoretisch", body: "Elke les is gekoppeld aan situaties die medewerkers echt tegenkomen op de werkvloer." },
              { title: "Menselijk boven technisch", body: "AI-geletterdheid gaat niet over code. Het gaat over begrip, verantwoordelijkheid en vertrouwen." },
              { title: "Toepasbaar boven compliant", body: "We helpen organisaties niet alleen aan een certificaat. We helpen ze een cultuur bouwen waarin AI slim en verantwoord wordt ingezet." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-background border border-border rounded-2xl p-10 hover:border-neon-purple/40 neon-glow transition-all duration-300 h-full neon-card-top">
                  <p className="text-lg font-semibold text-foreground mb-3">{c.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Kenniscentrum articles */}
      {allArticles.length > 0 && (
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionLabel text="GEPUBLICEERD DOOR FERRY HOES" />
              <h2 className="text-2xl font-display font-semibold text-foreground mt-2 mb-6">
                Artikelen in het Kenniscentrum
              </h2>
              <ul className="space-y-3">
                {allArticles.filter(a => a.slug).map((a) => (
                  <li key={a.slug} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <Link href={`/kenniscentrum/${a.slug}`} className="text-sm text-primary hover:underline leading-snug" rel="author">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/kenniscentrum" className="text-sm font-semibold text-primary hover:underline">
                  Bekijk alle artikelen →
                </Link>
                <a href="#contact" className="btn-neon-outline px-6 py-2.5 rounded-lg text-sm font-semibold">
                  Neem contact op ↑
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
