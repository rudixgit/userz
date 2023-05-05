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


const browser = await puppeteer.launch({
	headless: "new", args: ['--disable-dev-shm-usage']
});

async function waitUntil(condition) {
	return await new Promise(resolve => {
		const interval = setInterval(() => {
			if (condition) {
				resolve('foo');
				clearInterval(interval);
			};
		}, 500);
	});
}

export const trans = async ({ url, from, to }) => {

	const page = await browser.newPage();
	await page.setViewport({
		width: 5640,
		height: 5480,
		deviceScaleFactor: 1,
	});
	await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
	await page.goto(
		`https://kloun-lol.translate.goog/news/tr/${url}/?_x_tr_sl=${from}&_x_tr_tl=${to}`, { waitUntil: "domcontentloaded" }
	);

	await page.waitForSelector("#emp", { visible: true });

	async function checkForEmperor(emp) {
		let element;
		while (element !== emp) {

			element = await page.$eval('#emp', el => el.innerText);

			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		return ('ok');
	}

	if (from === 'bg') {
		await checkForEmperor('emperor');
	} else {
		await checkForEmperor('император');
	}

	const myDivHtml = await page.evaluate(() => {
		const myDiv = document.getElementById("article");
		return myDiv.innerHTML;
	});

	await page.close();
	//await browser.close();
	const clean = sanitizeHtml(myDivHtml, {
		allowedTags: ["p", "img"],
		allowedAttributes: {
			img: ["src"],
		},
	});
	return parseSanitizedHTML(clean)
};

//trans({url:'1d807774651f8852afaddda34a3b53a1',from:'bg',to:"en"}).then(d => console.log(d))
