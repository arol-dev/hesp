// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFunctions/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const newSolution = await serverToDb("ProvidedSoloutions", "post", req);
      res.status(200).json(newSolution);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  if (req.method === "GET") {
    try {
      const allSolutions = await serverToDb(
        "ProvidedSoloutions",
        "get",
        undefined
      );
      res.status(200).json(allSolutions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
