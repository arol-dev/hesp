import {
  PrismaClient,
  Trainee,
  User,
  Comment,
  WOLcheckpoint,
  PDCcheckpoint,
  Soloutions,
  ProvidedSoloutions,
} from "@prisma/client";

import type { NextApiRequest } from "next";

const prisma = new PrismaClient();

interface ModelMapInterface {
  Trainee: typeof prisma.trainee;
  User: typeof prisma.user;
  Comment: typeof prisma.comment;
  WOL: typeof prisma.wOLcheckpoint;
  PDC: typeof prisma.pDCcheckpoint;
  Solutions: typeof prisma.soloutions;
  ProvidedSoloutions: typeof prisma.providedSoloutions;
}

const modelMap: ModelMapInterface = {
  Trainee: prisma.trainee,
  User: prisma.user,
  Comment: prisma.comment,
  WOL: prisma.wOLcheckpoint,
  PDC: prisma.pDCcheckpoint,
  Solutions: prisma.soloutions,
  ProvidedSoloutions: prisma.providedSoloutions,
};

export default async function serverToDb(
  modelName: keyof ModelMapInterface,
  action: string,
  req: NextApiRequest | undefined
): Promise<ModelMapInterface> {
  const Model: any = modelMap[modelName];

  if (!Model) {
    throw new Error("Invalid model name");
  }
  if (req === undefined && action === "get") {
    return await Model.findMany();
  }
  if (req === undefined) {
    throw new Error("Invalid request");
  }

  if (action === "get") {
    const id = parseInt(req.query.id as string);
    const result = await Model.findUnique({ where: { id } });
    return result;
  }

  if (action === "post") {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body; // Parse JSON string into an object if necessary
    const result = await Model.create({ data });
    return result;
  } else if (action === "put") {
    const id = parseInt(req.query.id as any);
    const { ...data } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body; // Parse JSON string into an object if necessary
    const result = await Model.update({ where: { id }, data });
    return result;
  } else {
    throw new Error("Invalid action");
  }
}
