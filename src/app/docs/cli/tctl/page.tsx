import Link from 'next/link';
import { Terminal, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'tctl 命令参考',
  description: 'tctl 命令完整参考',
};

export default function TctlReferencePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">tctl 命令参考</h1>
        <p className="text-xl text-gray-600">
          tctl 是管理和监控 Temporal 集群的经典命令行工具
        </p>
      </div>

      <div className="prose prose-gray max-w-none mb-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800">注意</p>
              <p className="text-yellow-700">
                tctl 是传统工具，推荐新项目使用 <Link href="/docs/cli/temporal" className="underline">temporal CLI</Link>。
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
                <code>tctl workflow start --workflow_id my-workflow --task_queue my-task-queue MyWorkflow</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查询工作流</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>tctl workflow query --workflow_id my-workflow --query_type MyQuery</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">终止工作流</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>tctl workflow terminate --workflow_id my-workflow</code>
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
                <code>tctl namespace list</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">注册命名空间</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>tctl namespace register --namespace my-namespace</code>
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
                <code>tctl workflow list --query "TaskQueue='my-task-queue'"</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查看工作流历史</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>tctl workflow show --workflow_id my-workflow</code>
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
                <code>tctl cluster health</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">查看系统信息</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>tctl cluster describe</code>
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
        <Button asChild>
          <Link href="/docs/cli/temporal">
            查看 temporal CLI
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
