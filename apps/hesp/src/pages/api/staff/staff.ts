import { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import { Prisma, InviteLink } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const incomingLinkToCheck: string | undefined = req.headers.referer;

      if (incomingLinkToCheck) {
        const newUser = await serverToDb("User", "post", req);
        res.status(201).json(newUser);
      }
    }
    if (req.method === "GET") {
      const users = await serverToDb("User", "getAll", req);
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
