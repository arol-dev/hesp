import serverToDb from "../../../../lib/helperFuntions/serverToDb";
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
    const WOL = await serverToDb("WOL", "getAll", req);

    res.status(200).json(WOL);
  }


  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
