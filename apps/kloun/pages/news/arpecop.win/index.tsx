import Main from '@/components/Layouts/Main';
import Meta from '@/components/Layouts/Meta';

import Pagination from '@/components/Pagination';
import db from '@/data/client';
import { slugify } from '@/utils/formatter';
import Link from 'next/link';

export type News = {
	title: string;
	image: string;
	nid: string;
	id: string;
	key: string;
	description?: string;
	date?: string;
	parsed?: { html: { type: string; content: string }[]; description?: string };
	content: string;
};

export type RootNewsProps = {
	newsbg: News[];
	pagenum: number;
	newsbg_by_pk?: News;
	items: number;
};

const Index = ({ newsbg, pagenum, items }: RootNewsProps): JSX.Element => {
	return (
		<div className='container mx-auto'>
			<p className='text-5xl'>arpecop.win</p>
			<p>Modern Bulgaria chronicles and analysis</p>
			<div className="my-10 flex w-full flex-col">
				<div className="flex flex-wrap">
					{newsbg.map(({ title, key }) => (

						<article className="relative flex w-full grow cursor-pointer p-2 md:w-1/2 lg:w-1/3" key={key}>
							<a
								href={`https://kloun.lol/news/i/${slugify(title)}/${key}/`}
								className="newswrap"
							>
								<div className="flex items-center">
									<h3 className="px-2 font-bold text-slate-300 dark:text-gray-800">
										{title}
									</h3>
								</div>

							</a>
						</article>
					))}
				</div>
			</div>
			<Pagination
				items={items}
				currentPage={pagenum}
				pageSize={30}
				prefix={`/`}
			/>
		</div>
	);
};

export const getServerSideProps = async (context: { query: { page?: string } }) => {
	const pagenum = context.query.page ? Number(context.query.page) : 1;
	const agregate = await db.view("newsbg/agregate", {
		update: "lazy",
		reduce: true,
	});

	const data = await db.view("newsbg/newsen", {
		reduce: false,
		limit: 30,
		skip: pagenum * 30 - 30,
		update: "lazy",
		descending: true,
	});
	console.log(data.rows[0])

	return {
		props: {
			newsbg: data.rows,
			pagenum,
			items: Number(agregate.value),
		},
	};
};

export default Index;
