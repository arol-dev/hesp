import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function firstUser() {
  const users = await prisma.user.findMany();

  return users.length > 0 ? false : true;
}
