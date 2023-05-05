import { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

interface UserRequest extends NextApiRequest {
  body: any;
}

export default async function handler(req: UserRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const incomingLinkToCheck: string | undefined = req.headers.referer;

      if (incomingLinkToCheck) {
        const hashedPassword = await hash(req.body.password, 10);

        // Update the req.body.password with the hashed password
        req.body.password = hashedPassword;

        // Pass the req.body directly to the serverToDb function
        const newUser = await serverToDb("User", "post", req.body);
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
