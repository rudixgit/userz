

import { JSDOM } from "jsdom";

import { getUniqueStrings, scrapeArticle, scrheaders, updateview } from "./sanitize";
//d
const go = async () => {
  const response = await fetch("https://m.dir.bg/dnes/latest-news", {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const links1 = Array.from(new JSDOM(d).window.document.querySelectorAll("a"))
    .map((link: HTMLElement) => link.getAttribute("href")) as string[]

  const links = getUniqueStrings(links1)
    .filter((href) => href !== null && !href.includes('comments') && !href.includes('javascript:') && !href.includes('viber:') && href.split('-').length >= 5) as string[];

  console.log(links);
  await Promise.all(links.map((link) => scrapeArticle(link, ["Снимка: "])));

  await updateview()
  return links;
};

go().then((links) => console.log(links.length));