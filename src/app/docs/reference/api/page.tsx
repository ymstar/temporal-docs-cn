import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'API 参考',
  description: 'Temporal API 完整参考',
};

export default function APIReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">API 参考</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal API 的完整参考文档。
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
