import Link from 'next/link';
import { ArrowRight, Terminal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'Hello World',
  description: '学习 Temporal 的基本概念',
};

export default function HelloWorld() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Hello World 教程</h1>
      <p className="text-xl text-gray-600 mb-8">
        在 5 分钟内创建并运行您的第一个 Temporal 工作流。
      </p>

      <div className="my-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">开始之前</h3>
        <p className="text-yellow-700">
          确保您已完成 Temporal 的安装，并且本地 Temporal Server 正在运行（端口 7233）。
        </p>
      </div>

      <div className="my-8">
        <Image 
          src="/images/diagrams/workflow-architecture.svg" 
          alt="Temporal 工作流架构" 
          width={800}
          height={400}
          className="rounded-lg border border-gray-200"
        />
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">第一步：创建工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        工作流定义了整个业务流程。让我们创建一个简单的工作流，返回 "Hello World!" 消息。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">HelloWorldWorkflow.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface HelloWorldWorkflow {
    
    @WorkflowMethod
    String execute(String name);
}

public class HelloWorldWorkflowImpl implements HelloWorldWorkflow {
    
    @Override
    public String execute(String name) {
        return "Hello, " + name + "!";
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">第二步：创建 Worker</h2>

      <p className="text-lg text-gray-700 mb-6">
        Worker 负责执行工作流代码。让我们创建一个 Worker 来运行我们的工作流。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">WorkerMain.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class WorkerMain {
    
    public static void main(String[] args) {
        // 创建客户端连接
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setTarget("localhost:7233")
                .build()
        );
        
        WorkflowClient client = WorkflowClient.newInstance(
            service,
            WorkflowClientOptions.newBuilder().build()
        );
        
        // 创建 Worker 工厂
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // 创建 Worker
        Worker worker = factory.newWorker("hello-world-task-queue");
        
        // 注册工作流实现
        worker.registerWorkflowImplementationTypes(
            HelloWorldWorkflowImpl.class
        );
        
        // 启动 Worker
        factory.start();
        
        System.out.println("Worker started. Press Ctrl+C to exit.");
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">第三步：启动工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建一个客户端程序来启动工作流执行。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">StarterMain.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.workflow.WorkflowExecution;

public class StarterMain {
    
    public static void main(String[] args) {
        // 创建客户端连接
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setTarget("localhost:7233")
                .build()
        );
        
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // 配置工作流选项
        WorkflowOptions options = WorkflowOptions.newBuilder()
            .setTaskQueue("hello-world-task-queue")
            .setWorkflowId("hello-world-workflow-id")
            .build();
        
        // 获取工作流存根
        HelloWorldWorkflow workflow = client.newWorkflowStub(
            HelloWorldWorkflow.class,
            options
        );
        
        // 执行工作流
        String result = workflow.execute("World");
        
        System.out.println("Workflow result: " + result);
        
        System.exit(0);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">运行程序</h2>

      <div className="space-y-4 my-8">
        <div>
          <h3 className="text-2xl font-semibold mb-3">1. 启动 Worker（终端 1）</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-mono">Terminal</span>
              </div>
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                java -cp temporal-sdk.jar WorkerMain
              </code>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3">2. 启动工作流（终端 2）</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-mono">Terminal</span>
              </div>
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                java -cp temporal-sdk.jar StarterMain
              </code>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查看结果</h2>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <p className="text-green-800 font-mono text-sm">
          Workflow result: Hello, World!
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">在 Web UI 中查看</h2>

      <p className="text-lg text-gray-700 mb-6">
        打开浏览器访问 Temporal Web UI，您可以看到工作流的执行历史和事件。
      </p>

      <Card className="my-8 bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <p className="text-gray-700">
            访问 <a href="http://localhost:8233" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">http://localhost:8233</a><br/>
            点击工作流 ID "hello-world-workflow-id" 查看详细的执行历史。
          </p>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心概念总结</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">工作流接口</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">@WorkflowInterface</code> 注解定义工作流接口
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Worker 配置</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              使用 WorkerFactory 创建 Worker，通过 <code className="bg-gray-100 px-1 py-0.5 rounded">registerWorkflowImplementationTypes()</code> 注册
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">客户端调用</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">newWorkflowStub()</code> 获取工作流存根，调用 <code className="bg-gray-100 px-1 py-0.5 rounded">execute()</code> 启动
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <p className="text-lg text-gray-700 mb-6">
        恭喜！您已经成功运行了第一个 Temporal 工作流。接下来学习更多核心概念：
      </p>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="/docs/develop/workflows">
              <Play className="mr-2 h-4 w-4" />
              深入学习工作流
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/develop/activities">
              <Play className="mr-2 h-4 w-4" />
              了解活动
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/sdk/java">
              <Play className="mr-2 h-4 w-4" />
              Java SDK 完整指南
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
