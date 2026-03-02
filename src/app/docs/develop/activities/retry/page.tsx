import Link from 'next/link';
import { ArrowRight, Repeat } from 'lucide-react';
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
        配置活动的重试策略，自动处理临时性失败。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">重试策略配置</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`import "time"

retryPolicy := &temporal.RetryPolicy{
    InitialInterval:    time.Second,      // 初始间隔
    BackoffCoefficient: 2.0,              // 退避系数
    MaximumInterval:    10 * time.Second, // 最大间隔
    MaximumAttempts:    5,                // 最大尝试次数
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

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
