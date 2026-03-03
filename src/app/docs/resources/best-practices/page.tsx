import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '最佳实践',
  description: 'Temporal 开发最佳实践',
};

export default function BestPractices() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">最佳实践</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 开发的最佳实践和设计模式。
      </p>

    </div>
  );
}
