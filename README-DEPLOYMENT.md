# 部署指南

本文档介绍如何自定义开发端口以及如何部署项目。

## 📖 目录

1. [自定义本地开发端口](#1-自定义本地开发端口)
2. [部署到 GitHub Pages](#2-部署到-github-pages)
3. [部署到 Vercel（推荐）](#3-部署到-vercel推荐)

---

## 1. 自定义本地开发端口

### 快速开始

```bash
# 使用自定义端口 3000
PORT=3000 pnpm dev

# 使用自定义端口 8080
PORT=8080 coze dev
```

### 详细说明

请参阅 [CUSTOM_PORT.md](./CUSTOM_PORT.md) 获取完整文档。

**主要方法：**
- 通过环境变量临时修改（推荐）
- 修改 `scripts/dev.sh` 永久修改
- 使用 `.env.local` 文件

**注意事项：**
- ⚠️ 端口 9000 被系统保留，禁止使用
- 部署环境必须使用 **5000** 端口（不可修改）

---

## 2. 部署到 GitHub Pages

### 快速开始

#### 方法 A：使用自动配置脚本（推荐）

```bash
# 配置 GitHub Pages 部署（将 temporal-docs-cn 替换为你的仓库名）
./scripts/setup-github-pages.sh temporal-docs-cn

# 本地测试
pnpm build && npx serve out -p 3000

# 提交并推送
git add .
git commit -m "chore: setup GitHub Pages deployment"
git push origin main
```

#### 方法 B：手动配置

1. 修改 `next.config.ts` 添加静态导出配置
2. GitHub Actions 已配置在 `.github/workflows/deploy.yml`
3. 在 GitHub 仓库设置中启用 Pages

### 详细说明

请参阅 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整文档。

**限制：**
- ❌ 不支持 API Routes
- ❌ 不支持 ISR（增量静态再生）
- ❌ 不支持服务器端功能
- ✅ 仅适用于纯静态文档站点

**配置文件：**
- `next.config.github-pages.ts` - GitHub Pages 配置示例
- `.github/workflows/deploy.yml` - GitHub Actions 工作流
- `scripts/setup-github-pages.sh` - 自动配置脚本

---

## 3. 部署到 Vercel（推荐）

### 快速开始

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 导入你的 GitHub 仓库
4. 点击 "Deploy"

**就这么简单！** 🎉

### 优点

- ✅ Next.js 官方推荐
- ✅ 自动部署，零配置
- ✅ 支持所有 Next.js 功能（API、ISR 等）
- ✅ 免费额度足够使用
- ✅ 全球 CDN 加速

### 详细说明

请参阅 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整文档。

---

## 📊 部署方案对比

| 特性 | 本地开发 | GitHub Pages | Vercel |
|------|----------|--------------|--------|
| 设置难度 | ⭐ 简单 | ⭐⭐⭐ 复杂 | ⭐ 简单 |
| Next.js 支持 | ✅ 完整支持 | ⚠️ 仅静态 | ✅ 完整支持 |
| API Routes | ✅ 支持 | ❌ 不支持 | ✅ 支持 |
| ISR | ✅ 支持 | ❌ 不支持 | ✅ 支持 |
| 免费额度 | N/A | ✅ 有限制 | ✅ 慷慨 |
| 自定义域名 | N/A | ✅ 支持 | ✅ 支持 |
| 部署速度 | N/A | 🐢 较慢 | ⚡ 快 |
| 推荐场景 | 开发调试 | 纯静态文档 | 生产部署 |

---

## 🎯 推荐方案

### 根据项目类型选择

**项目类型：纯静态文档站**
- 本地开发：使用自定义端口
- 生产部署：GitHub Pages 或 Vercel

**项目类型：需要 API 或服务器功能**
- 本地开发：使用自定义端口
- 生产部署：**Vercel**（必须）

**项目类型：企业级应用**
- 本地开发：使用自定义端口
- 生产部署：**Vercel Pro** 或自建服务器

---

## 📚 相关文档

- [自定义端口说明](./CUSTOM_PORT.md)
- [GitHub Pages 部署指南](./DEPLOYMENT.md)
- [Next.js 官方文档](https://nextjs.org/docs)

---

## 🆘 常见问题

### Q1: 自定义端口后无法访问？

**A:** 检查端口是否被占用：
```bash
# 检查端口占用
lsof -i :3000

# 或使用 ss 命令
ss -lntp | grep 3000
```

### Q2: GitHub Pages 部署后样式丢失？

**A:** 检查 `basePath` 配置是否正确：
```typescript
// next.config.ts
basePath: '/your-repo-name',  // 必须与仓库名一致
assetPrefix: '/your-repo-name',  // 必须与 basePath 一致
```

### Q3: Vercel 部署后 404 错误？

**A:** 检查：
1. 仓库是否已连接到 Vercel
2. 构建命令是否正确：`pnpm build`
3. 输出目录是否正确：`.next`
4. 是否有构建错误（查看 Vercel 日志）

### Q4: 如何回滚 GitHub Pages 配置？

**A:**
```bash
# 恢复备份
cp next.config.ts.backup next.config.ts

# 或使用 Git 回滚
git checkout HEAD -- next.config.ts
```

---

## 📞 获取帮助

如果遇到问题，请：
1. 查看相关文档
2. 检查 GitHub Actions 日志
3. 查看控制台错误信息
4. 提交 Issue 到仓库

---

**最后更新：** 2026-02-28
