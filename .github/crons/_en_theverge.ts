import { JSDOM } from "jsdom";
import fetch from 'node-fetch';
import { getUniqueStrings, scrapeArticle, scrheaders, updateview } from "./sanitize";

const go = async () => {
	const response = await fetch("https://www.theverge.com", {
		method: "GET",
		headers: scrheaders,
	});
	const d = await response.text();
	const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
		.map((link: HTMLElement) => link.getAttribute("href"))
		.filter((href) => href !== null && href.includes('/20') && !href.includes('http') && href.split('-').length > 4 && href.length < 700).map(x => `https://www.theverge.com${x}`) as string[];
	const links = getUniqueStrings(links1)
	console.log(links)
	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsENProcess")));

	await updateview()
	return links;
};
//scrapeArticle('https://www.theverge.com/2023/5/31/23743515/google-chromecast-support-ending-2013', ['xxx'], "TestEN").then(() => console.log('done'));

go().then((links) => console.log(links.length));


