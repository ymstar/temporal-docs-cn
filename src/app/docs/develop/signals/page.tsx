import Link from 'next/link';
import { MessageSquare, Zap, Shield, Code, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '信号',
  description: '向运行中的工作流发送信号',
};

export default function Signals() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">信号</h1>
      <p className="text-xl text-gray-600 mb-8">
        信号允许您向运行中的工作流发送消息，实现外部与工作流的交互。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">核心概念</h3>
        <p className="text-green-700">
          信号是一种异步通信机制，允许客户端向运行中的工作流发送数据。
          与查询不同，信号可以修改工作流状态，但不返回结果。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">信号特性</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>异步通信</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              信号是异步发送的，不会阻塞客户端
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>修改状态</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              信号可以修改工作流的内部状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>可靠性保证</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              信号保证至少被处理一次
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义信号</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流接口中使用 <code className="bg-gray-100 px-2 py-1 rounded">@SignalMethod</code> 注解定义信号方法。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">信号定义</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;
import io.temporal.workflow.SignalMethod;
import io.temporal.workflow.QueryMethod;

@WorkflowInterface
public interface OrderWorkflow {
    
    @WorkflowMethod
    OrderResult processOrder(OrderRequest request);
    
    // 定义信号方法
    @SignalMethod(name = "cancel-order")
    void cancelOrder(String reason);
    
    @SignalMethod(name = "update-shipping")
    void updateShippingAddress(ShippingAddress address);
    
    @QueryMethod
    OrderStatus getStatus();
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">实现信号</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流实现类中实现信号方法，处理接收到的信号。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">信号实现</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Workflow;
import java.util.HashMap;
import java.util.Map;

public class OrderWorkflowImpl implements OrderWorkflow {
    
    private OrderStatus status = OrderStatus.PENDING;
    private String orderId;
    private String cancellationReason = null;
    private ShippingAddress shippingAddress;
    
    private final OrderActivities activities = Workflow.newActivityStub(
        OrderActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public OrderResult processOrder(OrderRequest request) {
        this.orderId = request.getOrderId();
        
        try {
            // 处理订单
            status = OrderStatus.PROCESSING;
            String paymentId = activities.processPayment(request);
            
            // 检查是否被取消
            if (cancellationReason != null) {
                activities.refundPayment(paymentId);
                return OrderResult.canceled(cancellationReason);
            }
            
            // 更新发货地址
            if (shippingAddress != null) {
                activities.updateShippingAddress(orderId, shippingAddress);
            }
            
            status = OrderStatus.COMPLETED;
            return OrderResult.success(orderId);
            
        } catch (Exception e) {
            status = OrderStatus.FAILED;
            throw e;
        }
    }
    
    @Override
    public void cancelOrder(String reason) {
        // 只能在特定状态下取消
        if (status == OrderStatus.PENDING || 
            status == OrderStatus.PROCESSING) {
            cancellationReason = reason;
            status = OrderStatus.CANCELED;
        }
    }
    
    @Override
    public void updateShippingAddress(ShippingAddress address) {
        // 可以在任何时候更新地址
        this.shippingAddress = address;
    }
    
    @Override
    public OrderStatus getStatus() {
        return status;
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">发送信号</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用客户端向运行中的工作流发送信号。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">发送信号</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;

// 方法 1: 通过工作流存根发送信号
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    "order-12345"
);

// 同步发送信号（等待确认）
workflow.cancelOrder("Customer requested cancellation");

// 方法 2: 通过 WorkflowSignalExternal 发送信号
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    "order-12345"
);

// 异步发送信号（不等待确认）
WorkflowExecution execution = WorkflowClient.signalWithStart(
    workflow::processOrder,
    orderRequest,
    workflow::cancelOrder,
    "Customer requested cancellation"
);

// 方法 3: 使用 SignalWithStart
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-task-queue")
    .setWorkflowId("order-12345")
    .build();

OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    options
);

// 如果工作流不存在，先启动工作流，然后发送信号
WorkflowExecution execution = WorkflowClient.signalWithStart(
    workflow::processOrder,
    orderRequest,
    workflow::cancelOrder,
    "Cancel immediately"
);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">信号和工作流状态</h2>

      <p className="text-lg text-gray-700 mb-6">
        信号可以修改工作流状态，工作流可以使用 <code className="bg-gray-100 px-2 py-1 rounded">Workflow.await()</code> 等待信号。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">等待信号</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Workflow;

public class ApprovalWorkflowImpl implements ApprovalWorkflow {
    
    private boolean approved = false;
    private boolean rejected = false;
    private String approver = null;
    
    @Override
    public ApprovalResult requestApproval(ApprovalRequest request) {
        // 发送通知
        activities.sendApprovalRequest(request);
        
        // 等待批准或拒绝
        Workflow.await(() -> approved || rejected);
        
        if (approved) {
            return ApprovalResult.approved(approver);
        } else {
            return ApprovalResult.rejected("Request was rejected");
        }
    }
    
    @Override
    public void approve(String approver) {
        this.approved = true;
        this.approver = approver;
    }
    
    @Override
    public void reject(String reason) {
        this.rejected = true;
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">信号保证</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>至少一次传递</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              信号保证至少被工作流处理一次，但可能被多次处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Bell className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>顺序保证</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              来自同一个发送者的信号保持发送顺序
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">动态信号</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用动态信号处理未定义的信号类型。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">动态信号处理</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.DynamicSignalHandler;

public class DynamicWorkflowImpl implements DynamicWorkflow {
    
    private final Map<String, Object> signalData = new HashMap<>();
    
    @Override
    public Object execute(Object[] args) {
        // 等待信号
        Workflow.await(() -> !signalData.isEmpty());
        
        return signalData;
    }
    
    @Override
    public void handleSignal(String signalName, Object[] args) {
        // 处理所有未定义的信号
        if ("update-status".equals(signalName)) {
            signalData.put("status", args[0]);
        } else if ("set-metadata".equals(signalName)) {
            signalData.put("metadata", args[0]);
        } else {
            // 记录未知信号
            Workflow.getLogger(getClass())
                .warn("Unknown signal: " + signalName);
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">幂等性处理</h3>
            <p className="text-gray-600 text-sm">
              信号方法应该是幂等的，因为可能被多次调用
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">状态检查</h3>
            <p className="text-gray-600 text-sm">
              在信号方法中检查当前状态，决定是否接受信号
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Bell className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">记录信号历史</h3>
            <p className="text-gray-600 text-sm">
              在工作流中记录接收到的信号，便于追踪和调试
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用有意义的名称</h3>
            <p className="text-gray-600 text-sm">
              信号名称应该清晰表达其用途
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/queries">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">查询</div>
              <div className="text-sm text-gray-600 mt-1">
                学习如何查询工作流状态
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/child-workflows">
            <Zap className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">子工作流</div>
              <div className="text-sm text-gray-600 mt-1">
                学习如何使用子工作流
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
