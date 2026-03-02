'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 从页面内容中提取标题
  useEffect(() => {
    const headings = document.querySelectorAll('article h1, article h2, article h3, article h4');
    const usedIds = new Set<string>();
    
    const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
      // 为没有 ID 的标题生成 ID
      if (!heading.id) {
        const text = heading.textContent || '';
        let id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // 如果生成的 ID 为空或已存在，使用索引作为后备
        if (!id || usedIds.has(id)) {
          id = `heading-${index}`;
        }
        
        usedIds.add(id);
        heading.id = id;
      }
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setItems(tocItems);
  }, []);

  // 监听滚动，高亮当前可见的章节
  useEffect(() => {
    const headings = document.querySelectorAll('article h1, article h2, article h3, article h4');
    
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach((heading) => observerRef.current?.observe(heading));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  // 平滑滚动到章节
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // 头部高度
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('sticky top-20', className)}>
      <div className="border-l-2 border-gray-200 pl-4">
        <h4 className="font-semibold text-sm mb-3 text-gray-900">本页目录</h4>
        <nav className="space-y-2 text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block transition-colors hover:text-blue-600',
                activeId === item.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600',
                item.level === 3 && 'pl-4',
                item.level === 4 && 'pl-8'
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
