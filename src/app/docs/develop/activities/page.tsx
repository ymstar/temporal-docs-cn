import Link from 'next/link';
import { Code, Database, RefreshCw, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '活动',
  description: '定义和执行活动',
};

export default function Activities() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">活动</h1>
      <p className="text-xl text-gray-600 mb-8">
        Activity 是 Temporal 中执行副作用和非确定性操作的单元。工作流负责编排，
        活动负责执行具体业务动作。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">核心边界</h3>
        <p className="text-green-700">
          任何网络请求、数据库写入、系统时间读取、随机数等逻辑，都应放在 Activity 中，
          不要直接写在 Workflow 里。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动特性</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>副作用执行</CardTitle>
            <CardDescription>
              负责外部 API、数据库、消息队列等非确定性操作。
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <RefreshCw className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>可配置重试</CardTitle>
            <CardDescription>
              Temporal 默认重试活动，并支持按活动覆盖重试策略。
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>失败可恢复</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              可通过超时、心跳、重试预算组合控制失败恢复行为。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>状态隔离</CardTitle>
            <CardDescription>
              活动不依赖工作流重放机制，便于封装底层 SDK 与外部客户端。
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">调用活动示例（Go）</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Workflow ExecuteActivity</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Go</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`func PaymentWorkflow(ctx workflow.Context, orderID string) (string, error) {
    ao := workflow.ActivityOptions{
        StartToCloseTimeout: 30 * time.Second,
    }
    ctx = workflow.WithActivityOptions(ctx, ao)

    var txID string
    err := workflow.ExecuteActivity(ctx, ChargePaymentActivity, orderID).Get(ctx, &txID)
    if err != nil {
        return "", err
    }
    return txID, nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动超时与心跳</h2>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-lg">StartToCloseTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              单次活动执行的最大时间。通常是最优先配置的活动超时。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-green-600 mb-2" />
            <CardTitle className="text-lg">HeartbeatTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              长运行活动应定期心跳。丢失心跳可触发超时并由重试策略接管。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">延伸阅读</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/docs/develop/activities/definition">活动定义</Link>
        </li>
        <li>
          <Link href="/docs/develop/activities/retry">活动重试</Link>
        </li>
        <li>
          <Link href="/docs/develop/activities/timeout">活动超时</Link>
        </li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/activities" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            What is a Temporal Activity?
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/activity-definition" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Activity Definition
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/activity-execution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Activity Execution
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/local-activity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Local Activity
          </Link>
        </li>
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/develop/workflow-activities">
            <ArrowRight className="mr-2 h-4 w-4" />
            查看工作流与活动协作
          </Link>
        </Button>
      </div>
    </div>
  );
}
