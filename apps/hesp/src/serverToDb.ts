import {
  PrismaClient,
  TraineeDelegate,
  UserDelegate,
  CommentDelegate,
  WOLCheckpointDelegate,
  PDCCheckpointDelegate,
} from "@prisma/client";
import type { NextApiRequest } from "next";

const prisma = new PrismaClient();

interface ModelMapInterface {
  Trainee: TraineeDelegate;
  User: UserDelegate;
  Comment: CommentDelegate;
  WOL: WOLCheckpointDelegate;
  PDC: PDCCheckpointDelegate;
}

const modelMap: ModelMapInterface = {
  Trainee: prisma.trainee,
  User: prisma.user,
  Comment: prisma.comment,
  WOL: prisma.wOLcheckpoint,
  PDC: prisma.pDCcheckpoint,
};
export default async function serverToDb(
  modelName: keyof ModelMapInterface,
  action: string,
  req: NextApiRequest | undefined
): Promise<ModelMapInterface> {
  const Model = modelMap[modelName];

  if (!Model) {
    throw new Error("Invalid model name");
  }
  if (req === undefined) {
    return await Model.findMany();
  }

  if (action === "post") {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body; // Parse JSON string into an object if necessary
    const result = await Model.create({ data });
    return result;
  } else if (action === "put") {
    const id = parseInt(req.query.heid as string);

    const { ...data } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body; // Parse JSON string into an object if necessary
    console.log("Data:", data); // Log the data object
    const result = await Model.update({ where: { id }, data });
    console.log("Result:", result); // Log the result
    return result;
  } else {
    throw new Error("Invalid action");
  }
}
