import Link from 'next/link';
import { Code, Layers, GitBranch, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '子工作流',
  description: '在子工作流中编排复杂逻辑',
};

export default function ChildWorkflows() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">子工作流</h1>
      <p className="text-xl text-gray-600 mb-8">
        子工作流允许您在一个工作流中编排其他工作流，实现复杂业务逻辑的模块化。
      </p>

      <div className="my-8 bg-purple-50 border-l-4 border-purple-500 p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">核心概念</h3>
        <p className="text-purple-700">
          子工作流是从父工作流启动的独立工作流实例。每个子工作流有自己的工作流 ID、
          执行历史和状态，但与父工作流在同一个任务队列中执行。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">为什么使用子工作流？</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Layers className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>模块化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              将复杂的业务逻辑拆分为多个可重用的工作流
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <GitBranch className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>层次化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              构建工作流的层次结构，便于管理和追踪
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>并发执行</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              并发执行多个子工作流，提高效率
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>独立重试</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              每个子工作流可以独立重试，不影响其他子工作流
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义子工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        子工作流是普通的工作流，可以被父工作流启动。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">子工作流定义</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

// 子工作流接口
@WorkflowInterface
public interface PaymentWorkflow {
    @WorkflowMethod
    PaymentResult processPayment(PaymentRequest request);
}

// 子工作流实现
public class PaymentWorkflowImpl implements PaymentWorkflow {
    
