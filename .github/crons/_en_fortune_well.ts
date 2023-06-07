import { JSDOM } from "jsdom";
import fetch from 'node-fetch';
import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";

const go = async () => {
	const response = await fetch("https://fortune.com/well/", {
		method: "GET",
		headers: scrheaders,
	});
	const d = await response.text();
	const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
		.map((link: HTMLElement) => link.getAttribute("href"))
		.filter((href) => href !== null && href.includes('/20') && href.split('-').length > 2).sort() as string[];
	const links = getUniqueStrings(links1)
	console.log(links)
	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsENProcess")));

	return links;
};

// scrapeArticle('https://www.buzzfeed.com/leylamohammed/kris-jenner-pursuit-of-fame-cost-the-kardashians?origin=x1x', ['xxx'], "TestEN").then(() => console.log('done'));

go().then((links) => console.log(links.length));


