import Link from 'next/link';
import { Search, Shield, Code, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '查询',
  description: '查询工作流状态',
};

export default function Queries() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">查询</h1>
      <p className="text-xl text-gray-600 mb-8">
        查询允许您读取运行中或已完成的工作流的当前状态，而不影响工作流执行。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          查询是一种只读操作，不会修改工作流状态。与信号不同，查询会立即返回结果，
          不会等待工作流执行到特定位置。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查询特性</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Eye className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>只读操作</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              查询不会修改工作流状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>即时返回</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              查询立即返回结果，不等待工作流执行
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>无副作用</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              查询不会记录到工作流历史中
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">定义查询</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流接口中使用 <code className="bg-gray-100 px-2 py-1 rounded">@QueryMethod</code> 注解定义查询方法。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">查询定义</span>
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
    
    @SignalMethod
    void cancelOrder(String reason);
    
    // 定义查询方法
    @QueryMethod(name = "get-status")
    OrderStatus getStatus();
    
    @QueryMethod(name = "get-details")
    OrderDetails getDetails();
    
    @QueryMethod(name = "get-progress")
    ProgressInfo getProgress();
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">实现查询</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流实现类中实现查询方法，返回当前状态信息。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">查询实现</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`public class OrderWorkflowImpl implements OrderWorkflow {
    
    private OrderStatus status = OrderStatus.PENDING;
    private String orderId;
    private String paymentId;
    private String shippingId;
    private int totalSteps = 5;
    private int completedSteps = 0;
    private OrderRequest request;
    
    @Override
    public OrderResult processOrder(OrderRequest request) {
        this.request = request;
        this.orderId = request.getOrderId();
        
        try {
            // 步骤 1
            status = OrderStatus.VALIDATING;
            activities.validateOrder(request);
            completedSteps++;
            
            // 步骤 2
            status = OrderStatus.PROCESSING_PAYMENT;
            paymentId = activities.processPayment(request);
            completedSteps++;
            
            // 步骤 3
            status = OrderStatus.PREPARING;
            activities.prepareOrder(orderId);
            completedSteps++;
            
            // 步骤 4
            status = OrderStatus.SHIPPING;
            shippingId = activities.shipOrder(orderId);
            completedSteps++;
            
            // 步骤 5
            status = OrderStatus.COMPLETED;
            completedSteps++;
            
            return OrderResult.success(orderId);
            
        } catch (Exception e) {
            status = OrderStatus.FAILED;
            throw e;
        }
    }
    
    @Override
    public OrderStatus getStatus() {
        // 返回当前状态
        return status;
    }
    
    @Override
    public OrderDetails getDetails() {
        // 返回订单详细信息
        return new OrderDetails(
            orderId,
            paymentId,
            shippingId,
            status,
            request
        );
    }
    
    @Override
    public ProgressInfo getProgress() {
        // 返回进度信息
        return new ProgressInfo(
            completedSteps,
            totalSteps,
            (completedSteps * 100.0) / totalSteps
        );
    }
    
    @Override
    public void cancelOrder(String reason) {
        if (status != OrderStatus.COMPLETED) {
            status = OrderStatus.CANCELED;
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">执行查询</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用客户端查询运行中或已完成的工作流状态。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">执行查询</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;

// 通过工作流 ID 获取工作流存根
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    "order-12345"
);

// 查询状态
OrderStatus status = workflow.getStatus();
System.out.println("Status: " + status);

// 查询详细信息
OrderDetails details = workflow.getDetails();
System.out.println("Order ID: " + details.getOrderId());
System.out.println("Payment ID: " + details.getPaymentId());
System.out.println("Shipping ID: " + details.getShippingId());

// 查询进度
ProgressInfo progress = workflow.getProgress();
System.out.println("Progress: " + progress.getPercentage() + "%");
System.out.println("Completed: " + progress.getCompletedSteps() + 
                   "/" + progress.getTotalSteps());`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查询条件</h2>

      <p className="text-lg text-gray-700 mb-6">
        查询方法可以根据参数返回不同的结果。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">带参数的查询</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`@QueryMethod(name = "get-history")
