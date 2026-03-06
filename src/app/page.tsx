import Link from 'next/link';
import { ArrowRight, Zap, Shield, Code, Book, Terminal, Github, ExternalLink, Globe, Star, Users, Twitter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Temporal</span>
            <span className="text-sm text-gray-500 ml-1">中文文档</span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="text-gray-900 transition-colors hover:text-gray-900"
            >
              首页
            </Link>
            <Link
              href="/docs/quickstart/what-is-temporal"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              文档
            </Link>
            <Link
              href="/docs/sdk/java"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              SDK
            </Link>
            <Link
              href="/docs/resources/sample-apps"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              示例
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/ymstar/temporal-docs-cn" target="_blank" rel="noopener noreferrer" title="查看源码">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com/temporalio" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="https://docs.temporal.io" target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                官方文档
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative container px-4 py-24 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              <span>基于 Temporal 官方文档的中文翻译</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              Temporal 中文文档
            </h1>
            <p className="text-2xl sm:text-3xl font-light text-blue-100 mb-8">
              可靠的分布式任务编排平台
            </p>
            
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 leading-relaxed">
              Temporal 是一个开源的分布式任务编排平台，帮助开发者构建容错、可扩展的分布式系统。
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 leading-relaxed">
              本站提供完整的中文文档，包括快速开始、开发指南、SDK 参考和部署文档。
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" asChild>
                <Link href="/docs/quickstart/what-is-temporal">
                  <Zap className="mr-2 h-5 w-5" />
                  快速开始
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button size="lg" variant="ghost" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6 transform hover:-translate-y-1 transition-all" asChild>
                <Link href="/docs/quickstart/hello-world">
                  Hello World 教程
                </Link>
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>开源免费</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>多语言支持</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>生产就绪</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>企业级支持</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                为什么选择 Temporal？
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                构建可靠、可扩展、可维护的分布式应用程序
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-blue-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">可靠性</CardTitle>
                  <CardDescription className="text-base">
                    自动重试、错误处理和状态持久化，确保您的应用永不失败
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-green-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">可扩展性</CardTitle>
                  <CardDescription className="text-base">
                    轻松处理数百万个工作流，支持水平扩展和高可用性
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-purple-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">开发体验</CardTitle>
                  <CardDescription className="text-base">
                    使用熟悉的编程语言，专注于业务逻辑而非基础设施
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                支持多种编程语言
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                选择您熟悉的语言开始开发
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'Go', href: '/docs/sdk/go', color: 'from-blue-400 to-blue-600' },
                { name: 'Java', href: '/docs/sdk/java', color: 'from-red-400 to-red-600' },
                { name: 'Python', href: '/docs/sdk/python', color: 'from-green-400 to-green-600' },
                { name: 'TypeScript', href: '/docs/sdk/typescript', color: 'from-blue-500 to-indigo-600' },
                { name: '.NET', href: '/docs/sdk/dotnet', color: 'from-purple-400 to-purple-600' },
                { name: 'PHP', href: '/docs/sdk/php', color: 'from-indigo-400 to-indigo-600' },
              ].map((sdk) => (
                <Link key={sdk.name} href={sdk.href}>
                  <Card className="text-center hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer border-2 hover:border-gray-300">
                    <CardContent className="pt-8 pb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${sdk.color} shadow-lg font-bold text-2xl text-white mb-4`}>
                        {sdk.name[0]}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">{sdk.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                快速导航
              </h2>
              <p className="text-xl text-gray-600">
                选择您想了解的内容
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-blue-400">
                <CardHeader>
                  <div className="p-4 bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <Terminal className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">开始使用</CardTitle>
                  <CardDescription className="text-base">
                    快速上手 Temporal，5 分钟运行第一个工作流
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/quickstart/what-is-temporal" className="text-blue-600 hover:text-blue-700 font-semibold text-base inline-flex items-center group">
                    查看快速开始
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-green-400">
                <CardHeader>
                  <div className="p-4 bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <Book className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">深入学习</CardTitle>
                  <CardDescription className="text-base">
                    掌握工作流、活动、信号等核心概念
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/develop/workflows" className="text-green-600 hover:text-green-700 font-semibold text-base inline-flex items-center group">
                    阅读开发指南
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-purple-400">
                <CardHeader>
                  <div className="p-4 bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">加入社区</CardTitle>
                  <CardDescription className="text-base">
                    与全球开发者交流，获取帮助和最佳实践
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/resources/community" className="text-purple-600 hover:text-purple-700 font-semibold text-base inline-flex items-center group">
                    查看社区资源
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold">Temporal 中文文档</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  社区维护的 Temporal 中文翻译项目，帮助中文开发者更好地理解和使用 Temporal。
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/ymstar/temporal-docs-cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="查看源码"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://community.temporal.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Users className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">快速链接</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/docs/quickstart/what-is-temporal" className="hover:text-white transition-colors">
                      快速开始
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/develop/workflows" className="hover:text-white transition-colors">
                      开发指南
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/sdk/java" className="hover:text-white transition-colors">
                      Java SDK
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/resources/community" className="hover:text-white transition-colors">
                      社区资源
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">项目资源</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="https://github.com/ymstar/temporal-docs-cn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      项目源码
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/ymstar/temporal-docs-cn/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Users className="h-4 w-4" />
                      问题反馈
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">官方资源</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="https://docs.temporal.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Globe className="h-4 w-4" />
                      官方文档
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/temporalio/temporal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      Temporal 官方仓库
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://temporal.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      官方网站
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2026 Temporal 中文文档 · 社区翻译项目
              </p>
              <p className="text-gray-500 text-sm">
                本文档为社区维护的中文翻译版本
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
