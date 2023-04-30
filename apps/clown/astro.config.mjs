import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      config: { applyBaseStyles: false }
    })
  ]
})
