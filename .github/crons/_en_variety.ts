import { JSDOM } from "jsdom";

import { scrapeArticle, scrheaders, unique, updateview } from "./sanitize";

const go = async () => {
	const response = await fetch("https://variety.com", {
		method: "GET",
		headers: scrheaders,
	});
	const d = await response.text();
	const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
		.map((link: HTMLElement) => link.getAttribute("href"))
		.filter((href) => href !== null && href.includes('news/')) as string[];
	const links = links1.filter(unique);


	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsEN")));
	await updateview()
	return links;
};
scrapeArticle('https://variety.com/2023/film/news/box-office-spider-man-across-the-spider-verse-the-bogeyman-little-mermaid-1235628447/', ['']).then(() => console.log('done'));

//go().then((links) => console.log(links.length));


