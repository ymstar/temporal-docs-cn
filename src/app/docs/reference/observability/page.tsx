import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '可观测性',
  description: '指标、日志和追踪',
};

export default function Observability() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">可观测性</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 的可观测性功能，包括指标、日志和追踪。
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
