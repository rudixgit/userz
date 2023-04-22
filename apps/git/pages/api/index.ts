import type { NextApiRequest, NextApiResponse } from 'next'

function shh(cmd: string) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error: string, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error);
      }
      const out = stdout || stderr
      resolve(out.toString().split('\n').slice(-10).join('\n'));
    });
  });
}

async function publish(branch: string) {
  await shh(`mkdir -p /app/${branch}`);
  await shh(`git clone --branch ${branch} https://github.com/arpecop/monext.git /tmp/${branch}`)
  await shh('echo "CLONING DONE"')
  await shh(`cd /app/${branch} && pnpm install`)
  const rsync = await shh(`rsync -av --exclude='.git'  /tmp/${branch} /app/`)
  const install = await shh(`cd /app/${branch} && pnpm install --prod`)
  const start = await shh(`cd /app/${branch} && pm2 delete ${branch} &&  pm2 start`)
  console.log(rsync, install, start, '<=== install');
  await shh(`rm -rf /tmp/${branch}`);
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    publish('app');
    publish('kloun');
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const body = JSON.parse(req.body)
  const { ref } = body;
  const branch = ref.split("/")[2];
  console.log(branch);
  await publish(branch)
  res.status(200).json({ name: 'John Doe' })
}