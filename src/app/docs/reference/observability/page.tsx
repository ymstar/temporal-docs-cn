import Link from 'next/link';
import { ActivitySquare, Eye, Radio, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '可观测性',
  description: 'Temporal 中指标、日志、追踪与可见性 API 的参考入口',
};

export default function ObservabilityReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">可观测性参考</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 将「执行历史」与「可见性存储」分离：前者保证可靠执行，后者用于查询与监控。
        本页从参考角度梳理指标、日志、追踪和可见性 API 的主要入口。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">四大维度</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              指标（Metrics）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              SDK 可以通过 Prometheus 或 OpenTelemetry 导出指标，例如任务吞吐量、
              失败率、Worker 队列长度等，用于在 Grafana 等系统中可视化。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-green-600" />
              追踪（Tracing）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              通过 OpenTelemetry 上下文传播，将 Workflow / Activity 与下游服务的调用链
              串联起来，便于在 Jaeger/Tempo 等系统中追踪一次业务执行的全链路。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ActivitySquare className="h-5 w-5 text-purple-600" />
              日志（Logging）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              Workflow 日志通常通过 SDK 提供的日志接口输出，并与 Worker 日志一起
              收集到日志平台，结合事件历史排查问题。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-600" />
              可见性 API 与 UI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              Temporal Web UI 与 Visibility API 提供按 Namespace、WorkflowType、
              状态与 Search Attributes 过滤工作流执行的能力，是日常排查的首选入口。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">与数据模型和搜索属性的关系</h2>
      <p className="text-lg text-gray-700 mb-4">
        可观测性依赖于良好的数据模型设计和合理的 Search Attributes：
        只有提前写入合适的字段，后续才能按这些维度筛选与聚合。
      </p>

      <ul className="space-y-2 text-gray-700">
        <li>为关键业务字段（如订单状态、租户 ID、区域）配置自定义 Search Attributes。</li>
        <li>在启动工作流或更新状态时及时更新这些字段。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="https://docs.temporal.io/observability"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Observability（平台特性）
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/develop/go/observability"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Go SDK Observability
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/develop/typescript/observability"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            TypeScript SDK Observability
          </Link>
        </li>
      </ul>
    </div>
  );
}

