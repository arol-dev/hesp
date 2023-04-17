// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "@/serverToDb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const updatedPDC = await serverToDb("PDC", "put", req);

      res.status(200).json(updatedPDC);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const PDC = await serverToDb("PDC", "get", req);

    res.status(200).json(PDC);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
