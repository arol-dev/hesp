import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../../../../lib/auth/jwt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { firstName, lastName, email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: any = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role,
        },
      });

      const token = generateJWTToken(newUser);
      res.setHeader("Set-Cookie", [`token=${token}`]);
      res.status(201).json({ user: newUser });
    }
  } catch (error) {
    res.status(405).json({ error: (error as Error).message });
  }
}
