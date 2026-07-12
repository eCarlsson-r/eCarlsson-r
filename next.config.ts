import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  basePath: "",
  async redirects() {
    return [
      {
        source: "/signals",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/start",
        destination: "/start-a-project",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
