/** @type {import('next').NextConfig} */

const nextConfig = {
  //output: "standalone",
  output: 'standalone',
  trailingSlash: false,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://kloun.monext.pages.dev'
      : undefined,
  images: {
    domains: ['static.dir.bg', 'nstatic.nova.bg', 'cache1.24chasa.bg', 'cache2.24chasa.bg', 'mm.netinfo.bg', 'www.mediapool.bg', 'kloun.pages.dev', 'www.segabg.com', 'img.dnevnik.bg', 'm.dnevnik.bg', 'www.24chasa.bg', 'kloun.monext.pages.dev']
  },
  async rewrites() {
    return [
      {
        source: '/ads.txt',
        destination: '/api/ads'
      },
      {
        source: '/api/news/:page.png',
        destination: '/api/news/?id=:page'
      },
      {
        source: '/news/:page',
        destination: '/news/?page=:page'
      },
      {
        source: '/img/:appid/:id.png',
        destination: '/api/facebook/:appid/svg/:id/img/'
      },
      {
        source: '/fb/result',
        destination: '/facebook/result'
      },
      {
        source: '/fb',
        destination: '/facebook/facebookindex'
      },
      {
        source: '/fb/:appid',
        destination: '/facebook/facebookindex?appid=:appid'
      },

      {
        source: '/fb/:appid/:id',
        destination: '/facebook/facebookindex?id=:id&appid=:appid'
      },
      {
        source: '/tw/',
        destination: '/twitter/twitter'
      },
      {
        source: '/tw',
        destination: '/twitter/twitter'
      },
      {
        source: '/tw/:page',
        destination: '/twitter/twitter?page=:page'
      },
      {
        source: '/tw/u/:id',
        destination: '/twitter/:id'
      },
      {
        source: '/tw/:page/:letter',
        destination: '/twitter/?page=:page&letter=:letter'
      },
      {
        source: '/cat/:cat/:page',
        destination: '/cat/:cat/?page=:page'
      },
      {
        source: '/business/:page',
        destination: '/business/?page=:page'
      },
      {
        source: '/movies/p/:page',
        destination: '/movies/?page=:page'
      }
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://googleads.g.doubleclick.net"
          },
          {
            key: 'X-Frame-Options',
            value:
              'ALLOW-FROM https://kloun.lol, http://localhost:3000, https://kloun.pages.dev, http://192.168.1.4:3000, https://googleads.g.doubleclick.net, https://www.googletagservices.com, https://www.google.com, https://www.googleadservices.com, https://www.google-analytics.com'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
// v 2
