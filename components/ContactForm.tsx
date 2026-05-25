'use client';
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface ContactFormProps {
  product?: "training" | "masterclass" | "";
}

const ContactForm = ({ product = "" }: ContactFormProps) => {
  const [form, setForm] = useState({
    naam: "",
    organisatie: "",
    functie: "",
    email: "",
    telefoon: "",
    hulp: product || "",
    aantal: "",
    opmerkingen: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        type: "training",
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

  if (submitted) {
    return (
      <div className="bg-card border border-neon-purple/30 rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt voor je bericht!</h3>
        <p className="text-muted-foreground">We nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { name: "naam", label: "Naam", required: true },
        { name: "organisatie", label: "Organisatie", required: true },
        { name: "functie", label: "Functie", required: false },
        { name: "email", label: "E-mailadres", required: true, type: "email" },
        { name: "telefoon", label: "Telefoonnummer", required: false, type: "tel" },
      ].map((f) => (
        <div key={f.name}>
          <label className="text-sm text-muted-foreground mb-1 block">
            {f.label} {f.required && <span className="text-neon-purple">*</span>}
          </label>
          <input
            type={f.type || "text"}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
          />
        </div>
      ))}
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">
          Waarmee kan ik je helpen? <span className="text-neon-purple">*</span>
        </label>
        <select
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
        <label className="text-sm text-muted-foreground mb-1 block">Aantal deelnemers</label>
        <input
          type="number"
          min="1"
          value={form.aantal}
          onChange={(e) => setForm({ ...form, aantal: e.target.value })}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
        />
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
        <textarea
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
  );
};

export default ContactForm;
