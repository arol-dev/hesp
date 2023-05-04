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
  const id = req && req.query && req.query.id ? parseInt(req.query.id as string) : null; 

  const include = buildIncludeObject(modelRelations[modelName]);
  const includeParam = Object.keys(include).length > 0 ? { include } : {};

  if (req === undefined && action === "get") {
    return await Model.findMany(includeParam);
  }

  if (req === undefined) {
    throw new Error("Invalid request");
  }

 
  const id = req.query.id ? parseInt(req.query.id as string) : null;
  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
 

  switch (action) {
    case "get":
      return await Model.findUnique({ where: { id }, ...includeParam });
 
    case "post":
      return await Model.create({ data, ...includeParam });
 

    case "put":
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      return await Model.update({ where: { id }, data, ...includeParam });

    case "delete":
      return await Model.delete({ where: { id } });

    default:
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
