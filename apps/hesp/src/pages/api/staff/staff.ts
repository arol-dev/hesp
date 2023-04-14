import { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "@/serverToDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const newUser = await serverToDb("User", "post", req);

      console.log(newUser);
      res.status(200).json(newUser);
    }
    if (req.method === "GET") {
      const users = await serverToDb("User", "get", undefined);
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
