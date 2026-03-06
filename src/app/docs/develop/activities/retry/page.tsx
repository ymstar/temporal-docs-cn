import Link from 'next/link';
import { ArrowRight, Repeat, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '活动重试',
  description: '配置活动重试策略',
};

export default function ActivityRetry() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">活动重试</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 对活动默认启用重试，使用指数退避策略。你可以覆盖默认值，
        为不同活动配置独立的重试行为。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">重试策略示例（Go）</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">ActivityOptions.go</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Go</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`ao := workflow.ActivityOptions{
    StartToCloseTimeout: 30 * time.Second,
    RetryPolicy: &temporal.RetryPolicy{
        InitialInterval:    time.Second,
        BackoffCoefficient: 2.0,
        MaximumInterval:    100 * time.Second,
        MaximumAttempts:    5,
        NonRetryableErrorTypes: []string{"BadRequest"},
    },
}
ctx = workflow.WithActivityOptions(ctx, ao)`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">关键点</h2>
      <ul className="space-y-2">
        <li>活动默认会重试；工作流默认不重试。</li>
        <li>重试间隔遵循指数退避，并受 `MaximumInterval` 与 `MaximumAttempts` 约束。</li>
        <li>对确定不会成功的错误，尽量标记为 non-retryable，避免无效重试。</li>
      </ul>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              常见误区
            </CardTitle>
          </CardHeader>
          <CardContent>
            不建议在 Activity 函数内部再做复杂重试循环，这会放大超时预算并降低 Temporal UI 的可观测性。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/encyclopedia/retry-policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Retry Policies
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/activity-definition" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Activity retry policy（Activity Definition 页面）
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
