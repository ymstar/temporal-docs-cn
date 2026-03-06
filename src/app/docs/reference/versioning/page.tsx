import Link from 'next/link';
import { GitBranch, Layers, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '版本控制参考',
  description: '工作流与 Worker 版本控制相关参考入口',
};

export default function VersioningReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">版本控制参考</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 同时提供「工作流代码版本」与「Worker 版本（Build ID）」两类机制，
        用于在不中断现有执行的前提下安全升级。中文站的「开发指南 / 版本控制」页面
        聚焦工作流代码层面，本页则作为整体参考索引。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流版本控制</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-600" />
              代码内版本控制（getVersion）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              通过 <code>Workflow.getVersion()</code> 等 API 在工作流代码中为变更打标签，
              从而在同一份历史上区分旧逻辑与新逻辑，保证重放时的确定性。
            </p>
            <p>
              具体示例与最佳实践请参考「开发指南 / 版本控制」页面。
            </p>
            <p>
              <Link href="/docs/develop/versioning">查看中文详细说明</Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              向后兼容与迁移策略
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              老的 Workflow Execution 会继续沿用旧分支逻辑，新启动的 Workflow 执行
              则走新分支，从而在不中断长尾执行的情况下渐进式迁移。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Worker 与 Build ID 版本控制</h2>
      <p className="text-lg text-gray-700 mb-4">
        除了代码内部的版本控制，Temporal 还提供基于 Build ID 的 Worker 版本控制，
        用于逐步将流量从旧 Worker 迁移到新 Worker。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-green-600" />
              Build ID 与规则
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              Worker 在注册 Task Queue 时可以携带 Build ID，Temporal 会根据
              版本规则决定哪些执行路由到哪些 Build ID，支持灰度发布与回滚。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              运维与可观测性
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              版本信息会体现在 Search Attributes 与可见性 API 中，便于在 UI 中按版本
              维度排查问题与对比行为。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="https://docs.temporal.io/versioning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Versioning Overview
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/develop/go/versioning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Go SDK Versioning
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/develop/java/versioning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Java SDK Versioning
          </Link>
        </li>
      </ul>
    </div>
  );
}

