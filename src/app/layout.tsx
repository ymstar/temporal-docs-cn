import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { Analytics } from "@vercel/analytics/next"
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Temporal 中文文档 | 可靠的分布式任务编排平台',
    template: '%s | Temporal 中文文档',
  },
  description:
    'Temporal 是一个开源的、可靠的分布式任务编排平台。本站提供 Temporal 的完整中文文档，包括快速开始、开发指南、SDK 参考、部署文档等内容。',
  alternates: {
    canonical: 'https://www.temporalcn.site/',
  },
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
    '.NET SDK',
    'PHP SDK',
    '分布式任务',
    '可靠系统',
  ],
  authors: [{ name: 'Temporal Community', url: 'https://temporal.io' }],
  generator: 'Next.js',
  openGraph: {
    title: 'Temporal 中文文档',
    description: 'Temporal 是一个开源的、可靠的分布式任务编排平台',
    url: 'https://www.temporalcn.site/',
    siteName: 'Temporal 中文文档',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://www.temporalcn.site/images/diagrams/workflow-architecture.svg',
        width: 1200,
        height: 630,
        alt: 'Temporal 工作流架构',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temporal 中文文档',
    description: 'Temporal 是一个开源的、可靠的分布式任务编排平台',
    images: ['https://www.temporalcn.site/images/diagrams/workflow-architecture.svg'],
    creator: '@temporalio',
  },
  robots: {
    index: true,
    follow: true,
  },

  other: {
    'google-site-verification': 'LEouqVzV1M4zEHYJVLQUVQ2v2lPd0991DuzWtF-2QNo',
    'theme-color': '#3b82f6',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <head>
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Temporal 中文文档',
              url: 'https://www.temporalcn.site',
              description: 'Temporal 是一个开源的、可靠的分布式任务编排平台。本站提供 Temporal 的完整中文文档，包括快速开始、开发指南、SDK 参考、部署文档等内容。',
              publisher: {
                '@type': 'Organization',
                name: 'Temporal Community',
                url: 'https://temporal.io',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.temporalcn.site/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XV2CN1MKXH"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XV2CN1MKXH');
          `
      }} />
      <body className="antialiased">
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
