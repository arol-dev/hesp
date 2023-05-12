// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFunctions/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newpdc = await serverToDb("PDC", "post", req);
      res.status(200).json(newpdc);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  if (req.method === "GET") {
    try {
      const allPDC = await serverToDb("PDC", "get", undefined);
      res.status(200).json(allPDC);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
