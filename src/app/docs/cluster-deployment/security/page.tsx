import Link from 'next/link';
import { ArrowRight, Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '安全',
  description: 'Temporal 安全最佳实践',
};

export default function Security() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">安全</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal Service 在生产环境中需要严格的安全边界。官方指南强调，
        服务端不应直接暴露在公网，并建议启用 TLS / mTLS 与认证授权机制。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心防护点</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              TLS / mTLS
            </CardTitle>
          </CardHeader>
          <CardContent>
            使用 TLS 加密客户端与服务端通信；若启用 mTLS，可对客户端证书做双向校验，
            强化身份验证。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              认证与授权
            </CardTitle>
          </CardHeader>
          <CardContent>
            官方安全指南建议配置认证与授权策略，结合 Claim Mapper 与 Authorizer
            控制 API 访问范围。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常见实践</h2>
      <ul className="space-y-2">
        <li>避免将 Temporal Service 直接暴露到公网，使用内网或网关进行隔离。</li>
        <li>为前端接口和内部服务启用 TLS / mTLS，并定期轮换证书。</li>
        <li>对不同团队或环境使用独立 Namespace 与权限策略。</li>
      </ul>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              提示
            </CardTitle>
          </CardHeader>
          <CardContent>
            安全配置通常需要同时调整静态配置与运行环境，建议结合官方安全与配置参考文档实施。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/self-hosted-guide/security" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Security (Self-hosted guide)
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/references/configuration" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Cluster configuration reference
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/self-hosted-guide/deployment" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Self-hosted deployment guide
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
