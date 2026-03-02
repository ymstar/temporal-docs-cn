import Link from 'next/link';
import { ArrowRight, Play, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流执行',
  description: '工作流的执行模型和生命周期',
};

export default function WorkflowExecution() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流执行</h1>
      <p className="text-xl text-gray-600 mb-8">
        了解工作流的执行模型、生命周期和执行选项。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          工流执行是工作流的一次具体运行。每次执行都有唯一的 <code className="bg-blue-100 px-1 py-0.5 rounded">RunID</code>，
          但可以共享相同的 <code className="bg-blue-100 px-1 py-0.5 rounded">WorkflowID</code>。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流 ID vs Run ID</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Workflow ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              工作流的业务标识符，由您指定。同一个 Workflow ID 可以有多个执行（Run ID）。
            </p>
            <Card className="bg-gray-100 border-0">
              <CardContent className="pt-4">
                <code className="text-xs font-mono">order-12345</code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle>Run ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              每次工作流执行的唯一标识符，由 Temporal Server 自动生成。
            </p>
            <Card className="bg-gray-100 border-0">
              <CardContent className="pt-4">
                <code className="text-xs font-mono">52e34b03-93b1-4d24-bfb9-6c0c8389d3f6</code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">启动工作流执行</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">start_workflow.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "context"
    "log"
    "go.temporal.io/sdk/client"
)

func startWorkflow(c client.Client) {
    // 配置启动选项
    options := client.StartWorkflowOptions{
        ID:        "my-workflow-id",        // 工作流 ID
        TaskQueue: "my-task-queue",         // 任务队列
    }
    
    // 启动工作流
    we, err := c.ExecuteWorkflow(
        context.Background(),
        options,
        MyWorkflow,                          // 工作流函数
        "input-param",                       // 工作流参数
    )
    if err != nil {
        log.Fatalf("Failed to execute workflow: %v", err)
    }
    
    log.Printf("Started workflow. WorkflowID: %s, RunID: %s",
        we.GetID(), we.GetRunID())
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流执行选项</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              工作流的业务标识符。如果 ID 已存在且工作流正在运行，
              将返回已有执行的 WorkflowExecution。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TaskQueue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              指定运行此工作流的 Worker 订阅的任务队列。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">WorkflowExecutionTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              工作流执行的超时时间。包括所有活动和子工作流的执行时间。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">WorkflowRunTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              单次工作流运行的超时时间。不包括重试和子工作流的时间。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">WorkflowTaskTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              单个工作流任务的超时时间。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流生命周期</h2>

      <div className="my-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 w-5 h-5 bg-blue-600 rounded-full"></div>
            <h3 className="font-semibold text-lg">1. 启动（Started）</h3>
            <p className="text-gray-600 text-sm mt-1">
              客户端调用 ExecuteWorkflow，工作流开始执行。
            </p>
          </div>

          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 w-5 h-5 bg-green-600 rounded-full"></div>
            <h3 className="font-semibold text-lg">2. 运行中（Running）</h3>
            <p className="text-gray-600 text-sm mt-1">
              Worker 接收工作流任务，开始执行工作流代码。
            </p>
          </div>

          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 w-5 h-5 bg-purple-600 rounded-full"></div>
            <h3 className="font-semibold text-lg">3. 等待（Waiting）</h3>
            <p className="text-gray-600 text-sm mt-1">
              工作流等待活动完成、定时器到期或外部信号。
            </p>
          </div>

          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 w-5 h-5 bg-orange-600 rounded-full"></div>
            <h3 className="font-semibold text-lg">4. 完成（Completed）</h3>
            <p className="text-gray-600 text-sm mt-1">
              工作流成功执行完成并返回结果。
            </p>
          </div>

          <div className="relative pl-12">
            <div className="absolute left-2 w-5 h-5 bg-red-600 rounded-full"></div>
            <h3 className="font-semibold text-lg">5. 失败（Failed）</h3>
            <p className="text-gray-600 text-sm mt-1">
              工作流执行失败，可以配置重试策略。
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流重试</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">retry_policy.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "time"
    "go.temporal.io/sdk/client"
    "go.temporal.io/sdk/temporal"
)

func startWorkflowWithRetry(c client.Client) {
    // 配置重试策略
    retryPolicy := &temporal.RetryPolicy{
        InitialInterval:    time.Second,      // 初始间隔
        BackoffCoefficient: 2.0,              // 退避系数
        MaximumInterval:    10 * time.Second, // 最大间隔
        MaximumAttempts:    5,                // 最大尝试次数
    }
    
    options := client.StartWorkflowOptions{
        ID:        "workflow-with-retry",
        TaskQueue: "my-task-queue",
        RetryPolicy: retryPolicy,
    }
    
    we, err := c.ExecuteWorkflow(
        context.Background(),
        options,
        MyWorkflow,
    )
    // ...
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">获取工作流结果</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">get_result.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "context"
    "log"
)

func getWorkflowResult(we client.WorkflowExecution) {
    // 等待工作流完成
    var result string
    err := we.Get(context.Background(), &result)
    if err != nil {
        log.Fatalf("Workflow failed: %v", err)
    }
    
    log.Printf("Workflow result: %s", result)
}

// 异步获取结果
func getWorkflowResultAsync(we client.WorkflowExecution) {
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    var result string
    err := we.Get(ctx, &result)
    if err != nil {
        log.Printf("Workflow failed or timed out: %v", err)
        return
    }
    
    log.Printf("Workflow result: %s", result)
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">相关主题</h3>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="/docs/develop/workflows/determinism">
              <Play className="mr-2 h-4 w-4" />
              工作流确定性
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/signals">
              发送信号到工作流
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/queries">
              查询工作流状态
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
