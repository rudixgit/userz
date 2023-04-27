
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  const url = params.get("url") as string
  const res2 = await fetch(url);
  const data = await res2.json();

  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

