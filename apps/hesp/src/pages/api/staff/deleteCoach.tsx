import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateAndGetToken } from "../../../../lib/auth/authUtils";
import { decodeToken } from "../../../../lib/auth/jwt";
import { IUser } from "../../../../types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookie = req.headers;
    if (!cookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = cookie.token;

    if (typeof token !== "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
    }

    const body = req.body;
    const reult = await prisma.user.delete({
      where: {
        id: body.id,
      },
    });
    res.status(200).json({ data: reult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  } finally {
  }
}
