import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        学习如何定义活动函数，理解活动的类型和参数。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动函数签名</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`// 活动接收 context.Context 和参数，返回结果或错误
func MyActivity(ctx context.Context, param1 string, param2 int) (string, error) {
    // 活动逻辑
    return "result", nil
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
