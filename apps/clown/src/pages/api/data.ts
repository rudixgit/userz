import type { APIRoute } from 'astro';
const cacheControl = 'public, max-age=3600';
const expires = new Date(Date.now() + 3600 * 1000).toUTCString(); // cache for 1 hour
export const get: APIRoute = ({ request }) => {
	return new Response(JSON.stringify({
		path: new URL(request.url).pathname,
		date: new Date().toISOString()
	}), {
		status: 200,
		headers: {
			'Cache-Control': cacheControl,
			'Expires': expires,
			"Content-Type": "application/json"
		}
	});

} 