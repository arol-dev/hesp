import { createClient } from "@supabase/supabase-js";

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

export default supabase;
