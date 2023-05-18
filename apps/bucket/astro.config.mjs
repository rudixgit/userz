import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'

export default defineConfig({
	output: 'server',
	integrations: [],
	adapter: cloudflare({ mode: 'advanced' }),
	vite: {
		build: {
			minify: false
		}
	}
})
