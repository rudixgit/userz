type ExtendedCloudflareFetchOptions = {
	cf?: {
		cacheTtl?: number;
		cacheEverything?: boolean;
		cacheKey?: string;
	},
	method?: string;
	headers?: HeadersInit;
	body?: BodyInit | null;
};
async function fetchWithCloudflare(url: string, options: ExtendedCloudflareFetchOptions): Promise<Response> {
	return fetch(url, options);
}
export default fetchWithCloudflare