import { JSDOM } from "jsdom";
import fetch from 'node-fetch';
import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";

const go = async () => {
	const response = await fetch("https://www.vice.com/en", {
		method: "GET",
		headers: scrheaders,
	});
	const d = await response.text();
	const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
		.map((link: HTMLElement) => link.getAttribute("href"))
		.filter((href) => href !== null && href.includes('/article/')).map(x => `https://www.vice.com${x}`) as string[];
	const links = getUniqueStrings(links1)
	console.log(links)
	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsENProcess")));
	return links;
};
//scrapeArticle('https://variety.com/2023/film/news/box-office-spider-man-across-the-spider-verse-the-bogeyman-little-mermaid-1235628447/?x=1dxddx1', ['xxx'], "TestEN").then(() => console.log('done'));

go().then((links) => console.log(links.length));


