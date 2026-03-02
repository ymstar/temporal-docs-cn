import Link from 'next/link';
import { ArrowRight, Terminal, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '安装 Temporal',
  description: '安装 Temporal CLI 和本地开发环境',
};

export default function Install() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">安装 Temporal</h1>
      <p className="text-xl text-gray-600 mb-8">
        在本地安装 Temporal，开始开发分布式应用程序。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">系统要求</h2>
      
      <div className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Docker Desktop 4.0+（用于运行 Temporal Server）</li>
          <li>Java 17+ 或 Java 21+</li>
          <li>Maven 3.6+ 或 Gradle 7+</li>
          <li>4GB 可用内存</li>
          <li>10GB 可用磁盘空间</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">安装 Temporal CLI</h2>

      <p className="text-lg text-gray-700 mb-6">
        Temporal CLI（命令行工具）用于管理工作流、启动开发服务器和与 Temporal Server 交互。
      </p>

      <div className="space-y-6 my-8">
        <div>
          <h3 className="text-2xl font-semibold mb-3">macOS / Linux</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-mono">Bash</span>
              </div>
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                curl -sSf https://temporal.io/cli.sh | sh
              </code>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3">Windows</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-mono">PowerShell</span>
              </div>
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                Invoke-Expression (Invoke-WebRequest -Uri https://temporal.io/cli.sh).Content
              </code>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3">验证安装</h3>
          <Card className="bg-gray-900 text-white border-0">
            <CardContent className="pt-6">
              <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                temporal --version
              </code>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">运行本地 Temporal Server</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 Docker Compose 在本地启动 Temporal Server，包括 Temporal Web UI。
      </p>

      <div className="my-8">
        <h3 className="text-2xl font-semibold mb-3">启动服务器</h3>
        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-mono">Terminal</span>
            </div>
            <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
              temporal server start-dev
            </code>
          </CardContent>
        </Card>
        <p className="mt-4 text-sm text-gray-600">
          该命令会下载并启动 Temporal Server、PostgreSQL 数据库和 Temporal Web UI。
        </p>
      </div>

      <div className="my-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-3">访问 Web UI</h3>
        <p className="text-gray-700 mb-3">
          服务器启动后，您可以在浏览器中访问：
        </p>
        <a 
          href="http://localhost:8233" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          http://localhost:8233
        </a>
        <p className="mt-3 text-sm text-gray-600">
          Web UI 让您可以查看工作流执行历史、搜索工作流和调试问题。
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">安装 Java SDK</h2>

      <p className="text-lg text-gray-700 mb-6">
        将 Temporal Java SDK 添加到您的项目中。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="border-orange-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-orange-600" />
              <CardTitle className="text-xl">Maven</CardTitle>
            </div>
            <CardDescription>在 pom.xml 中添加依赖</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="bg-gray-900 text-white border-0">
              <CardHeader className="pb-2">
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">pom.xml</span>
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
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-xl">Gradle</CardTitle>
            </div>
            <CardDescription>在 build.gradle 中添加依赖</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="bg-gray-900 text-white border-0">
              <CardHeader className="pb-2">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">build.gradle</span>
              </CardHeader>
              <CardContent>
                <pre className="text-sm font-mono overflow-x-auto">
{`dependencies {
    implementation 'io.temporal:temporal-sdk:1.23.1'
}`}
                </pre>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">创建项目</h2>

      <p className="text-lg text-gray-700 mb-6">
        使用 Maven 或 Gradle 创建一个新的 Java 项目。
      </p>

      <div className="my-8">
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-mono">Maven 项目结构</span>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono overflow-x-auto">
{`my-temporal-app/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── io/
│   │   │       └── temporal/
│   │   │           └── sample/
│   │   │               ├── workflows/
│   │   │               │   ├── MyWorkflow.java
│   │   │               │   └── MyWorkflowImpl.java
│   │   │               ├── activities/
│   │   │               │   ├── MyActivities.java
│   │   │               │   └── MyActivitiesImpl.java
│   │   │               ├── WorkerMain.java
│   │   │               └── StarterMain.java
│   │   └── resources/`}
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">故障排除</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Docker 未运行</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              确保 Docker Desktop 正在运行。您可以通过运行 <code className="bg-gray-100 px-2 py-1 rounded">docker ps</code> 来验证。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">端口已被占用</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              如果端口 7233 或 8233 已被占用，您可以使用 <code className="bg-gray-100 px-2 py-1 rounded">--port</code> 和 <code className="bg-gray-100 px-2 py-1 rounded">--ui-port</code> 选项指定不同的端口：
            </p>
            <Card className="bg-gray-900 text-white border-0 mt-3">
              <CardContent className="pt-6">
                <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                  temporal server start-dev --port 7234 --ui-port 8234
                </code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CLI 未安装</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              如果 <code className="bg-gray-100 px-2 py-1 rounded">temporal</code> 命令未找到，请确保将 CLI 添加到系统 PATH 中，或使用完整路径执行：
            </p>
            <Card className="bg-gray-900 text-white border-0 mt-3">
              <CardContent className="pt-6">
                <code className="text-sm font-mono block p-3 bg-gray-800 rounded">
                  export PATH=$HOME/temporal:$PATH
                </code>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">下一步</h2>

      <div className="my-8">
        <Button size="lg" asChild>
          <Link href="/docs/quickstart/hello-world">
            <Zap className="mr-2 h-4 w-4" />
            创建您的第一个工作流
          </Link>
        </Button>
      </div>
    </div>
  );
}
