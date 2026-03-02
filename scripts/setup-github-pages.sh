#!/bin/bash

# GitHub Pages 部署配置脚本
# 使用方法：./scripts/setup-github-pages.sh <your-repo-name>
# 例如：./scripts/setup-github-pages.sh temporal-docs-cn

set -e

REPO_NAME=${1:-"temporal-docs-cn"}

echo "🚀 设置 GitHub Pages 部署配置"
echo "仓库名称: $REPO_NAME"
echo ""

# 检查是否已存在 GitHub Pages 配置
if grep -q "output: 'export'" next.config.ts; then
  echo "⚠️  警告: next.config.ts 已包含 GitHub Pages 配置"
  read -p "是否覆盖? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消"
    exit 1
  fi
fi

# 备份原配置
echo "📦 备份当前配置..."
cp next.config.ts next.config.ts.backup

# 应用 GitHub Pages 配置
echo "⚙️  应用 GitHub Pages 配置..."
cat > next.config.ts << 'EOF'
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出配置（用于 GitHub Pages）
  output: 'export',

  // 图片优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },

  // 基础路径配置
  // 将 'temporal-docs-cn' 替换为你的仓库名
  // 如果仓库是 username.github.io，则设置为空字符串 ''
  basePath: '/REPO_NAME_PLACEHOLDER',

  // 资源路径前缀（与 basePath 一致）
  assetPrefix: '/REPO_NAME_PLACEHOLDER',

  // 允许的来源
  allowedDevOrigins: ['*.dev.coze.site'],

  // 禁用 ESLint 构建检查
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript 配置
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
EOF

# 替换仓库名
sed -i "s|REPO_NAME_PLACEHOLDER|$REPO_NAME|g" next.config.ts

echo "✅ 配置已应用"
echo ""
echo "📝 下一步："
echo "1. 检查配置文件: cat next.config.ts"
echo "2. 本地测试: pnpm build && npx serve out -p 3000"
echo "3. 提交代码: git add . && git commit -m 'chore: setup GitHub Pages deployment'"
echo "4. 推送到 GitHub: git push origin main"
echo ""
echo "🌐 部署完成后，访问："
echo "https://your-username.github.io/$REPO_NAME/"
echo ""
echo "💡 恢复原配置:"
echo "cp next.config.ts.backup next.config.ts"
