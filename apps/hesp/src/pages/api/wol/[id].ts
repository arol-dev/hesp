import serverToDb from "../../../../lib/serverToDb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const updatedWOL = await serverToDb("WOL", "put", req);

      res.status(200).json(updatedWOL);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
    const allWOLS = await serverToDb("WOL", "get", req);

    res.status(200).json(allWOLS);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
