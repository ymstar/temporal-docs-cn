import Link from 'next/link';
import { ArrowRight, Container } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Docker 部署',
  description: '使用 Docker 部署 Temporal',
};

export default function DockerDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Docker 部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        使用 Docker 容器化部署 Temporal 集群。
      </p>

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
