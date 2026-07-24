import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
