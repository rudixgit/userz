


import db from '@/data/client';
import Head from 'next/head';


type News = {
	title: string;
	image: string;
	nid: string;
	id: string;
	key: string;
	description?: string;
	date?: string;
	html: { type: string; content: string }[]
	content: string;
};

export type RootNewsProps = {
	newsbg: News[];
	newsbg_by_pk?: News;

};

const Index = ({ newsbg }: RootNewsProps): JSX.Element => {
	return (
		<div className='container mx-auto'>
			<Head>
				<title>arpecop.win - Modern Bulgaria chronicles and analysis</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<p className='text-5xl'>arpecop.win</p>
			<p>Modern Bulgaria chronicles and analysis</p>
			<div className="my-10 flex w-full flex-col">
				{newsbg.map(({ title, key, id }) => (
					<article className="relative w-full grow cursor-pointer p-2" key={key}>
						<a href={`/i/${id}`}>
							<div className='float-left pr-4 pt-2'>
								<img src={`https://arpecop.win/api/news/${key}.png`} width={256} alt=""
									className="rounded-md"
								/>
							</div>
							<p className="px-2   text-lg font-light text-slate-300 dark:text-gray-800">
								{title}
							</p>
						</a>
					</article>
				))}
			</div>
		</div >
	);
};

export const getServerSideProps = async (context: { query: { page?: string } }) => {
	const pagenum = context.query.page ? Number(context.query.page) : 1;
	const agregate = await db.view("newsbg/agregate", {
		update: "lazy",
		reduce: true,
	});

	const data1 = await db.view("newsbg/newsen", {
		include_docs: true,
		reduce: false,
		limit: 30,
		skip: pagenum * 30 - 30,
		update: "lazy",
		descending: true,
	})

	const data = data1.rows.map((x: News) => {
		return ({
			...x,
			title: x.html.sort((a: { content: string }, b: { content: string }) => b.content.length - a.content.length)[0].content
		})
	})

	return {
		props: {
			newsbg: data,
			pagenum,
			items: Number(agregate.value),
		},
	};
};

export default Index;