List<ActivityInfo> getActivityHistory(String type);

@QueryMethod(name = "get-history")
List<ActivityInfo> getActivityHistory(String type, int limit);

// 实现
@Override
public List<ActivityInfo> getActivityHistory(String type) {
    return getActivityHistory(type, Integer.MAX_VALUE);
}

@Override
public List<ActivityInfo> getActivityHistory(String type, int limit) {
    return activityHistory.stream()
        .filter(info -> info.getType().equals(type))
        .limit(limit)
        .collect(Collectors.toList());
}

// 使用
List<ActivityInfo> allActivities = workflow.getActivityHistory("all");
List<ActivityInfo> recentActivities = workflow.getActivityHistory("payment", 5);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查询约束</h2>

      <div className="my-8 bg-red-50 border-l-4 border-red-500 p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-3">重要约束</h3>
        <ul className="space-y-2 text-red-700">
          <li>• 查询方法不能修改工作流状态</li>
          <li>• 查询方法不能调用活动</li>
          <li>• 查询方法不能使用 <code className="bg-gray-200 px-1 rounded">Workflow.await()</code></li>
          <li>• 查询方法不能抛出非确定性异常</li>
          <li>• 查询方法必须快速返回（通常 &lt; 1 秒）</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">动态查询</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用动态查询处理未定义的查询类型。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">动态查询处理</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.DynamicQueryHandler;
import io.temporal.workflow.DynamicWorkflow;

public class DynamicWorkflowImpl implements DynamicWorkflow {
    
    private final Map<String, Object> state = new HashMap<>();
    
    @Override
    public Object execute(Object[] args) {
        // 工作流逻辑
        return "result";
    }
    
    @Override
    public Object handleQuery(String queryName, Object[] args) {
        // 处理所有未定义的查询
        switch (queryName) {
            case "get-state":
                return state;
                
            case "get-value":
                if (args.length > 0) {
                    return state.get(args[0]);
                }
                return null;
                
            case "get-all-keys":
                return new ArrayList<>(state.keySet());
                
            default:
                throw new IllegalArgumentException("Unknown query: " + queryName);
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查询 vs 信号</h2>

      <div className="my-8">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold">特性</th>
                <th className="px-4 py-3 text-left font-semibold">查询</th>
                <th className="px-4 py-3 text-left font-semibold">信号</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">修改状态</td>
                <td className="px-4 py-3 text-green-600">否</td>
                <td className="px-4 py-3 text-green-600">是</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">返回值</td>
                <td className="px-4 py-3 text-green-600">是</td>
                <td className="px-4 py-3 text-red-600">否</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">记录历史</td>
                <td className="px-4 py-3 text-red-600">否</td>
                <td className="px-4 py-3 text-green-600">是</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">异步执行</td>
                <td className="px-4 py-3 text-red-600">否</td>
                <td className="px-4 py-3 text-green-600">是</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">执行时间</td>
                <td className="px-4 py-3">立即返回</td>
                <td className="px-4 py-3">异步处理</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Search className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">保持查询简单</h3>
            <p className="text-gray-600 text-sm">
              查询方法应该快速返回，避免复杂计算
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">只读操作</h3>
            <p className="text-gray-600 text-sm">
              查询方法不应该修改任何工作流状态
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">缓存状态</h3>
            <p className="text-gray-600 text-sm">
              在工作流中缓存状态，避免每次查询都重新计算
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用有意义的名称</h3>
            <p className="text-gray-600 text-sm">
              查询名称应该清晰表达返回的数据类型
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/signals">
            <Zap className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">信号</div>
              <div className="text-sm text-gray-600 mt-1">
                学习如何发送信号
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflows">
            <Eye className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流</div>
              <div className="text-sm text-gray-600 mt-1">
                学习工作流开发
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
