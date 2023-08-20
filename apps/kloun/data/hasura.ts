const urlh = "http://hasura.arpecop.win/api/rest/";
export const viewh = (params: { view: string, limit: number, offset: number, start_key: string }) => {
	const res = fetch(`${urlh}${params.view}`, {
		method: 'POST',
		headers: {
			"Content-Type": "appication/json",
			"x-hasura-role": "public"
		},
		body: JSON.stringify({
			"limit": params.limit,
			"offset": params.offset,
			"start_key": params.start_key
		})
	})

		.then(response => response.json())
	return res
}


export const geth = (id: string) => {
	const res = fetch(`${urlh}${id}`, {
		method: 'GET',
		headers: {
			"Content-Type": "appication/json",
			"x-hasura-role": "public"
		}
	})

		.then(response => response.json())
	return res
}


export default {
	viewh,
	geth
};