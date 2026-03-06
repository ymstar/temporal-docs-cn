import Link from 'next/link';
import { ArrowRight, GitPullRequest, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '贡献指南',
  description: '如何贡献文档',
};

export default function Contributing() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">贡献指南</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 文档是开源项目，官方仓库提供完整的协作流程与规范。
        本页提供贡献入口与基本流程概览，具体要求以官方仓库为准。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              官方文档仓库
            </CardTitle>
          </CardHeader>
          <CardContent>
            文档源码与贡献规范位于 Temporal 官方 documentation 仓库。
            <div className="mt-4">
              <Link
                href="https://github.com/temporalio/documentation"
                target="_blank"
                rel="noreferrer"
              >
                打开 documentation 仓库
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5" />
              提交贡献
            </CardTitle>
          </CardHeader>
          <CardContent>
            推荐通过 Issue 反馈问题，通过 Pull Request 提交修复或翻译。
            <div className="mt-4 space-y-2">
              <div>
                <Link
                  href="https://github.com/temporalio/documentation/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  提交 Issue
                </Link>
              </div>
              <div>
                <Link
                  href="https://github.com/temporalio/documentation/pulls"
                  target="_blank"
                  rel="noreferrer"
                >
                  查看 Pull Request
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">建议流程</h2>
      <ol className="space-y-3">
        <li>阅读官方仓库的贡献规范，了解目录结构与写作风格。</li>
        <li>从小范围修复开始，例如术语一致性、排版与示例校验。</li>
        <li>提交 PR 时提供上下文，便于审核人员快速理解变更目的。</li>
      </ol>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/resources/community">
            <ArrowRight className="mr-2 h-4 w-4" />
            了解社区资源
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
        <MessageSquare className="h-4 w-4" />
        以官方 documentation 仓库中的贡献指南为最终准则。
      </div>
    </div>
  );
}
