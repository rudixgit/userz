import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";
import sanitizeHtml from "sanitize-html";

export async function parseSanitizedHTML(html) {
	const dom = new JSDOM(html);
	const elements = dom.window.document.body.children;
	const sanitized = [];
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

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const browser = await puppeteer.launch();

export const trans = async ({ url, from, to }) => {
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
	await page.goto(
		`https://kloun-lol.translate.goog/news/tr/${url}/?_x_tr_sl=${from}&_x_tr_tl=${to}`, { waitUntil: "domcontentloaded", timeout: 0 }
	);
	await page.waitForSelector("#emp", { visible: true });
	await timeout(3000);
	if (from === 'bg') {
		await page.waitForFunction(() => {
			const element = document.getElementById('emp');
			return element && element.textContent === 'emperor';
		});
	} else {
		await page.waitForFunction(() => {
			const element = document.getElementById('emp');
			return element && element.textContent === 'император';
		});
	}

	const myDivHtml = await page.evaluate(() => {
		const myDiv = document.getElementById("article");
		return myDiv.innerHTML;
	});
	await page.close();
	//await browser.disconnect();
	const clean = sanitizeHtml(myDivHtml, {
		allowedTags: ["p", "img"],
		allowedAttributes: {
			img: ["src"],
		},
	});
	return parseSanitizedHTML(clean)
};

//trans({url:'1d807774651f8852afaddda34a3b53a1',from:'bg',to:"en"}).then(d => console.log(d))
