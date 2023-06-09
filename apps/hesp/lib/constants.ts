import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function firstUser() {
  const users = await prisma.user.findMany();

  return users.length > 0 ? false : true;
}

if (
  !process.env.SUPABASE_ANON_KEY ||
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_BUCKET_NAME
) {
  throw new Error("Missing env variables for Supabase");
}

export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;
