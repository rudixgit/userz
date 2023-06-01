import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";

const go = async () => {
  const response = await fetch("https://nova.bg/filter/all", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && !href.includes('javascript:') && href.includes('/news/view') && !href.includes('viber:')) as string[];
  const links = getUniqueStrings(links1)
  await Promise.all(links.map((link) => scrapeArticle(link, ['Снимка: ', 'Новините на NOVA'])));
  return links;
};
//getArticle('https://nova.bg/news/view/2023/04/05/407306/пропуски-на-11-сик-в-чужбина-променят-данните-от-вота/').then(() => console.log('done'));

go().then((links) => console.log(links.length));


