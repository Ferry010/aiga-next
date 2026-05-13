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
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aigeletterdheid.academy" }],
        destination: "https://aigeletterdheid.academy/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
