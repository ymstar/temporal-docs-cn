import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '常见问题',
  description: '常见问题解答',
};

export default function FAQ() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">常见问题</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 的常见问题解答。
      </p>
      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/resources">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回资源中心
          </Link>
        </Button>
      </div>
    </div>
  );
}
