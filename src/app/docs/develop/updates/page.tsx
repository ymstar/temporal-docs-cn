import Link from 'next/link';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '更新',
  description: '同步更新工作流状态',
};

export default function Updates() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">更新</h1>
      <p className="text-xl text-gray-600 mb-8">
        更新是一种同步方式，用于修改工作流的状态。
      </p>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/develop/workflows">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回工作流概述
          </Link>
        </Button>
      </div>
    </div>
  );
}
