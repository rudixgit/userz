import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

import { defineConfig } from 'astro/config'

export default defineConfig({
  output: "hybrid",
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false }
    })
  ],
  compressHTML: true,
  adapter: cloudflare({ mode: 'advanced' }),
  experimental: {
    inlineStylesheets: "never",
    hybridOutput: true,
    middleware: true
  },
  vite: {
    build: {
      minify: false
    }
  }
})
