import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PUT":
        const updatedStaff = await serverToDb("User", "put", req);
        res.status(200).json(updatedStaff);
        break;
      case "GET":
        const staff = await serverToDb("User", "get", req);
        res.status(200).json(staff);
        break;
      case "DELETE":
        const deletedStaff = await serverToDb("User", "delete", req);
        res.status(200).json(deletedStaff);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
