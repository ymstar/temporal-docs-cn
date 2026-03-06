import Link from 'next/link';
import { ArrowRight, Container, Terminal, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Docker 部署',
  description: '使用 Docker 部署 Temporal',
};

export default function DockerDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Docker 部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        官方推荐在本地或测试环境中使用 Docker Compose 部署 Temporal Service。
        生产环境建议使用更完整的部署方案。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">快速开始（官方样例）</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`# 获取官方 samples-server
 git clone https://github.com/temporalio/samples-server.git
 cd samples-server

# 使用 docker-compose 启动 Temporal
 docker compose up`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">端口说明</h2>
      <ul className="space-y-2">
        <li>Temporal Frontend: `7233`</li>
        <li>Temporal Web UI: `8233`</li>
      </ul>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              注意事项
            </CardTitle>
          </CardHeader>
          <CardContent>
            官方文档强调示例 Docker 配置适用于开发或测试，不建议直接暴露在公网环境。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">更多参考</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/deployment" target="_blank" rel="noreferrer">
            Self-hosted deployment guide
          </Link>
        </li>
        <li>
          <Link href="https://github.com/temporalio/samples-server" target="_blank" rel="noreferrer">
            temporalio/samples-server
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
          <Link href="/docs/cluster-deployment/security">
            <Terminal className="mr-2 h-4 w-4" />
            查看安全配置
          </Link>
        </Button>
      </div>
    </div>
  );
}
