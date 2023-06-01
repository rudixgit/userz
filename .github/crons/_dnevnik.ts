import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders } from "./sanitize";
const go = async () => {
  const response = await fetch("https://www.dnevnik.bg/novini/dnes/", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href"))
    .filter((href) => href !== null && !href.includes('https') && !href.includes('javascript:') && !href.includes('/comments') && !href.includes('viber:') && href.split('_').length >= 6) as string[];
  const links = getUniqueStrings(links1).map(item => 'https://www.dnevnik.bg' + item)
  console.log(links);

  await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "])));
  return links;
};

go().then((links) => console.log(links.length));

