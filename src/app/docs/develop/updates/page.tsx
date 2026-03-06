import Link from 'next/link';
import { ArrowRight, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '更新',
  description: '同步更新工作流状态',
};

export default function Updates() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">更新</h1>
      <p className="text-xl text-gray-600 mb-8">
        Update 是一种同步的消息处理方式，可在工作流运行期间修改其状态并返回结果。
        官方文档建议结合验证器、幂等性与错误处理策略，确保更新安全可靠。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">Update 的关键能力</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              同步返回结果
            </CardTitle>
          </CardHeader>
          <CardContent>
            Update 与 Query 不同，会实际改变工作流状态，并在完成后返回结果或错误。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              验证与处理
            </CardTitle>
          </CardHeader>
          <CardContent>
            更新可先通过验证器校验输入，再进入处理器执行状态变更。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>
      <ul className="space-y-2">
        <li>为 Update 设置验证器，尽早拒绝非法输入。</li>
        <li>保证 Update 处理逻辑幂等，避免重复调用造成状态错乱。</li>
        <li>为长时间运行的 Update 设置超时和错误处理策略。</li>
        <li>需要跨 Continue-As-New 去重时，为 Update 指定稳定的 Update ID。</li>
      </ul>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              注意事项
            </CardTitle>
          </CardHeader>
          <CardContent>
            文档强调，消息处理顺序及并发度由工作流配置决定，
            需要结合业务场景评估是否允许并发 Update。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/handling-messages" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Handling Signals, Queries, and Updates
          </Link>
        </li>
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
