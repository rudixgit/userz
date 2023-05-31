
import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders, updateview } from "./sanitize";

const go = async () => {
  const response = await fetch("https://dariknews.bg/novini", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && href.includes('dariknews.bg') && href.split('-').length >= 4) as string[];
  const links = getUniqueStrings(links1).map((link) => `https:${link}`);
  console.log(links);
  await updateview()
  await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "])));
  return links;
};
//getArticle('https://dariknews.bg/novini/sviat/razmirici-i-bezredici-v-dzhamiiata-al-aksa-v-erusalim-snimkivideo-2343767').then(() => console.log('done'));

go().then((links) => console.log(links.length));


