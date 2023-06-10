import type { APIContext, APIRoute } from "astro";
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

function convertToFriendlierId(url: string): string {
	const friendlyId = url
		.replace(/[^\w\s]/gi, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.toLowerCase(); // Convert to lowercase

	return friendlyId;
}
export const get: APIRoute = async function get({ request }: APIContext) {
	const url = decodeURI(request.url).split('?url=')[1]
	const ttl = url ? Number(url.split('&cache=')[1]) : 5
	let response = await fetchWithCloudflare(url, {
		cf: {
			cacheTtl: ttl,
			cacheEverything: true,
			cacheKey: convertToFriendlierId(url),
		},
	});
	return new Response(response.body, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=" + ttl.toString()
		}
	});
}