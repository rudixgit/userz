import type { GetServerSideProps } from "next";
import type { News } from "@/pages/news/";

import db from '@/data/client';
import { shuffle } from "lodash";
import Head from "next/head";
import { slugify } from "@/utils/formatter";

const NewsItem = ({
	title,
	newsbg_by_pk: { parsed },
	bg_version
}: {
	title: string;
	newsbg_by_pk: News;
	slug: string;
	bg_version: {
		title: string;
		id: string;
	}
}): JSX.Element => (
	<>
		<Head>
			<title>{title.substring(0, 55)}</title>
		</Head>


		<article className="leading-relaxed container mx-auto" id="article">
			{parsed?.html.map(({ type, content }, i: number) =>
				type === "p" ? (
					<p key={i}>{content}</p>
				) : (
					<img src={content} key={i} />
				)
			)}
			<strong className="text-lg"><a href={`https://kloun.lol/news/i/${slugify(bg_version.title)}}/${bg_version.id}`}>{bg_version.title}</a></strong>
		</article>


	</>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { enewsid } = query;
	const data = await db.get(enewsid as string);
	const content = data?.content
		? JSON.parse(data?.content).html.map((x: string) => ({
			type: "p",
			content: x,
		}))
		: (data?.html as { type: string; content: string }[]);

	const bg_version = await db.view("newsbg/news", {
		limit: 1,
		update: "false",
		descending: true,
		key: data.nid,
	})

	const props = {
		title: shuffle(content)[0].content,
		bg_version,
		newsbg_by_pk: {
			...data,
			parsed: {
				html: content,
			},
		},
	};
	return {
		props,
	};
};

export default NewsItem;
export const runtime = "experimental-edge";
//export const runtime = "experimental-edge";d
