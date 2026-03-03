import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // 性能优化
  experimental: {
    optimizeCss: true,
  },
  // 启用 gzip 压缩
  compress: true,
  // 静态导出（如果需要）
  output: 'standalone',

};

export default nextConfig;
