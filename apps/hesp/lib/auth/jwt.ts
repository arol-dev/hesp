import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "@prisma/client";

config();

const secret: string | undefined = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateJWTToken = (user: User) => {
  const { id, firstName, lastName, password, role, picture } = user;
  return jwt.sign(
    {
      id,
      firstName,
      lastName,
      password,
      role,
      picture,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const decodeToken = (token: string): JwtPayload | null | string => {
  // Extract the JWT token from the cookies
  token
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];
  return jwt.decode(token);
};
