const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
type supabaseLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};
export default function supabaseLoader({
  src,
  width,
  quality,
}: supabaseLoaderProps) {
  return `${src}?width=${width}&quality=${quality || 75}`;
}
