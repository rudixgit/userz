interface CloudflareAPI {
	apiKey: string;
	email: string;
	accountId: string;
}
interface APIResponse<T> {
	success: boolean;
	result?: T;
	errors?: { message: string }[];
}


export async function getkv(api: CloudflareAPI, key: string, namespaceId: string): Promise<string> {
	const url = `https://api.cloudflare.com/client/v4/storage/kv/namespaces/${namespaceId}/values/${key}`;
	const response = await fetch(url, {
		headers: {
			'X-Auth-Email': api.email,
			'X-Auth-Key': api.apiKey,
			'Content-Type': 'application/json'
		}
	});
	const json = await response.json() as APIResponse<string>;
	if (json.success) {
		return json.result!;
	} else {
		throw new Error(`Failed to get value for key '${key}'`);
	}
}

export async function putkv(api: CloudflareAPI, key: string, value: string, namespaceId: string): Promise<void> {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Email': api.email,
			'X-Auth-Key': api.apiKey
		},
		body: JSON.stringify({ value })
	};

	const url = `https://api.cloudflare.com/client/v4/accounts/${api.accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`;

	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(`Failed to update value for key ${key}: ${response.statusText}`);
	}
}