import async from 'async'
import nano from 'nano'
const n1 = nano('https://arpecop:maximus@db.kloun.lol')

const dbprod = n1.use('db')

import { trans } from './server.mjs'
let processattime = 3

async function go(id) {
	const bodyprod = await dbprod.get(id)
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
	const enx = await trans({ url: id, from: 'bg', to: 'en' })
	const engdb = await dbprod.insert({
		...bodyprod,
		html: enx,
		type: 'NewsBGEN'
	})
	const bgx = await trans({ url: engdb.id, from: 'en', to: 'bg' })
	console.log([
		{ bg: `https://db.kloun.lol/db/${id}`, l: JSON.stringify(bgx).length, retranslated: true },
		{ en: `https://db.kloun.lol/db/${engdb.id}`, l: JSON.stringify(enx).length },
	])
	try {
		delete bodyprod.content
		// await db.insert({
		//      ...bodyprod,
		//      _id: id,
		//      trans: '1',
		//      html: bgx
		// })

		await dbprod.insert({
			...bodyprod,
			_id: id,
			trans: '1',
			html: bgx
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

async function receiveMessages() {
	dbprod.view('company', 'cronews', {
		limit: 100,
		descending: true,
		update: true
	}).then(data => {
		console.log(`new batch start from ${data.rows[0].id}`, reallimit)
		async.eachOfLimit(
			data.rows,
			reallimit,
			(message, _key, cb) => {

				go(message.id).then(() => {
					cb()
				})

			},
			() => {
				processattime = processattime + 1
				console.log('done -=====-')
				//receiveMessages()
			}
		)
	})
}

receiveMessages()



