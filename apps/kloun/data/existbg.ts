function fetchData(urls: string[]) {
	const promises = urls.map(async (item) => {
		const url = `https://bucket.monext.pages.dev/words/${encodeURIComponent(item.substring(0, 4))}.json`;
		let res;
		try {
			const response = await fetch(url);
			const data = await response.json();
			res = data.includes(item) ? item : null

		} catch (err) {
			res = null;
		}
		return res;
	});


	return Promise.all(promises);
}
const existBg = async function(arr: string[]) {
	const data = await fetchData(arr) as string[]
	return data.filter(x => x)
}

export default existBg;