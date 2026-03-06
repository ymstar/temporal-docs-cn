import Link from 'next/link';
import { ArrowRight, Code, GitBranch, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '示例应用',
  description: '示例应用程序和教程',
};

export default function SampleApps() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">示例应用</h1>
      <p className="text-xl text-gray-600 mb-8">
        以下示例应用来自 Temporal 官方仓库，覆盖多语言 SDK 和常见场景，
        适合快速对照实现与工程结构。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              Go Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Go SDK 的官方样例合集，包含常见 Workflow / Activity 模式。
            </p>
            <div className="mt-2">
              <Link 
                href="https://github.com/temporalio/samples-go" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                temporalio/samples-go
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-red-600" />
              Java Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Java SDK 的官方示例仓库，覆盖基本流程与高级特性。
            </p>
            <div className="mt-2">
              <Link 
                href="https://github.com/temporalio/samples-java" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                temporalio/samples-java
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-600" />
              TypeScript Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              TypeScript SDK 示例与模板工程，适合前后端一体化团队。
            </p>
            <div className="mt-2">
              <Link 
                href="https://github.com/temporalio/samples-typescript" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                temporalio/samples-typescript
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-600" />
              Temporal Server Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Temporal Server 的参考配置与示例，常用于本地或测试环境。
            </p>
            <div className="mt-2">
              <Link 
                href="https://github.com/temporalio/samples-server" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                temporalio/samples-server
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-orange-600" />
              Temporal Cafe Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              官方示例应用，展示端到端业务流程编排。
            </p>
            <div className="mt-2">
              <Link 
                href="https://github.com/temporalio/temporal-cafe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                temporalio/temporal-cafe
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <Button asChild>
          <Link href="/docs/quickstart/hello-world">
            <ArrowRight className="mr-2 h-4 w-4" />
            从 Hello World 开始
          </Link>
        </Button>
      </div>
    </div>
  );
}
