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

  if (action === "get") {
    // const id = parseInt(req.query.id as string);
    const result = await Model.findUnique({ where: { id }, ...includeParam });
    return result;
 
  }

  if (action === "getAll" && modelName === "PDC") {
    // const id = parseInt(req.query.id as string);
    const result = await Model.findMany({ where: { traineeId: id }, include: { SessionNotes: true }, ...includeParam });
    return result;
  }

  else if (action === "getAll") {
    // const id = parseInt(req.query.id as string);
    const result = await Model.findMany({ where: { traineeId: id }, ...includeParam });
 
    return result;
  }

  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (action === "post") {
    const result = await Model.create({ data, ...includeParam });
    return result;

  } else if (action === "put") {
      const { User, TraineeMetaData, ProvidedSoloutions, PDCcheckpoint, WOLcheckpoint, ...cleanData } = data;
    
      if (cleanData.password) {
        cleanData.password = await bcrypt.hash(cleanData.password, 10);
      }
    
      console.log('PUT action in serverToDb, before updating');
      try {
        const result = await Model.update({ where: { id }, data: cleanData, ...includeParam }); // Use cleanData instead of data
        console.log('PUT action in serverToDb, result:', result);
        return result;
      } catch (error) {
        console.error('Error during update operation:', error);
        throw error;
      }
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
