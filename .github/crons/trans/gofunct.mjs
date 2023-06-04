import async from 'async';
import { JSDOM } from "jsdom";
import nano from 'nano';
import puppeteer from "puppeteer";
import sanitizeHtml from "sanitize-html";
const n1 = nano('https://secede.kloun.lol')

const browser = await puppeteer.launch({
	headless: "new", args: ['--disable-dev-shm-usage']
});

const dbprod = n1.use('db')


export async function parseSanitizedHTML({ title, html }) {
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

	return ({ title, html: sanitized });
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
			await new Promise(resolve => setTimeout(resolve, 5000));
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
	const title = await page.evaluate(() => {
		const myDiv = document.getElementById("title");
		return myDiv.innerText;
	});

	await page.close();
	//await browser.close();
	const html = sanitizeHtml(myDivHtml, {
		allowedTags: ["p", "img"],
		allowedAttributes: {
			img: ["src"],
		},
	});
	return parseSanitizedHTML({ title, html })
};

export async function go(id, sourcelang) {
	const bodyprod = await dbprod.get(id)
	const structure = sourcelang === 'bg' ? { from: 'bg', to: 'en', type: 'NewsENProcess', trans: '1' } : { from: 'en', to: 'bg', type: 'NewsBG', trans: '1' }
	const structureopposite = sourcelang === 'bg' ? { from: 'en', to: 'bg', type: 'NewsBG', trans: '1' } : { from: 'bg', to: 'en', type: 'NewsENProcess', trans: '1' }
	const bodylen = JSON.stringify(bodyprod).length
	if (bodylen < 500) {
		await dbprod.insert({
			...bodyprod,
			type: 'NewsBGbugged',
			trans: '1'
		})
		return new Promise(resolve => {
			resolve(id + ' done')
		})
	}
	delete bodyprod._id
	const enx = await trans({ url: id, ...structure })
	const engdb = await dbprod.insert({
		...bodyprod,
		...structure,
		...enx,
	})
	const bgx = await trans({ url: engdb.id, ...structureopposite })
	console.log([
		{ bg: `https://db.kloun.lol/db/${id}`, l: JSON.stringify(bgx).length, retranslated: true },
		{ en: `https://db.kloun.lol/db/${engdb.id}`, l: JSON.stringify(enx).length },
	])
	try {
		delete bodyprod.content
		await dbprod.insert({
			...bodyprod,
			...bgx,
			_id: id
		})
		return new Promise(resolve => {
			resolve(`${id} done`)
		})
	} catch (e) {
		console.log(e)
		return new Promise(resolve => {
			resolve(`${id} done error`)
		})
	}
}

export const receiveMessages = async (view, sourcelang) => {
	dbprod.view('company', view, {
		limit: 300,
		descending: true,
	}).then(data => {
		console.log(`new batch start from`, data.rows[0])
		async.eachOfLimit(
			data.rows,
			15,
			(message, _key, cb) => {
				go(message.id, sourcelang).then(() => {
					cb()
				})
			},
			() => {
				console.log('done -=====-')
				//receiveMessages()
				return new Promise(resolve => {
					resolve('')
				})
			}
		)

	})
}

