import Link from 'next/link';
import { Code, Hash, RefreshCw, Shield, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Workflow Id 和 Run Id',
  description: '了解工作流的唯一标识符',
};

export default function WorkflowIdRunId() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Workflow Id 和 Run Id</h1>
      <p className="text-xl text-gray-600 mb-8">
        每个 Temporal 工作流都有两个唯一标识符：Workflow Id 和 Run Id。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          Workflow Id 是工作流的业务标识符，而 Run Id 是系统生成的执行标识符。
          理解这两个标识符的区别和用途对于 Temporal 应用开发至关重要。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Workflow Id</h2>

      <p className="text-lg text-gray-700 mb-6">
        Workflow Id 是工作流的业务标识符，由开发者指定，用于唯一标识一个工作流实例。
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Hash className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Workflow Id 的特点</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 由开发者指定</li>
              <li>• 通常使用业务相关的 ID</li>
              <li>• 在工作流启动时指定</li>
              <li>• 必须在命名空间内唯一</li>
              <li>• 用于业务逻辑和查询</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Workflow Id 的用途</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 避免重复执行</li>
              <li>• 幂等性保障</li>
              <li>• 业务追踪</li>
              <li>• 工作流查询</li>
              <li>• 历史记录查询</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">指定 Workflow Id</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowOptions;

// 使用业务 ID 作为 Workflow Id
String orderId = "order-12345";
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-processing")
    .setWorkflowId("order-workflow-" + orderId)
    .build();

// 启动工作流
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    options
);

// 如果使用相同的 Workflow Id 再次启动，会返回已存在的工作流`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Workflow Id 重用策略</h2>

      <p className="text-lg text-gray-700 mb-6">
        Workflow Id 重用策略决定了是否允许使用与已关闭的工作流相同的 Workflow Id 启动新的工作流执行。
      </p>

      <div className="my-8 space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">重用策略类型</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Allow Duplicate</span>：允许使用与已关闭工作流相同的 Workflow Id，这是默认策略。当允许使用相同 Workflow Id 启动新工作流时使用。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Allow Duplicate Failed Only</span>：仅当先前具有相同 Workflow Id 的工作流未完成时才允许启动新工作流。当需要重新执行失败、超时、终止或取消的工作流时使用。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Reject Duplicate</span>：如果先前的工作流具有相同的 Workflow Id，则不允许启动新工作流，无论其关闭状态如何。当在给定保留期内每个 Workflow Id 只能有一个工作流执行时使用。
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="my-8">
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-mono">设置 Workflow Id 重用策略</span>
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowIdReusePolicy;

// 设置 Workflow Id 重用策略
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-processing")
    .setWorkflowId("order-workflow-12345")
    .setWorkflowIdReusePolicy(WorkflowIdReusePolicy.RejectDuplicate)
    .build();

