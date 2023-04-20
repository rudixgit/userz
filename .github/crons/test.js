const db = require('nano')('https://db.kloun.lol/db');
async function test() {
  const docs = await db.view('newsbg', 'news', {
    reduce: false,
    limit: 500,
    descending: true,
    include_docs: true,
  })
  // update each doc
  for (const doc of docs.rows) {
    if (doc.doc.nid.length < 15) {
      await db.insert({
        _id: doc.doc._id,
        _rev: doc.doc._rev,

      })
      console.log('delete');
    }

  }



  console.log(docs.rows);
}

test()