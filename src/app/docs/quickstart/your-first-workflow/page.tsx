import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle, Zap, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '运行第一个工作流',
  description: '在 5 分钟内创建并运行第一个工作流',
};

export default function YourFirstWorkflow() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">运行第一个工作流</h1>
      <p className="text-xl text-gray-600 mb-8">
        快速体验 Temporal 的核心功能，创建一个简单的工作流应用。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">本教程时长</h3>
        <p className="text-blue-700 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          约 5 分钟
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">准备环境</h2>

      <div className="space-y-4 my-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">安装 Temporal CLI</h3>
            <p className="text-gray-600 text-sm">
              运行 <code className="bg-gray-100 px-2 py-1 rounded text-sm">curl -sSf https://temporal.io/cli.sh | sh</code>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">启动本地服务器</h3>
            <p className="text-gray-600 text-sm">
              运行 <code className="bg-gray-100 px-2 py-1 rounded text-sm">temporal server start-dev</code>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">创建 Java 项目</h3>
            <p className="text-gray-600 text-sm">
              使用 Maven 或 Gradle 创建项目并添加 Temporal SDK 依赖
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">创建工作流项目</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建一个新的 Java 项目并添加工作流代码。
      </p>

      <div className="my-8 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">添加 Maven 依赖</h3>
          <p className="text-gray-600 mb-3 text-sm">在 <code className="bg-gray-100 px-1 py-0.5 rounded">pom.xml</code> 中添加：</p>
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="pb-2">
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">pom.xml</span>
            </CardHeader>
            <CardContent>
              <pre className="text-sm font-mono overflow-x-auto">
{`<dependency>
    <groupId>io.temporal</groupId>
    <artifactId>temporal-sdk</artifactId>
    <version>1.23.1</version>
</dependency>`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">定义工作流接口</h3>
          <p className="text-gray-600 mb-3 text-sm">创建 <code className="bg-gray-100 px-1 py-0.5 rounded">GreetingWorkflow.java</code> 文件：</p>
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="pb-2">
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </CardHeader>
            <CardContent>
              <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface GreetingWorkflow {
    
    @WorkflowMethod
    String greet(String name);
}`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">实现工作流</h3>
          <p className="text-gray-600 mb-3 text-sm">创建 <code className="bg-gray-100 px-1 py-0.5 rounded">GreetingWorkflowImpl.java</code> 文件：</p>
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="pb-2">
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </CardHeader>
            <CardContent>
              <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.workflow.Workflow;
import java.time.Duration;

public class GreetingWorkflowImpl implements GreetingWorkflow {
    
    @Override
    public String greet(String name) {
        // 获取工作流日志
        Workflow.getLogger(getClass()).info("Greeting workflow started");
        
        // 等待 1 秒
        Workflow.sleep(Duration.ofSeconds(1));
        
        String greeting = "Hello, " + name + "!";
        Workflow.getLogger(getClass()).info("Greeting created: " + greeting);
        
        return greeting;
    }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">创建 Worker</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建一个 Worker 来执行工作流。
      </p>

      <div className="my-8">
        <p className="text-gray-600 mb-3 text-sm">创建 <code className="bg-gray-100 px-1 py-0.5 rounded">WorkerMain.java</code> 文件：</p>
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-2">
            <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.worker.WorkerFactory;
import io.temporal.worker.Worker;

public class WorkerMain {
    
    public static void main(String[] args) {
        // 创建服务连接
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setTarget("localhost:7233")
                .build()
        );
        
        // 创建工作流客户端
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // 创建 Worker 工厂
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // 创建 Worker
        Worker worker = factory.newWorker("my-task-queue");
        
        // 注册工作流
        worker.registerWorkflowImplementationTypes(
            GreetingWorkflowImpl.class
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

      <h2 className="text-3xl font-bold mt-12 mb-6">启动工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建启动器来执行工作流。
      </p>

      <div className="my-8">
        <p className="text-gray-600 mb-3 text-sm">创建 <code className="bg-gray-100 px-1 py-0.5 rounded">StarterMain.java</code> 文件：</p>
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-2">
            <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class StarterMain {
    
    public static void main(String[] args) {
        // 创建服务连接
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setTarget("localhost:7233")
                .build()
        );
        
        // 创建工作流客户端
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // 配置工作流选项
        WorkflowOptions options = WorkflowOptions.newBuilder()
            .setTaskQueue("my-task-queue")
            .setWorkflowId("greeting-workflow-123")
            .build();
        
        // 获取工作流存根
        GreetingWorkflow workflow = client.newWorkflowStub(
            GreetingWorkflow.class,
            options
        );
        
        // 同步执行工作流
        String result = workflow.greet("World");
        
        System.out.println("Workflow result: " + result);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">运行程序</h2>

      <div className="space-y-6 my-8">
        <div>
          <h3 className="text-2xl font-semibold mb-3">1. 启动 Worker（终端 1）</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-mono">Terminal</span>
              </div>
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                mvn exec:java -Dexec.mainClass="io.temporal.sample.WorkerMain"
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
                mvn exec:java -Dexec.mainClass="io.temporal.sample.StarterMain"
              </code>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查看结果</h2>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">成功！</h3>
            <p className="text-green-700 font-mono text-sm mb-2">
              Workflow result: Hello, World!
            </p>
            <p className="text-green-700 text-sm">
              恭喜！您已经成功运行了第一个 Temporal 工作流。
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">在 Web UI 中查看</h2>

      <p className="text-lg text-gray-700 mb-6">
        打开浏览器访问 Temporal Web UI，您可以看到工作流的执行历史和事件。
      </p>

      <div className="my-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-4">
          <a 
            href="http://localhost:8233" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            http://localhost:8233
          </a>
          <span className="text-gray-600">
            → 查看工作流执行历史
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-12 space-y-4">
        <Button size="lg" asChild>
          <Link href="/docs/develop/workflows">
            <Zap className="mr-2 h-4 w-4" />
            深入学习工作流
          </Link>
        </Button>
        <br />
        <Button variant="outline" size="lg" asChild>
          <Link href="/docs/sdk/java">
            查看 Java SDK 完整文档
          </Link>
        </Button>
      </div>
    </div>
  );
}
