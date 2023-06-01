
import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";


const go = async () => {
  const response = await fetch("https://www.mediapool.bg/today.html", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && !href.includes('-cat') && !href.includes('/users') && href.includes('.html') && !href.includes('/page') && href.split('-').length >= 3) as string[];
  const links = getUniqueStrings(links1)


  await Promise.all(links.map((link) => scrapeArticle(link, ["подкрепете ни", "Ще се радваме, ако ни подкрепите", "Екипът на Mediapool Ви", "Редакцията не носи отговорност", "Коментирането под", "Прочетете нашите правила", "За да коментирате,"])));
  return links;
};
//getArticle('https://www.mediapool.bg/seriozni-zatrudneniya-v-snabdyavaneto-s-hrana-v-severno-kosovo-news182622.html').then(() => console.log('done'));

go().then((links) => console.log(links.length));


