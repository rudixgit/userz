
import sharp from 'sharp';
import db from "../../../../../kloun/data/client";
export async function get({ params }: { params: { id: string } }) {
    const { id } = params;
    const data = await db.view("newsbg/news", {
        reduce: false,
        limit: 1,
        key: id,
        update: "lazy",
    });
    const response = await fetch(data.image);
    const buffer = Buffer.from(await response.arrayBuffer());
    const resizedBuffer = await sharp(buffer)
        .resize({ height: 120 })
        .toBuffer();

    return {
        body: resizedBuffer,
        encoding: 'binary',
    };
}