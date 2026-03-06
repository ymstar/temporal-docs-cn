import Link from 'next/link';
import { ArrowRight, FileText, GitBranch, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '更新日志',
  description: 'Temporal 更新日志',
};

export default function Changelog() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">更新日志</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 的发布节奏覆盖服务端、各语言 SDK 以及 CLI。为避免遗漏关键变更，
        建议分别关注对应的官方发布记录。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Temporal Server
            </CardTitle>
          </CardHeader>
          <CardContent>
            服务端核心版本发布与修复记录，包含破坏性变更、升级注意事项。
            <div className="mt-4">
              <Link
                href="https://github.com/temporalio/temporal/releases"
                target="_blank"
                rel="noreferrer"
              >
                查看 Temporal Server Releases
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              SDK 发布说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            各语言 SDK 的变更记录和升级提示。
            <div className="mt-4 space-y-2">
              <div>
                <Link href="https://temporal.io/change-log" target="_blank" rel="noreferrer">
                  Temporal Change Log（总览）
                </Link>
              </div>
              <div>
                <Link href="https://github.com/temporalio/sdk-go/blob/master/CHANGELOG.md" target="_blank" rel="noreferrer">
                  Go SDK Change Log
                </Link>
              </div>
              <div>
                <Link href="https://github.com/temporalio/sdk-php/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">
                  PHP SDK Change Log
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              CLI 发布记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            Temporal CLI 的更新日志和版本说明。
            <div className="mt-4">
              <Link href="https://temporal.io/change-log/cli" target="_blank" rel="noreferrer">
                Temporal CLI Change Log
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">推荐关注方式</h2>
      <ol className="space-y-3">
        <li>升级前阅读目标版本的 Release Notes，标记破坏性变更。</li>
        <li>在预生产环境验证 SDK 与 Temporal Server 的兼容性。</li>
        <li>将升级记录沉淀为内部运维手册，减少重复沟通成本。</li>
      </ol>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/cluster-deployment/overview">
            <ArrowRight className="mr-2 h-4 w-4" />
            查看部署概述
          </Link>
        </Button>
      </div>
    </div>
  );
}
