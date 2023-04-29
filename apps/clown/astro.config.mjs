import cloudflare from '@astrojs/cloudflare'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
  integrations: [
    image(),
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      config: { applyBaseStyles: false }
    })
  ]
})
