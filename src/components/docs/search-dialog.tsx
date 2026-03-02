'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X, FileText, BookOpen, Zap } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DocPage {
  title: string;
  description: string;
  path: string;
  category: string;
}

// 文档页面索引
const DOCS_INDEX: DocPage[] = [
  // 快速开始
  { title: '什么是 Temporal', description: '了解 Temporal 的核心概念和用途', path: '/docs/quickstart/what-is-temporal', category: '快速开始' },
  { title: '安装 Temporal', description: '安装 Temporal CLI 和本地开发环境', path: '/docs/quickstart/install', category: '快速开始' },
  { title: 'Hello World', description: '在 5 分钟内创建并运行第一个工作流', path: '/docs/quickstart/hello-world', category: '快速开始' },
  { title: '运行第一个工作流', description: '快速体验 Temporal 的核心功能', path: '/docs/quickstart/your-first-workflow', category: '快速开始' },
  
  // 开发指南
  { title: '工作流', description: '定义和执行工作流', path: '/docs/develop/workflows', category: '开发指南' },
  { title: '活动', description: '定义和执行活动', path: '/docs/develop/activities', category: '开发指南' },
  { title: '工作流选项', description: '配置工作流执行选项', path: '/docs/develop/workflow-options', category: '开发指南' },
  { title: '错误处理', description: '处理工作流和活动中的错误', path: '/docs/develop/errors', category: '开发指南' },
  { title: '版本控制', description: '安全地更新工作流代码', path: '/docs/develop/versioning', category: '开发指南' },
  { title: '信号', description: '向运行中的工作流发送信号', path: '/docs/develop/signals', category: '开发指南' },
  { title: '查询', description: '查询工作流状态', path: '/docs/develop/queries', category: '开发指南' },
  { title: '子工作流', description: '在子工作流中编排复杂逻辑', path: '/docs/develop/child-workflows', category: '开发指南' },
  
  // SDK 指南
  { title: 'Java SDK', description: 'Temporal Java SDK 完整指南', path: '/docs/sdk/java', category: 'SDK 指南' },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 搜索过滤
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return DOCS_INDEX.filter((doc) => {
      const titleMatch = doc.title.toLowerCase().includes(lowerQuery);
      const descMatch = doc.description.toLowerCase().includes(lowerQuery);
      const categoryMatch = doc.category.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch || categoryMatch;
    });
  }, [query]);

  const handleSelect = (path: string) => {
    router.push(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-64 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <span className="text-gray-500">搜索文档...</span>
        <kbd className="ml-auto text-xs text-gray-400">⌘K</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-2xl">
          <div className="flex items-center border-b px-4">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <Input
              placeholder="搜索文档..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-14"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <ScrollArea className="max-h-[500px]">
            {!query ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">搜索文档</h3>
                <p className="text-sm text-gray-500 mb-4">
                  输入关键词搜索 Temporal 文档
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <kbd className="px-2 py-1 bg-gray-100 rounded">⌘K</kbd>
                  <span>打开搜索</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded">ESC</kbd>
                  <span>关闭</span>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">未找到结果</h3>
                <p className="text-sm text-gray-500">
                  没有找到与 "{query}" 相关的文档
                </p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((doc) => (
                  <button
                    key={doc.path}
                    onClick={() => handleSelect(doc.path)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {doc.category === '快速开始' && <Zap className="h-5 w-5 text-orange-500" />}
                        {doc.category === '开发指南' && <BookOpen className="h-5 w-5 text-blue-500" />}
                        {doc.category === 'SDK 指南' && <FileText className="h-5 w-5 text-purple-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {doc.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {doc.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
