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
        destination: "/id/insights",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/signals",
        destination: "/:locale/insights",
        permanent: true,
      },
      {
        source: "/start",
        destination: "/id/start-a-project",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/start",
        destination: "/:locale/start-a-project",
        permanent: true,
      },
      {
        source: "/biaya-pembuatan-software-kustom",
        destination: "/id/start-a-project",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/biaya-pembuatan-software-kustom",
        destination: "/:locale/start-a-project",
        permanent: true,
      },
      {
        source: "/hubungi-kami",
        destination: "/id/start-a-project",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/hubungi-kami",
        destination: "/:locale/start-a-project",
        permanent: true,
      },
      {
        source: "/jasa-pembuatan-software-bisnis",
        destination: "/id/projects",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/jasa-pembuatan-software-bisnis",
        destination: "/:locale/projects",
        permanent: true,
      },
    ];
  }
};

export default withNextIntl(nextConfig);
