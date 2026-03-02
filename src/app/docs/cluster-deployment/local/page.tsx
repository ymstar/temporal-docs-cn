import Link from 'next/link';
import { ArrowRight, Laptop } from 'lucide-react';
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
        使用 Docker Compose 在本地快速启动 Temporal 集群。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`# 启动本地 Temporal Server
temporal server start-dev

# 服务器将在以下端口启动
# Frontend: 7233
# Web UI: 8233`}
            </pre>
          </CardContent>
        </Card>
      </div>

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
