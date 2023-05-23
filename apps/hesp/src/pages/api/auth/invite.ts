import { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../../lib/helperFuntions/serverToDb";
import { decodeToken } from "../../../../lib/auth/jwt";
import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../../types";
import firstUser from "../../../../lib/constants";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const firstAdmin = await firstUser();
      const { role, email } = req.body;
      if (!firstAdmin) {
        const cookie = req.cookies;

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
          }
        }
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

      const inviteLinkUrl = `http://${req.headers.host}/signup/${inviteLink.id}`;

      await sendEmail(email, inviteLinkUrl);

      res.status(200).json(inviteLink);
    }
    if (req.method === "GET") {
      const links = await serverToDb("InviteLink", "get", undefined);
      res.status(200).json(links);
    }
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
}

async function sendEmail(email: string, inviteLinkUrl: string) {
  try {
    const url = "https://api.courier.com/send";
    const payload = {
      message: {
        to: { email: email },
        content: {
          title:
            "You have been invited to join the Homeless Entrepreneurs Program",
          body: `
            You are receiving this email because you have been invited to join the Homeless Entrepreneurs Program.
            Click the link below to sign up:


            ${inviteLinkUrl}

            If you did not sign up, please ignore this email.

            Thanks

            The Homeless Entrepreneurs Program
            
            `,
        },
      },
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer pk_prod_4E9HD6GD66MED8HF7GTFGP8SZFDP",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
