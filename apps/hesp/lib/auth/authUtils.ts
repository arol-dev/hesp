import jwt from "jsonwebtoken";
import { AuthContext } from "../../types";

export async function authenticateAndGetToken(context: AuthContext) {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return;
  }

  const token = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  const secret: any = process.env.JWT_SECRET;

  let decodedToken: any;
  if (token) {
    try {
      if (secret === undefined || secret === null) {
        throw new Error("JWT_SECRET is undefined");
      }
      decodedToken = jwt.decode(token, secret);
      if (!decodedToken) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  return decodedToken;
}
