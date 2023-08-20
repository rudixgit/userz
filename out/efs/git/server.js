const express = require("express");
const app = express();
app.use(express.json({ limit: "50mb" }));
const port = 1337;


//const rd = require("./ramdisk.js");

function shh(cmd) {
  const exec = require('child_process').exec
  return new Promise((resolve) => {
    try {
      exec(cmd, { maxBuffer: 5000 * 500 }, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        const out = stdout || stderr
        resolve(out.toString().split('\n').slice(-20).join('\n'));
      });
    } catch (e) {
      resolve(e);
    }
  });
}

async function publish(branch) {
  await shh(`pm2 delete ${branch}`)
  const x = await shh(`sudo rm -rf /tmp/${branch}`);
  const y = await shh(`mkdir -p /app/${branch}`);
  const z = await shh(`git clone --branch ${branch} git@github.com:arpecop/monext.git /tmp/${branch}`)
  console.log(x, y, z)
  const rsync = await shh(`rsync -av --delete --exclude='.git' --exclude='out' /tmp/${branch} /app/`)
  //const install = await shh(`cd /app/${branch} && pnpm install node-html-parser --prod`)
  const start = await shh(`cd /app/${branch} && pm2 start`)
  console.log(rsync,  start, '<=== install');
  await shh(`rm -rf /tmp/${branch}`);
}
//publish("kloun")
//publish("eziktok")
//const ports
app.get("/", (req, res) => {
  res.end("Hello World");
});

app.post("/", (req, res) => {
  console.log("triggered");
  const { ref } = req.body;
  const branch = ref.split("/")[2];
  if (branch === 'masterx') { // fix this in prod
    publish(branch);
    res.send("Hello World!");
  }
  res.send("Hello World!");
});

app.listen(1337, () => {
  console.log(`୦ Git server listening on port  ${port} v 3.0`);
});