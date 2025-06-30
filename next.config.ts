import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://api.dicebear.com/9.x/fun-emoji/svg?seed=**')],
  },
};

export default nextConfig;
