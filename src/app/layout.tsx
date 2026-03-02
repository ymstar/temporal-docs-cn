import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Temporal 中文文档 | 可靠的分布式任务编排平台',
    template: '%s | Temporal 中文文档',
  },
  description:
    'Temporal 是一个开源的、可靠的分布式任务编排平台。本站提供 Temporal 的完整中文文档，包括快速开始、开发指南、SDK 参考、部署文档等内容。',
  keywords: [
    'Temporal',
    'Temporal 文档',
    'Temporal 中文',
    '分布式系统',
    '工作流',
    'Workflow',
    '任务编排',
    '微服务',
    'Go SDK',
    'Java SDK',
    'Python SDK',
    'TypeScript SDK',
  ],
  authors: [{ name: 'Temporal Community', url: 'https://temporal.io' }],
  generator: 'Next.js',
  openGraph: {
    title: 'Temporal 中文文档',
    description: 'Temporal 是一个开源的、可靠的分布式任务编排平台',
    url: 'https://temporal-docs-cn.vercel.app',
    siteName: 'Temporal 中文文档',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
