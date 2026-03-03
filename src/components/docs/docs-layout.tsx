'use client';

import { ReactNode } from 'react';
import { DocsSidebar } from './docs-sidebar';
import { DocsHeader } from './docs-header';
import { TableOfContents } from './table-of-contents';

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DocsHeader />
      <div className="flex flex-1">
        <aside className="w-64 flex-shrink-0 hidden lg:block h-full">
          <DocsSidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 py-8">
            <article>{children}</article>
          </div>
        </main>
        <aside className="w-64 flex-shrink-0 hidden xl:block p-4 h-full">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
