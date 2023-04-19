// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newComment = await serverToDb("Comment", "post", req);
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  if (req.method === "GET") {
    try {
      const allComments = await serverToDb("Comment", "get", undefined);
      res.status(200).json(allComments);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
