import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen, Shield, Gauge, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '最佳实践',
  description: 'Temporal 开发最佳实践',
};

export default function BestPractices() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">最佳实践</h1>
      <p className="text-xl text-gray-600 mb-8">
        本页基于 Temporal 官方最佳实践指南整理，聚焦团队在生产环境落地 Temporal
        时最容易踩坑的领域，并给出可执行的落地路线。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">适用对象</h2>
      <ul className="space-y-2">
        <li>负责在组织内推广 Temporal 的平台团队或架构师</li>
        <li>需要统一工作流实现规范的业务团队</li>
        <li>编写内部教程、培训或最佳实践文档的内容负责人</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心主题</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Worker 部署与性能
            </CardTitle>
          </CardHeader>
          <CardContent>
            从 Worker 配置、任务队列拆分、负载测试到发布策略，建立可观测、可扩展的
            Worker 体系。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              预生产测试
            </CardTitle>
          </CardHeader>
          <CardContent>
            通过故障注入、容量测试和运行手册演练验证系统可靠性，避免上线即事故。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Namespace 管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            统一命名规范、访问边界和资源限制，避免多团队共享导致的稳定性问题。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              安全与成本
            </CardTitle>
          </CardHeader>
          <CardContent>
            结合访问控制、密钥管理和成本优化策略，把安全与成本纳入标准流程。
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">落地建议</h2>
      <ol className="space-y-3">
        <li>先定义团队级标准：Workflow 设计规范、命名规则、Task Queue 策略。</li>
        <li>建立上线门槛：预生产测试、可观测性指标、回滚与版本管理策略。</li>
        <li>形成知识库：用可复用模板沉淀最佳实践，降低新团队接入成本。</li>
      </ol>

      <h2 className="text-3xl font-bold mt-12 mb-6">官方参考</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            href="https://docs.temporal.io/best-practices" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Best practices 总览（官方）
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/best-practices/worker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Worker deployment and performance
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/best-practices/pre-production-testing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Pre-production testing
          </Link>
        </li>
        <li>
          <Link 
            href="https://docs.temporal.io/best-practices/managing-namespace" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Namespace best practices
          </Link>
        </li>
      </ul>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/cluster-deployment/overview">
            <ArrowRight className="mr-2 h-4 w-4" />
            查看部署概述
          </Link>
        </Button>
      </div>
    </div>
  );
}
