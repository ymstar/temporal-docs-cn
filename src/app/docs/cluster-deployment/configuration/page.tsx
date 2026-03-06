import Link from 'next/link';
import { ArrowRight, Settings, Sliders, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '配置',
  description: '配置 Temporal 服务器',
};

export default function Configuration() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">配置</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal Service 配置分为静态配置（服务启动时读取）和动态配置（运行时调整）。
        正确的配置规划是稳定运行的前提。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">静态配置</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cluster 配置结构
            </CardTitle>
          </CardHeader>
          <CardContent>
            `development.yaml` 等配置文件定义了服务、持久化、归档、可见性等关键模块。
            修改后通常需要重启服务生效。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              安全相关配置
            </CardTitle>
          </CardHeader>
          <CardContent>
            TLS / mTLS 与认证授权相关配置集中在静态配置中，
            需要在部署阶段统一规划。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">动态配置</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            运行时开关与限流
          </CardTitle>
        </CardHeader>
        <CardContent>
          动态配置适合控制配额、限流、功能开关等运维项，
          可在不重启服务的情况下调整。
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mt-12 mb-6">参考链接</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/references/configuration" target="_blank" rel="noreferrer">
            Cluster configuration reference
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/references/dynamic-config" target="_blank" rel="noreferrer">
            Dynamic config reference
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/self-hosted-guide/security" target="_blank" rel="noreferrer">
            Security configuration
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
