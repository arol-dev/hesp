import { InviteLink, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../../../../lib/auth/jwt";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import { IUser, ModelMapInterface, IinviteLink } from "../../../../types";

const prisma = new PrismaClient();

const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
};

const setLinkAsUsed = async (linkId: number) => {
  return await prisma.inviteLink.update({
    where: { id: linkId },
    data: { used: true },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const incomingLinkToCheck: string | undefined = req.headers.referer;
    if (!incomingLinkToCheck) {
      res.status(400).json({ error: "Missing incoming link to check" });
      return;
    }

    const linksFromDb = await serverToDb("InviteLink", "get", undefined);
    const link: InviteLink = linksFromDb.filter(
      (link: InviteLink) => link.code === incomingLinkToCheck
    );

    if (!link) {
      res.status(401).json({ error: "Invalid link" });
      return;
    }

    const now = new Date();
    if (link.used || link.expiresAt <= now) {
      res.status(401).json({ error: "Link is already used or expired" });
      return;
    }

    const { firstName, lastName, email, password } = req.body;
    const newUser: any = await createUser(firstName, lastName, email, password);

    if (newUser) {
      await setLinkAsUsed(link.id);

      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Set the cookie to expire in 24 hours
      const token = generateJWTToken(newUser);

      res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Lax`
      );
      res.status(201).json({ user: newUser });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
