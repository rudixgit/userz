import type { APIRoute } from 'astro';

export const get: APIRoute = ({ request }) => {
	return {
		body: JSON.stringify({
			path: new URL(request.url).pathname,
			date: new Date().toISOString()
		})
	};
}