/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ads/p/:page",
        destination: "/ads/?page=:page",
      },
      {
        source: "/ads/cat/:cat/p/:page",
        destination: "/ads/cat/:cat?page=:page",
      },
      {
        source: "/ads/cat/:cat/:subcat/p/:page",
        destination: "/ads/cat/:cat/:subcat/?page=:page",
      },
    ];
  },
  assetPrefix:
    process.env.LOGNAME === "arpecop"
      ? "http://localhost:3000"
      : "https://eziktok.monext.pages.dev",

}

module.exports = nextConfig
