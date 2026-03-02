import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // ⚠️ 部署到 GitHub Pages 时取消注释以下配置
  /*
  // 静态导出配置（用于 GitHub Pages）
  output: 'export',

  // 图片优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },

  // 基础路径配置
  // 将 'temporal-docs-cn' 替换为你的仓库名
  // 如果仓库是 username.github.io，则设置为空字符串 ''
  basePath: '/temporal-docs-cn',

  // 资源路径前缀（与 basePath 一致）
  assetPrefix: '/temporal-docs-cn',
  */

  // 当前配置（用于本地开发和 Vercel 部署）
  allowedDevOrigins: ['*.dev.coze.site'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lf-coze-web-cdn.coze.cn',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
