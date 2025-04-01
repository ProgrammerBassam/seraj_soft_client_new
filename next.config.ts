import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // تصدير التطبيق كملفات ثابتة
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true, // تعطيل تحسين الصور لتجنب خطأ التصدير
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
