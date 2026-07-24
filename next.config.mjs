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
      // Retired campaign LP → outcome-led sales page
      {
        source: "/ai-act-training",
        destination: "/training",
        permanent: true,
      },
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
