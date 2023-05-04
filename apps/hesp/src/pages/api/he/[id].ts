// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    
    console.log('Request id:', req.query.id);

    console.log('im arriving pages api he id...', req.method)
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
