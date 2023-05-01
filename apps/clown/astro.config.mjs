import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
  integrations: [
    tailwind({
      config: { applyBaseStyles: false }
    })
  ]
})
