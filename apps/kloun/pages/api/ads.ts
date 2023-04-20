import type {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("content-type", "text/plain");
  res
    .status(200)
    .end("google.com, pub-5476404733919333, DIRECT, f08c47fec0942fa0");
};
