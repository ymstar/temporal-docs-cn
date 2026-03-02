export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  href: string;
  description?: string;
  items?: DocItem[];
  badge?: string;
}

export const docsNavigation: DocSection[] = [
  {
    title: "快速开始",
    items: [
      { title: "什么是 Temporal", href: "/docs/quickstart/what-is-temporal", description: "了解 Temporal 的核心概念和价值" },
      { title: "安装 Temporal", href: "/docs/quickstart/install", description: "安装 Temporal CLI 和本地开发环境" },
      { title: "运行第一个工作流", href: "/docs/quickstart/your-first-workflow", description: "在 5 分钟内创建并运行第一个工作流" },
      { title: "Hello World", href: "/docs/quickstart/hello-world", description: "学习 Temporal 的基本概念" },
    ],
  },
  {
    title: "开发指南",
    items: [
      { 
        title: "工作流", 
        href: "/docs/develop/workflows",
        description: "定义和执行工作流",
        items: [
          { title: "工作流定义", href: "/docs/develop/workflows/definition" },
          { title: "工作流执行", href: "/docs/develop/workflows/execution" },
          { title: "工作流确定性", href: "/docs/develop/workflows/determinism" },
        ],
      },
      { 
        title: "活动", 
        href: "/docs/develop/activities",
        description: "在活动中执行代码",
        items: [
          { title: "活动定义", href: "/docs/develop/activities/definition" },
          { title: "活动重试", href: "/docs/develop/activities/retry" },
          { title: "活动超时", href: "/docs/develop/activities/timeout" },
        ],
      },
      { 
        title: "工作流与活动", 
        href: "/docs/develop/workflow-activities",
        description: "组合工作流和活动",
      },
      { 
        title: "信号", 
        href: "/docs/develop/signals",
        description: "向运行中的工作流发送数据",
      },
      { 
        title: "查询", 
        href: "/docs/develop/queries",
        description: "查询工作流状态",
      },
      { 
        title: "更新", 
        href: "/docs/develop/updates",
        description: "同步更新工作流状态",
      },
    ],
  },
  {
    title: "SDK 指南",
    items: [
      { title: "Go SDK", href: "/docs/sdk/go", description: "使用 Go 语言开发 Temporal 应用" },
      { title: "Java SDK", href: "/docs/sdk/java", description: "使用 Java 语言开发 Temporal 应用" },
      { title: "Python SDK", href: "/docs/sdk/python", description: "使用 Python 语言开发 Temporal 应用" },
      { title: "TypeScript SDK", href: "/docs/sdk/typescript", description: "使用 TypeScript 语言开发 Temporal 应用" },
      { title: ".NET SDK", href: "/docs/sdk/dotnet", description: "使用 .NET 开发 Temporal 应用" },
      { title: "PHP SDK", href: "/docs/sdk/php", description: "使用 PHP 开发 Temporal 应用" },
    ],
  },
  {
    title: "部署",
    items: [
      { title: "部署概述", href: "/docs/cluster-deployment/overview", description: "了解 Temporal 集群部署选项" },
      { title: "本地部署", href: "/docs/cluster-deployment/local", description: "在本地运行 Temporal 集群" },
      { title: "生产部署", href: "/docs/cluster-deployment/production", description: "在生产环境中部署 Temporal" },
      { title: "Docker 部署", href: "/docs/cluster-deployment/docker", description: "使用 Docker 部署 Temporal" },
      { title: "Kubernetes 部署", href: "/docs/cluster-deployment/kubernetes", description: "在 Kubernetes 上部署 Temporal" },
      { title: "配置", href: "/docs/cluster-deployment/configuration", description: "配置 Temporal 服务器" },
      { title: "安全", href: "/docs/cluster-deployment/security", description: "Temporal 安全最佳实践" },
    ],
  },
  {
    title: "Temporal CLI",
    items: [
      { title: "CLI 概述", href: "/docs/cli", description: "Temporal 命令行工具概览" },
      { title: "tctl 命令参考", href: "/docs/cli/tctl", description: "tctl 命令完整参考" },
      { title: "temporal 命令参考", href: "/docs/cli/temporal", description: "temporal CLI 命令参考" },
    ],
  },
  {
    title: "参考文档",
    items: [
      { title: "API 参考", href: "/docs/reference/api", description: "Temporal API 完整参考" },
      { title: "数据模型", href: "/docs/reference/data-model", description: "Temporal 数据模型" },
      { title: "错误处理", href: "/docs/reference/error-handling", description: "错误处理最佳实践" },
      { title: "版本控制", href: "/docs/reference/versioning", description: "工作流版本控制" },
      { title: "可观测性", href: "/docs/reference/observability", description: "指标、日志和追踪" },
    ],
  },
  {
    title: "资源与社区",
    items: [
      { title: "示例应用", href: "/docs/resources/sample-apps", description: "示例应用程序和教程" },
      { title: "最佳实践", href: "/docs/resources/best-practices", description: "Temporal 开发最佳实践" },
      { title: "常见问题", href: "/docs/resources/faq", description: "常见问题解答" },
      { title: "贡献指南", href: "/docs/resources/contributing", description: "如何贡献文档" },
      { title: "社区", href: "/docs/resources/community", description: "加入 Temporal 社区" },
      { title: "更新日志", href: "/docs/resources/changelog", description: "Temporal 更新日志" },
    ],
  },
];

export const getDocSections = () => docsNavigation;

export const getAllDocs = (): DocItem[] => {
  const allDocs: DocItem[] = [];
  docsNavigation.forEach(section => {
    section.items.forEach(item => {
      allDocs.push(item);
      if (item.items) {
        allDocs.push(...item.items);
      }
    });
  });
  return allDocs;
};
