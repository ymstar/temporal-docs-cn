# Temporal 中文文档站 - 部署指南

## 项目简介

本项目是 Temporal 官方文档的中文翻译版本，基于 Next.js 16 和 TypeScript 构建。项目提供了完整的中文文档站点，包括快速开始、开发指南、SDK 文档、部署指南和社区资源等核心板块。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS 4
- **包管理器**: pnpm

## 本地运行

### 前置要求

- Node.js 18+
- pnpm 9+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

访问 `http://localhost:5000` 查看站点。

### 构建生产版本

```bash
pnpm run build
```

### 启动生产服务器

```bash
pnpm run start
```

## 部署方式

### 1. Vercel 部署（推荐）

Vercel 是 Next.js 官方推荐的部署平台，提供零配置部署。

#### 部署步骤

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 点击 "Deploy"

3. **配置环境变量（如有需要）**
   在 Vercel 项目设置中添加必要的环境变量。

#### 自定义域名

在 Vercel 项目设置中可以配置自定义域名。

### 2. Docker 部署

#### 构建镜像

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN corepack enable pnpm && pnpm run build

# 运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
```

#### 构建和运行

```bash
# 构建镜像
docker build -t temporal-docs-cn .

# 运行容器
docker run -p 3000:3000 temporal-docs-cn
```

### 3. 传统服务器部署

#### 使用 PM2

```bash
# 安装 PM2
npm install -g pm2

# 构建项目
pnpm run build

# 使用 PM2 启动
pm2 start npm --name "temporal-docs" -- start

# 设置开机自启
pm2 startup
pm2 save
```

#### 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name docs.temporal.cn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Netlify 部署

1. **连接 GitHub 仓库到 Netlify**

2. **构建设置**
   - Build command: `pnpm run build`
   - Publish directory: `.next`

3. **环境变量**
   在 Netlify 设置中添加 `NODE_VERSION=18`

### 5. 静态导出部署

Next.js 支持静态导出，可以部署到任何静态托管服务。

#### 配置静态导出

在 `next.config.ts` 中添加：

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

#### 构建和部署

```bash
pnpm run build
```

构建完成后，将 `out` 目录上传到：
- GitHub Pages
- AWS S3 + CloudFront
- 阿里云 OSS
- 腾讯云 COS

## 性能优化

### 1. 启用 ISR (Incremental Static Regeneration)

对于频繁更新的文档页面，可以使用 ISR：

```typescript
export const revalidate = 3600; // 1小时重新生成一次
```

### 2. 图片优化

使用 Next.js Image 组件优化图片加载：

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Temporal Logo"
  width={200}
  height={100}
  priority
/>
```

### 3. 代码分割

Next.js 自动进行代码分割，确保按需加载页面。

### 4. CDN 配置

配置 CDN 加速静态资源：
- Vercel: 自动配置
- 自建: 使用 Cloudflare 或 AWS CloudFront

## 监控和日志

### Vercel Analytics

```bash
pnpm add @vercel/analytics
```

在 `app/layout.tsx` 中添加：

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 错误监控

集成 Sentry 进行错误监控：

```bash
pnpm add @sentry/nextjs
```

## 常见问题

### Q: 构建时内存不足怎么办？

A: 增加 Node.js 内存限制：
```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm run build
```

### Q: 如何添加新的文档页面？

A: 在 `src/app/docs/` 目录下创建新的页面路由：
```
src/app/docs/your-new-page/page.tsx
```

并在 `src/lib/docs-config.ts` 中更新导航配置。

### Q: 如何自定义样式？

A: 修改 `tailwind.config.ts` 和 `src/app/globals.css` 文件。

### Q: 部署后页面显示 404？

A: 检查：
1. 路由是否正确配置
2. 静态导出是否包含所有页面
3. 服务器配置是否正确

## 更新维护

### 更新依赖

```bash
pnpm update
```

### 更新文档内容

1. 编辑 `src/app/docs/` 下的页面文件
2. 提交更改
3. 自动部署触发（使用 Vercel/Netlify）

### 同步官方文档

定期检查 [Temporal 官方文档](https://docs.temporal.io) 的更新，同步到中文版本。

## 贡献指南

欢迎贡献代码和翻译改进！

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 创建 Pull Request

## 许可证

本项目遵循与 Temporal 官方文档相同的许可证。

## 联系方式

- GitHub Issues: [项目 Issues](https://github.com/your-repo/issues)
- 社区: [Temporal Slack](https://temporal.io/slack)

## 相关链接

- [Temporal 官方文档](https://docs.temporal.io)
- [Temporal GitHub](https://github.com/temporalio/temporal)
- [Next.js 文档](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
