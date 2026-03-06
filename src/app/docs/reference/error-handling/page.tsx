import Link from 'next/link';
import { AlertTriangle, RotateCcw, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '错误处理',
  description: 'Temporal 平台中的错误类型、重试与超时参考',
};

export default function ErrorHandlingReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">错误处理参考</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 将错误处理与重试策略深度集成在平台和 SDK 中。本页从参考角度梳理常见错误类型、
        重试策略与超时配置，帮助你在设计 Workflow 与 Activity 时避免常见坑。
      </p>

      <div className="my-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">平台不会替你定义「业务是否出错」</h2>
        <p className="text-yellow-800">
          Temporal 负责可靠地执行和重试；什么算「业务失败」、是否应重试、重试多少次，仍然需要由你在
          业务代码与配置中明确表达。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">错误类型概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              应用级错误（Application Failure）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              由业务代码主动抛出或包装的错误，例如参数校验失败、库存不足等。
              常用于表达「逻辑失败但系统仍然健康」，可以选择是否重试。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple-600" />
              平台/系统级错误（Temporal Failure）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              包括 Worker 崩溃、网络分区、超时等非业务错误。通常可以通过重试恢复，
              但也需要合理设置重试上限与告警。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">重试与超时的关系</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-green-600" />
              Retry Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              可为 Activity 或 Workflow 配置最大重试次数、初始重试间隔、
              退避系数等。平台会在 Worker 重启或故障后继续按照策略重试。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              超时（Timeouts）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              建议至少为 Activity 配置 <code>StartToClose</code> 超时，用于判断何时认为
              活动「不再前进」并触发重试。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常见设计建议</h2>
      <ul className="space-y-3 text-gray-700">
        <li>写操作类 Activity 建议设计为幂等，并配合幂等键避免重复扣费或重复下单。</li>
        <li>不要在 Activity 内部做过多「内部重试」，否则难以在 Temporal UI 中观察失败原因。</li>
        <li>业务上明确不该重试的错误（如参数错误）应标记为非重试（non-retryable）。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="https://docs.temporal.io/references/errors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Errors Reference
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/encyclopedia/retry-policies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Retry Policies
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/encyclopedia/detecting-activity-failures"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Detecting Activity Failures
          </Link>
        </li>
      </ul>
    </div>
  );
}

