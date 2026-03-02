import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Database, Clock, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流',
  description: '定义和执行工作流',
};

export default function Workflows() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流</h1>
      <p className="text-xl text-gray-600 mb-8">
        工作流定义了整个业务流程，是 Temporal 应用的核心构建块。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          工作流是定义业务流程的类，它使用 Temporal SDK 提供的 API 来协调活动的执行、
          处理信号和查询，并维护状态。工作流代码必须是确定性的，以确保在不同时间和位置执行结果一致。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流特性</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>确定性执行</CardTitle>
            <CardDescription>
              工作流代码必须是确定性的，相同的输入总是产生相同的输出
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>状态持久化</CardTitle>
            <CardDescription>
              工作流状态自动保存到 Temporal Server，支持长时间运行的流程
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>可观测性</CardTitle>
            <CardDescription>
              完整的执行历史记录，每个操作都可追踪和调试
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <ArrowRight className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>自动重试</CardTitle>
            <CardDescription>
              工作流失败时自动重试，确保业务流程最终完成
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义工作流接口</h2>

      <p className="text-lg text-gray-700 mb-6">
        在 Java SDK 中，工作流通过接口定义。使用 <code className="bg-gray-100 px-2 py-1 rounded">@WorkflowInterface</code> 注解标记接口，
        并使用 <code className="bg-gray-100 px-2 py-1 rounded">@WorkflowMethod</code> 注解标记工作流方法。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">PaymentWorkflow.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;
import io.temporal.workflow.SignalMethod;
import io.temporal.workflow.QueryMethod;

@WorkflowInterface
public interface PaymentWorkflow {
    
    @WorkflowMethod
    PaymentResult processPayment(PaymentRequest request);
    
    @SignalMethod
    void cancelPayment(String reason);
    
    @QueryMethod
    PaymentStatus getStatus();
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">实现工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建类实现工作流接口。工作流实现类必须提供无参构造函数。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">PaymentWorkflowImpl.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.workflow.Workflow;
import io.temporal.activity.ActivityOptions;
import java.time.Duration;

public class PaymentWorkflowImpl implements PaymentWorkflow {
    
    private PaymentStatus status = PaymentStatus.PENDING;
    private String cancellationReason = null;
    
    private final PaymentActivities activities = Workflow.newActivityStub(
        PaymentActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public PaymentResult processPayment(PaymentRequest request) {
        // 检查是否被取消
        if (cancellationReason != null) {
            return PaymentResult.canceled(cancellationReason);
        }
        
        status = PaymentStatus.PROCESSING;
        
        try {
            // 验证支付信息
            activities.validatePayment(request);
            
            // 检查是否被取消
            if (cancellationReason != null) {
                return PaymentResult.canceled(cancellationReason);
            }
            
            status = PaymentStatus.CHARGING;
            
            // 执行扣款
            String transactionId = activities.chargePayment(request);
            
            status = PaymentStatus.COMPLETED;
            return PaymentResult.success(transactionId);
            
        } catch (Exception e) {
            status = PaymentStatus.FAILED;
            throw e;
        }
    }
    
    @Override
    public void cancelPayment(String reason) {
        if (status == PaymentStatus.PENDING || 
            status == PaymentStatus.PROCESSING) {
            cancellationReason = reason;
            status = PaymentStatus.CANCELED;
        }
    }
    
    @Override
    public PaymentStatus getStatus() {
        return status;
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流功能</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">调用活动</h3>
            <p className="text-gray-600 text-sm">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">Workflow.newActivityStub()</code> 创建活动存根，然后调用活动方法
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">等待定时器</h3>
            <p className="text-gray-600 text-sm">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">Workflow.await()</code> 或 <code className="bg-gray-100 px-1 py-0.5 rounded">Workflow.sleep()</code> 延迟执行
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">处理信号</h3>
            <p className="text-gray-600 text-sm">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">@SignalMethod</code> 注解定义信号方法
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">响应查询</h3>
            <p className="text-gray-600 text-sm">
              使用 <code className="bg-gray-100 px-1 py-0.5 rounded">@QueryMethod</code> 注解定义查询方法
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">确定性约束</h2>

      <div className="my-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">重要：必须遵守的规则</h3>
        <ul className="space-y-2 text-yellow-700">
          <li>• 不要在工作流中直接调用外部系统（HTTP、数据库等）</li>
          <li>• 不要使用 <code className="bg-gray-200 px-1 rounded">System.currentTimeMillis()</code> 或 <code className="bg-gray-200 px-1 rounded">Date()</code>，使用 <code className="bg-gray-200 px-1 rounded">Workflow.currentTimeMillis()</code></li>
          <li>• 不要使用 <code className="bg-gray-200 px-1 rounded">Math.random()</code>，使用确定性的随机数生成器</li>
          <li>• 不要记录敏感信息到工作流历史</li>
          <li>• 不要修改工作流接口定义（会导致历史不兼容）</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">注册工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        在 Worker 中注册工作流实现类，使其能够接收和执行工作流任务。
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
{`import io.temporal.worker.WorkerFactory;

// 创建 Worker 工厂
WorkerFactory factory = WorkerFactory.newInstance(client);

// 创建 Worker 并指定任务队列
Worker worker = factory.newWorker("payment-task-queue");

// 注册工作流实现类
worker.registerWorkflowImplementationTypes(
    PaymentWorkflowImpl.class
);

// 启动 Worker
factory.start();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">执行工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用客户端创建工作流存根并调用工作流方法。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">PaymentClient.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.workflow.WorkflowExecution;

// 配置工作流选项
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("payment-task-queue")
    .setWorkflowId("payment-" + requestId)
    .build();

// 获取工作流存根
PaymentWorkflow workflow = client.newWorkflowStub(
    PaymentWorkflow.class,
    options
);

// 同步执行（等待结果）
PaymentResult result = workflow.processPayment(request);

// 或异步执行（获取 WorkflowExecution）
WorkflowExecution execution = WorkflowClient.start(
    workflow::processPayment, 
    request
);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/activities">
            <Code className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">活动</div>
              <div className="text-sm text-gray-600 mt-1">
                学习如何定义和执行活动
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflow-options">
            <Database className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流选项</div>
              <div className="text-sm text-gray-600 mt-1">
                配置工作流的执行选项
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/versioning">
            <ArrowRight className="h-8 w-8 text-orange-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流版本控制</div>
              <div className="text-sm text-gray-600 mt-1">
                安全地更新工作流代码
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
