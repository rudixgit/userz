import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response("google.com, pub-5476404733919333, DIRECT, f08c47fec0942fa0",
    {
      status: 200,
      headers: {
        'content-type': "text/plain",
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    }
  )
}