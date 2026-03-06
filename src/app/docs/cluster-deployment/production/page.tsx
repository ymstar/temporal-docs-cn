import Link from 'next/link';
import { ArrowRight, Server, CheckCircle, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '生产部署',
  description: '在生产环境中部署 Temporal',
};

export default function ProductionDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">生产部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 上线到生产通常包含两部分：部署应用代码（Workers）以及提供
        生产级 Temporal Service。官方文档建议在生产环境中采用标准化部署和
        运维流程。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">部署选项</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Temporal Cloud
            </CardTitle>
          </CardHeader>
          <CardContent>
            官方托管服务，减少自建运维成本，适合希望快速上线的团队。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Self-hosted
            </CardTitle>
          </CardHeader>
          <CardContent>
            自建 Temporal Service，适合对控制权与合规要求更高的场景。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">使用 Temporal Cloud</h2>
      <p className="text-lg text-gray-700 mb-4">
        如果你希望尽量减少自建运维成本，可以优先考虑 Temporal Cloud：
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>在 Temporal Cloud 控制台创建 Namespace，并为不同环境（dev/stage/prod）分配独立命名空间。</li>
        <li>在应用配置中为 Client 指定 Cloud Endpoint、Namespace 与证书/TLS 配置。</li>
        <li>将 Worker 部署在你熟悉的运行环境（Kubernetes、VM、Serverless 等），只需保证能安全访问 Cloud Endpoint。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">自建 Temporal Service（Self-hosted）</h2>
      <p className="text-lg text-gray-700 mb-4">
        如果你有严格的合规、网络隔离或成本考量，可以选择自建 Temporal Service：
      </p>
      <ul className="space-y-2 text-gray-700 mb-6">
        <li>参考「本地部署」「Docker 部署」「Kubernetes 部署」章节选择合适的部署形态。</li>
        <li>在正式生产前，至少完成高可用数据库、持久化存储与多副本 Temporal 服务的部署。</li>
        <li>将 UI 与 Admin API 暴露在受控的运维网络中，避免直接对公网开放。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">Worker 部署模式</h2>
      <p className="text-lg text-gray-700 mb-4">
        无论是 Cloud 还是 Self-hosted，Worker 都由你自行部署与扩缩容。实践中常见的几种模式：
      </p>
      <ul className="space-y-2 text-gray-700 mb-6">
        <li>按业务域划分多个 Task Queue，每个队列由独立的 Worker 进程或 Deployment 负责。</li>
        <li>在 Kubernetes 中将 Worker 作为 Deployment，通过 HPA 或自定义指标自动扩缩容。</li>
        <li>使用不同的 Build ID 与部署组，实现灰度发布与按版本回滚。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">上线前检查清单</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              可靠性验证
            </CardTitle>
          </CardHeader>
          <CardContent>
            结合故障注入、容量测试、回滚演练验证系统弹性。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              安全与合规
            </CardTitle>
          </CardHeader>
          <CardContent>
            落实 TLS/mTLS、认证授权与访问隔离，确保敏感数据安全。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              运维准备
            </CardTitle>
          </CardHeader>
          <CardContent>
            完成监控、告警、容量规划与升级策略的准备。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/production-deployment" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Production deployment
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/production-deployments" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Production deployments (Self-hosted)
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/production-checklist" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Production checklist
          </Link>
        </li>
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/cluster-deployment/security">
            <ArrowRight className="mr-2 h-4 w-4" />
            查看安全指南
          </Link>
        </Button>
      </div>
    </div>
  );
}
