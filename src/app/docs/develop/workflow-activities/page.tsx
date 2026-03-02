import Link from 'next/link';
import { ArrowRight, GitBranch } from 'lucide-react';
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
        学习如何在工作流中调用活动，实现复杂的业务逻辑。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <pre className="text-sm font-mono overflow-x-auto">
{`// 在工作流中执行活动
func MyWorkflow(ctx workflow.Context) error {
    // 设置活动选项
    ao := workflow.ActivityOptions{
        StartToCloseTimeout: 10 * time.Second,
    }
    ctx = workflow.WithActivityOptions(ctx, ao)
    
    // 执行活动
    var result string
    err := workflow.ExecuteActivity(ctx, MyActivity, "param").Get(ctx, &result)
    if err != nil {
        return err
    }
    
    return nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

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
