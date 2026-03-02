import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        配置活动的超时时间，防止活动无限期运行。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">超时类型</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle>StartToClose</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              从活动开始到完成的超时时间
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ScheduleToClose</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              从活动调度到完成的超时时间（包括重试）
            </p>
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
