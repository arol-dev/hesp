import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "@/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const updatedComment = await serverToDb("Comment", "put", req);

      res.status(200).json(updatedComment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const comment = await serverToDb("Comment", "get", req);

    res.status(200).json(comment);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
