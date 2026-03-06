import Link from 'next/link';
import { ArrowRight, Layers, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Kubernetes 部署',
  description: '在 Kubernetes 上部署 Temporal',
};

export default function KubernetesDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Kubernetes 部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        官方推荐使用 Helm Charts 在 Kubernetes 集群中部署 Temporal Service，
        便于管理版本、配置与扩展。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">Helm Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              官方 Helm Charts
            </CardTitle>
          </CardHeader>
          <CardContent>
            Temporal Helm Charts 提供 Kubernetes 环境下的标准化部署模板，支持
            多组件拆分、持久化配置与可观测性接入。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              版本兼容性
            </CardTitle>
          </CardHeader>
          <CardContent>
            官方文档强调 Helm Chart 版本与 Temporal Server 镜像需要匹配，
            升级前务必核对兼容矩阵。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">参考链接</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/deployment" target="_blank" rel="noreferrer">
            Self-hosted deployment guide
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/production-deployments" target="_blank" rel="noreferrer">
            Production deployments
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
      </div>
    </div>
  );
}
