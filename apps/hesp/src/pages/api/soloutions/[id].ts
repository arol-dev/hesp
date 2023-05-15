// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFunctions/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    try {
      const updatedSolution = await serverToDb("Solutions", "put", req);

      res.status(200).json(updatedSolution);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const Solution = await serverToDb("Solutions", "get", req);

    res.status(200).json(Solution);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
