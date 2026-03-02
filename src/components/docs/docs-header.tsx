'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Twitter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchDialog } from './search-dialog';
import { cn } from '@/lib/utils';

export function DocsHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Temporal</span>
          <span className="text-sm text-gray-500 ml-1">中文文档</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-gray-900',
              pathname === '/' ? 'text-gray-900' : 'text-gray-600'
            )}
          >
            首页
          </Link>
          <Link
            href="/docs/quickstart/what-is-temporal"
            className={cn(
              'transition-colors hover:text-gray-900',
              pathname?.startsWith('/docs') ? 'text-gray-900' : 'text-gray-600'
            )}
          >
            文档
          </Link>
          <Link
            href="/docs/sdk/java"
            className={cn(
              'transition-colors hover:text-gray-900',
              'text-gray-600'
            )}
          >
            SDK
          </Link>
          <Link
            href="/docs/resources/sample-apps"
            className={cn(
              'transition-colors hover:text-gray-900',
              'text-gray-600'
            )}
          >
            示例
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <SearchDialog />

          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/temporalio/temporal" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com/temporalio" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="https://temporal.io" target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4 mr-2" />
              官方网站
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
