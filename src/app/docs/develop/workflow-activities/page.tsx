import Link from 'next/link';
import { ArrowRight, GitBranch, Workflow, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流与活动',
  description: '组合工作流和活动',
};

export default function WorkflowActivities() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流与活动</h1>
      <p className="text-xl text-gray-600 mb-8">
        工作流负责编排，活动负责执行副作用。把两者边界划清，是 Temporal 应用可维护的关键。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">编排示例（Go）</h2>
      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`func OrderWorkflow(ctx workflow.Context, orderID string) error {
    ao := workflow.ActivityOptions{
        StartToCloseTimeout: 30 * time.Second,
        RetryPolicy: &temporal.RetryPolicy{
            InitialInterval: time.Second,
            MaximumAttempts: 5,
        },
    }
    ctx = workflow.WithActivityOptions(ctx, ao)

    if err := workflow.ExecuteActivity(ctx, ValidateOrderActivity, orderID).Get(ctx, nil); err != nil {
        return err
    }

    var paymentID string
    if err := workflow.ExecuteActivity(ctx, ChargePaymentActivity, orderID).Get(ctx, &paymentID); err != nil {
        return err
    }

    return workflow.ExecuteActivity(ctx, CreateShipmentActivity, orderID, paymentID).Get(ctx, nil)
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            只保留确定性逻辑：编排步骤、分支、补偿、重放安全代码。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            执行外部调用和副作用：数据库、HTTP、消息队列、第三方服务。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              失败恢复
            </CardTitle>
          </CardHeader>
          <CardContent>
            通过活动超时 + 重试策略控制失败恢复，避免把重试逻辑散落在业务代码。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/workflows" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Workflows
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/activities" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Activities
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
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/develop/workflows">
            <ArrowRight className="mr-2 h-4 w-4" />
            返回工作流概述
          </Link>
        </Button>
      </div>
    </div>
  );
}
