// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // تأكد من أنك تستخدم الإعدادات الصحيحة
//   distDir: 'out', // تعيين مجلد الإخراج إلى "out"
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // يضمن تصدير الموقع كملفات HTML ثابتة
  distDir: "out", // يضع الملفات النهائية في `out/`
  reactStrictMode: true,
};

module.exports = nextConfig;


