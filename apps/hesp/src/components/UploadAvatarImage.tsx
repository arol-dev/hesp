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

  console.log("bucketName", bucketName);
  console.log("filePath", filePath);

  let { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype, // specify content type
    });

  if (uploadError) {
    throw uploadError;
  }

  let publicUrl = supabase.storage.from(bucketName).getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("Could not get public URL");
  }

  return publicUrl;
}

export default uploadAvatarImage;
