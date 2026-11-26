/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  // STATIC_EXPORT=1 npm run build  ->  نسخة ثابتة في فولدر out تترفع على أي استضافة
  ...(staticExport
    ? { output: "export", assetPrefix: "./", images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
