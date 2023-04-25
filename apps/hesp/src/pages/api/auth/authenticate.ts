import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../lib/auth/jwt";
import cookie from "cookie";
import { JwtPayload } from "jsonwebtoken";

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

    const { firstName, lastName, id, role } = verifiedUser;

    interface userAuth {
      firstName: string;
      lastName: string;
      id: string;
      role: string;
    }

    const user: userAuth = {
      firstName,
      lastName,
      id,
      role,
    };

    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
