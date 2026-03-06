import Link from 'next/link';
import { ArrowRight, CheckCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '活动定义',
  description: '如何定义活动函数',
};

export default function ActivityDefinition() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">活动定义</h1>
      <p className="text-xl text-gray-600 mb-8">
        Activity Definition 是活动的实现代码。官方建议活动应尽量具备幂等性，
        并且把容易失败的外部调用封装在活动中，由 Temporal 统一重试与超时控制。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心概念</h2>
      <ul className="space-y-2 text-gray-700">
        <li>
          <strong>Activity Definition</strong>：一段具体实现业务逻辑的函数/方法，是活动执行的「模板」。
        </li>
        <li>
          <strong>Activity Type</strong>：给 Activity Definition 起的名字，用于在工作流代码中引用。
        </li>
        <li>
          <strong>Activity Execution</strong>：某一次实际执行（包括重试），由 Worker 拉取任务并运行。
        </li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义示例（Go）</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">ChargePaymentActivity.go</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Go</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`func ChargePaymentActivity(ctx context.Context, req ChargeRequest) (ChargeResult, error) {
    // 1) 参数校验（失败时尽早返回）
    if req.OrderID == "" {
        return ChargeResult{}, temporal.NewNonRetryableApplicationError("empty order id", "BadRequest", nil)
    }

    // 2) 调用外部系统（应支持幂等键）
    // e.g. idempotencyKey := req.OrderID + "-charge"

    // 3) 返回可序列化结果
    return ChargeResult{TransactionID: "txn-123"}, nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">幂等性（Idempotency）要点</h2>
      <p className="text-lg text-gray-700 mb-4">
        Temporal 可能会因为网络抖动、Worker 崩溃等原因重试同一个 Activity。
        为避免重复扣费或重复写入，活动应尽量设计为幂等。
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>为支付、下单等写操作配置幂等键（如订单号 + 操作类型）。</li>
        <li>调用下游服务时，将幂等键传给对方（多数支付网关 / API 都支持）。</li>
        <li>宁可拆分为多个小活动，也不要在一个大活动里做「半成功」。</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">参数、超时与心跳</h2>
      <ul className="space-y-2 text-gray-700">
        <li>
          Activity 参数和返回值会被序列化并写入事件历史，建议保持结构简单、可序列化，
          避免直接传递大对象（可改为传递 ID，再由 Activity 去加载）。
        </li>
        <li>
          至少配置 <code>StartToClose</code> 超时，用于控制单次执行最长时间，
          长运行任务建议结合 <code>Heartbeat</code> 定期上报进度。
        </li>
        <li>
          可以在 Activity 上单独配置重试策略，和 Workflow 的重试策略相互独立。
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              设计建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            参数与返回值保持可序列化；写操作尽量幂等；外部调用优先使用业务幂等键。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              粒度建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            过大活动会放大重试副作用，过细活动会增加历史事件。按“失败恢复边界”来拆分。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/activity-definition" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Activity Definition
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/activities" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            What is a Temporal Activity?
          </Link>
        </li>
        <li>
          <Link href="https://github.com/temporalio/documentation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            temporalio/documentation 仓库
          </Link>
        </li>
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/develop/activities">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回活动概述
          </Link>
        </Button>
      </div>
    </div>
  );
}
