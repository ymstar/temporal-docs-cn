import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Python SDK',
  description: '使用 Python 语言开发 Temporal 应用',
};

export default function PythonSDK() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Python SDK</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal Python SDK 让您使用 Python 构建可靠的分布式应用程序。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">快速开始</h3>
        <p className="text-green-700 mb-3">
          安装 Python SDK：
        </p>
        <Card className="bg-gray-900 text-white border-0 inline-block">
          <CardContent className="pt-4">
            <code className="text-sm font-mono">pip install temporalio</code>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心特性</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>装饰器风格</CardTitle>
            <CardDescription>
              使用 Python 装饰器定义工作流和活动，简洁优雅
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>异步支持</CardTitle>
            <CardDescription>
              原生支持 asyncio，充分利用 Python 异步特性
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>类型提示</CardTitle>
            <CardDescription>
              支持 Python 类型提示，提供更好的开发体验
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>动态工作流</CardTitle>
            <CardDescription>
              支持动态工作流定义，灵活应对复杂场景
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">示例：简单工作流</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">workflow.py</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`from datetime import timedelta
from temporalio import workflow

@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return f"Hello, {name}!"`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">相关资源</h3>
        <div className="space-y-3">
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://python.temporal.io" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Python SDK 文档
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://github.com/temporalio/sdk-python" target="_blank" rel="noopener noreferrer">
              <ArrowRight className="mr-2 h-4 w-4" />
              Python SDK GitHub 仓库
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
