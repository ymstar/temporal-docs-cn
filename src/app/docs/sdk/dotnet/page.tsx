import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '.NET SDK',
  description: '使用 .NET 开发 Temporal 应用',
};

export default function DotnetSDK() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">.NET SDK</h1>
      <p className="text-xl text-gray-600 mb-8">
        Temporal .NET SDK 让您使用 C#、F# 和其他 .NET 语言构建可靠的分布式应用程序。
      </p>

      <div className="my-8 bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">快速开始</h3>
        <p className="text-green-700 mb-3">
          安装 .NET SDK NuGet 包：
        </p>
        <Card className="bg-gray-900 text-white border-0 inline-block">
          <CardContent className="pt-4">
            <code className="text-sm font-mono">dotnet add package Temporalio</code>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">核心特性</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>接口定义</CardTitle>
            <CardDescription>
              使用 C# 接口定义工作流，强类型检查
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>异步支持</CardTitle>
            <CardDescription>
              原生支持 async/await，充分利用 .NET 异步特性
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>依赖注入</CardTitle>
            <CardDescription>
              与 .NET 依赖注入无缝集成
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>跨平台</CardTitle>
            <CardDescription>
              支持 Windows、Linux 和 macOS
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">相关资源</h3>
        <div className="space-y-3">
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://github.com/temporalio/sdk-dotnet" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              .NET SDK GitHub 仓库
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
