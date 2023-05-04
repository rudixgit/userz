const url = "http://db.kloun.lol/";
type Variables = { [key: string]: string | number | boolean };
const serialize = (obj: Variables) => {
	return Object.entries(obj)
		.map(
			([key, val]) =>
				`${key}=${key === "key" || key === "start_key" ? `"${val}"` : val}`
		)
		.join("&");
};
async function fetcher(query: { [key: string]: string | number | boolean }) {

	const { db, id, _view, _design, params, insert } = query;
	const body = JSON.stringify(query);
	const isPost = body?.includes("_id") || insert;
	const buildurl = `${url}${db ? db + "/" : "db/"}${_design ? `_design/${_design}/_view/${_view}?${params}` : ""
		}${id || ""}`;
	const response = await fetch(buildurl, {
		method: isPost ? "POST" : "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: isPost ? body : null,
	});
	const d = await response.json();
	return d;
}
async function get(id: string) {
	const d = await fetcher({ id, nocdn: "yes" });
	if (d.error) {
		return Promise.resolve({ error: "not found" });
	}
	d.id = d._id;
	return Promise.resolve(d);
}

async function view(id: string, params: Variables) {
	const split = id.split("/");
	const d = await fetcher({
		_design: split[0],
		_view: split[1],
		params: serialize(params),
	});
	const rows = d.rows.map((x: { key: string; id: string; value: Variables; doc: Variables }) => {
		const val = typeof x.value === "string" ? { value: x.value } : { ...x.value, ...x.doc };
		return { ...val, id: x.id, key: x.key, value: x.value };
	});
	if (rows.length === 1) {
		return Promise.resolve(rows[0]);
	}
	return Promise.resolve({ ...d, rows });
}
async function insert(obj: { [key: string]: string | number | boolean }) {
	const ins = await fetcher(obj);
	return Promise.resolve(ins);
}
async function multiple(db: string, obj: string[]) {
	const response = await fetch(url + "" + db + "/_all_docs", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ keys: obj }),
	});
	const d = await response.json();
	return Promise.resolve(d.rows);
}

const dbcouch = {
	view,
	get,
	insert,
	multiple,
};

export default dbcouch;
