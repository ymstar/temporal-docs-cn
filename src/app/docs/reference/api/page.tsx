import Link from 'next/link';
import { BookOpen, Code, ExternalLink, Boxes } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'API 参考',
  description: 'Temporal 平台与各语言 SDK 的 API 参考索引',
};

export default function ApiReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">API 参考</h1>
      <p className="text-xl text-gray-600 mb-8">
        本页汇总 Temporal 平台和各语言 SDK 的 API 参考入口，方便你在阅读概念文档之后，
        快速查找具体类型、方法与参数说明。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">如何使用本页</h2>
        <p className="text-blue-700">
          如果你在阅读「工作流」「活动」「版本控制」等章节时遇到具体 API 名称，
          可以回到这里，跳转到对应 SDK 或平台的 API 参考进行详细查阅。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">平台参考文档</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              平台参考总览
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-3">
              包含错误枚举、操作列表、搜索属性等平台级别的参考信息。
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://docs.temporal.io/reference"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Temporal Reference
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.temporal.io/references/errors"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Errors Reference
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.temporal.io/references/operation-list"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Operation List
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-purple-600" />
              数据与可观测性
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-3">
              工作流数据模型、搜索属性和可观测性相关的参考文档。
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://docs.temporal.io/search-attribute"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Search Attributes
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.temporal.io/observability"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Observability
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">各语言 SDK API 参考</h2>
      <p className="text-lg text-gray-700 mb-4">
        Temporal 的 SDK 会为每种语言提供独立的 API 参考站点，涵盖 Workflow、Activity、
        Client、Worker 等全部类型和方法定义。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-green-600" />
              Go SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">Go 语言 SDK 的完整 API 参考。</p>
            <Link
              href="https://pkg.go.dev/go.temporal.io/sdk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              pkg.go.dev/go.temporal.io/sdk
              <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-orange-600" />
              Java SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">Java SDK 的类与方法参考。</p>
            <Link
              href="https://t.mp/java-api"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              Java API Reference
              <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              TypeScript SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">TypeScript SDK 的类型与函数参考。</p>
            <Link
              href="https://typescript.temporal.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              typescript.temporal.io
              <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-yellow-600" />
              Python SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">Python SDK 的模块与类参考。</p>
            <Link
              href="https://python.temporal.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              python.temporal.io
              <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-indigo-600" />
              .NET SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">.NET SDK 的 API 参考。</p>
            <Link
              href="https://dotnet.temporal.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              dotnet.temporal.io
              <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-pink-600" />
              PHP / Ruby SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-gray-700 mb-2">PHP 与 Ruby SDK 的 API 与命名空间参考。</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://php.temporal.io/namespaces/temporal.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  php.temporal.io
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://ruby.temporal.io"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  ruby.temporal.io
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">与概念文档配合使用</h2>
      <p className="text-lg text-gray-700 mb-4">
        建议先在「开发指南」和「SDK 指南」中理解核心概念与最佳实践，
        再通过本页跳转到具体 API 细节。这样既能保持宏观理解，又能在需要时查到精确信息。
      </p>
    </div>
  );
}

