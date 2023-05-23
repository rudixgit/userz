import type { APIRoute, APIContext } from "astro";
export const prerender = false

interface CloudflareFetchOptions extends RequestInit {
	cf?: {
		cacheTtl?: number;
		cacheEverything?: boolean;
		cacheKey?: string;
	},
	cache?: string;
}
async function fetchWithCloudflare(url: string, options: CloudflareFetchOptions): Promise<Response> {
	return fetch(url, options);
}

function convertToFriendlierId(url: string): string {
	const friendlyId = url
		.replace(/[^\w\s]/gi, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.toLowerCase(); // Convert to lowercase

	return friendlyId;
}
export const get: APIRoute = async function get({ request }: APIContext) {
	const url = request.url.split('?url=')[1]
	const ttl = url ? Number(url.split('&cache=')[1]) : 5
	let response = await fetchWithCloudflare(url, {
		cf: {
			cacheTtl: ttl,
			cacheEverything: true,
			cacheKey: convertToFriendlierId(url),
		},
		cache: "default"
	});
	return new Response(response.body, {
		status: 200,
		headers: {
			Accept: 'application/json',
			'User-Agent': 'Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0',
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=" + ttl.toString()
		}
	});
}