/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/ads/p/:page',
        destination: '/ads/?page=:page'
      },
      {
        source: '/ads/cat/:cat/p/:page',
        destination: '/ads/cat/:cat?page=:page'
      },
      {
        source: '/ads/cat/:cat/:subcat/p/:page',
        destination: '/ads/cat/:cat/:subcat/?page=:page'
      }
    ]
  },

  trailingSlash: false,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://eziktok.monext.pages.dev'
      : undefined,
}
module.exports = nextConfig

