import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'server',
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false }
    })
  ],
  adapter: cloudflare({ mode: 'advanced' }),
  vite: {
    build: {
      minify: false
    }
  },
  routes: [
    {
      path: '/api/data',
      cache: {
        edge: {
          maxAgeSeconds: 60 * 60 * 24, // cache for 1 day
          staleWhileRevalidateSeconds: 60 * 60, // serve stale content while revalidating for 1 hour
        },
      },
    },
  ],
})
