import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../../types";
import { User } from "@prisma/client";

config();

export const generateJWTToken = (user: User) => {
  const { id, firstName, lastName, password, role } = user;
  return jwt.sign(
    {
      id,
      firstName,
      lastName,
      password,
      role,
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
