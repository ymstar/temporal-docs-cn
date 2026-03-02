# Temporal 中文文档站

Temporal 官方文档的完整中文翻译版本，基于 Next.js 16 和 TypeScript 构建。

![Temporal](https://img.shields.io/badge/Temporal-中文文档-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 项目简介

本项目是 [Temporal](https://temporal.io) 官方文档的中文翻译版本，旨在为中文开发者提供完整的、准确的 Temporal 技术文档。项目采用现代化的技术栈，提供优秀的阅读体验和便捷的导航功能。

## 主要特性

- 📚 **完整的文档结构** - 覆盖快速开始、开发指南、SDK 文档、部署指南等核心板块
- 🎨 **现代化 UI 设计** - 基于 shadcn/ui 的优雅界面
- 🔍 **便捷的导航** - 清晰的侧边栏导航和面包屑
- 📱 **响应式设计** - 支持桌面和移动设备
- ⚡ **高性能** - Next.js 16 的优化和静态生成
- 🔍 **搜索功能** - 内置文档搜索（待完善）
- 🌍 **中文优化** - 针对中文阅读习惯的专业翻译

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS 4
- **包管理器**: pnpm

## 快速开始

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

访问 [http://localhost:5000](http://localhost:5000) 查看站点。

### 构建生产版本

```bash
pnpm run build
```

### 启动生产服务器

```bash
pnpm run start
```

## 部署

本项目支持多种部署方式，详见 [部署指南](./DEPLOYMENT.md)：

- ✅ Vercel（推荐）
- ✅ Docker
- ✅ 传统服务器（PM2 + Nginx）
- ✅ Netlify
- ✅ 静态导出

## 文档内容

### 快速开始

- [什么是 Temporal](./src/app/docs/quickstart/what-is-temporal) - 了解 Temporal 的核心概念
- [安装 Temporal](./src/app/docs/quickstart/install) - 安装 CLI 和本地环境
- [运行第一个工作流](./src/app/docs/quickstart/your-first-workflow) - 5 分钟快速入门
- [Hello World 教程](./src/app/docs/quickstart/hello-world) - 学习基本概念

### 开发指南

- [工作流](./src/app/docs/develop/workflows) - 定义和执行工作流
- [活动](./src/app/docs/develop/activities) - 执行非确定性操作
- [信号](./src/app/docs/develop/signals) - 向工作流发送数据
- [查询](./src/app/docs/develop/queries) - 查询工作流状态

### SDK 指南

- [Go SDK](./src/app/docs/sdk/go) - Go 语言开发指南
- [Java SDK](./src/app/docs/sdk/java) - Java 语言开发指南
- [Python SDK](./src/app/docs/sdk/python) - Python 语言开发指南
- [TypeScript SDK](./src/app/docs/sdk/typescript) - TypeScript 语言开发指南
- [.NET SDK](./src/app/docs/sdk/dotnet) - .NET 开发指南
- [PHP SDK](./src/app/docs/sdk/php) - PHP 开发指南

### 部署文档

- [部署概述](./src/app/docs/cluster-deployment/overview) - 了解部署选项
- 本地部署（待完成）
- Docker 部署（待完成）
- Kubernetes 部署（待完成）

### 资源与社区

- [社区](./src/app/docs/resources/community) - 加入社区获取帮助
- 示例应用（待完成）
- 最佳实践（待完成）
- 常见问题（待完成）

完整的站点目录请查看 [站点目录表](./SITEMAP.md)。

## 项目结构

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── docs/                     # 文档页面
│   │   ├── quickstart/          # 快速开始
│   │   ├── develop/             # 开发指南
│   │   ├── sdk/                 # SDK 指南
│   │   ├── cluster-deployment/  # 部署文档
│   │   ├── cli/                 # CLI 文档
│   │   ├── reference/           # 参考文档
│   │   └── resources/           # 资源与社区
│   └── globals.css              # 全局样式
├── components/                    # React 组件
│   ├── docs/                     # 文档专用组件
│   │   ├── docs-header.tsx      # 文档顶部导航
│   │   ├── docs-sidebar.tsx     # 文档侧边栏
│   │   └── docs-layout.tsx      # 文档布局
│   └── ui/                       # shadcn/ui 基础组件
├── lib/                          # 工具函数
│   ├── docs-config.ts           # 文档导航配置
│   └── utils.ts                 # 工具函数
└── hooks/                        # React Hooks
```

## 贡献指南

我们欢迎任何形式的贡献！

### 如何贡献

1. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/temporal-docs-cn.git
   cd temporal-docs-cn
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **进行修改**
   - 添加新的文档页面
   - 修正翻译错误
   - 改进代码质量
   - 更新文档

4. **提交更改**
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

5. **推送到 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**
   - 访问原始仓库
   - 点击 "New Pull Request"
   - 描述你的更改

### 贡献规范

- 翻译应准确、专业、符合中文表达习惯
- 代码应遵循项目的代码风格
- 提交信息应清晰描述更改内容
- 测试确保功能正常工作

## 术语对照表

| 英文 | 中文 |
|-----|------|
| Workflow | 工作流 |
| Activity | 活动 |
| Worker | Worker（保持原称） |
| Signal | 信号 |
| Query | 查询 |
| Execution | 执行 |
| Namespace | 命名空间 |

更多术语请参考 [站点目录表](./SITEMAP.md)。

## 常见问题

### Q: 如何添加新的文档页面？

A: 在 `src/app/docs/` 目录下创建新的页面路由，并在 `src/lib/docs-config.ts` 中更新导航配置。

### Q: 如何自定义样式？

A: 修改 `tailwind.config.ts` 和 `src/app/globals.css` 文件。

### Q: 构建时出现错误怎么办？

A: 检查：
1. 依赖是否正确安装：`pnpm install`
2. 代码语法是否正确
3. 查看错误日志

## 相关链接

- [Temporal 官方文档](https://docs.temporal.io)
- [Temporal GitHub](https://github.com/temporalio/temporal)
- [Temporal 文档仓库](https://github.com/temporalio/documentation)
- [Next.js 文档](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 许可证

本项目遵循与 Temporal 官方文档相同的许可证。

## 致谢

感谢 [Temporal](https://temporal.io) 团队提供的优秀产品和技术文档。

感谢所有贡献者的辛勤付出！

## 联系方式

- GitHub Issues: [项目 Issues](https://github.com/your-repo/temporal-docs-cn/issues)
- Email: temporal-docs-cn@example.com

---

**开始使用 Temporal 构建可靠的分布式应用吧！** 🚀
