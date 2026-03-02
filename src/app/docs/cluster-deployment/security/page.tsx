import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '安全',
  description: 'Temporal 安全最佳实践',
};

export default function Security() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">安全</h1>
      <p className="text-xl text-gray-600 mb-8">
        保护 Temporal 集群的安全配置和最佳实践。
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
