import Link from 'next/link';
import { Code, GitBranch, Shield, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '版本控制',
  description: '安全地更新工作流代码',
};

export default function Versioning() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">工作流版本控制</h1>
      <p className="text-xl text-gray-600 mb-8">
        安全地更新工作流代码，确保现有工作流执行的兼容性。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">核心概念</h3>
        <p className="text-blue-700">
          由于工作流代码必须是确定性的，修改工作流代码可能会导致历史不匹配。
          工作流版本控制机制允许您安全地更新工作流代码，同时保持向后兼容性。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">为什么需要版本控制？</h2>

      <p className="text-lg text-gray-700 mb-6">
        工作流代码修改可能导致以下问题：
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>历史不匹配</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              修改后的代码与历史事件不匹配，导致工作流无法继续执行
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <GitBranch className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>非确定性结果</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              相同的历史可能产生不同的结果，违反确定性约束
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">版本控制机制</h2>

      <p className="text-lg text-gray-700 mb-6">
        Temporal 使用 <code className="bg-gray-100 px-2 py-1 rounded">Workflow.getVersion()</code> 方法来区分不同版本的工作流代码。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">版本控制示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Workflow;

public class MyWorkflowImpl implements MyWorkflow {
    
    private final MyActivities activities = Workflow.newActivityStub(
        MyActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public String execute(String input) {
        // 获取工作流版本
        String version = Workflow.getVersion(
            "activity-change",    // 变更 ID
            Workflow.DEFAULT_VERSION,   // 默认版本
            1                         // 新版本
        );
        
        if (version == Workflow.DEFAULT_VERSION) {
            // 旧版本：调用旧的活动
            return activities.processLegacy(input);
            
        } else if (version.equals("1")) {
            // 新版本：调用新的活动
            return activities.processNew(input);
            
        } else {
            // 未来版本
            throw new IllegalStateException("Unknown version: " + version);
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">版本控制使用场景</h2>

      <div className="my-8 space-y-6">
        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-lg">场景 1: 添加新的活动</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              在工作流中添加新的活动调用，但不影响现有执行。
            </p>
            <Card className="bg-gray-900 text-white border-0">
              <CardHeader className="pb-2">
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
              </CardHeader>
              <CardContent>
                <pre className="text-xs font-mono overflow-x-auto">
{`String version = Workflow.getVersion(
    "add-validation",
    Workflow.DEFAULT_VERSION,
    1
);

if (version == Workflow.DEFAULT_VERSION) {
    // 旧版本：没有验证步骤
    String result = activities.process(input);
    
} else {
    // 新版本：添加验证步骤
    activities.validate(input);
    String result = activities.process(input);
}`}
                </pre>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-lg">场景 2: 修改活动参数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              修改活动的输入参数，需要确保新旧版本都能正常工作。
            </p>
            <Card className="bg-gray-900 text-white border-0">
              <CardHeader className="pb-2">
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
              </CardHeader>
              <CardContent>
                <pre className="text-xs font-mono overflow-x-auto">
{`String version = Workflow.getVersion(
    "change-activity-signature",
    Workflow.DEFAULT_VERSION,
    1
);

if (version == Workflow.DEFAULT_VERSION) {
    // 旧版本：使用旧的参数
    activities.processLegacy(input, timeout);
    
} else {
    // 新版本：使用新的参数对象
    ProcessRequest request = new ProcessRequest(input, timeout);
    activities.processNew(request);
}`}
                </pre>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-lg">场景 3: 更新活动实现</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              更新活动的实现逻辑，但保持接口不变。
            </p>
            <div className="my-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-800 text-sm">
                <strong>注意：</strong> 更新活动实现不需要版本控制，因为活动代码是独立于工作流历史的。
                只需重新部署 Worker 即可。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle className="text-lg">场景 4: 修改活动选项</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              修改活动的超时或重试配置。
            </p>
            <Card className="bg-gray-900 text-white border-0">
              <CardHeader className="pb-2">
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
              </CardHeader>
              <CardContent>
                <pre className="text-xs font-mono overflow-x-auto">
{`String version = Workflow.getVersion(
    "change-timeout",
    Workflow.DEFAULT_VERSION,
    1
);

ActivityOptions options;
if (version == Workflow.DEFAULT_VERSION) {
    // 旧版本：较短的超时
    options = ActivityOptions.newBuilder()
        .setStartToCloseTimeout(Duration.ofSeconds(10))
        .build();
        
} else {
    // 新版本：更长的超时
    options = ActivityOptions.newBuilder()
        .setStartToCloseTimeout(Duration.ofSeconds(30))
        .build();
}

MyActivities activities = Workflow.newActivityStub(
    MyActivities.class,
    options
);`}
                </pre>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用有意义的变更 ID</h3>
            <p className="text-gray-600 text-sm">
              使用描述性的变更 ID，如 "add-validation" 或 "change-timeout"，便于理解代码意图
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <GitBranch className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">保持版本号递增</h3>
            <p className="text-gray-600 text-sm">
              使用递增的整数作为版本号，便于追踪演进历史
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">保留旧版本代码</h3>
            <p className="text-gray-600 text-sm">
              不要删除旧版本的代码，确保运行中的工作流能够继续执行
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">渐进式迁移</h3>
            <p className="text-gray-600 text-sm">
              先部署新版本代码，等所有旧工作流完成后，再考虑删除旧版本代码
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="h-6 w-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">测试兼容性</h3>
            <p className="text-gray-600 text-sm">
              在生产环境部署前，在测试环境验证新旧版本的兼容性
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">常见错误</h2>

      <div className="my-8">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">❌ 错误做法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="text-sm font-semibold text-red-800">直接修改活动调用参数</p>
                <p className="text-xs text-red-600 mt-1">会导致历史不匹配，运行中的工作流失败</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="text-sm font-semibold text-red-800">删除旧版本代码</p>
                <p className="text-xs text-red-600 mt-1">运行中的工作流需要旧版本代码才能继续执行</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="text-sm font-semibold text-red-800">修改工作流接口定义</p>
                <p className="text-xs text-red-600 mt-1">工作流接口定义变更会影响历史兼容性</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">✅ 正确做法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="text-sm font-semibold text-green-800">使用 Workflow.getVersion()</p>
                <p className="text-xs text-green-600 mt-1">在代码变更前检查版本号，区分新旧逻辑</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="text-sm font-semibold text-green-800">保留所有版本代码</p>
                <p className="text-xs text-green-600 mt-1">确保运行中的工作流能够继续执行到完成</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="text-sm font-semibold text-green-800">变更活动而非工作流</p>
                <p className="text-xs text-green-600 mt-1">如果可能，只修改活动代码，不需要版本控制</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">完整示例</h2>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">完整版本控制示例</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.workflow.Workflow;
import java.time.Duration;

public class OrderWorkflowImpl implements OrderWorkflow {
    
    private final OrderActivities activities = Workflow.newActivityStub(
        OrderActivities.class,
        getActivityOptions()
    );
    
    private ActivityOptions getActivityOptions() {
        // 超时版本控制
        String timeoutVersion = Workflow.getVersion(
            "timeout-v2",
            Workflow.DEFAULT_VERSION,
            2
        );
        
        if (timeoutVersion == Workflow.DEFAULT_VERSION) {
            return ActivityOptions.newBuilder()
                .setStartToCloseTimeout(Duration.ofSeconds(10))
                .build();
        } else {
            return ActivityOptions.newBuilder()
                .setStartToCloseTimeout(Duration.ofSeconds(30))
                .build();
        }
    }
    
    @Override
    public OrderResult processOrder(OrderRequest request) {
        // 验证版本控制
        String validationVersion = Workflow.getVersion(
            "add-validation",
            Workflow.DEFAULT_VERSION,
            1
        );
        
        if (validationVersion.equals("1")) {
            // 新版本：添加验证步骤
            activities.validateOrder(request);
        }
        
        // 处理版本控制
        String processVersion = Workflow.getVersion(
            "process-change",
            Workflow.DEFAULT_VERSION,
            1
        );
        
        if (processVersion == Workflow.DEFAULT_VERSION) {
            // 旧版本：直接处理
            return activities.processOrderLegacy(request);
            
        } else {
            // 新版本：使用新的处理逻辑
            activities.reserveInventory(request);
            String paymentId = activities.processPayment(request);
            activities.shipOrder(request);
            
            return new OrderResult(paymentId, "COMPLETED");
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
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
          <Link href="/docs/develop/errors">
            <Shield className="h-8 w-8 text-green-600 mb-3" />
            <div className="text-left">
              <div className="font-semibold">错误处理</div>
              <div className="text-sm text-gray-600 mt-1">
                学习错误处理
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
