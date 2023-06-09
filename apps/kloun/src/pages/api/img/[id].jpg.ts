import type { APIRoute } from 'astro';
import db from '../../../../data/client.js';

export const prerender = false

export const get: APIRoute = async function get({ params }) {
	const id = params.id || ''

	const datax = await db.view("newsbg/news", {
		limit: 1,
		key: id,
		update: false,
	});

	const response = await fetch(datax.image);
	const buffer = await response.arrayBuffer()
	return new Response(buffer, {
		status: 200,
		headers: {
			"Content-Type": "image/jpeg"
		}
	});
}