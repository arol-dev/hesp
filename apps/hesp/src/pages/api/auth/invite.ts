import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../../lib/auth/jwt";
import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../../types";
import serverToDb from "../../../../lib/helperFunctions/serverToDb";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const cookie = req.cookies;
      const { role } = req.body;

      const token = cookie.token;

      if (typeof token === "string") {
        const decodedToken = decodeToken(token);

        if (decodedToken !== null && typeof decodeToken !== "string") {
          const userId = (decodedToken as IUser).id;
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!user || user.role !== "ADMIN") {
            res.status(401).json({ error: "Invalid token" });
            return;
          }

          const today = new Date();
          const expiresAt = new Date(today);

          expiresAt.setDate(today.getDate() + 7);

          const roleToPass = role === "Admin" ? "ADMIN" : "STAFF";

          const inviteLink = await prisma.inviteLink.create({
            data: {
              expiresAt: expiresAt,
              role: roleToPass,
            },
          });

          res.status(200).json(inviteLink);
        }
      }
      res.status(401);
    }
    if (req.method === "GET") {
      const links = await serverToDb("InviteLink", "get", undefined);
      res.status(200).json(links);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
