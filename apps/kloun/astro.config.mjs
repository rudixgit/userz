import cloudflare from '@astrojs/cloudflare';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import { defineConfig } from 'astro/config';

export default defineConfig({
  output: "hybrid",
  integrations: [
    react(),
    prefetch({
      throttle: 15
    }),
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
