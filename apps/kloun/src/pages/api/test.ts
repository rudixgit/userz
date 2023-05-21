import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';

import { deflate, ungzip, gzip } from 'pako';
//import brotliPromise from 'brotli-wasm';

export const prerender = false
async function decompressBuffer(compressedBuffer) {
	// const brotli = await brotliPromise;
	// const textEncoder = new TextEncoder();
	// const textDecoder = new TextDecoder();

	//return decompressedBuffer;
}

export const get: APIRoute = async function get() {
	const response = await fetch('https://pub-5056f702d6ff4bff9eea569473af9f07.r2.dev/words.tar');
	const buffer = await response.arrayBuffer()
	const test = ungzip(Buffer.from(buffer), { to: 'string' }).split(' ')
	return new Response(test[100], {
		status: 200,
		headers: {
			"Content-Type": "text/plain"
		}
	});
}