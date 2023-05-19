import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient (process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);



export async function uploadAvatarImage(file: File) {
  const filePath = `avatar images/${file.name}`;

  let { error: uploadError } = await supabase.storage
    .from('avatar images')
    .upload(filePath, file); 

  if (uploadError) {
    throw uploadError;
  }

  const publicUrl = `https://eelyhoyywlfzpkmeofum.supabase.co/storage/v1/object/public/avatar%20images/avatar%20images/${filePath}`

  return publicUrl
}

