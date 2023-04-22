import type { NextApiRequest, NextApiResponse } from 'next'

function shh(cmd: string) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error: string, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

async function publish(branch: string) {
  await shh(`git clone --branch ${branch} https://github.com/arpecop/monext.git /tmp/${branch}`)
  await shh('echo "CLONING DONE"')
  await shh(`cd /app/${branch} && pnpm install`)

  const rsync = await shh(`rsync -avh --delete --exclude='.git'  /tmp/${branch} /app/`)
  const install = await shh(`cd /app/${branch} && pnpm install`)
  console.log(install, rsync, '<=== install');

  await shh(`rm -rf /tmp/${branch}`);

}




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    await publish('app')
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const body = JSON.parse(req.body)
  res.status(200).json({ name: 'John Doe' })
}