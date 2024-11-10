import { NextConfig } from "next";
import dotenv from "dotenv";

// 加载 .env.local 文件中的环境变量
dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.builder.io"],
  },
  // 其他配置选项
};

export default nextConfig;
