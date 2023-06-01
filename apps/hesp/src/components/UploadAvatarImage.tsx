import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

let supabase: ReturnType<typeof createClient>;

try {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error("Missing Supabase environment variables");
  }

  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
} catch (error) {
  console.error(error);
}

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
