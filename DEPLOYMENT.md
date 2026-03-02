# GitHub Pages 部署指南

## 前置要求

1. GitHub 账户
2. Git 已安装
3. 项目已推送到 GitHub

## 方案选择

由于本项目使用 Next.js App Router，我们推荐以下部署方案：

### 推荐方案：使用 Vercel（最简单）

**为什么推荐 Vercel？**
- ✅ Next.js 官方推荐
- ✅ 自动部署，零配置
- ✅ 支持所有 Next.js 功能（API、ISR 等）
- ✅ 免费额度足够使用
- ✅ 全球 CDN 加速

**步骤：**
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 导入你的 GitHub 仓库
4. 点击 "Deploy"

**就这么简单！** 🎉

---

### 方案 B：GitHub Pages（静态导出）

**限制：**
- ❌ 不支持 API Routes
- ❌ 不支持 ISR（增量静态再生）
- ❌ 不支持服务器端功能
- ✅ 仅适用于纯静态文档站点

如果你的项目是纯静态内容（如文档站），可以使用此方案。

#### 步骤 1：配置 Next.js 导出

创建或修改 `next.config.ts`：

```typescript
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // 导出为静态 HTML
  output: 'export',

  // 图片域名配置（如果使用）
  images: {
    unoptimized: true, // GitHub Pages 不支持图片优化
  },

  // 基础路径（如果你的仓库名不是 username.github.io）
  // 如果你的仓库是 username/temporal-docs-cn
  // base path 就是 '/temporal-docs-cn'
  basePath: '/temporal-docs-cn',

  // 资源路径前缀（与 basePath 一致）
  assetPrefix: '/temporal-docs-cn',
};

export default nextConfig;
```

#### 步骤 2：创建 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 步骤 3：修改 package.json

确保构建命令使用静态导出：

```json
{
  "scripts": {
    "build": "next build",  // 已配置 output: 'export'
    "dev": "pnpm run dev",
    "start": "pnpm run start"
  }
}
```

#### 步骤 4：配置 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Build and deployment** 下：
   - Source: 选择 **GitHub Actions**
4. 保存设置

#### 步骤 5：推送代码

```bash
git add .
git commit -m "chore: add GitHub Pages deployment"
git push origin main
```

部署会自动开始，完成后访问：
```
https://your-username.github.io/temporal-docs-cn/
```

---

## 注意事项

### GitHub Pages 限制

1. **不支持 API Routes**
   - 不能使用 `/app/api/` 路由
   - 所有数据必须是静态的

2. **图片优化**
   - 必须设置 `images: { unoptimized: true }`
   - 或使用外部图片服务

3. **路由问题**
   - 所有链接必须是绝对路径
   - 使用 `<Link>` 组件会自动处理

### base path 配置

如果你的仓库是：
- `username.github.io` → `basePath: ''`（空字符串）
- `username/my-project` → `basePath: '/my-project'`

### 本地测试

部署前本地测试：

```bash
# 构建静态文件
pnpm build

# 本地预览
npx serve out -p 3000
```

---

## 对比：Vercel vs GitHub Pages

| 特性 | Vercel | GitHub Pages |
|------|--------|--------------|
| 设置难度 | ⭐ 简单 | ⭐⭐⭐ 复杂 |
| Next.js 支持 | ✅ 完整支持 | ⚠️ 仅静态 |
| API Routes | ✅ 支持 | ❌ 不支持 |
| ISR | ✅ 支持 | ❌ 不支持 |
| 免费额度 | ✅ 慷慨 | ✅ 有限制 |
| 自定义域名 | ✅ 支持 | ✅ 支持 |
| 部署速度 | ⚡ 快 | 🐢 较慢 |

**推荐：** 如果项目需要 API 或服务器功能，使用 Vercel；如果是纯静态文档站，可以使用 GitHub Pages。
