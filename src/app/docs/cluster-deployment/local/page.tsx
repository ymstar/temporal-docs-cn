import Link from 'next/link';
import { ArrowRight, Laptop, Database, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '本地部署',
  description: '在本地运行 Temporal 集群',
};

export default function LocalDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">本地部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        如果你在开发 Temporal 应用，官方建议优先使用 Temporal CLI 的开发服务器。
        它会同时启动 Temporal Server 与 Web UI，适合本地开发和 CI 验证。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">快速启动</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`# 启动开发服务器（内存数据库）
temporal server start-dev

# 默认地址
# Temporal Frontend: localhost:7233
# Temporal Web UI:   http://localhost:8233`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">持久化本地数据</h2>
      <p>
        默认 `start-dev` 使用内存数据库，停止后数据会丢失。需要保留数据时，
        使用 `--db-filename` 指定 SQLite 文件。
      </p>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`# 使用本地 SQLite 文件持久化
temporal server start-dev --db-filename temporal.db`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5" />
              适用场景
            </CardTitle>
          </CardHeader>
          <CardContent>
            本地开发、集成测试、CI 预检、示例演示。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              不适用场景
            </CardTitle>
          </CardHeader>
          <CardContent>
            生产环境或需要高可用、严格安全策略的环境。请使用 Temporal Cloud 或 Self-hosted 生产部署。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/cli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Temporal CLI 命令参考（start-dev）
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/self-hosted-guide" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Self-hosted guide（开发与生产边界）
          </Link>
        </li>
        <li>
          <Link 
            href="https://github.com/temporalio/documentation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            temporalio/documentation 仓库
          </Link>
        </li>
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/cluster-deployment/overview">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回部署概述
          </Link>
        </Button>
        <Button asChild variant="outline" className="ml-3">
          <Link href="/docs/cluster-deployment/production">
            <Database className="mr-2 h-4 w-4" />
            查看生产部署
          </Link>
        </Button>
      </div>
    </div>
  );
}
