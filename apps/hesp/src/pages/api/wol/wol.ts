import serverToDb from "../../../../lib/helperFuntions/serverToDb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      console.log('my request', req.body)
      const newWolCheck = await serverToDb("WOL", "post", req);
      res.status(200).json(newWolCheck);
    }
    if (req.method === "GET") {
      const allWolChecks = await serverToDb("WOL", "get", undefined);
      res.status(200).json(allWolChecks);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
