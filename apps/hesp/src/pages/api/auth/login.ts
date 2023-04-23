// pages/api/auth/login.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../../../../lib/auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user: any = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJWTToken(user);

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Set the cookie to expire in 24 hours

    res.setHeader(
      "Set-Cookie",
      `token=${token}; Path=/; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Lax`
    );

    res.status(200).json({ user, token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
