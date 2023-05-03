import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../lib/auth/jwt";
import cookie from "cookie";
import { JwtPayload } from "jsonwebtoken";
import { Prisma, PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cookies = req.headers.cookie;
    const token: string | null = cookies ? cookie.parse(cookies).token : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const verifiedUser: any = verifyToken(token);
    if (!verifiedUser) return res.status(401).json({ message: "Unauthorized" });

    // get user and pass back user including everything

    const { firstName, lastName, id, role } = verifiedUser;

    let userData;

    if (verifiedUser.role === UserRole.ADMIN) {
      userData = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          Trainee: {
            include: {
              WOLcheckpoint: true,
              PDCcheckpoint: true,
              TraineeMetaData: true,
              ProvidedSoloutions: {
                include: {
                  Soloutions: true,
                },
              },
            },
          },
        },
      });
    } else {
      userData = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          // WOLcheckpoint: true,
          // PDCcheckpoint: true,
          Trainee: true,
        },
      });
    }

    if (!userData) return res.status(404).json({ message: "User not found" });

    console.log(userData);

    res.status(200).json({ user: userData });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
