import type { APIRoute } from 'astro';

import { createClient } from "@libsql/client/web";
export const prerender = false
export interface Env {
	LIBSQL_DB_URL?: string;
	LIBSQL_DB_AUTH_TOKEN?: string;
}
const url = 'libsql://measured-lord-tyger-arpecop.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODQ1MjEwNzYsImlkIjoiNmJiZmY4MDctZGVlMC0xMWVkLWFhNzYtNmU1NjU4ODkwYjFmIn0.HTKvSZ2XTgvchBw9YOgM2ZMDsihs0JMTpKTsnusOMQn05AJoUYge79DzKIrRpys61e1mAbXEHbXUtz3hd8VmDg';

export const get: APIRoute = async function get({ params }) {
	const id = params.id || ''
	const client = createClient({ url, authToken });
	const rs = await client.execute(`select * from keyz where key = '${id}'`);
	const resp = rs.rows[0] ? rs.rows[0] : { error: true }
	return new Response(JSON.stringify(resp), {
		status: rs.rows[0] ? 200 : 404,
		headers: {
			"Content-Type": "application/json"
		}
	});
}