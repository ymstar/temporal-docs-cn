import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'TypeScript SDK',
  description: '使用 TypeScript 语言开发 Temporal 应用',
};

export default function TypeScriptSDK() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">TypeScript SDK</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal TypeScript SDK 让您使用 TypeScript/JavaScript 构建可靠的分布式应用程序。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">快速开始</h3>
        <p className="text-green-700 mb-3">
          安装 TypeScript SDK：
        </p>
        <Card className="bg-gray-900 text-white border-0 inline-block">
          <CardContent className="pt-4">
            <code className="text-sm font-mono">npm install @temporalio/client @temporalio/worker @temporalio/workflow</code>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心特性</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>强类型支持</CardTitle>
            <CardDescription>
              完整的 TypeScript 类型定义，提供出色的开发体验
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>异步/等待</CardTitle>
            <CardDescription>
              使用现代 async/await 语法，简洁直观
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>装饰器</CardTitle>
            <CardDescription>
              使用装饰器定义工作流和活动，代码清晰
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>自动序列化</CardTitle>
            <CardDescription>
              自动序列化/反序列化工作流数据
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">示例：简单工作流</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">workflows.ts</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import { defineQuery, setHandler, workflow } from '@temporalio/workflow';

export async function greetingWorkflow(name: string): Promise&lt;string&gt; {
  return \`Hello, \${name}!\`;
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">相关资源</h3>
        <div className="space-y-3">
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://typescript.temporal.io" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              TypeScript SDK 文档
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://github.com/temporalio/sdk-typescript" target="_blank" rel="noopener noreferrer">
              <ArrowRight className="mr-2 h-4 w-4" />
              TypeScript SDK GitHub 仓库
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