    private final PaymentActivities activities = Workflow.newActivityStub(
        PaymentActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public PaymentResult processPayment(PaymentRequest request) {
        String transactionId = activities.chargePayment(request);
        return PaymentResult.success(transactionId);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">启动子工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        在父工作流中使用 <code className="bg-gray-100 px-2 py-1 rounded">Workflow.newChildWorkflowStub()</code> 创建子工作流存根。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">启动子工作流</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.ChildWorkflowOptions;
import io.temporal.workflow.Workflow;

public class OrderWorkflowImpl implements OrderWorkflow {
    
    private final OrderActivities activities = Workflow.newActivityStub(
        OrderActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public OrderResult processOrder(OrderRequest request) {
        // 步骤 1: 验证订单
        activities.validateOrder(request);
        
        // 步骤 2: 启动支付子工作流
        ChildWorkflowOptions paymentOptions = ChildWorkflowOptions.newBuilder()
            .setWorkflowId("payment-" + request.getOrderId())
            .build();
        
        PaymentWorkflow paymentWorkflow = Workflow.newChildWorkflowStub(
            PaymentWorkflow.class,
            paymentOptions
        );
        
        // 同步执行子工作流（等待结果）
        PaymentResult paymentResult = paymentWorkflow.processPayment(
            new PaymentRequest(request.getAmount(), request.getCardNumber())
        );
        
        if (!paymentResult.isSuccess()) {
            return OrderResult.failed("Payment failed");
        }
        
        // 步骤 3: 备货
        activities.prepareOrder(request.getOrderId());
        
        // 步骤 4: 启动发货子工作流
        ChildWorkflowOptions shippingOptions = ChildWorkflowOptions.newBuilder()
            .setWorkflowId("shipping-" + request.getOrderId())
            .build();
        
        ShippingWorkflow shippingWorkflow = Workflow.newChildWorkflowStub(
            ShippingWorkflow.class,
            shippingOptions
        );
        
        // 同步执行子工作流
        ShippingResult shippingResult = shippingWorkflow.shipOrder(
            new ShippingRequest(request.getOrderId(), request.getAddress())
        );
        
        return OrderResult.success(
            paymentResult.getTransactionId(),
            shippingResult.getTrackingNumber()
        );
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">异步启动子工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 <code className="bg-gray-100 px-2 py-1 rounded">Workflow.newChildWorkflowStub()</code> 加上 <code className="bg-gray-100 px-2 py-1 rounded">Async.function()</code> 异步启动子工作流。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">异步启动子工作流</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Async;
import io.temporal.workflow.Promise;
import java.util.ArrayList;
import java.util.List;

public class BatchProcessingWorkflowImpl implements BatchProcessingWorkflow {
    
    @Override
    public BatchResult processBatch(BatchRequest batch) {
        List<Promise<ItemResult>> promises = new ArrayList<>();
        
        // 并发启动多个子工作流
        for (Item item : batch.getItems()) {
            ChildWorkflowOptions options = ChildWorkflowOptions.newBuilder()
                .setWorkflowId("item-" + item.getId())
                .build();
            
            ItemWorkflow itemWorkflow = Workflow.newChildWorkflowStub(
                ItemWorkflow.class,
                options
            );
            
            // 异步启动子工作流
            Promise<ItemResult> promise = Async.function(
                itemWorkflow::processItem,
                item
            );
            promises.add(promise);
        }
        
        // 等待所有子工作流完成
        List<ItemResult> results = new ArrayList<>();
        for (Promise<ItemResult> promise : promises) {
            results.add(promise.get());
        }
        
        return new BatchResult(results);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">子工作流选项</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 <code className="bg-gray-100 px-2 py-1 rounded">ChildWorkflowOptions</code> 配置子工作流的执行参数。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">子工作流选项</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.ChildWorkflowOptions;
import java.time.Duration;

ChildWorkflowOptions options = ChildWorkflowOptions.newBuilder()
    // 设置工作流 ID
    .setWorkflowId("child-workflow-123")
    
    // 设置任务队列（默认与父工作流相同）
    .setTaskQueue("custom-task-queue")
    
    // 设置工作流运行超时
    .setWorkflowRunTimeout(Duration.ofMinutes(5))
    
    // 设置工作流任务超时
    .setWorkflowTaskTimeout(Duration.ofSeconds(10))
    
    // 设置搜索属性
    .setSearchAttributes(searchAttributes)
    
    // 设置父关闭策略
    .setParentClosePolicy(ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON)
    
    .build();

// 父关闭策略说明：
// ABANDON: 子工作流继续运行（默认）
// REQUEST_CANCEL: 取消子工作流
// TERMINATE: 终止子工作流`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">信号和查询子工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        父工作流可以向子工作流发送信号或查询状态。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">信号和查询子工作流</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 启动子工作流并获取执行信息
ChildWorkflowExecution execution = Workflow.executeChildWorkflow(
    PaymentWorkflow.class,
    paymentRequest,
    paymentOptions
);

// 获取子工作流存根（用于发送信号）
PaymentWorkflow childWorkflow = Workflow.newChildWorkflowStub(
    PaymentWorkflow.class,
    execution.getWorkflowId()
);

// 发送信号
childWorkflow.cancelPayment("Customer requested cancellation");

// 获取子工作流存根（用于查询）
PaymentWorkflow queryStub = Workflow.newChildWorkflowStub(
    PaymentWorkflow.class,
    execution.getWorkflowId()
);

// 查询状态
PaymentStatus status = queryStub.getStatus();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">外部工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        外部工作流是不直接作为子工作流启动，但可以引用和交互的工作流。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">外部工作流</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.ExternalWorkflowStub;
import io.temporal.workflow.WorkflowExecution;

// 通过工作流 ID 获取外部工作流存根
ExternalWorkflowStub externalWorkflow = Workflow.newExternalWorkflowStub(
    PaymentWorkflow.class,
    new WorkflowExecution("payment-12345")
);

// 发送信号
externalWorkflow.signal("cancelPayment", "Reason");

// 检查工作流是否存在
boolean exists = externalWorkflow.exists();

// 等待工作流完成
externalWorkflow.result(String.class);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">子工作流 vs 活动</h2>

      <div className="my-8">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold">特性</th>
                <th className="px-4 py-3 text-left font-semibold">子工作流</th>
                <th className="px-4 py-3 text-left font-semibold">活动</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">复杂性</td>
                <td className="px-4 py-3 text-blue-600">复杂业务逻辑</td>
                <td className="px-4 py-3 text-blue-600">简单任务</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">状态持久化</td>
                <td className="px-4 py-3 text-green-600">支持</td>
                <td className="px-4 py-3 text-red-600">不支持</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">可观测性</td>
                <td className="px-4 py-3 text-green-600">独立历史</td>
                <td className="px-4 py-3 text-green-600">无独立历史</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">超时</td>
                <td className="px-4 py-3">工作流运行超时</td>
                <td className="px-4 py-3">活动超时</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">适用场景</td>
                <td className="px-4 py-3">多步骤、长时间运行的流程</td>
                <td className="px-4 py-3">单次调用、快速执行</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Layers className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">合理的粒度</h3>
            <p className="text-gray-600 text-sm">
              子工作流应该代表一个完整的业务单元，避免过度拆分
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <GitBranch className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">层级控制</h3>
            <p className="text-gray-600 text-sm">
              避免过深的嵌套层级，通常 2-3 层是合理的
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">并发控制</h3>
            <p className="text-gray-600 text-sm">
              注意并发启动的子工作流数量，避免资源耗尽
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">错误处理</h3>
            <p className="text-gray-600 text-sm">
              正确处理子工作流的失败，避免影响整个父工作流
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
                学习工作流开发
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/activities">
            <Zap className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">活动</div>
              <div className="text-sm text-gray-600 mt-1">
                学习活动开发
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
