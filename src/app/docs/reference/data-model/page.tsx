import Link from 'next/link';
import { ArrowRight, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '数据模型',
  description: 'Temporal 数据模型',
};

export default function DataModel() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">数据模型</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 的数据模型和持久化机制。
      </p>
      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/reference">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回参考文档
          </Link>
        </Button>
      </div>
    </div>
  );
}
