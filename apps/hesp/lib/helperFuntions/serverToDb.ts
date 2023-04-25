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

  if (req === undefined && action === "get") {
    return await Model.findMany({ include });
  }

  if (req === undefined) {
    throw new Error("Invalid request");
  }

  if (action === "get") {
    const id = parseInt(req.query.id as string);
    const result = await Model.findUnique({ where: { id }, include });
    return result;
  }

  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (action === "post") {
    const result = await Model.create({ data, include });
    return result;
  } else if (action === "put") {
    const id = parseInt(req.query.id as string);
    const result = await Model.update({ where: { id }, data, include });
    return result;
  } else {
    throw new Error("Invalid action");
  }
}

function buildIncludeObject(relations: string[]) {
  const include: Record<string, boolean> = {};

  for (const relation of relations) {
    include[relation] = true;
  }

  return include;
}
