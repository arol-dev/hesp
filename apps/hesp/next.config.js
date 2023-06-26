/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/supabaseImageLoader.ts",
  },
};

module.exports = nextConfig;
