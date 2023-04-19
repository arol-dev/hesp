// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const newTrainee = await serverToDb("Trainee", "post", req);
      res.status(200).json(newTrainee);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  if (req.method === "GET") {
    try {
      const trainees = await serverToDb("Trainee", "get", undefined);
      res.status(200).json(trainees);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
