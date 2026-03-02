import { DocsLayout } from '@/components/docs/docs-layout';

export default function DocsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
