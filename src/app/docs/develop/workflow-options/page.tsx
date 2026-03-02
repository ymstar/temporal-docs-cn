import Link from 'next/link';
import { Clock, Database, Shield, Code, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '工作流选项',
  description: '配置工作流执行选项',
};

export default function WorkflowOptions() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流选项</h1>
      <p className="text-xl text-gray-600 mb-8">
        通过 WorkflowOptions 配置工作流的执行行为、超时和重试策略。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          WorkflowOptions 允许您配置工作流的执行参数，包括任务队列、工作流 ID、超时设置等。
          这些选项在启动工作流时指定，影响整个工作流的生命周期。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">基本配置</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建 WorkflowOptions 对象并配置基本参数。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">基本配置示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowOptions;
import java.time.Duration;

WorkflowOptions options = WorkflowOptions.newBuilder()
    // 指定任务队列（必需）
    .setTaskQueue("my-task-queue")
    
    // 设置工作流 ID（可选，默认自动生成）
    .setWorkflowId("workflow-123")
    
    // 执行超时（从开始到完成的总时间）
    .setExecutionTimeout(Duration.ofMinutes(10))
    
    // 工作流运行超时（单个执行的超时）
    .setWorkflowRunTimeout(Duration.ofMinutes(5))
    
    // 工作流任务超时（单个工作流任务的超时）
    .setWorkflowTaskTimeout(Duration.ofSeconds(10))
    
    .build();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">任务队列</h2>

      <p className="text-lg text-gray-700 mb-6">
        任务队列是连接客户端和 Worker 的通道。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">配置任务队列</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 指定任务队列
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("payment-task-queue")
    .build();

// Worker 需要监听相同的任务队列
Worker worker = factory.newWorker("payment-task-queue");`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <Database className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-lg">任务队列的作用</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 连接客户端和 Worker</li>
              <li>• 实现任务分发</li>
              <li>• 支持多版本 Worker</li>
              <li>• 实现任务优先级</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-6 w-6 text-green-600 mb-2" />
            <CardTitle className="text-lg">最佳实践</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 按业务域区分任务队列</li>
              <li>• 使用语义化的命名</li>
              <li>• 支持 Worker 版本升级</li>
              <li>• 实现灰度发布</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流 ID</h2>

      <p className="text-lg text-gray-700 mb-6">
        工作流 ID 是工作流的唯一标识符。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">工作流 ID 配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 设置工作流 ID
WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-task-queue")
    // 使用业务 ID 作为工作流 ID
    .setWorkflowId("order-" + orderId)
    .build();

// 使用业务 ID 的好处：
// 1. 避免重复执行相同业务逻辑
// 2. 便于查询和追踪
// 3. 支持幂等性

// 不指定工作流 ID 时，Temporal 自动生成
WorkflowOptions autoId = WorkflowOptions.newBuilder()
    .setTaskQueue("order-task-queue")
    // workflowId 未设置，自动生成
    .build();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">超时配置</h2>

      <p className="text-lg text-gray-700 mb-6">
        配置不同级别的超时，确保工作流不会无限期运行。
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-lg">ExecutionTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              工作流从开始到完成的总超时时间，包括所有重试和重试
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-lg">WorkflowRunTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              单个工作流运行的超时时间，不包括重试
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-lg">WorkflowTaskTimeout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              单个工作流任务的超时时间，Worker 处理任务的时间限制
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">超时配置示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import java.time.Duration;

WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("payment-task-queue")
    .setExecutionTimeout(Duration.ofHours(24))      // 总超时：24小时
    .setWorkflowRunTimeout(Duration.ofMinutes(10))  // 运行超时：10分钟
    .setWorkflowTaskTimeout(Duration.ofSeconds(10)) // 任务超时：10秒
    .build();

// 超时关系：
// ExecutionTimeout >= WorkflowRunTimeout
// WorkflowRunTimeout >= WorkflowTaskTimeout
// WorkflowTaskTimeout >= 活动超时`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">重试策略</h2>

      <p className="text-lg text-gray-700 mb-6">
        配置工作流失败时的重试策略。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">重试策略配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.common.RetryOptions;
import java.time.Duration;

RetryOptions retryOptions = RetryOptions.newBuilder()
    // 初始重试间隔
    .setInitialInterval(Duration.ofSeconds(1))
    
    // 回退系数（每次重试间隔乘以该系数）
    .setBackoffCoefficient(2.0)
    
    // 最大重试间隔
    .setMaximumInterval(Duration.ofSeconds(10))
    
    // 最大重试次数
    .setMaximumAttempts(5)
    
    // 不重试的异常类型
    .setNonRetryableExceptions(
        IllegalArgumentException.class
    )
    
    .build();

WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("payment-task-queue")
    .setRetryOptions(retryOptions)
    .build();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Memo 和 Search Attributes</h2>

      <p className="text-lg text-gray-700 mb-6">
        在启动工作流时设置元数据和可搜索属性。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Memo 配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import java.util.HashMap;
import java.util.Map;

// Memo：保存工作流的元数据（不可搜索）
Map<String, Object> memo = new HashMap<>();
memo.put("customerId", "cust-123");
memo.put("orderValue", 99.99);

WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-task-queue")
    .setMemo(memo)
    .build();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Search Attributes 配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.common.SearchAttributes;
import java.util.HashMap;
import java.util.Map;

// Search Attributes：可搜索的属性
Map<String, Object> searchAttrs = new HashMap<>();
searchAttrs.put("CustomKeywordField", "premium");
searchAttrs.put("CustomIntField", 100);

WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("order-task-queue")
    .setSearchAttributes(searchAttrs)
    .build();

// 之后可以使用 Search Attributes 查询工作流
List<WorkflowExecution> executions = client.listExecutions()
    .setQuery("CustomKeywordField = 'premium'")
    .getExecutions();`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Cron 工作流</h2>

      <p className="text-lg text-gray-700 mb-6">
        配置定期执行的工作流。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Cron 配置</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// Cron 表达式：每 5 分钟执行一次
String cronExpression = "*/5 * * * *";

WorkflowOptions options = WorkflowOptions.newBuilder()
    .setTaskQueue("report-task-queue")
    .setCronSchedule(cronExpression)
    .build();

// Cron 选项说明：
// * * * * *
// | | | | |
// | | | | +-- 星期几 (0-6, 0=周日)
// | | | +---- 月份 (1-12)
// | | +------ 日期 (1-31)
// | +-------- 小时 (0-23)
// +---------- 分钟 (0-59)

// 其他示例：
// "0 0 * * *"      // 每天午夜
// "0 9 * * 1-5"    // 工作日上午 9 点
// "0 0 1 * *"      // 每月第一天
// "*/30 * * * *"   // 每 30 分钟`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">完整示例</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">完整配置示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.client.WorkflowOptions;
import io.temporal.common.RetryOptions;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

// 配置重试策略
RetryOptions retryOptions = RetryOptions.newBuilder()
    .setInitialInterval(Duration.ofSeconds(1))
    .setBackoffCoefficient(2.0)
    .setMaximumInterval(Duration.ofSeconds(10))
    .setMaximumAttempts(3)
    .build();

// 配置 Memo
Map<String, Object> memo = new HashMap<>();
memo.put("customerId", customerId);
memo.put("customerType", "premium");

// 配置 Search Attributes
Map<String, Object> searchAttrs = new HashMap<>();
searchAttrs.put("CustomKeywordField", "payment");

// 创建工作流选项
WorkflowOptions options = WorkflowOptions.newBuilder()
    // 必需配置
    .setTaskQueue("payment-task-queue")
    .setWorkflowId("payment-" + transactionId)
    
    // 超时配置
    .setExecutionTimeout(Duration.ofHours(1))
    .setWorkflowRunTimeout(Duration.ofMinutes(10))
    .setWorkflowTaskTimeout(Duration.ofSeconds(10))
    
    // 重试策略
    .setRetryOptions(retryOptions)
    
    // Memo 和 Search Attributes
    .setMemo(memo)
    .setSearchAttributes(searchAttrs)
    
    .build();

// 启动工作流
PaymentWorkflow workflow = client.newWorkflowStub(
    PaymentWorkflow.class,
    options
);
PaymentResult result = workflow.processPayment(request);`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">合理设置超时</h3>
            <p className="text-gray-600 text-sm">
              根据实际业务需求设置超时，避免过长导致资源浪费，过短导致误判失败
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Database className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用业务 ID</h3>
            <p className="text-gray-600 text-sm">
              使用业务相关的 ID 作为工作流 ID，便于追踪和避免重复执行
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RefreshCw className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">区分可重试和不可重试错误</h3>
            <p className="text-gray-600 text-sm">
              通过 NonRetryableExceptions 避免重试业务逻辑错误
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">按域划分任务队列</h3>
            <p className="text-gray-600 text-sm">
              不同的业务域使用不同的任务队列，便于隔离和管理
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
            <Clock className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">活动选项</div>
              <div className="text-sm text-gray-600 mt-1">
                配置活动选项
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
