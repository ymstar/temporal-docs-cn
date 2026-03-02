import Link from 'next/link';
import { Terminal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Temporal CLI 概述',
  description: 'Temporal 命令行工具概览',
};

export default function CLIOverviewPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Temporal CLI 概述</h1>
        <p className="text-xl text-gray-600">
          Temporal 提供了功能强大的命令行界面（CLI），用于管理 Temporal 集群和应用程序。
        </p>
      </div>

      <div className="prose prose-gray max-w-none mb-12">
        <p className="text-lg leading-relaxed">
          Temporal CLI 包含两个主要命令：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
          <li><strong>tctl</strong>：用于管理 Temporal 集群的传统 CLI 工具</li>
          <li><strong>temporal</strong>：新一代 CLI 工具，提供更现代的用户体验</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Terminal className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>tctl</CardTitle>
            </div>
            <CardDescription>
              管理和监控 Temporal 集群的经典命令行工具
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/docs/cli/tctl">
                查看命令参考
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Terminal className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle>temporal</CardTitle>
            </div>
            <CardDescription>
              新一代 CLI 工具，提供更简洁的命令和更好的用户体验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/docs/cli/temporal">
                查看命令参考
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">安装 CLI 工具</h2>
        <p className="text-lg text-gray-700 mb-4">
          Temporal CLI 工具可以通过多种方式安装：
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>使用 Homebrew 安装（macOS/Linux）</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>brew install temporal</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>使用 npm 安装</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>npm install -g @temporalio/cli</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>从二进制文件安装</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              从 <a href="https://github.com/temporalio/cli/releases" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Releases</a> 下载适合您操作系统的二进制文件。
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 mt-8">使用场景</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">管理工作流执行</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                启动、停止、查询和终止工作流执行
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">监控集群状态</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                查看集群健康状态、工作队列和任务处理情况
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">搜索和过滤</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                搜索工作流执行、事件历史和错误信息
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">命名空间管理</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                创建、更新和删除命名空间
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
