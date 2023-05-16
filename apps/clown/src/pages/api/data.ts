import type { APIRoute } from 'astro';
const cacheControl = 'public, max-age=3600';
export const get: APIRoute = ({ request }) => {
	return new Response(JSON.stringify({
		path: new URL(request.url).pathname,
		date: new Date().toISOString()
	}), {
		status: 200,
		headers: {
			'Cache-Control': cacheControl,
			"Content-Type": "application/json"
		}
	});

}