import Link from 'next/link';
import { ArrowRight, Clock, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '活动超时',
  description: '配置活动超时',
};

export default function ActivityTimeout() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">活动超时</h1>
      <p className="text-xl text-gray-600 mb-8">
        活动超时用于限制活动执行与排队时间。官方建议根据业务 SLO 设计超时，
        再配合重试策略控制总耗时。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">常用超时类型</h2>
      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              StartToCloseTimeout
            </CardTitle>
          </CardHeader>
          <CardContent>
            单次活动尝试从开始到结束的最长时间。大多数场景建议至少配置该值。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              ScheduleToCloseTimeout
            </CardTitle>
          </CardHeader>
          <CardContent>
            从调度到最终完成（含重试）的总时间上限，用于限制整体重试预算。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              ScheduleToStartTimeout
            </CardTitle>
          </CardHeader>
          <CardContent>
            任务从入队到被 Worker 拉取的最大等待时间，常用于发现队列拥塞。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5" />
              HeartbeatTimeout
            </CardTitle>
          </CardHeader>
          <CardContent>
            长运行活动必须定期心跳，否则会超时并触发重试或失败。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">配置示例（Go）</h2>
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
    StartToCloseTimeout:    20 * time.Second,
    ScheduleToCloseTimeout: 2 * time.Minute,
    ScheduleToStartTimeout: 15 * time.Second,
    HeartbeatTimeout:       10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, ao)`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://docs.temporal.io/develop/go/failure-detection" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Detecting Activity failures（超时与心跳）
          </Link>
        </li>
        <li>
          <Link href="https://docs.temporal.io/activity-execution" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Activity Execution
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
