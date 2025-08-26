import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "44372", 
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
