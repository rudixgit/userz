import React, { useEffect, useState } from 'react';

const ProgramReact = () => {
	const [filterstring, setFiterString] = useState<string | null>(null);
	const [url, setUrl] = useState<string>('https://db.kloun.lol/db/_design/newsbg/_view/news?descending=true&limit=100&include_docs=true');
	const [items, setItems] = useState<any[]>([]);

	useEffect(() => {
		console.log('test')
	}, []);
	useEffect(() => {
		fetchMyAPI(url || '');
	}, [url]);
	async function fetchMyAPI(url: string) {
		const res2 = await fetch(url);
		console.log(res2)
		const response = await res2.json();
		setItems(response.rows)
	}

	async function deleter(_id: string, _rev: string) {
		console.log('https://secede.kloun.lol/db/')

		const response = await fetch('https://secede.kloun.lol/db/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id, _rev, del: true }),
		});
		const d = await response.json();
		console.log(d)
	}


	if (!items[0]) {
		return <input type={'text'} className="rounded-md bg border-2 border-white p-1 font-bold text-lg w-full" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} value={url} />;
	}

	return (
		<div>
			<input type={'text'} className="rounded-md bg border-2 border-white p-1 font-bold text-lg w-full" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} value={url} />
			<input type={'text'} className="rounded-md bg border-2 border-white p-1 font-bold text-sm w-1/3" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiterString(e.target.value)} value={filterstring || ''} />
			{items.map(item => {
				const x = JSON.stringify(item.doc ? item.doc : item, null, 2).split('\n')
				return (<div className={filterstring ? "text-xs my-2 p-1 border flex" : "text-xs my-2 p-1 border"}>{x.map(line => {
					if (filterstring && filterstring.length > 2) {
						return line.includes(filterstring) ? (<div key={line}>{line}</div>) : null
					}
					return (<div>{line}</div>)
				})}
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="pointer" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" onClick={() => deleter(item.doc._id, item.doc._rev)} /></svg>
				</div>)
			})}

		</div>
	);
};
export default ProgramReact;
