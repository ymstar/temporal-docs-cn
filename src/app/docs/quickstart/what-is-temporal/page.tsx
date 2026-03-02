import Link from 'next/link';
import { ArrowRight, Clock, GitBranch, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '什么是 Temporal',
  description: '了解 Temporal 的核心概念和价值',
};

export default function WhatIsTemporal() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">什么是 Temporal？</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 是一个开源的、可靠的分布式任务编排平台，用于构建可靠的分布式系统。
      </p>

      <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>可靠的执行</CardTitle>
            <CardDescription>
              工作流自动重试，永不丢失状态，即使服务器崩溃也能恢复
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <GitBranch className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>复杂流程编排</CardTitle>
            <CardDescription>
              轻松处理复杂的业务流程、长运行任务和状态机
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>可观测性</CardTitle>
            <CardDescription>
              完整的执行历史、事件追踪和调试工具
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心概念</h2>

      <div className="space-y-6 my-8">
        <div className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50">
          <h3 className="text-2xl font-semibold mb-2">工作流 (Workflow)</h3>
          <p className="text-gray-700">
            工作流是定义整个业务流程的代码。它是确定性的，可以暂停、恢复和重试。
            工作流代码在 Temporal Server 的控制下执行，保证状态的一致性。
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-50">
          <h3 className="text-2xl font-semibold mb-2">活动 (Activity)</h3>
          <p className="text-gray-700">
            活动是执行非确定性操作的代码，如调用外部 API、读写数据库或执行计算。
            活动可以自动重试、超时和失败处理，让您的应用更加可靠。
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6 py-2 bg-purple-50">
          <h3 className="text-2xl font-semibold mb-2">Temporal Server</h3>
          <p className="text-gray-700">
            Temporal Server 是分布式系统的中央协调器，负责管理工作流和活动的执行、
            状态持久化和事件历史记录。它确保系统的可靠性和可扩展性。
          </p>
        </div>

        <div className="border-l-4 border-orange-500 pl-6 py-2 bg-orange-50">
          <h3 className="text-2xl font-semibold mb-2">Worker</h3>
          <p className="text-gray-700">
            Worker 是运行工作流和活动代码的进程。它连接到 Temporal Server，
            接收任务并执行实际的业务逻辑。您可以运行多个 Worker 来水平扩展。
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">为什么选择 Temporal？</h2>

      <div className="space-y-4 my-8">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            1
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">专注于业务逻辑</h3>
            <p className="text-gray-600">
              不需要处理重试、超时、状态管理等基础设施代码，专注于实现业务需求。
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            2
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">自动恢复</h3>
            <p className="text-gray-600">
              系统崩溃、网络故障或代码更新时，工作流会自动从最后的状态恢复执行。
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            3
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">可观测性</h3>
            <p className="text-gray-600">
              完整的事件历史记录让您可以追踪每个工作流的执行，轻松调试问题。
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            4
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">语言无关</h3>
            <p className="text-gray-600">
              支持 Go、Java、Python、TypeScript、.NET 和 PHP，使用您熟悉的语言。
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">典型使用场景</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>订单处理</CardTitle>
            <CardDescription>
              管理订单创建、支付、库存、发货等复杂流程
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>数据管道</CardTitle>
            <CardDescription>
              构建可靠的数据 ETL 流程，确保数据处理不丢失
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户引导</CardTitle>
            <CardDescription>
              协调多步骤的注册流程，发送邮件、验证、引导
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>资源管理</CardTitle>
            <CardDescription>
              管理云资源的创建、配置、监控和销毁
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">下一步</h3>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="/docs/quickstart/install">
              <ArrowRight className="mr-2 h-4 w-4" />
              安装 Temporal
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="/docs/quickstart/hello-world">
              <ArrowRight className="mr-2 h-4 w-4" />
              Hello World 教程
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
