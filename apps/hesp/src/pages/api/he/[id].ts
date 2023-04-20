// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    try {
      const newTrainee = await serverToDb("Trainee", "put", req);

      res.status(200).json(newTrainee);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const trainee = await serverToDb("Trainee", "get", req);

    res.status(200).json(trainee);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
