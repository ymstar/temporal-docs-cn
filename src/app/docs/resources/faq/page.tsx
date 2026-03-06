import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '常见问题',
  description: '常见问题解答',
};

export default function FAQ() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">常见问题</h1>
      <p className="text-xl text-gray-600 mb-8">
        以下问题基于 Temporal 官方文档整理，适合新团队快速建立概念共识。
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Workflow？</h2>
      <p>
        Workflow 是描述业务流程的代码逻辑，由 Temporal 负责状态持久化与重放，
        以保证在失败或重试时仍能保持确定性。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/workflows" target="_blank" rel="noreferrer">
          Workflows
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Activity？</h2>
      <p>
        Activity 执行非确定性或有副作用的逻辑，如调用外部系统、访问数据库等，
        Temporal 负责重试与超时控制。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/activities" target="_blank" rel="noreferrer">
          Activities
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Worker？</h2>
      <p>
        Worker 是运行 Workflow 和 Activity 的进程，负责轮询 Task Queue 并执行任务。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/workers" target="_blank" rel="noreferrer">
          Workers
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Task Queue？</h2>
      <p>
        Task Queue 是工作流任务与活动任务的分发通道，Worker 通过轮询 Task Queue 来接收任务。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/glossary" target="_blank" rel="noreferrer">
          Glossary
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Namespace？</h2>
      <p>
        Namespace 是 Temporal 中的逻辑隔离单元，类似多租户命名空间，可用于区分环境或业务域。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/namespaces" target="_blank" rel="noreferrer">
          Namespaces
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Temporal Service 是什么？</h2>
      <p>
        Temporal Service 是运行在服务器端的核心组件集合，负责调度、持久化、历史管理等能力，
        支撑 Workflow 的可靠执行。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/temporal-service" target="_blank" rel="noreferrer">
          Temporal Service
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">什么是 Visibility？</h2>
      <p>
        Visibility 是用来查询 Workflow 执行状态、历史与指标的能力，便于运维和排障。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/glossary" target="_blank" rel="noreferrer">
          Glossary
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">为什么需要 Continue-As-New？</h2>
      <p>
        Continue-As-New 用于将长历史的 Workflow 迁移到新的运行，控制历史规模，
        同时保留业务流程的连续性。
      </p>
      <p>
        参考：
        <Link href="https://docs.temporal.io/glossary" target="_blank" rel="noreferrer">
          Glossary
        </Link>
      </p>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/quickstart/what-is-temporal">
            <ArrowRight className="mr-2 h-4 w-4" />
            阅读快速开始
          </Link>
        </Button>
      </div>
    </div>
  );
}
