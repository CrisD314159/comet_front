import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'api.dicebear.com'],
    dangerouslyAllowSVG:true
  },
};

export default nextConfig;
