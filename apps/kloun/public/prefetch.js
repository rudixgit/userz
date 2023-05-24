const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const xd = [...Array(835).keys()];

xd.map(async z => {
	const resp = await fetch('http://localhost:3000/cat/razni/' + (z + 1).toString() + '/')
	console.log(z)
	return resp.text();
});

