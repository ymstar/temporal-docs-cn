import Link from 'next/link';
import { AlertTriangle, Shield, RefreshCw, Bug, FileCode, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '错误处理',
  description: '处理工作流和活动中的错误',
};

export default function ErrorHandling() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">错误处理</h1>
      <p className="text-xl text-gray-600 mb-8">
        学习如何在 Temporal 工作流和活动中正确处理错误和异常。
      </p>

      <div className="my-8 bg-red-50 border-l-4 border-red-500 p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">核心概念</h3>
        <p className="text-red-700">
          Temporal 提供强大的错误处理机制，包括自动重试、错误传播和自定义异常处理。
          理解不同类型的错误对于构建可靠的应用程序至关重要。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">错误类型</h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Bug className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Application Failure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              应用程序逻辑错误，通常可重试
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 数据库连接超时</li>
              <li>• API 调用失败</li>
              <li>• 临时资源不可用</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Activity Task Failure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              活动执行失败，Worker 无法完成任务
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Worker 崩溃</li>
              <li>• 活动超时</li>
              <li>• 资源耗尽</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileCode className="h-8 w-8 text-yellow-600 mb-2" />
            <CardTitle>Workflow Task Failure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              工作流任务执行失败，通常是代码错误
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 工作流代码错误</li>
              <li>• 违反确定性约束</li>
              <li>• 历史不匹配</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Terminated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              工作流被外部终止，无法重试
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 手动终止</li>
              <li>• 达到重试上限</li>
              <li>• 执行超时</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">活动中的错误处理</h2>

      <p className="text-lg text-gray-700 mb-6">
        活动中抛出的异常会触发重试机制。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">活动错误处理</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`public class PaymentActivitiesImpl implements PaymentActivities {
    
    @Override
    public String chargePayment(PaymentRequest request) {
        try {
            // 调用支付网关
            PaymentResponse response = PaymentGateway.charge(request);
            
            if (!response.isSuccess()) {
                // 业务错误，抛出异常触发重试
                throw new ApplicationFailureException(
                    "Payment failed: " + response.getErrorMessage(),
                    "PaymentError",
                    true  // nonRetryable: true 表示不重试
                );
            }
            
            return response.getTransactionId();
            
        } catch (NetworkException e) {
            // 网络错误，自动重试
            throw new ApplicationFailureException(
                "Network error: " + e.getMessage(),
                "NetworkError",
                false  // nonRetryable: false 表示可重试
            );
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">工作流中的错误处理</h2>

      <p className="text-lg text-gray-700 mb-6">
        在工作流中捕获和处理活动抛出的异常。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">工作流错误处理</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`import io.temporal.failure.ApplicationFailure;

public class PaymentWorkflowImpl implements PaymentWorkflow {
    
    private final PaymentActivities activities = Workflow.newActivityStub(
        PaymentActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .setRetryOptions(RetryOptions.newBuilder()
                .setMaximumAttempts(3)
                .build())
            .build()
    );
    
    @Override
    public PaymentResult processPayment(PaymentRequest request) {
        try {
            // 尝试扣款
            String transactionId = activities.chargePayment(request);
            return PaymentResult.success(transactionId);
            
        } catch (ApplicationFailure e) {
            // 根据错误类型处理
            String errorType = e.getType();
            
            if ("PaymentError".equals(errorType)) {
                // 不可重试的支付错误，直接失败
                return PaymentResult.failed(e.getMessage());
                
            } else if ("NetworkError".equals(errorType)) {
                // 网络错误已自动重试，仍然失败
                return PaymentResult.failed("Payment failed after retries");
                
            } else {
                // 其他错误
                throw e;
            }
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">自定义异常</h2>

      <p className="text-lg text-gray-700 mb-6">
        创建自定义异常类型以区分不同的业务错误。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">自定义异常</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`// 定义自定义异常
public class InsufficientFundsException extends RuntimeException {
    private final double currentBalance;
    private final double requestedAmount;
    
    public InsufficientFundsException(double currentBalance, double requestedAmount) {
        super(String.format(
            "Insufficient funds. Current: %.2f, Requested: %.2f",
            currentBalance,
            requestedAmount
        ));
        this.currentBalance = currentBalance;
        this.requestedAmount = requestedAmount;
    }
    
    public double getCurrentBalance() {
        return currentBalance;
    }
    
    public double getRequestedAmount() {
        return requestedAmount;
    }
}

// 在活动中使用
public class AccountActivitiesImpl implements AccountActivities {
    
    @Override
    public void withdraw(String accountId, double amount) {
        Account account = database.getAccount(accountId);
        
        if (account.getBalance() < amount) {
            // 抛出业务异常
            throw new InsufficientFundsException(
                account.getBalance(),
                amount
            );
        }
        
        account.withdraw(amount);
        database.saveAccount(account);
    }
}

// 在工作流中捕获
public class TransferWorkflowImpl implements TransferWorkflow {
    
    @Override
    public void transfer(String from, String to, double amount) {
        try {
            activities.withdraw(from, amount);
            activities.deposit(to, amount);
            
        } catch (InsufficientFundsException e) {
            // 处理余额不足
            activities.notifyUser(from, 
                String.format("Transfer failed: %s", e.getMessage())
            );
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">重试策略</h2>

      <p className="text-lg text-gray-700 mb-6">
        配置活动的重试策略，包括重试次数、间隔和回退系数。
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

// 配置重试策略
RetryOptions retryOptions = RetryOptions.newBuilder()
    // 初始重试间隔：1 秒
    .setInitialInterval(Duration.ofSeconds(1))
    
    // 回退系数：每次重试间隔乘以 2
    .setBackoffCoefficient(2.0)
    
    // 最大重试间隔：10 秒
    .setMaximumInterval(Duration.ofSeconds(10))
    
    // 最大重试次数：5 次
    .setMaximumAttempts(5)
    
    // 不重试的异常类型
    .setNonRetryableExceptions(
        InsufficientFundsException.class,
        InvalidAccountException.class
    )
    
    .build();

// 应用重试策略
ActivityOptions options = ActivityOptions.newBuilder()
    .setStartToCloseTimeout(Duration.ofMinutes(1))
    .setRetryOptions(retryOptions)
    .build();

PaymentActivities activities = Workflow.newActivityStub(
    PaymentActivities.class,
    options
);

// 重试时间线：
// 尝试 1: 立即执行
// 失败后等待: 1 秒
// 尝试 2: 1 秒后执行
// 失败后等待: 2 秒
// 尝试 3: 3 秒后执行
// 失败后等待: 4 秒
// 尝试 4: 7 秒后执行
// 失败后等待: 8 秒
// 尝试 5: 15 秒后执行`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Compensation（补偿）</h2>

      <p className="text-lg text-gray-700 mb-6">
        当工作流失败时，执行补偿操作撤销已完成的操作。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">补偿模式</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`public class BookingWorkflowImpl implements BookingWorkflow {
    
    private final BookingActivities activities = Workflow.newActivityStub(
        BookingActivities.class,
        ActivityOptions.newBuilder()
            .setStartToCloseTimeout(Duration.ofSeconds(30))
            .build()
    );
    
    @Override
    public BookingResult bookTrip(TripRequest request) {
        List<String> bookedItems = new ArrayList<>();
        
        try {
            // 步骤 1: 预订机票
            String flightId = activities.bookFlight(request.getFlight());
            bookedItems.add(flightId);
            
            // 步骤 2: 预订酒店
            String hotelId = activities.bookHotel(request.getHotel());
            bookedItems.add(hotelId);
            
            // 步骤 3: 预订租车
            String carId = activities.bookCar(request.getCar());
            bookedItems.add(carId);
            
            return BookingResult.success(bookedItems);
            
        } catch (Exception e) {
            // 发生错误，执行补偿
            compensate(bookedItems);
            
            return BookingResult.failed(
                "Booking failed: " + e.getMessage()
            );
        }
    }
    
    private void compensate(List<String> bookedItems) {
        // 按相反顺序取消预订
        for (int i = bookedItems.size() - 1; i >= 0; i--) {
            try {
                activities.cancelBooking(bookedItems.get(i));
            } catch (Exception e) {
                // 补偿失败，记录日志但继续
                Workflow.getLogger(this.getClass())
                    .warn("Failed to cancel booking: " + bookedItems.get(i), e);
            }
        }
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Saga 模式</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 Saga 模式管理跨多个服务的分布式事务。
      </p>

      <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Saga 模式说明</h3>
        <p className="text-blue-700 text-sm">
          Saga 模式将分布式事务拆分为一系列本地事务，每个本地事务都有对应的补偿事务。
          如果任何步骤失败，执行之前所有步骤的补偿事务，确保系统最终一致。
        </p>
      </div>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Saga 实现</span>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Java</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`public class SagaOrchestrator {
    
    private List<SagaStep> steps = new ArrayList<>();
    
    public <T> SagaOrchestrator step(
        String name,
        Supplier<T> action,
        Consumer<T> compensation
    ) {
        steps.add(new SagaStep<>(name, action, compensation));
        return this;
    }
    
    public void execute() {
        List<CompensableAction> completedActions = new ArrayList<>();
        
        try {
            for (SagaStep step : steps) {
                // 执行操作
                Object result = step.getAction().get();
                completedActions.add(new CompensableAction(step, result));
            }
            
        } catch (Exception e) {
            // 发生错误，执行补偿
            compensate(completedActions);
            throw new SagaExecutionException(
                "Saga failed", e
            );
        }
    }
    
    private void compensate(List<CompensableAction> actions) {
        // 按相反顺序执行补偿
        Collections.reverse(actions);
        
        for (CompensableAction action : actions) {
            try {
                action.getCompensation().accept(action.getResult());
            } catch (Exception e) {
                Workflow.getLogger(SagaOrchestrator.class)
                    .error("Compensation failed for: " + 
                           action.getStep().getName(), e);
            }
        }
    }
}

// 在工作流中使用
public class OrderWorkflowImpl implements OrderWorkflow {
    
    @Override
    public void processOrder(Order order) {
        new SagaOrchestrator()
            .step("reserve-inventory",
                () -> activities.reserveInventory(order),
                (result) -> activities.releaseInventory(order)
            )
            .step("process-payment",
                () -> activities.processPayment(order),
                (result) -> activities.refundPayment(result)
            )
            .step("confirm-order",
                () -> activities.confirmOrder(order),
                (result) -> activities.cancelOrder(order)
            )
            .execute();
    }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">错误可观测性</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 Temporal Web UI 查看错误详情和重试历史。
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <Bug className="h-6 w-6 text-red-600 mb-2" />
            <CardTitle className="text-lg">查看错误堆栈</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              在 Web UI 中查看完整的错误堆栈和失败原因
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RefreshCw className="h-6 w-6 text-orange-600 mb-2" />
            <CardTitle className="text-lg">重试历史</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              查看每次重试的详细信息和时间线
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileCode className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-lg">输入输出</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              查看失败的输入参数和期望的输出
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-6 w-6 text-green-600 mb-2" />
            <CardTitle className="text-lg">事件历史</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              追踪工作流的完整执行历史和事件
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">最佳实践</h2>

      <div className="my-8 space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">区分可重试和不可重试错误</h3>
            <p className="text-gray-600 text-sm">
              业务逻辑错误（如余额不足）不应重试，临时错误（如网络超时）应重试
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RefreshCw className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">实现补偿机制</h3>
            <p className="text-gray-600 text-sm">
              对于多步骤操作，实现补偿机制确保最终一致性
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">记录详细错误信息</h3>
            <p className="text-gray-600 text-sm">
              在异常中包含足够的上下文信息，便于调试和监控
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">使用自定义异常</h3>
            <p className="text-gray-600 text-sm">
              创建自定义异常类型以区分不同的业务错误场景
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
            <FileCode className="h-8 w-8 text-green-600 mb-3" />
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
