import { v4 as uuidv4 } from "uuid";
import supabase from "../../lib/helperFuntions/supabaseClient";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
async function uploadAvatarImage(file: MulterFile, id: string) {
  const bucketName = "avatar images";
  const filePath = `${bucketName}/${id}/${uuidv4()}`;

  let { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (uploadError) {
    throw uploadError;
  }

  let urlObject = supabase.storage.from(bucketName).getPublicUrl(filePath);
  let url = urlObject.data.publicUrl;

  if (!url) {
    throw new Error("Could not get public URL");
  }

  return url;
}

export default uploadAvatarImage;
