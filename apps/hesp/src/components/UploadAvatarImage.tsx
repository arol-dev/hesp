import { v4 as uuidv4 } from "uuid";
import supabase from "../../lib/helperFuntions/supabaseClient";

export async function uploadAvatarImage(file: File, id: string) {
  const bucketName = "avatar images";
  const filePath = `${bucketName}/${id}/${uuidv4()}`;

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
