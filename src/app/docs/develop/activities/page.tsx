import Link from 'next/link';
import { Code, Database, RefreshCw, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '活动',
  description: '定义和执行活动',
};

export default function Activities() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">活动</h1>
      <p className="text-xl text-gray-600 mb-8">
        活动表示工作流中的单个操作或任务，通常是调用外部系统或执行计算。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">核心概念</h3>
        <p className="text-green-700">
          活动是工作流中执行非确定性操作的地方。与工作流不同，活动可以访问外部系统、
          使用系统时间、执行随机数操作等。活动失败时会自动重试，确保可靠性。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动特性</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>非确定性操作</CardTitle>
            <CardDescription>
              可以调用外部 API、数据库、文件系统等非确定性操作
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <RefreshCw className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>自动重试</CardTitle>
            <CardDescription>
              活动失败时自动重试，可配置重试策略和最大重试次数
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>超时控制</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              支持多种超时设置，确保活动不会无限期运行
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>状态隔离</CardTitle>
            <CardDescription>
              活动之间状态隔离，每次执行都是独立的
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义活动接口</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 <code className="bg-gray-100 px-2 py-1 rounded">@ActivityInterface</code> 注解定义活动接口。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">PaymentActivities.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.activity.ActivityInterface;

@ActivityInterface
public interface PaymentActivities {
    
    void validatePayment(PaymentRequest request);
    
    String chargePayment(PaymentRequest request);
    
    void refundPayment(String transactionId);
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">实现活动</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建类实现活动接口，实现具体的业务逻辑。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">PaymentActivitiesImpl.java</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import java.util.UUID;

public class PaymentActivitiesImpl implements PaymentActivities {
    
    @Override
    public void validatePayment(PaymentRequest request) {
        // 调用外部支付服务验证
        if (request.getCardNumber() == null || 
            request.getCardNumber().length() < 16) {
            throw new IllegalArgumentException("Invalid card number");
        }
        
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException("Invalid amount");
        }
        
        // 可以调用外部 API 进行验证
        // PaymentGatewayApi.validate(request);
    }
    
    @Override
    public String chargePayment(PaymentRequest request) {
        // 调用支付网关执行扣款
        // Transaction transaction = PaymentGatewayApi.charge(request);
        
        // 模拟返回交易 ID
        String transactionId = "TXN-" + UUID.randomUUID().toString();
        
        return transactionId;
    }
    
    @Override
    public void refundPayment(String transactionId) {
        // 调用支付网关执行退款
        // PaymentGatewayApi.refund(transactionId);
        
        System.out.println("Refunded transaction: " + transactionId);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">配置活动选项</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流中创建活动存根时，可以配置活动的超时和重试策略。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">ActivityOptions 示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.activity.ActivityOptions;
import io.temporal.common.RetryOptions;
import java.time.Duration;

// 创建活动选项
ActivityOptions options = ActivityOptions.newBuilder()
    // 设置活动超时（从开始到完成的总时间）
    .setStartToCloseTimeout(Duration.ofSeconds(30))
    
    // 设置重试策略
    .setRetryOptions(RetryOptions.newBuilder()
        .setInitialInterval(Duration.ofSeconds(1))
        .setBackoffCoefficient(2.0)
        .setMaximumInterval(Duration.ofSeconds(10))
        .setMaximumAttempts(3)
        .build())
    
    // 设置心跳超时（用于长时间运行的活动）
    .setHeartbeatTimeout(Duration.ofSeconds(5))
    
    .build();

// 创建活动存根
PaymentActivities activities = Workflow.newActivityStub(
    PaymentActivities.class,
    options
);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">超时类型</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-lg">StartToCloseTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              活动从开始到完成的总超时时间，包括重试时间
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-green-600 mb-2" />
            <CardTitle className="text-lg">ScheduleToCloseTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              活动从调度到完成的总超时时间，包括在任务队列中等待的时间
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-purple-600 mb-2" />
            <CardTitle className="text-lg">ScheduleToStartTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              活动在任务队列中等待的最大时间
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-6 w-6 text-orange-600 mb-2" />
            <CardTitle className="text-lg">HeartbeatTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              长时间运行的活动必须定期发送心跳，防止超时
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动心跳</h2>

      <p className="text-lg text-gray-700 mb-6">
        对于长时间运行的活动，需要定期发送心跳来保持活动活跃。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">带心跳的活动</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`package io.temporal.sample;

import io.temporal.activity.Activity;

public class LongRunningActivitiesImpl implements LongRunningActivities {
    
    @Override
    public void processLargeData(DataRequest request) {
        int totalItems = request.getItems().size();
        int processedItems = 0;
        
        for (DataItem item : request.getItems()) {
            // 处理数据
            processItem(item);
            
            processedItems++;
            
            // 每 10 个项目发送一次心跳
            if (processedItems % 10 == 0) {
                Activity.heartbeat(processedItems);
                
                // 可以携带进度信息
                Activity.heartbeat(new Progress(processedItems, totalItems));
            }
        }
    }
    
    private void processItem(DataItem item) {
        // 实际处理逻辑
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">本地活动</h2>

      <p className="text-lg text-gray-700 mb-6">
        本地活动直接在 Worker 进程中执行，不通过网络调用，适用于快速、轻量级的操作。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">适用场景</h3>
        <ul className="space-y-1 text-blue-700 text-sm">
          <li>• 计算密集型但执行时间短（&lt;1秒）</li>
          <li>• 不需要调用外部系统</li>
          <li>• 不需要持久化状态</li>
        </ul>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">本地活动配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.activity.LocalActivityOptions;

LocalActivityOptions localOptions = LocalActivityOptions.newBuilder()
    .setStartToCloseTimeout(Duration.ofSeconds(1))
    .build();

ValidationActivities validation = Workflow.newLocalActivityStub(
    ValidationActivities.class,
    localOptions
);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">注册活动</h2>

      <p className="text-lg text-gray-700 mb-6">
        在 Worker 中注册活动实现类。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Worker 注册活动</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.worker.WorkerFactory;

WorkerFactory factory = WorkerFactory.newInstance(client);
Worker worker = factory.newWorker("payment-task-queue");

// 注册活动实现类
worker.registerActivitiesImplementations(
    new PaymentActivitiesImpl(),
    new LongRunningActivitiesImpl()
);

factory.start();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">幂等性</h3>
            <p className="text-gray-600 text-sm">
              活动应该是幂等的，因为重试可能导致多次执行
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">合理的超时设置</h3>
            <p className="text-gray-600 text-sm">
              根据活动实际执行时间设置超时，避免过长或过短
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Database className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">避免硬编码</h3>
            <p className="text-gray-600 text-sm">
              使用配置文件或参数传递配置信息
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">错误处理</h3>
            <p className="text-gray-600 text-sm">
              抛出特定异常以区分业务错误和系统错误
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflows">
            <Code className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流</div>
              <div className="text-sm text-gray-600 mt-1">
                学习如何定义工作流
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/errors">
            <Shield className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">错误处理</div>
              <div className="text-sm text-gray-600 mt-1">
                处理活动和工作流中的错误
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
