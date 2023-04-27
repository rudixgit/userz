import db from "@/data/client";
import { slugify } from "@/utils/formatter";
import { GetServerSideProps } from "next/types";
import { News } from "./news";



function generateSiteMap(posts: News[]) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	 ${posts
			.map(({ id, title }) => {
				return `
	   <url>
		   <loc>${`https://kloun.lol/news/i/${slugify(title)}/${id}`}</loc>
	   </url>
	 `;
			})
			.join('')}
   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {

	// We make an API call to gather the URLs for our site

	const posts = await db.view("newsbg/news", {
		reduce: false,
		limit: 3000,
		update: "lazy",
		descending: true,
	});

	// We generate the XML sitemap with the posts data
	const sitemap = generateSiteMap(posts.rows);

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}
export const runtime = "experimental-edge";
export default SiteMap;