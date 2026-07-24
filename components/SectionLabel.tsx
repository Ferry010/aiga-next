// Eyebrow section labels were removed site-wide (uppercase kickers like
// "WAAROM NU" read as generic/AI-templated). Kept as a no-op so every
// existing `<SectionLabel />` call site stays valid without edits.
interface SectionLabelProps {
  text: string;
}

const SectionLabel = (_props: SectionLabelProps) => null;

export default SectionLabel;
