import { JSDOM } from "jsdom";
import fetch from 'node-fetch';
import { getUniqueStrings, scrapeArticle, scrheaders, updateview } from "./sanitize";

const go = async () => {
	const response = await fetch("https://www.buzzfeed.com", {
		method: "GET",
		headers: scrheaders,
	});
	const d = await response.text();
	const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
		.map((link: HTMLElement) => link.getAttribute("href"))
		.filter((href) => href !== null && href.includes('https') && href.split('-').length > 4 && href.length < 700) as string[];
	const links = getUniqueStrings(links1)
	console.log(links)
	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsENProcess")));
	await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "], "NewsEN")));
	await updateview()
	return links;
};
// scrapeArticle('https://www.buzzfeed.com/leylamohammed/kris-jenner-pursuit-of-fame-cost-the-kardashians?origin=x1x', ['xxx'], "TestEN").then(() => console.log('done'));

go().then((links) => console.log(links.length));


