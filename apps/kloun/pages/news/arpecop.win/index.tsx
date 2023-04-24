import Main from '@/components/Layouts/Main';
import Meta from '@/components/Layouts/Meta';
import NewsThumbnail from '@/components/NewsThumbnail';
import Pagination from '@/components/Pagination';
import db from '@/data/client';

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
		<Main adsense meta={<Meta title={"Новини"} description="Новини" />}>
			<div className="my-10 flex w-full flex-col">
				<div className="flex flex-wrap">
					{newsbg.map(({ id, title, date, key, image }) => (
						<NewsThumbnail uid={id} id={key} title={title} image={image} date={date} key={key} />
					))}
				</div>
			</div>
			<Pagination
				items={items}
				currentPage={pagenum}
				pageSize={30}
				prefix={`/`}
			/>
		</Main>
	);
};

export const getServerSideProps = async (context: { query: { page?: string } }) => {
	const pagenum = context.query.page ? Number(context.query.page) : 1;
	const agregate = await db.view("newsbg/agregate", {
		update: "lazy",
		reduce: true,
	});

	const data = await db.view("newsbg/news", {
		reduce: false,
		limit: 30,
		skip: pagenum * 30 - 30,
		update: "lazy",
		descending: true,
	});

	return {
		props: {
			newsbg: data.rows,
			pagenum,
			items: Number(agregate.value),
		},
	};
};

export default Index;
