import { JSDOM } from "jsdom";

import { scrapeArticle, scrheaders, unique, updateview } from "./sanitize";
const go = async () => {
  const response = await fetch("https://www.dnevnik.bg/novini/dnes/", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href")).filter(unique)
    .filter((href) => href !== null && !href.includes('https') && !href.includes('javascript:') && !href.includes('/comments') && !href.includes('viber:') && href.split('_').length >= 6) as string[];
  const links = links1.filter(unique).map(item => 'https://www.dnevnik.bg' + item)
  console.log(links[22]);

  await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "])));
  await updateview()
  return links;
};

go().then((links) => console.log(links.length));

