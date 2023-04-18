import serverToDb from "@/serverToDb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const newSolution = await serverToDb("Solutions", "post", req);
      res.status(200).json(newSolution);
    }
    if (req.method === "GET") {
      const solution = await serverToDb("Solutions", "get", undefined);
      res.status(200).json(solution);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
