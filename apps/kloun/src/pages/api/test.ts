import type { APIRoute } from "astro";
export const prerender = false


export const get: APIRoute = async function get() {
	const someCustomKey = `https://baconipsum.com/api/?type=meat-and-filler`;
	let response = await fetch(someCustomKey, {
		cf: {
			cacheTtl: 15,
			cacheEverything: true,
			cacheKey: someCustomKey,
		},
	});
	// Reconstruct the Response object to make its headers mutable.

	return new Response(response.body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain"
		}
	});
	// Set cache control headers to cache on browser for 25 minutes
	//response.headers.set("Cache-Control", "max-age=1500");

}