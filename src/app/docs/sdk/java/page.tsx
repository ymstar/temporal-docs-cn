import Link from 'next/link';
import { Code, Book, Zap, Download, Terminal, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Java SDK',
  description: 'Temporal Java SDK 完整指南',
};

export default function JavaSDK() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">Java SDK</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal Java SDK 提供完整的 API 来开发可靠的工作流和活动。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">安装</h2>

      <p className="text-lg text-gray-700 mb-6">
        添加 Temporal SDK 依赖到您的项目。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Maven (pom.xml)</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Maven</span>
            </div>
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

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Gradle (build.gradle)</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Gradle</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`implementation 'io.temporal:temporal-sdk:1.23.1'`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">客户端配置</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建 WorkflowClient 连接到 Temporal Server。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">创建客户端</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;

// 创建服务连接
WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
    WorkflowServiceStubsOptions.newBuilder()
        .setTarget("localhost:7233")
        .build()
);

// 创建工作流客户端
WorkflowClient client = WorkflowClient.newInstance(
    service,
    WorkflowClientOptions.newBuilder()
        .setNamespace("default")
        .build()
);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流定义</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用接口和注解定义工作流。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">工作流接口</span>
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
public interface MyWorkflow {
    
    @WorkflowMethod
    String execute(String input);
    
    @SignalMethod
    void updateValue(String value);
    
    @QueryMethod
    String getValue();
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">工作流实现</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Workflow;
import io.temporal.workflow.SignalMethod;

public class MyWorkflowImpl implements MyWorkflow {
    
    private String value = "";
    
    @Override
    public String execute(String input) {
        value = input;
        Workflow.await(() -> value.equals("done"));
        return "Completed: " + value;
    }
    
    @Override
    public void updateValue(String value) {
        this.value = value;
    }
    
    @Override
    public String getValue() {
        return value;
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动定义</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用接口定义活动，实现类处理业务逻辑。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">活动接口和实现</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.activity.ActivityInterface;

// 活动接口
@ActivityInterface
public interface MyActivities {
    String process(String data);
    void saveResult(String result);
}

// 活动实现
public class MyActivitiesImpl implements MyActivities {
    
    @Override
    public String process(String data) {
        // 处理数据
        return data.toUpperCase();
    }
    
    @Override
    public void saveResult(String result) {
        // 保存结果到数据库
        System.out.println("Saving: " + result);
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Worker 配置</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建并启动 Worker 来处理工作流和活动任务。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Worker 主程序</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

// 创建 Worker 工厂
WorkerFactory factory = WorkerFactory.newInstance(client);

// 创建 Worker
Worker worker = factory.newWorker("my-task-queue");

// 注册工作流和活动
worker.registerWorkflowImplementationTypes(MyWorkflowImpl.class);
worker.registerActivitiesImplementations(new MyActivitiesImpl());

// 启动 Worker
factory.start();

// 保持运行
System.out.println("Worker started...");
Thread.currentThread().join();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">启动工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用客户端启动工作流执行。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">启动工作流</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowOptions;
import io.temporal.workflow.WorkflowExecution;

// 配置工作流选项
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("my-task-queue")
    .setWorkflowId("workflow-" + System.currentTimeMillis())
    .setExecutionTimeout(Duration.ofMinutes(10))
    .build();

// 获取工作流存根
MyWorkflow workflow = client.newWorkflowStub(MyWorkflow.class, options);

// 同步执行（等待结果）
String result = workflow.execute("input-data");

// 或异步执行
WorkflowExecution execution = WorkflowClient.start(
    workflow::execute,
    "input-data"
);

System.out.println("Workflow started: " + execution.getWorkflowId());`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">发送信号</h2>

      <p className="text-lg text-gray-700 mb-6">
        向运行中的工作流发送信号。
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
{`// 通过工作流 ID 获取工作流存根
MyWorkflow workflow = client.newWorkflowStub(
    MyWorkflow.class,
    "workflow-123456"
);

// 发送信号
workflow.updateValue("done");`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">查询工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        查询工作流的当前状态。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">查询状态</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 通过工作流 ID 获取工作流存根
MyWorkflow workflow = client.newWorkflowStub(
    MyWorkflow.class,
    "workflow-123456"
);

// 执行查询
String value = workflow.getValue();
System.out.println("Current value: " + value);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常用 API</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-lg">Workflow API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">Workflow.await(condition)</code>
              <p className="text-xs text-gray-600 mt-1">等待条件满足</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">Workflow.sleep(duration)</code>
              <p className="text-xs text-gray-600 mt-1">延迟执行</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">Workflow.newActivityStub()</code>
              <p className="text-xs text-gray-600 mt-1">创建活动存根</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Terminal className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-lg">Activity API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">Activity.heartbeat()</code>
              <p className="text-xs text-gray-600 mt-1">发送活动心跳</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">Activity.getExecutionContext()</code>
              <p className="text-xs text-gray-600 mt-1">获取活动上下文</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Book className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-lg">Client API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">client.newWorkflowStub()</code>
              <p className="text-xs text-gray-600 mt-1">获取工作流存根</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">client.newUntypedWorkflowStub()</code>
              <p className="text-xs text-gray-600 mt-1">获取无类型存根</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle className="text-lg">Options API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">ActivityOptions</code>
              <p className="text-xs text-gray-600 mt-1">活动选项配置</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">WorkflowOptions</code>
              <p className="text-xs text-gray-600 mt-1">工作流选项配置</p>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">RetryOptions</code>
              <p className="text-xs text-gray-600 mt-1">重试策略配置</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">完整示例</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">完整的工作流示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 1. 定义接口
@WorkflowInterface
public interface OrderWorkflow {
    @WorkflowMethod
    OrderResult processOrder(OrderRequest request);
}

@ActivityInterface
public interface OrderActivities {
    void validateOrder(OrderRequest request);
    String processPayment(OrderRequest request);
    void shipOrder(String orderId);
}

// 2. 实现工作流
public class OrderWorkflowImpl implements OrderWorkflow {
    private final OrderActivities activities = Workflow.newActivityStub(
        OrderActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public OrderResult processOrder(OrderRequest request) {
        activities.validateOrder(request);
        String transactionId = activities.processPayment(request);
        activities.shipOrder(request.getOrderId());
        
        return new OrderResult(transactionId, "COMPLETED");
    }
}

// 3. 实现活动
public class OrderActivitiesImpl implements OrderActivities {
    @Override
    public void validateOrder(OrderRequest request) {
        // 验证逻辑
    }
    
    @Override
    public String processPayment(OrderRequest request) {
        // 支付处理
        return "TXN-" + System.currentTimeMillis();
    }
    
    @Override
    public void shipOrder(String orderId) {
        // 发货逻辑
    }
}

// 4. 启动 Worker
WorkerFactory factory = WorkerFactory.newInstance(client);
Worker worker = factory.newWorker("order-task-queue");
worker.registerWorkflowImplementationTypes(OrderWorkflowImpl.class);
worker.registerActivitiesImplementations(new OrderActivitiesImpl());
factory.start();

// 5. 执行工作流
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class,
    WorkflowOptions.newBuilder()
        .setTaskQueue("order-task-queue")
        .build()
);
OrderResult result = workflow.processOrder(new OrderRequest("order-123"));`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">更多资源</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/workflows">
            <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">工作流开发</div>
              <div className="text-sm text-gray-600 mt-1">
                深入学习工作流开发
              </div>
            </div>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-start">
          <Link href="/docs/develop/activities">
            <Code className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">活动开发</div>
              <div className="text-sm text-gray-600 mt-1">
                深入学习活动开发
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
