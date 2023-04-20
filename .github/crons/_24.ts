

import { JSDOM } from "jsdom";

import { scrapeArticle, scrheaders, unique, updateview } from "./sanitize";

const go = async () => {
  const response = await fetch("https://www.24chasa.bg/novini", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && href.includes('article')) as string[];
  const links = links1.filter(unique);


  await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "])));
  await updateview()
  return links;
};
//getArticle('https://www.24chasa.bg/mezhdunarodni/article/14168004').then(() => console.log('done'));

go().then((links) => console.log(links.length));


