import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Kubernetes 部署',
  description: '在 Kubernetes 上部署 Temporal',
};

export default function KubernetesDeployment() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Kubernetes 部署</h1>
      <p className="text-xl text-gray-600 mb-8">
        在 Kubernetes 集群上部署高可用的 Temporal 实例。
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
