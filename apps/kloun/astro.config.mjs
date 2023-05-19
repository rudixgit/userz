import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import prefetch from '@astrojs/prefetch';
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'server',
  integrations: [
    react(),
    prefetch(),
    tailwind({
      config: { applyBaseStyles: false }
    })
  ],
  adapter: cloudflare({ mode: 'advanced' }),
  vite: {
    build: {
      minify: false
    }
  }
})
