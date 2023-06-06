import { v4 as uuidv4 } from "uuid";
import supabase from "../../lib/helperFuntions/supabaseClient";

async function uploadAvatarImage(file: File, id: string) {
  console.log("uploadAvatarImage called");
  console.log("File:", file);
  console.log("ID:", id);

  const bucketName = "avatar images";
  const filePath = `${bucketName}/${id}/${uuidv4()}`;

  console.log("bucketName", bucketName);
  console.log("filePath", filePath);

  let { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  let { data: publicUrl } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("Could not get public URL");
  }

  return publicUrl;
}

export default uploadAvatarImage;
