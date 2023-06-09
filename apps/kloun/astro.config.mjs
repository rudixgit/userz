import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: "hybrid",
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false }
    })
  ],
  adapter: cloudflare({ mode: 'advanced' }),

  server: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  vite: {
    build: {
      minify: false
    }
  }
})
