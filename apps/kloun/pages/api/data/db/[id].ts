import db from '@/data/client';
import type { NextRequest } from 'next/server';

type Params = {
  [key: string]: string;
};
export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  const id = params.get("id") as string
  const data = await db.get(id);
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

