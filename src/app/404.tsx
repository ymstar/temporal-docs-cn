import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
            <Search className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">页面未找到</h2>
          <p className="text-gray-600 mb-8">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              返回首页
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/docs/quickstart/what-is-temporal">
              <ArrowLeft className="mr-2 h-5 w-5" />
              浏览文档
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
