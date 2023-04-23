import db from '@/data/client';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function (request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  const data = await db.view("newsbg/news", {
    reduce: false,
    limit: 1,
    key: id || '',
    update: "lazy",
  });
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',

        }}
      >
        <img src={data.image} style={{ width: '120%' }} />
      </div>
    ),
    {
      width: 600,
      height: 300,
    },
  );
}
//     