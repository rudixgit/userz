import type { APIRoute } from "astro";
export const prerender = false

interface CloudflareFetchOptions extends RequestInit {
	cf?: {
		cacheTtl?: number;
		cacheEverything?: boolean;
		cacheKey?: string;
	};
}
async function fetchWithCloudflare(url: string, options: CloudflareFetchOptions): Promise<Response> {
	return fetch(url, options);
}


export const get: APIRoute = async function get() {
	const someCustomKey = `https://baconipsum.com/api/?type=meat-and-filler`;
	let response = await fetchWithCloudflare(someCustomKey, {
		cf: {
			cacheTtl: 5,
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