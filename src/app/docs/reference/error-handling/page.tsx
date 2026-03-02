import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '错误处理',
  description: '错误处理最佳实践',
};

export default function ErrorHandling() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">错误处理</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 中的错误处理机制和最佳实践。
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