// 启动工作流
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    options
);`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Workflow Id 冲突策略</h2>

      <p className="text-lg text-gray-700 mb-6">
        Workflow Id 冲突策略用于决定如何解决与正在运行的工作流的 Workflow Id 冲突。
      </p>

      <div className="my-8 space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">冲突策略说明</h3>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              当尝试使用与正在运行的工作流相同的 Workflow Id 启动新工作流时，Temporal 会根据冲突策略决定如何处理这种情况。
            </p>
            <p>
              无论 Workflow Id 重用策略如何设置，都不可能使用与正在运行的工作流相同的 Workflow Id 启动新工作流。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">冲突策略类型</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Fail</span>：阻止工作流执行启动，并返回Workflow execution already started错误。如果未指定策略，这是默认策略。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Use Existing</span>：阻止工作流执行生成，并返回运行中的工作流执行的Run Id。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <span className="font-semibold">Terminate Existing</span>：终止运行中的工作流执行，然后使用相同的工作流ID生成新的工作流执行。
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Run Id</h2>

      <p className="text-lg text-gray-700 mb-6">
        Run Id 是系统生成的唯一标识符，用于标识工作流的单次执行。
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <RefreshCw className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Run Id 的特点</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 系统自动生成</li>
              <li>• 全局唯一</li>
              <li>• 每次执行都不同</li>
              <li>• 用于系统内部追踪</li>
              <li>• 格式为 UUID</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Run Id 的用途</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 标识工作流的单次执行</li>
              <li>• 用于系统日志和追踪</li>
              <li>• 处理工作流重试</li>
              <li>• 历史记录查询</li>
              <li>• 系统内部引用</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">获取 Run Id</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.workflow.WorkflowExecution;

// 启动工作流并获取执行信息
WorkflowExecution execution = WorkflowClient.start(
    workflow::processOrder,
    orderRequest
);

// 获取 Workflow Id
String workflowId = execution.getWorkflowId();

// 获取 Run Id
String runId = execution.getRunId();

System.out.println("Workflow Id: " + workflowId);
System.out.println("Run Id: " + runId);

// 输出示例:
// Workflow Id: order-workflow-order-12345
// Run Id: 550e8400-e29b-41d4-a716-446655440000`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">两者的区别</h2>

      <div className="my-8">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold">特性</th>
                <th className="px-4 py-3 text-left font-semibold">Workflow Id</th>
                <th className="px-4 py-3 text-left font-semibold">Run Id</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">指定方式</td>
                <td className="px-4 py-3 text-blue-600">开发者指定</td>
                <td className="px-4 py-3 text-blue-600">系统自动生成</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">唯一性</td>
                <td className="px-4 py-3 text-green-600">命名空间内唯一</td>
                <td className="px-4 py-3 text-green-600">全局唯一</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">稳定性</td>
                <td className="px-4 py-3 text-green-600">持久不变</td>
                <td className="px-4 py-3 text-red-600">每次执行不同</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-3">用途</td>
                <td className="px-4 py-3">业务标识和查询</td>
                <td className="px-4 py-3">系统内部追踪</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">格式</td>
                <td className="px-4 py-3">任意字符串</td>
                <td className="px-4 py-3">UUID</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用业务相关的 Workflow Id</h3>
            <p className="text-gray-600 text-sm">
              使用与业务相关的 ID（如订单号、用户 ID 等）作为 Workflow Id，便于追踪和管理
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Hash className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">确保 Workflow Id 的唯一性</h3>
            <p className="text-gray-600 text-sm">
              在命名空间内确保 Workflow Id 的唯一性，避免冲突和重复执行
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Database className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">保存 Run Id 用于调试</h3>
            <p className="text-gray-600 text-sm">
              在日志中记录 Run Id，便于后续的调试和问题排查
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用 Workflow Id 进行查询</h3>
            <p className="text-gray-600 text-sm">
              在业务逻辑中，使用 Workflow Id 而不是 Run Id 进行工作流查询和管理
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">使用场景</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Hash className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>使用 Workflow Id</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 订单处理工作流</li>
              <li>• 支付处理工作流</li>
              <li>• 用户注册流程</li>
              <li>• 任何需要幂等性的业务流程</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RefreshCw className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>使用 Run Id</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 系统日志和监控</li>
              <li>• 工作流历史查询</li>
              <li>• 调试和问题排查</li>
              <li>• 系统内部操作</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">示例：处理重复执行</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">处理重复执行</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowAlreadyStartedException;

public void processOrder(String orderId, OrderDetails details) {
    String workflowId = "order-" + orderId;
    
    WorkflowOptions options = WorkflowOptions.newBuilder()
        .setTaskQueue("order-processing")
        .setWorkflowId(workflowId)
        .build();
    
    OrderWorkflow workflow = client.newWorkflowStub(
        OrderWorkflow.class,
        options
    );
    
    try {
        // 尝试启动工作流
        WorkflowClient.start(workflow::processOrder, details);
        System.out.println("Order processing started");
    } catch (WorkflowAlreadyStartedException e) {
        // 工作流已经存在，返回已存在的工作流
        System.out.println("Order processing already in progress");
        // 可以查询现有工作流的状态
        OrderStatus status = workflow.getStatus();
        System.out.println("Current status: " + status);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflows/execution">
            <Code className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流执行</div>
              <div className="text-sm text-gray-600 mt-1">
                学习工作流执行的更多内容
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflow-options">
            <Hash className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流选项</div>
              <div className="text-sm text-gray-600 mt-1">
                配置工作流执行选项
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
