import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../lib/auth/jwt";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cookies = req.headers.cookie;
    const token = cookies ? cookie.parse(cookies).token : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = verifyToken(token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
