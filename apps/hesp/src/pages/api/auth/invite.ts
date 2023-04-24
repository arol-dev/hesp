import { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      // destructure the body and add a key value pair

      const newLink = await serverToDb("InviteLink", "post", req);
      res.status(200).json(newLink);
    }
    if (req.method === "GET") {
      const links = await serverToDb("InviteLink", "get", undefined);
      res.status(200).json(links);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
