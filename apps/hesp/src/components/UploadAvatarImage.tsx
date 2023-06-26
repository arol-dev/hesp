import { v4 as uuidv4 } from "uuid";
import supabase from "../../lib/helperFuntions/supabaseClient";
import { SUPABASE_BUCKET_NAME } from "../../lib/constants";

async function uploadAvatarImage(file: Express.Multer.File, id: string) {
  const bucketName = SUPABASE_BUCKET_NAME;
  const filePath = `${bucketName}/${id}/${uuidv4()}`;
  console.log("filePath", filePath);

  // setup supabase storage with a jwt

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
