'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Panel from "@/components/Panel";
import AskUs from "@/components/AskUs";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { trackLead, alertTeam } from "@/lib/track";

interface ArticleLink {
  title: string;
  slug: string | null;
}

const STATIC_ARTICLES: ArticleLink[] = [
  { title: "Hoe kies je de juiste AI-geletterdheid training? Een checklist voor 2026.", slug: "ai-geletterdheid-training-kiezen-checklist-2026" },
  { title: "Het Nederlandse AI-geletterdheid training landschap: 6 categorieën, en wat ze waard zijn", slug: "ai-geletterdheid-training-landschap-nederland" },
];

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const principles = [
  { title: "Praktijk boven theorie", body: "Elke les gaat over situaties die je mensen echt tegenkomen. Geen college over algoritmes." },
  { title: "Mensen boven techniek", body: "Geen code en geen jargon. Het gaat om begrijpen wat je doet en weten wanneer je moet stoppen." },
  { title: "Gedrag boven papier", body: "Een certificaat is mooi meegenomen. Het doel is dat je mensen morgen anders werken." },
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

    trackLead("lead_contact");
    alertTeam({
      type: "contact",
      naam: form.naam,
      email: form.email,
      telefoon: form.telefoon,
      organisatie: form.organisatie,
      extra: [form.hulp && `Interesse: ${form.hulp}`, form.opmerkingen].filter(Boolean).join(" · "),
      source: "Over AIGA",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-[15px] focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300";

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Over AIGA" }]} />

      {/* Hero */}
      <section className="pt-6 pb-14 sm:pt-10 sm:pb-20">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              AI ging sneller dan de begeleiding.
              <span className="neon-text block mt-2">Daarom bestaat AIGA.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Je mensen gebruiken AI al, elke dag. Alleen heeft niemand ze ooit uitgelegd wat er wel en niet in mag.
              Dat is geen onwil, dat is een gat. Wij dichten het.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/training" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Bekijk de teamtraining
              </Link>
              <a href="#contact" className="text-[15px] font-semibold text-primary hover:underline">
                Of praat eerst met ons
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <img
              src="/assets/ferry-session.jpg"
              alt="Ferry Hoes tijdens een sessie met een groep deelnemers"
              width={1500}
              height={997}
              className="w-full aspect-[1500/997] object-cover rounded-[1.75rem]"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <Panel tone="tint">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16">
            <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
              Waarom wij dit doen.
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sinds 2017 staat Ferry Hoes voor zalen vol mensen die met AI werken. Overal zien we hetzelfde: de
                tools zijn er sneller dan de afspraken. Iemand plakt een klantmail, een offerte of een contract in een
                chatbot om sneller klaar te zijn. Goed bedoeld. Alleen weet niemand waar die data daarna blijft.
              </p>
              <p>
                Verbieden werkt niet: dan gebeurt het gewoon buiten beeld. Een dik beleidsstuk ook niet: dat leest
                niemand. Wat wel werkt, is mensen in hun eigen werk laten zien waar de grens ligt. Dan herkennen ze het
                zelf, ook als er niemand meekijkt.
              </p>
              <p className="text-foreground">
                Daarom bouwden we AIGA. Een training die je mensen niet bang maakt voor AI, maar er beter in maakt.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Panel>

      {/* Principles */}
      <section className="py-16 sm:py-24">
        <div className={container}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight max-w-2xl">
              Waar je ons aan kunt houden.
            </h2>
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {principles.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.05}>
                <div className="border-t-2 border-primary pt-5">
                  <h3 className="text-xl font-display font-bold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ferry */}
      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-8 md:gap-14 items-center">
              <img
                src="/assets/ferry-stage.jpg"
                alt="Ferry Hoes op het podium voor een publiek"
                width={959}
                height={904}
                loading="lazy"
                className="w-full aspect-[959/904] object-cover rounded-[1.75rem]"
              />
              <div>
                <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
                  Gebouwd en gegeven door Ferry Hoes.
                </h2>
                <div className="mt-5 space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Ferry is een veelgevraagd AI-spreker en mede-oprichter van Brand Humanizing. Sinds 2017 helpt hij
                    organisaties met verantwoord AI-gebruik, van a.s.r. en VodafoneZiggo tot verschillende Ministeries,
                    zorginstellingen, onderwijs en MKB.
                  </p>
                  <p>
                    Hij staat meerdere keren per maand op het podium en ziet daar wat er op de werkvloer echt met AI
                    gebeurt. Precies dat zit in de training. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de
                    Nederlandse overheid.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/ferryhoes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-[15px] font-semibold text-primary hover:underline"
                >
                  Ferry op LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles */}
      {allArticles.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className={container}>
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
                  Liever eerst lezen?
                </h2>
                <div>
                  <ul className="border-b border-border">
                    {allArticles.filter((a) => a.slug).map((a) => (
                      <li key={a.slug} className="border-t border-border py-4">
                        <Link href={`/kenniscentrum/${a.slug}`} className="text-lg text-foreground hover:text-primary leading-snug" rel="author">
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/kenniscentrum" className="mt-5 inline-block text-[15px] font-semibold text-primary hover:underline">
                    Alle artikelen in het kenniscentrum
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Contact */}
      <div className="pb-10">
        <Panel tone="tint" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight">
                Je team gebruikt AI al. Laten we zorgen dat het veilig gebeurt.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Laat je gegevens achter. Binnen één werkdag nemen we contact met je op. Geen verplichtingen.
              </p>
              <AskUs className="mt-8" />
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                {submitted ? (
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Gelukt. We nemen snel contact op.</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      Binnen één werkdag hoor je van een van ons. Robbert, Tom of Ferry: wie het wordt, hangt af van
                      wie het eerst zijn koffie op heeft.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: "naam", label: "Naam", required: true, auto: "name" },
                        { name: "organisatie", label: "Organisatie", required: true, auto: "organization" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label htmlFor={`over-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                          <input
                            id={`over-${f.name}`}
                            name={f.name}
                            required={f.required}
                            autoComplete={f.auto}
                            value={form[f.name as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      ))}
                    </div>
                    {[
                      { name: "email", label: "E-mailadres", required: true, type: "email", auto: "email" },
                      { name: "telefoon", label: "Telefoonnummer (optioneel)", required: false, type: "tel", auto: "tel" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label htmlFor={`over-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                        <input
                          id={`over-${f.name}`}
                          name={f.name}
                          type={f.type}
                          required={f.required}
                          autoComplete={f.auto}
                          value={form[f.name as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="over-hulp" className="text-sm text-muted-foreground mb-1 block">Waar gaat het over?</label>
                      <select
                        id="over-hulp"
                        name="hulp"
                        required
                        value={form.hulp}
                        onChange={(e) => setForm({ ...form, hulp: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Kies een optie</option>
                        <option value="training">De teamtraining</option>
                        <option value="masterclass">De masterclass</option>
                        <option value="beide">Allebei</option>
                        <option value="anders">Iets anders</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="over-opmerkingen" className="text-sm text-muted-foreground mb-1 block">Je vraag (optioneel)</label>
                      <textarea
                        id="over-opmerkingen"
                        name="opmerkingen"
                        value={form.opmerkingen}
                        onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-lg disabled:opacity-50">
                      {submitting ? "Even versturen..." : "Stuur je vraag"}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </Panel>
      </div>
    </div>
  );
}
