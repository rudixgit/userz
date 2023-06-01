import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";


const go = async () => {
  const response = await fetch("https://www.segabg.com", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && href.split('-').length >= 5 && !href.includes('video') && href.split('/').length === 3) as string[];
  const links = getUniqueStrings(links1).map((link) => `https://www.segabg.com${link}`);
  console.log(links);
  await Promise.all(links.map((link) => scrapeArticle(link, [" Ако искате да подкрепите"])));
  return links;
};
//getArticle('https://www.segabg.com/category-movie-release/dzhon-uik-i-izkustvoto-da-ubivash').then(() => console.log('done'));

go().then((links) => console.log(links.length));


