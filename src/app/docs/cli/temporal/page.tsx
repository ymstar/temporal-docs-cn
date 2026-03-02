import Link from 'next/link';
import { Terminal, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'temporal 命令参考',
  description: 'temporal CLI 命令参考',
};

export default function TemporalCLIPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">temporal CLI</h1>
        <p className="text-xl text-gray-600">
          新一代 Temporal 命令行工具，提供更简洁的命令和更好的用户体验
        </p>
      </div>

      <div className="prose prose-gray max-w-none mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">推荐使用</p>
              <p className="text-blue-700">
                temporal CLI 是官方推荐的新一代命令行工具，提供更好的用户体验和更简洁的命令语法。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>工作流命令</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">启动工作流</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal workflow start --workflow-id my-workflow --task-queue my-task-queue --type MyWorkflow</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查询工作流</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal workflow execute --workflow-id my-workflow --query --query-type MyQuery</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">终止工作流</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal workflow terminate --workflow-id my-workflow</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>命名空间命令</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">列出命名空间</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal namespace list</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">创建命名空间</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal namespace create --namespace my-namespace</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>搜索命令</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">搜索工作流执行</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal workflow list --query "TaskQueue='my-task-queue'"</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查看工作流历史</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal workflow execute --workflow-id my-workflow --history</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>集群命令</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">查看集群信息</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal cluster health</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查看工作队列信息</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>temporal task-queue describe --task-queue my-task-queue</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/docs/cli">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            返回 CLI 概述
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs/cli/tctl">
            查看 tctl 命令
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
