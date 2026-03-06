import Link from 'next/link';
import { Network, ListTree, Layers, Binary } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '数据模型',
  description: 'Temporal 工作流数据模型与核心概念总览',
};

export default function DataModelReference() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">数据模型</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal 通过一套事件驱动的数据模型来表示工作流执行。理解这些概念有助于你正确设计
        Namespace、Workflow ID、Task Queue 以及查询与筛选策略。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心实体</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" />
              Namespace
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              Namespace 是工作流的逻辑隔离边界，类似「环境 + 业务域」的组合。
              不同 Namespace 之间的工作流完全隔离，常用于区分开发/测试/生产环境，
              或不同租户。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTree className="h-5 w-5 text-green-600" />
              Workflow / Execution / Run ID
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p className="mb-2">
              <strong>Workflow ID</strong> 是业务级标识，例如订单号。
            </p>
            <p className="mb-2">
              <strong>Workflow Execution</strong> 是一次实际执行。
            </p>
            <p>
              <strong>Run ID</strong> 是 Execution 的唯一标识，每次 Continue-As-New
              或重启都会生成新的 Run ID，但可以复用同一个 Workflow ID。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-600" />
              任务队列（Task Queue）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              Task Queue 用于将工作流任务与 Activity 任务分发给 Worker 进程。
              同一个 Task Queue 可以被多个 Worker 消费，用于水平扩展吞吐量。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Binary className="h-5 w-5 text-orange-600" />
              事件历史（Event History）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>
              每个工作流执行都有一条只追加的事件历史，记录所有状态变更。
              Workflow 代码在重放这些事件时恢复当前状态，从而实现「确定性」与
              崩溃后恢复。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">可见性与搜索属性</h2>
      <p className="text-lg text-gray-700 mb-4">
        Temporal 将部分字段索引到「可见性存储」，用于在 UI、CLI 或 API 中筛选工作流。
        除了内置字段（状态、开始时间、结束时间等），你还可以配置自定义 Search Attributes。
      </p>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">内置搜索字段</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-1">
            <p>例如：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ExecutionStatus / StartTime / CloseTime</li>
              <li>WorkflowType / TaskQueue / Namespace</li>
              <li>BuildIds（Worker 版本信息）</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">自定义 Search Attributes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              可以通过运维工具或 API 创建自定义字段（如 customerId、region、riskLevel），
              在启动工作流或工作流代码中写入这些字段，便于后续按业务维度筛选。
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">推荐阅读顺序</h2>
      <p className="text-lg text-gray-700 mb-4">
        如果你刚接触 Temporal，建议先从「什么是 Temporal」和「工作流」章节入手，
        然后再回到本页理解数据模型细节，最后阅读搜索属性与可观测性相关内容。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="https://docs.temporal.io/reference"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Temporal Reference
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/temporal#temporal-data-model"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Temporal Data Model
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.temporal.io/search-attribute"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Search Attributes
          </Link>
        </li>
      </ul>
    </div>
  );
}

