/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "aigeletterdheid.academy" },
      { protocol: "https", hostname: "zomldsagozipnelyuhzy.supabase.co" },
    ],
  },
};

export default nextConfig;
