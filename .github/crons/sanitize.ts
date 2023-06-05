
import { Readability } from "@mozilla/readability";
import { JSDOM } from 'jsdom';
import nano from "nano";
import sanitizeHtml from "sanitize-html";
import { ulid } from 'ulid';
let nanoz = nano('https://db.kloun.lol');
let db = nanoz.db.use('db')
export type SanitizedHTMLObject = { type: 'p' | 'img', content: string };
export async function parseSanitizedHTML(html: string): Promise<SanitizedHTMLObject[]> {
  const dom = new JSDOM(html);
  const elements = dom.window.document.body.children;
  const sanitized: SanitizedHTMLObject[] = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.tagName.toLowerCase() === 'p') {
      sanitized.push({ type: 'p', content: element.textContent ?? '' });
    } else if (element.tagName.toLowerCase() === 'img') {
      const src = element.getAttribute('src');
      if (src) {
        sanitized.push({ type: 'img', content: src });
      }
    }
  }
  return sanitized;
}

export function filterSanitizedHTML(sanitized: SanitizedHTMLObject[], filters: string[]): { [key: string]: string }[] {
  return sanitized.filter(obj => {
    for (const filter of filters) {
      if (obj.content.startsWith(filter) || obj.content.length < 7) {
        return false; // Filter out this object
      }
    }
    return true; // Keep this object
  });
}
export const getUniqueStrings = (inputArray: string[]): string[] => {
  console.log(inputArray)
  const xx = Array.from(inputArray.map(x => x.split('?')[0]))
  return Array.from(new Set(xx));
}
export function extractOpenGraphImage(html: string): string | null {
  const dom = new JSDOM(html);
  const meta = dom.window.document.querySelector('meta[property="og:image"]');
  return meta ? meta.getAttribute('content') : null;
}

export const scrheaders = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1",
};

export async function scrapeArticle(url: string, filters: string[], type?: string) {
  const exist = await db.get(url).catch(() => { })
  if (exist) {
    console.log('exist');
    return;
  }
  await db.insert({ _id: url }).catch(() => { })
  const response = await fetch(url, {
    method: "GET",
    headers: scrheaders,
  });
  const d = await response.text();
  const doc = new JSDOM(d);
  const reader = new Readability(doc.window.document);
  const image = doc.window.document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");
  const article = reader.parse();
  console.log(article?.content)
  const sanit = sanitizeHtml(article?.content || "", {
    allowedTags: ["p", "img", "picture"],
    allowedAttributes: {
      img: ["src"],
    },
  });
  const pimgtags = await parseSanitizedHTML(sanit);
  const docx = {
    title: article?.title.replace('- Mediapool.bg', '').replace('- новини СЕГА', '') as string,
    html: filterSanitizedHTML(pimgtags, filters),
    nid: ulid(),
    type: type || 'NewsBG',
    date: new Date().toLocaleString("en-US", { timeZone: "Europe/Sofia" }),
    link: url,
    image: image || '',
  }
  const conditions = ["NOVA", "Видео", "Снимки", "СНИМКИ", "ВИДЕО"];
  const test = conditions.some(el => docx.title.includes(el));
  if (!test) {
    const x = await db.insert(docx as any);
    console.log(x);
    return docx;
  } else {
    console.log(docx.title, ' forbidden title');
    return null
  }
}

export async function updateview() {
  await db.view('newsbg', 'news', {
    reduce: false,
    limit: 1,
    update: 'lazy'
  })
}
