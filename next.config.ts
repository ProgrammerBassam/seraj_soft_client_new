// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // تأكد من أنك تستخدم الإعدادات الصحيحة
//   distDir: 'out', // تعيين مجلد الإخراج إلى "out"
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "out", // يضع الملفات النهائية في `out/`
  reactStrictMode: true,
  output: "export",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },  // تغيير إلى المنفذ المستخدم في Tauri
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type" },
        ],
      },
    ];
  },

};



