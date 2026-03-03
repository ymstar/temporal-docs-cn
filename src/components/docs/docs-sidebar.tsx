'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';
import React, { useState } from 'react';
import { docsNavigation, DocItem } from '@/lib/docs-config';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarItemProps {
  item: DocItem;
  level?: number;
}

function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === item.href;
  const hasChildren = item.items && item.items.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('space-y-1')}>
      <div className="flex items-center justify-between group">
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full',
            isActive
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            level > 0 && 'pl-6'
          )}
        >
          {hasChildren ? (
            <button
              onClick={handleToggle}
              className="h-4 w-4 flex-shrink-0 flex items-center justify-center"
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          ) : (
            <FileText className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="truncate">{item.title}</span>
          {item.badge && (
            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {item.badge}
            </span>
          )}
        </Link>
      </div>
      {isOpen && hasChildren && (
        <div className="space-y-1 mt-1">
          {item.items?.map((child) => (
            <SidebarItem key={child.href} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full border-r bg-gray-50/50">
      <div className="p-4 space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
