/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "aigeletterdheid.academy" },
      { protocol: "https", hostname: "zomldsagozipnelyuhzy.supabase.co" },
    ],
  },
  async redirects() {
    return [
      // www → apex
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aigeletterdheid.academy" }],
        destination: "https://aigeletterdheid.academy/:path*",
        permanent: true,
      },
      // Campaign short links to the free AI-risicocheck (temporary, so they can change later).
      // /check without UTMs gets the campaign defaults; with UTMs they pass through as given.
      // /check/<event> is for QR codes on stage: utm_content names the event.
      {
        source: "/check",
        missing: [{ type: "query", key: "utm_source" }],
        destination: "/gereedheidscan?utm_source=shortlink&utm_medium=direct&utm_campaign=weetjijwelke",
        permanent: false,
      },
      { source: "/check", destination: "/gereedheidscan", permanent: false },
      {
        source: "/check/:event",
        destination: "/gereedheidscan?utm_source=keynote&utm_medium=qr&utm_campaign=weetjijwelke&utm_content=:event",
        permanent: false,
      },
      // Retired campaign LP → outcome-led sales page
      {
        source: "/ai-act-training",
        destination: "/training",
        permanent: true,
      },
      // Retired AI Act tools (fines calculator, risk classifier, compliance
      // downloads, use-case checker) → the free AI-risicocheck
      { source: "/tools", destination: "/gereedheidscan", permanent: true },
      { source: "/tools/:path*", destination: "/gereedheidscan", permanent: true },
      { source: "/ai-use-case-checker", destination: "/gereedheidscan", permanent: true },
      // Broken kenniscentrum slugs → corrected canonical slugs
      {
        source: "/kenniscentrum/drie-soorten-collega-s-e-n-wordt-onvervangbaar-welke-ben-jij",
        destination: "/kenniscentrum/drie-soorten-collegas-een-wordt-onvervangbaar-welke-ben-jij",
        permanent: true,
      },
      {
        source: "/kenniscentrum/ai-geletterdheid-verplicht-wat-hr-nu-moet-regelen-v-r-augustus-2026",
        destination: "/kenniscentrum/ai-geletterdheid-verplicht-wat-hr-nu-moet-regelen-voor-augustus-2026",
        permanent: true,
      },
      {
        source: "/kenniscentrum/ai-act-per-sector-financi-le-dienstverlening",
        destination: "/kenniscentrum/ai-act-per-sector-financiele-dienstverlening",
        permanent: true,
      },
      {
        source: "/kenniscentrum/ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga",
        destination: "/kenniscentrum/ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
