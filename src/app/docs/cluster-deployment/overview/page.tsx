import Link from 'next/link';
import { ArrowRight, Server, Shield, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '部署概述',
  description: '了解 Temporal 集群部署选项',
};

export default function DeploymentOverview() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">部署概述</h1>
      <p className="text-xl text-gray-600 mb-8">
        了解如何在不同环境中部署和管理 Temporal 集群。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">部署选项</h3>
        <p className="text-blue-700">
          Temporal 支持多种部署方式，从本地开发环境到生产级 Kubernetes 集群，
          您可以根据需求选择合适的部署方案。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">部署选项对比</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card className="border-2 border-blue-200 hover:border-blue-500 transition-colors">
          <CardHeader>
            <Server className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>本地部署</CardTitle>
            <CardDescription>
              适合开发和测试，快速启动
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ 使用 Docker Compose</li>
              <li>✓ 单机运行</li>
              <li>✓ 内置 PostgreSQL</li>
              <li>✓ Web UI 开箱即用</li>
              <li>✗ 不适合生产环境</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/docs/cluster-deployment/local">
                查看本地部署
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 hover:border-green-500 transition-colors">
          <CardHeader>
            <Cloud className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Docker 部署</CardTitle>
            <CardDescription>
              适合小型生产环境，易于管理
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ 容器化部署</li>
              <li>✓ 支持外部数据库</li>
              <li>✓ 易于扩展</li>
              <li>✓ 适合单服务器</li>
              <li>✗ 有限的高可用性</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/docs/cluster-deployment/docker">
                查看 Docker 部署
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 hover:border-purple-500 transition-colors">
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Kubernetes 部署</CardTitle>
            <CardDescription>
              适合大规模生产环境，高可用
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ 完整的高可用性</li>
              <li>✓ 自动扩展</li>
              <li>✓ 服务发现</li>
              <li>✓ 自愈能力</li>
              <li>✓ 企业级功能</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/docs/cluster-deployment/kubernetes">
                查看 Kubernetes 部署
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心组件</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temporal Server</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              核心服务，负责工作流和活动的编排、状态管理和事件历史记录。
              它包含 Frontend Service、History Service 和 Matching Service。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">数据存储</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Temporal Server 使用 PostgreSQL、MySQL 或 Cassandra 作为后端数据存储，
              保存工作流状态、事件历史和元数据。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temporal Web UI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              提供可视化的 Web 界面，用于查看工作流执行历史、搜索工作流、
              调试问题和监控集群状态。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              运行工作流和活动代码的进程。Workers 连接到 Temporal Server，
              接收任务并执行实际的业务逻辑。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">系统要求</h2>

      <div className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">最低要求</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">CPU</h4>
            <p className="text-sm text-gray-600">2 核（开发）/ 4 核（生产）</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">内存</h4>
            <p className="text-sm text-gray-600">4GB（开发）/ 8GB（生产）</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">磁盘</h4>
            <p className="text-sm text-gray-600">20GB SSD</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">网络</h4>
            <p className="text-sm text-gray-600">1 Gbps</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">数据库选择</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">PostgreSQL</CardTitle>
            <CardDescription className="text-sm">推荐用于生产环境</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              开源、功能强大、性能优异。是 Temporal 官方推荐的生产数据库。
            </p>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              推荐
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">MySQL</CardTitle>
            <CardDescription className="text-sm">广泛支持</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              流行的关系型数据库，与 PostgreSQL 类似的功能和性能。
            </p>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              支持
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cassandra</CardTitle>
            <CardDescription className="text-sm">大规模部署</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              分布式 NoSQL 数据库，适合超大规模部署场景。
            </p>
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              可选
            </span>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">高可用性考虑</h2>

      <div className="space-y-4 my-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div>
            <h3 className="font-semibold mb-1">多副本部署</h3>
            <p className="text-gray-600 text-sm">
              部署多个 Temporal Server 副本，确保服务高可用性。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div>
            <h3 className="font-semibold mb-1">数据库集群</h3>
            <p className="text-gray-600 text-sm">
              使用数据库主从复制或集群模式，确保数据持久化和高可用性。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <div>
            <h3 className="font-semibold mb-1">负载均衡</h3>
            <p className="text-gray-600 text-sm">
              使用负载均衡器分发流量，提高系统吞吐量和可用性。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            4
          </div>
          <div>
            <h3 className="font-semibold mb-1">监控和告警</h3>
            <p className="text-gray-600 text-sm">
              配置监控和告警系统，及时发现和处理问题。
            </p>
          </div>
        </div>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">选择您的部署方式</h3>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="/docs/cluster-deployment/local">
              <ArrowRight className="mr-2 h-4 w-4" />
              本地部署（开发环境）
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/cluster-deployment/docker">
              <ArrowRight className="mr-2 h-4 w-4" />
              Docker 部署（小型生产环境）
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/cluster-deployment/kubernetes">
              <ArrowRight className="mr-2 h-4 w-4" />
              Kubernetes 部署（大规模生产环境）
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/cluster-deployment/security">
              <Shield className="mr-2 h-4 w-4" />
              安全最佳实践
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
