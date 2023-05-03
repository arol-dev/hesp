import bcrypt from "bcrypt";

import { ModelMapInterface, modelMap, modelRelations } from "../../types";
import { NextApiRequest } from "next";
export default async function serverToDb(
  modelName: keyof ModelMapInterface,
  action: string,
  req: NextApiRequest | undefined
): Promise<ModelMapInterface> {
  const Model: any = modelMap[modelName];


  if (!Model) {
    throw new Error("Invalid model name");
  }

  const include = buildIncludeObject(modelRelations[modelName]);
  const includeParam = Object.keys(include).length > 0 ? { include } : {};

  if (req === undefined && action === "get") {
    return await Model.findMany(includeParam);
  }

  if (req === undefined) {
    throw new Error("Invalid request");
  }

  if (action === "get") {
    const id = parseInt(req.query.id as string);
    const result = await Model.findUnique({ where: { id }, ...includeParam });
    return result;

  }

  if (action === "getAll" && modelName === "PDC") {
    const id = parseInt(req.query.id as string);
    const result = await Model.findMany({ where: { traineeId: id }, include: { SessionNotes: true }, ...includeParam });
    return result;
  }


  if (action === "getAll" && modelName === "User") {
    const result = await Model.findMany();
    const staffUsers = result.filter((user: { role: string; }) => user.role === "STAFF");
    return staffUsers
  }

  else if (action === "getAll") {
    const id = parseInt(req.query.id as string);
    const result = await Model.findMany({ where: { traineeId: id }, ...includeParam });
    return result;
  }

  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (action === "post") {
    const result = await Model.create({ data, ...includeParam });
    return result;
  } else if (action === "put") {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const id = parseInt(req.query.id as string);
    const result = await Model.update({ where: { id }, data, ...includeParam });
    return result;
  } else {
    throw new Error("Invalid action");
  }
}

function buildIncludeObject(relations: string[] | undefined) {
  const include: Record<string, boolean> = {};

  if (!relations || !Array.isArray(relations)) {
    return include;
  }

  for (const relation of relations) {
    if (typeof relation === "string") {
      include[relation] = true;
    }
  }

  return include;
}
