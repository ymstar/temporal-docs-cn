import Link from 'next/link';
import { ArrowRight, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '贡献指南',
  description: '如何贡献文档',
};

export default function Contributing() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">贡献指南</h1>
      <p className="text-xl text-gray-600 mb-8">
        如何为 Temporal 文档项目做出贡献。
      </p>

    </div>
  );
}
