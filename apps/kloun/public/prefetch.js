const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const xd = [...Array(14111).keys()];

xd.map(async z => {
	const resp = await fetch('http://127.0.0.1:8788/news/' + (z + 1).toString() + '')
	console.log(z)
	return resp.text();
});

