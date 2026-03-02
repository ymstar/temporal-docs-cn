import Link from 'next/link';
import { ArrowRight, Terminal, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Go SDK',
  description: '使用 Go 语言开发 Temporal 应用',
};

export default function GoSDK() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Go SDK</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal Go SDK 让您使用 Go 语言构建可靠的分布式应用程序。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">快速开始</h3>
        <p className="text-green-700 mb-3">
          安装 Go SDK：
        </p>
        <Card className="bg-gray-900 text-white border-0 inline-block">
          <CardContent className="pt-4">
            <code className="text-sm font-mono">go get go.temporal.io/sdk</code>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">SDK 组成部分</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <Terminal className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Client</CardTitle>
            <CardDescription>
              用于启动工作流、发送信号和查询的客户端库
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">go.temporal.io/sdk/client</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Worker</CardTitle>
            <CardDescription>
              用于运行工作流和活动的 Worker 库
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">go.temporal.io/sdk/worker</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Workflow</CardTitle>
            <CardDescription>
              定义工作流的 API 和上下文
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">go.temporal.io/sdk/workflow</code>
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">创建客户端连接</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">client.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "log"
    "go.temporal.io/sdk/client"
)

func main() {
    // 创建客户端连接
    c, err := client.Dial(client.Options{
        HostPort: "localhost:7233",
    })
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
    }
    defer c.Close()
    
    // 使用客户端启动工作流...
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">创建 Worker</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">worker.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "log"
    "go.temporal.io/sdk/client"
    "go.temporal.io/sdk/worker"
)

func main() {
    // 创建客户端连接
    c, err := client.Dial(client.Options{
        HostPort: "localhost:7233",
    })
    if err != nil {
        log.Fatal(err)
    }
    defer c.Close()
    
    // 创建 Worker
    w := worker.New(c, "my-task-queue", worker.Options{})
    
    // 注册工作流和活动
    w.RegisterWorkflow(MyWorkflow)
    w.RegisterActivity(MyActivity)
    
    // 启动 Worker
    if err := w.Run(worker.InterruptCh()); err != nil {
        log.Fatal(err)
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义工作流</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">workflow.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "time"
    "go.temporal.io/sdk/workflow"
    "go.temporal.io/sdk/temporal"
)

func MyWorkflow(ctx workflow.Context, name string) (string, error) {
    // 设置活动选项
    ao := workflow.ActivityOptions{
        StartToCloseTimeout: 10 * time.Second,
        RetryPolicy: &temporal.RetryPolicy{
            InitialInterval:    time.Second,
            BackoffCoefficient: 2.0,
            MaximumAttempts:    3,
        },
    }
    ctx = workflow.WithActivityOptions(ctx, ao)
    
    // 执行活动
    var result string
    err := workflow.ExecuteActivity(ctx, MyActivity, name).Get(ctx, &result)
    if err != nil {
        return "", err
    }
    
    return result, nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义活动</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">activity.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "context"
    "fmt"
)

func MyActivity(ctx context.Context, name string) (string, error) {
    // 执行实际的业务逻辑
    result := fmt.Sprintf("Hello, %s!", name)
    return result, nil
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">启动工作流</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <span className="text-sm text-green-400 font-mono">starter.go</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package main

import (
    "context"
    "log"
    "go.temporal.io/sdk/client"
)

func main() {
    c, err := client.Dial(client.Options{
        HostPort: "localhost:7233",
    })
    if err != nil {
        log.Fatal(err)
    }
    defer c.Close()
    
    // 启动工作流
    options := client.StartWorkflowOptions{
        ID:        "my-workflow-id",
        TaskQueue: "my-task-queue",
    }
    
    we, err := c.ExecuteWorkflow(
        context.Background(),
        options,
        MyWorkflow,
        "World",
    )
    if err != nil {
        log.Fatal(err)
    }
    
    // 等待工作流完成
    var result string
    err = we.Get(context.Background(), &result)
    if err != nil {
        log.Fatal(err)
    }
    
    log.Println("Result:", result)
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常用功能</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">发送信号</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-3">
              向运行中的工作流发送数据：
            </p>
            <Card className="bg-gray-900 text-white border-0 inline-block">
              <CardContent className="pt-4">
                <code className="text-sm font-mono">c.SignalWorkflow(ctx, workflowID, runID, "signal-name", data)</code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">查询工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-3">
              查询工作流状态：
            </p>
            <Card className="bg-gray-900 text-white border-0 inline-block">
              <CardContent className="pt-4">
                <code className="text-sm font-mono">c.QueryWorkflow(ctx, workflowID, runID, "query-name", result)</code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">取消工作流</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-3">
              取消正在运行的工作流：
            </p>
            <Card className="bg-gray-900 text-white border-0 inline-block">
              <CardContent className="pt-4">
                <code className="text-sm font-mono">c.CancelWorkflow(ctx, workflowID, runID)</code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">资源链接</h2>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="space-y-3">
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://pkg.go.dev/go.temporal.io/sdk" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Go SDK API 文档
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://github.com/temporalio/sdk-go" target="_blank" rel="noopener noreferrer">
              <Terminal className="mr-2 h-4 w-4" />
              Go SDK GitHub 仓库
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/workflows">
              <ArrowRight className="mr-2 h-4 w-4" />
              工作流开发指南
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/activities">
              <Zap className="mr-2 h-4 w-4" />
              活动开发指南
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
