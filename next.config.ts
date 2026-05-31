import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> `out/` directory, deployed as-is to Cloudflare Pages.
  output: "export",

  // Cloudflare Pages serves directories; trailing slashes emit `/about/index.html`
  // so deep links resolve without server rewrites.
  trailingSlash: true,

  // The Image Optimization API needs a server; a static export has none.
  images: { unoptimized: true },

  reactStrictMode: true,
};

export default nextConfig;
