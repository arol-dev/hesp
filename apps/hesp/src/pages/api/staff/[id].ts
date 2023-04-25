import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const updatedStaff = await serverToDb("User", "put", req);

      res.status(200).json(updatedStaff);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
    const staff = await serverToDb("User", "get", req);

    res.status(200).json(staff);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
