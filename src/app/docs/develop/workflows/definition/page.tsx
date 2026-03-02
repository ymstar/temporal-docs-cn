import Link from 'next/link';
import { ArrowRight, Code2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流定义',
  description: '如何定义工作流',
};

export default function WorkflowDefinition() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流定义</h1>
      <p className="text-xl text-gray-600 mb-8">
        学习如何定义工作流函数，理解工作流接口和类型。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          工作流是一个接收 <code className="bg-blue-100 px-1 py-0.5 rounded">workflow.Context</code> 的函数，
          它定义了整个业务流程的逻辑。工作流必须是确定性的，即相同的输入总是产生相同的输出。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流函数签名</h2>

      <p className="text-lg text-gray-700 mb-6">
        工作流函数必须接收一个 <code className="bg-gray-100 px-2 py-1 rounded">workflow.Context</code> 参数，
        可以有零个或多个输入参数，并返回一个结果（或错误）。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">workflow.go</span>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">Go</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "time"
    "go.temporal.io/sdk/workflow"
)

// SimpleWorkflow 简单的工作流示例
func SimpleWorkflow(ctx workflow.Context, name string) (string, error) {
    // 工作流逻辑
    return "Hello, " + name + "!", nil
}

// WorkflowWithInput 带有多个参数的工作流
func WorkflowWithInput(
    ctx workflow.Context,
    firstName string,
    lastName string,
    age int,
) (string, error) {
    // 处理多个参数
    return fmt.Sprintf("Name: %s %s, Age: %d", firstName, lastName, age), nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流接口定义（推荐）</h2>

      <p className="text-lg text-gray-700 mb-6">
        推荐使用接口定义工作流，这样可以提供类型安全和更好的开发体验。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">interfaces.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

// GreetingWorkflow 工作流接口
type GreetingWorkflow interface {
    // Greet 工作流方法
    Greet(name string) (string, error)
}

// OrderWorkflow 订单处理工作流接口
type OrderWorkflow interface {
    // ProcessOrder 处理订单
    ProcessOrder(order Order) (OrderResult, error)
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流上下文</h2>

      <p className="text-lg text-gray-700 mb-6">
        工作流上下文提供了访问工作流功能的 API，包括日志、心跳、计时器等。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">workflow_with_context.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "time"
    "go.temporal.io/sdk/workflow"
)

func WorkflowWithFeatures(ctx workflow.Context, name string) (string, error) {
    // 获取日志记录器
    logger := workflow.GetLogger(ctx)
    logger.Info("Workflow started", "name", name)
    
    // 使用计时器延迟执行
    workflow.Sleep(ctx, 10*time.Second)
    
    // 获取当前时间
    now := workflow.Now(ctx)
    logger.Info("Current time", "time", now)
    
    // 检查工作流是否被取消
    if workflow.IsCanceled(ctx) {
        return "", workflow.NewCanceledError()
    }
    
    return "Hello, " + name + "!", nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流确定性的要求</h2>

      <div className="space-y-4 my-8">
        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">使用 Temporal 提供的 API</h3>
                <p className="text-sm text-gray-600">
                  使用 workflow.Sleep() 而不是 time.Sleep()
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">避免使用外部系统时间</h3>
                <p className="text-sm text-gray-600">
                  使用 workflow.Now() 而不是 time.Now()
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">避免随机数生成</h3>
                <p className="text-sm text-gray-600">
                  不在工作流中使用 rand.Random()，通过活动生成
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">避免全局变量</h3>
                <p className="text-sm text-gray-600">
                  不依赖可变的全局状态
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流类型</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <Code2 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>简单工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              接收输入，返回结果，不涉及复杂的流程控制。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code2 className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>顺序工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              按顺序执行一系列活动，每个活动完成后执行下一个。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code2 className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>并行工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              同时执行多个活动，并等待所有活动完成。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code2 className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>复杂工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              包含条件判断、循环、子工作流等复杂逻辑。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">1. 使用接口定义工作流</h3>
            <p className="text-sm text-gray-600">
              提供类型安全和更好的 IDE 支持。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">2. 保持工作流简单</h3>
            <p className="text-sm text-gray-600">
              将业务逻辑放在活动中，工作流专注于编排。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">3. 添加日志记录</h3>
            <p className="text-sm text-gray-600">
              使用工作流日志记录重要事件，便于调试。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">4. 处理错误</h3>
            <p className="text-sm text-gray-600">
              正确处理活动和工作流错误，实现重试和补偿逻辑。
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">下一步</h3>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="/docs/develop/workflows/execution">
              <ArrowRight className="mr-2 h-4 w-4" />
              学习工作流执行
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/workflows/determinism">
              <Code2 className="mr-2 h-4 w-4" />
              了解工作流确定性
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
