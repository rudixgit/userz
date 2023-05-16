import type { APIRoute } from 'astro';

export const get: APIRoute = ({ request }) => {
	return new Response(JSON.stringify({
		path: new URL(request.url).pathname,
		date: new Date().toISOString()
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	});

}