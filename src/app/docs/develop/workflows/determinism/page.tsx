import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流确定性',
  description: '理解工作流确定性的要求和最佳实践',
};

export default function WorkflowDeterminism() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流确定性</h1>
      <p className="text-xl text-gray-600 mb-8">
        了解为什么工作流必须是确定性的，以及如何编写确定性的代码。
      </p>

      <div className="my-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          重要概念
        </h3>
        <p className="text-yellow-700">
          确定性意味着相同的输入总是产生相同的输出。Temporal 需要这个特性来支持工作流重放、
          重试和状态恢复。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">为什么需要确定性？</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              支持重试
            </h3>
            <p className="text-sm text-gray-600">
              当 Worker 崩溃时，工作流可以从最后的状态重新执行。如果代码不是确定性的，
              重放可能产生不同的结果。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              支持版本升级
            </h3>
            <p className="text-sm text-gray-600">
              确定性允许在不中断运行中的工作流的情况下升级工作流代码。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              可靠的状态恢复
            </h3>
            <p className="text-sm text-gray-600">
              确保工作流在任何时候崩溃后都能从最后保存的状态正确恢复。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-orange-600" />
              一致的执行历史
            </h3>
            <p className="text-sm text-gray-600">
              保证相同的工作流执行总是产生相同的事件历史，便于调试和审计。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">确定性要求</h2>

      <div className="my-8">
        <h3 className="text-2xl font-semibold mb-4">必须遵守的规则</h3>
        
        <div className="space-y-4">
          <Card className="border-l-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">使用 Temporal 提供的 API</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    使用 <code className="bg-green-100 px-1 py-0.5 rounded">workflow.Sleep()</code> 而不是 <code className="bg-red-100 px-1 py-0.5 rounded">time.Sleep()</code>
                  </p>
                  <Card className="bg-gray-900 text-white border-0">
                    <CardContent className="pt-3">
                      <pre className="text-xs font-mono">
{`// ✅ 正确
workflow.Sleep(ctx, 10*time.Second)

// ❌ 错误
time.Sleep(10*time.Second)`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">使用工作流时间</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    使用 <code className="bg-green-100 px-1 py-0.5 rounded">workflow.Now()</code> 而不是 <code className="bg-red-100 px-1 py-0.5 rounded">time.Now()</code>
                  </p>
                  <Card className="bg-gray-900 text-white border-0">
                    <CardContent className="pt-3">
                      <pre className="text-xs font-mono">
{`// ✅ 正确
now := workflow.Now(ctx)

// ❌ 错误
now := time.Now()`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">避免随机数</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    不在工作流中使用随机数生成器，通过活动生成
                  </p>
                  <Card className="bg-gray-900 text-white border-0">
                    <CardContent className="pt-3">
                      <pre className="text-xs font-mono">
{`// ✅ 正确 - 通过活动获取随机数
var randomNum int
workflow.ExecuteActivity(ctx, GenerateRandomNumberActivity).Get(ctx, &randomNum)

// ❌ 错误 - 直接使用随机数
randomNum := rand.Intn(100)`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">避免全局变量</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    不依赖可变的全局状态
                  </p>
                  <Card className="bg-gray-900 text-white border-0">
                    <CardContent className="pt-3">
                      <pre className="text-xs font-mono">
{`// ❌ 错误 - 使用全局变量
var counter int

func MyWorkflow(ctx workflow.Context) {
    counter++  // 不确定性
}

// ✅ 正确 - 使用局部变量或传递参数
func MyWorkflow(ctx workflow.Context, counter int) {
    counter++
}`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常见错误</h2>

      <div className="space-y-4 my-8">
        <Card className="border-l-4 border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-red-800">使用系统时间</h4>
                <p className="text-sm text-gray-600">
                  使用 <code className="bg-red-100 px-1 py-0.5 rounded">time.Now()</code> 会导致每次执行结果不同。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-red-800">直接调用外部 API</h4>
                <p className="text-sm text-gray-600">
                  应该通过活动调用外部 API，而不是直接在工作流中调用。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-red-800">使用 goroutine</h4>
                <p className="text-sm text-gray-600">
                  Go 工作流不支持 goroutine，应该使用 Temporal 的并发原语。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-red-800">直接访问数据库</h4>
                <p className="text-sm text-gray-600">
                  应该通过活动访问数据库，确保操作的原子性。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">并发处理</h2>

      <p className="text-lg text-gray-700 mb-6">
        Temporal 提供了专门的 API 来处理并发，确保确定性的并发执行。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">parallel.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "go.temporal.io/sdk/workflow"
)

func ParallelWorkflow(ctx workflow.Context) error {
    // 创建 Future 集合
    var futures []workflow.Future
    
    // 并发执行多个活动
    for i := 0; i < 5; i++ {
        future := workflow.ExecuteActivity(ctx, MyActivity, i)
        futures = append(futures, future)
    }
    
    // 等待所有活动完成
    for _, future := range futures {
        var result int
        err := future.Get(ctx, &result)
        if err != nil {
            return err
        }
    }
    
    return nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">测试确定性</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">test.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "testing"
    "go.temporal.io/sdk/workflow"
    "go.temporal.io/sdk/workflow/testing"
)

func TestMyWorkflowDeterminism(t *testing.T) {
    // 创建测试环境
    testEnv := testing.NewWorkflowTestEnvironment()
    
    // 注册活动
    testEnv.RegisterActivity(MyActivity)
    
    // 执行工作流
    testEnv.ExecuteWorkflow(MyWorkflow, "test-input")
    
    // 验证结果
    var result string
    testEnv.GetWorkflowResult(&result)
    
    // 确保每次执行结果相同
    if result != "expected-result" {
        t.Errorf("Unexpected result: %s", result)
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">总结</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ 工作流必须是确定性的</li>
          <li>✅ 使用 Temporal 提供的 API</li>
          <li>✅ 避免随机、时间和外部调用</li>
          <li>✅ 通过活动执行非确定性操作</li>
          <li>✅ 使用测试工具验证确定性</li>
        </ul>
        <div className="mt-4">
          <Button asChild>
            <Link href="/docs/develop/activities">
              <ArrowRight className="mr-2 h-4 w-4" />
              了解活动
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
